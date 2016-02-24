import React from 'react';


/**
 * Draggable component
 * @class
 */
const Draggable = React.createClass({
  /**
   * Used by React as the component name
   */
  displayName: 'Draggable',


  /**
   * Expected propTypes
   * @prop {String} additionalClass - A string of additional classnames to add
   * to the element
   * @prop {Object} bounds - An array of coordinates, forming a square, that the
   * user cannot drag the component outside of
   * @prop {Object} children - Child React elements
   * @prop {String} contentPosition - The css positioning for for the element
   * ('absolute' or 'fixed', defaults to 'absolute')
   * @prop {Function} dragCallback - The function to call while the user is
   * dragging
   * @prop {Function} dragStartCallback - The function to call when the user
   * starts dragging
   * @prop {Function} dragStopCallback - The function to call when the user
   * stops dragging
   * @prop {Function} dragLeaveCallback - A function to call when the user is
   * dragging and the mouse/touch leaves the draggable component
   * @prop {Object} initialPosition - An object with initial x and y values for the
   * content
   * @prop {String} lock - An axis to lock element to when dragging, either
   * 'x' or 'y'
   * @prop {Boolean} preventDefaultEvents - Whether to prevent default
   * mouse/touch events
   * @prop {String} touchScrollLock - If set to true, prevents the content from
   * being dragged if the user is scrolling in the opposite direction on a touchend
   * device
   * @prop {Boolean} translate3d - Whether to use css3 transform3d for
   * positioning
   */
  propTypes: {
    additionalClass: React.PropTypes.string,
    bounds: React.PropTypes.PropTypes.shape({
      x1: React.PropTypes.number.isRequired,
      y1: React.PropTypes.number.isRequired,
      x2: React.PropTypes.number.isRequired,
      y2: React.PropTypes.number.isRequired,
    }),
    children: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object,
    ]).isRequired,
    contentPosition: React.PropTypes.string,
    dragCallback: React.PropTypes.func,
    dragLeaveCallback: React.PropTypes.func,
    dragStartCallback: React.PropTypes.func,
    dragStopCallback: React.PropTypes.func,
    initialPosition: React.PropTypes.object,
    lock: React.PropTypes.string,
    preventDefaultEvents: React.PropTypes.bool,
    touchScrollLock: React.PropTypes.bool,
    translate3d: React.PropTypes.bool,
  },


  /**
   * Get initial state object
   * @returns {Object} initial object
   */
  getInitialState() {
    const elPos = this.props.contentPosition || 'absolute';

    return {
      pos: this.props.initialPosition || { x: 0, y: 0 },
      dragging: false,
      rel: null,
      enabled: true,
      elementStyle: {
        position: elPos,
      },
      checkTimerStarted: false,
      scrollLocked: false,
      dragLocked: false,
    };
  },


  /**
   * Called after component mounts to DOM
   * @returns {undefined} undefined
   */
  componentDidMount() {
    this._allowDragThreshold = 40;
    this._mouseDownWhileDisabled = false;

    if (this.props.lock && this.props.touchScrollLock) {
      this.doSwipe = false;
    } else {
      this.doSwipe = true;
    }

    this._cssProperties = {
      supported: false,
      prefix: '',
    };

    if (typeof (document.body.style.borderRadius) !== 'undefined') {
      this._cssProperties.supported = true;
      this._cssProperties.prefix = '';
      this._cssProperties.objectPrefix = '';
    }

    if (typeof (document.body.style.MozBorderRadius) !== 'undefined') {
      this._cssProperties.supported = true;
      this._cssProperties.prefix = '-moz-';
      this._cssProperties.objectPrefix = 'moz';
    }

    if (typeof (document.body.style.webkitBorderRadius) !== 'undefined') {
      this._cssProperties.supported = true;
      this._cssProperties.prefix = '-webkit-';
      this._cssProperties.objectPrefix = 'Webkit';
    }

    document.addEventListener('mousemove', this._onMouseMove);
    document.addEventListener('touchmove', this._onMouseMove);

    document.addEventListener('mouseup', this._onMouseUp);
    document.addEventListener('touchend', this._onMouseUp);
  },


  /**
   * Called before component is removed from the DOM
   * @returns {undefined} undefined
   */
  componentWillUnmount() {
    document.removeEventListener('mousemove', this._onMouseMove);
    document.removeEventListener('touchmove', this._onMouseMove);

    document.removeEventListener('mouseup', this._onMouseUp);
    document.removeEventListener('touchend', this._onMouseUp);
  },


  /**
   * Renders component
   * @returns {Object} React element
   */
  render() {
    const _this = this;
    let className = 'component-draggable';
    if (this.props.additionalClass) {
      className = 'component-draggable ' + this.props.additionalClass;
    }

    const renderedChildren = React.Children.map(this.props.children, (child) => {
      let newStyle = {};
      let childStyle = {};
      if (child.props && child.props.style) {
        childStyle = child.props.style;
      }
      let elementStyle = {};
      if (_this.state && _this.state.elementStyle) {
        elementStyle = _this.state.elementStyle;
      }

      if (_this.state.dragging && _this.state.enabled) {
        newStyle = Object.assign(childStyle, elementStyle);
      } else {
        newStyle = Object.assign(elementStyle, childStyle);
      }

      return React.cloneElement(child, {
        style: newStyle,
        ref: 'draggableChild',
      });
    });

    return (
      <div
        className={className}
        onTouchStart={this._onMouseDown}
        onTouchLeave={this._onMouseOut}
        onMouseDown={this._onMouseDown}
        onMouseOut={this._onMouseOut}
      >
        {renderedChildren}
    </div>
    );
  },


  /**
   * Enables or disables the element's draggability
   * @param {Boolean} enabled Whether the draggable object should be enabled
    * @returns {undefined} undefined
   */
  setEnabled(enabled) {
    this.setState({
      enabled,
    });
  },


  /**
   * Sets the element's style
   * @param {Object} style An object key/value style attributes
    * @returns {undefined} undefined
   */
  setStyle(style) {
    const oldStyle = Object.assign({}, this.state.elementStyle);
    const newStyle = Object.assign(oldStyle, style);

    this.setState({
      elementStyle: newStyle,
    });
  },


  /**
   * Positions the draggable element
   * @param {Object} pos - An object with x and y position values
   * @returns {undefined} undefined
   */
  setPosition(pos) {
    this.setState({
      pos,
    }, this.positionContent);
  },


  /**
   * Gets the draggable element position
   * @returns {Object} pos - An object with x and y position values
   */
  getPosition() {
    return this.state.pos;
  },


  /**
   * Positions the draggable element
   * @returns {undefined} undefined
   */
  positionContent() {
    let positionTransformString = 'translate(' + this.state.pos.x + 'px,' +
      this.state.pos.y + 'px)';
    if (this.props.translate3d) {
      positionTransformString = 'translate3d(' + this.state.pos.x + 'px ,' +
        this.state.pos.y + 'px, 0px)';
    }

    if (this.props.lock === 'x') {
      positionTransformString = 'translate(' + this.state.pos.x + 'px, 0px)';
      if (this.props.translate3d) {
        positionTransformString = 'translate3d(' + this.state.pos.x + 'px, 0px, 0px)';
      }
    }

    if (this.props.lock === 'y') {
      positionTransformString = 'translate(0px, ' + this.state.pos.y + 'px)';
      if (this.props.translate3d) {
        positionTransformString = 'translate3d(0px, ' + this.state.pos.y + 'px, 0px)';
      }
    }

    const transformStyle = {
      msTransform: positionTransformString,
      WebkitTransform: positionTransformString,
      MozTransform: positionTransformString,
      transform: positionTransformString,
    };

    const oldStyle = Object.assign({}, this.state.elementStyle);
    const newStyle = Object.assign(oldStyle, transformStyle);

    this.setState({
      elementStyle: newStyle,
    });
  },


  /**
   * Called when the user's mouse is pressed
   * @param {Event} e A mousedown event
   * @returns {undefined} undefined
   */
  _onMouseDown(e) {
    this.mouseDownOnElement = true;

    if (this.state.enabled) {
      const transformValues = this._parseTransformValues(this.refs.draggableChild);
      let xVal = Number(transformValues[0]);
      let yVal = Number(transformValues[1]);
      let pageX = e.clientX;
      let pageY = e.clientY;

      this._mouseDownWhileDisabled = false;

      if (this.props.translate3d) {
        xVal = Number(transformValues[1]);
      }

      if (this.props.translate3d) {
        yVal = Number(transformValues[2]);
      }

      if (isNaN(xVal)) {
        xVal = 0;
      }

      if (isNaN(yVal)) {
        yVal = 0;
      }

      if (e.type !== 'mousedown') {
        pageX = e.changedTouches[0].clientX;
        pageY = e.changedTouches[0].clientY;
      }

      this.setState({
        scrollLocked: false,
        checkTimerStarted: true,
        dragging: true,
        rel: {
          inputX: pageX,
          inputY: pageY,
          contentX: xVal,
          contentY: yVal,
        },
      });

      if (this.props.dragStartCallback) {
        this.props.dragStartCallback({
          x: xVal,
          y: yVal,
        },
        e.target);
      }
    } else {
      this._mouseDownWhileDisabled = true;
    }

    if (this.props.preventDefaultEvents) {
      e.stopPropagation();
      e.preventDefault();
    }
  },


  /**
   * Called when the user's mouse is moved
   * @param {Event} e A mousemove event
   * @returns {undefined} undefined
   */
  _onMouseMove(e) {
    if (this.mouseDownOnElement) {
      const transformValues = this._parseTransformValues(this.refs.draggableChild);
      let xVal = Number(transformValues[0]);
      let yVal = Number(transformValues[1]);
      let pageX = e.clientX;
      let pageY = e.clientY;
      let difX = 0;
      let difY = 0;

      if (this.props.translate3d) {
        xVal = Number(transformValues[1]);
      }

      if (this.props.translate3d) {
        yVal = Number(transformValues[2]);
      }

      if (isNaN(xVal)) {
        xVal = 0;
      }

      if (isNaN(yVal)) {
        yVal = 0;
      }

      if (!this.state.dragging) {
        return;
      }

      if (e.type !== 'mousemove') {
        pageX = e.changedTouches[0].clientX;
        pageY = e.changedTouches[0].clientY;
      }

      // If the dragging is locked to the 'x' or 'y' axis,
      // and the user is dragging (or scrolling on mobile) the opposite axis,
      // stop any dragging. This is so the content doesn't move when a user is
      // scrolling on a mobile device.
      if (this.props.touchScrollLock && (this.props.lock === 'x' ||
        this.props.lock === 'y')) {
        difY = (pageY - this.state.rel.inputY);
        difX = (pageX - this.state.rel.inputX);

        if (difY < 0) {
          difY *= -1;
        }

        if (difX < 0) {
          difX *= -1;
        }

        if (this.props.lock === 'x') {
          // if the content is locked to dragging horizontally
          if (difX > difY) {
            // if the user is intending to swipe horizontally
            if (difX > 10 && !this.state.scrollLocked) {
              this.doSwipe = true;
              this.setState({ dragLocked: true });
            }
          } else {
            // if the user is intending to swipe vertically
            if (!this.state.dragLocked) {
              this.setState({ scrollLocked: true });
            }
          }
        } else {
          // if the content is locked to dragging vertically
          if (difY > difX) {
            // if the user is intending to swipe vertically
            if (difY > 10 && !this.state.scrollLocked) {
              this.doSwipe = true;
              this.setState({ dragLocked: true });
            }
          } else {
            // if the user is intending to swipe horizontally
            if (!this.state.dragLocked) {
              this.setState({ scrollLocked: true });
            }
          }
        }
      }

      if (this.doSwipe && !this.state.scrollLocked) {
        const newPos = {
          x: this.state.rel.contentX + (pageX - this.state.rel.inputX),
          y: this.state.rel.contentY + (pageY - this.state.rel.inputY),
        };

        if (this.props.bounds) {
          // if the bounds were supplied, don't let the content move outside
          // of them
          const bounds = this.props.bounds;

          if (newPos.x < bounds.x1) {
            newPos.x = bounds.x1;
          }

          if (newPos.y < bounds.y1) {
            newPos.y = bounds.y1;
          }

          if (newPos.x > bounds.x2) {
            newPos.x = bounds.x2;
          }

          if (newPos.y > bounds.y2) {
            newPos.y = bounds.y3;
          }
        }

        if (this.props.dragCallback) {
          this.props.dragCallback(newPos, e.target);
        }

        this.setState({
          pos: newPos,
        }, this.positionContent);
      }
    }

    if (this.props.preventDefaultEvents) {
      e.stopPropagation();
      e.preventDefault();
    }
  },


  /**
   * Called when the user's mouse is released
   * @param {Event} e A mouseup event
   * @returns {undefined} undefined
   */
  _onMouseUp(e) {
    if (this.mouseDownOnElement &&
      this.state.enabled &&
      !this._mouseDownWhileDisabled) {
      const transformValues = this._parseTransformValues(this.refs.draggableChild);
      let xVal = Number(transformValues[0]);
      let yVal = Number(transformValues[1]);

      if (this.props.translate3d) {
        xVal = Number(transformValues[1]);
      }

      if (this.props.translate3d) {
        yVal = Number(transformValues[2]);
      }

      if (isNaN(xVal)) {
        xVal = 0;
      }

      if (isNaN(yVal)) {
        yVal = 0;
      }

      if (this.props.dragStopCallback && !this.state.scrollLocked) {
        this.props.dragStopCallback({
          x: xVal,
          y: yVal,
        }, e.target);
      }

      this.setState({
        dragging: false,
        scrollLocked: false,
        dragLocked: false,
      });
    }

    if (this.props.preventDefaultEvents) {
      e.stopPropagation();
      e.preventDefault();
    }

    this.mouseDownOnElement = false;
  },


  /**
   * Called when the user is dragging but releases the mouse
   * outside of the draggable component
   * @returns {undefined} undefined
   */
  _onMouseOut() {
    if (this.state.dragging && this.props.dragLeaveCallback) {
      this.setState({
        dragging: false,
        scrollLocked: false,
        dragLocked: false,
      });

      this.props.dragLeaveCallback();
    }
  },


  /**
   * Parses a CSS string containing a transform property
   * @param {HTMLElement} element The element to get the CSS values from
   * @returns {Array} An array of the transform values
   */
  _parseTransformValues(element) {
    let transformString = 'transform';
    if (this._cssProperties.objectPrefix !== '') {
      transformString = 'Transform';
    }
    const matrix = element.style[this._cssProperties.objectPrefix + transformString];
    let values = matrix.match(/-?[0-9\.]+/g);

    if (!values) {
      values = [0, 0, 0];
    }

    return values;
  },
});

export default Draggable;

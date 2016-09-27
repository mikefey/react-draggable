import test from 'tape';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import eventHelper from '../assets/js/src/helpers/event';
import Draggable from '../assets/js/src/components/Draggable.jsx';


test('Draggable component: Should return an object ', (assert) => {
  const component = ReactTestUtils.renderIntoDocument(
    <Draggable lock={'x'}>
      <div className='child'>
        <div className='inner' />
      </div>
    </Draggable>
  );

  assert.equal(typeof component, 'object');
  ReactDOM.unmountComponentAtNode(document);
  assert.end();
});


test('Draggable component: Should return an element with the className ' +
  '"component-draggable"',
  (assert) => {
    const component = ReactTestUtils.renderIntoDocument(
      <Draggable lock={'x'}>
        <div className='child'>
          <div className='inner' />
        </div>
      </Draggable>
    );

    const componentClassName = ReactDOM.findDOMNode(component).className;

    assert.equal(componentClassName, 'component-draggable ');
    ReactDOM.unmountComponentAtNode(document);
    assert.end();
  });


test('Draggable component: Should render a child with the className "child"',
  (assert) => {
    const component = ReactTestUtils.renderIntoDocument(
      <Draggable lock={'x'}>
        <div className='child'>
          <div className='inner' />
        </div>
      </Draggable>
    );

    const childClassName = component.props.children.props.className;

    assert.equal(childClassName, 'child');
    ReactDOM.unmountComponentAtNode(document);
    assert.end();
  });

test('Draggable component: Should set the css position',
  (assert) => {
    const component = ReactTestUtils.renderIntoDocument(
      <Draggable lock={'x'} cssPosition={'fixed'}>
        <div className='child'>
          <div className='inner' />
        </div>
      </Draggable>
    );

    const node = ReactDOM.findDOMNode(component);

    assert.equal(node.firstChild.style.position, 'fixed');
    ReactDOM.unmountComponentAtNode(document);
    assert.end();
  });


test('Draggable component: Should add css when style object is passed as ' +
  'a prop',
  (assert) => {
    const style = {
      width: 200,
      height: 100,
    };

    const component = ReactTestUtils.renderIntoDocument(
      <Draggable style={style}>
        <div className='child'>
          <div className='inner' />
        </div>
      </Draggable>
    );

    const node = ReactDOM.findDOMNode(component);

    assert.equal(node.firstChild.style.width, '200px');
    assert.equal(node.firstChild.style.height, '100px');
    ReactDOM.unmountComponentAtNode(document);
    assert.end();
  });


test('Draggable component: Should render an additional className',
  (assert) => {
    const component = ReactTestUtils.renderIntoDocument(
      <Draggable lock={'x'} additionalClass={'additional-class'}>
        <div className='child'>
          <div className='inner' />
        </div>
      </Draggable>
    );

    const node = ReactDOM.findDOMNode(component);
    const className = node.className;

    assert.equal(className, 'component-draggable additional-class');
    ReactDOM.unmountComponentAtNode(document);
    assert.end();
  });


test('Draggable component: Should render an the component with an initial' +
  'position',
  (assert) => {
    const component = ReactTestUtils.renderIntoDocument(
      <Draggable initialPosition={{ x: 50, y: 100 }}>
        <div className='child'>
          <div className='inner' />
        </div>
      </Draggable>
    );

    const node = ReactDOM.findDOMNode(component);

    assert.equal(node.firstChild.style.WebkitTransform,
      'translate3d(50px, 100px, 0px)');
    ReactDOM.unmountComponentAtNode(document);
    assert.end();
  });


test('Draggable component: translate x style should update when dragged' +
  ' horizontally',
  (assert) => {
    const component = ReactTestUtils.renderIntoDocument(
      <Draggable>
        <div className='child'>
          <div className='inner' />
        </div>
      </Draggable>
    );

    const mouseDownEvent = {
      type: 'mousedown',
      clientX: 0,
      clientY: 0,
      changedTouches: [
        {
          clientX: 0,
          clientY: 0,
        },
      ],
    };

    const mouseMoveEvent =
      eventHelper.createEvent('MouseEvents', 'mousemove', 0, 0, -300, 0);
    const mouseUpEvent =
      eventHelper.createEvent('MouseEvents', 'mouseup', 0, 0, -300, 0);
    const node = ReactDOM.findDOMNode(component);

    ReactTestUtils.Simulate.mouseDown(node, mouseDownEvent);
    eventHelper.dispatchEvent(document, mouseMoveEvent);
    eventHelper.dispatchEvent(document, mouseUpEvent);

    assert.equal(node.firstChild.style.WebkitTransform,
      'translate3d(-300px, 0px, 0px)');
    ReactDOM.unmountComponentAtNode(document);
    assert.end();
  });


test('Draggable component: translate y style should update when dragged' +
  ' vertically',
  (assert) => {
    const component = ReactTestUtils.renderIntoDocument(
      <Draggable>
        <div className='child'>
          <div className='inner' />
        </div>
      </Draggable>
    );

    const mouseDownEvent = {
      type: 'mousedown',
      clientX: 0,
      clientY: 0,
      changedTouches: [
        {
          clientX: 0,
          clientY: 0,
        },
      ],
    };

    const mouseMoveEvent =
      eventHelper.createEvent('MouseEvents', 'mousemove', 0, 0, 0, -300);
    const mouseUpEvent =
      eventHelper.createEvent('MouseEvents', 'mouseup', 0, 0, 0, -300);
    const node = ReactDOM.findDOMNode(component);

    ReactTestUtils.Simulate.mouseDown(node, mouseDownEvent);
    eventHelper.dispatchEvent(document, mouseMoveEvent);
    eventHelper.dispatchEvent(document, mouseUpEvent);

    assert.equal(node.firstChild.style.WebkitTransform,
      'translate3d(0px, -300px, 0px)');
    ReactDOM.unmountComponentAtNode(document);
    assert.end();
  });


test('Draggable component: component should not be able to be dragged on' +
  ' the y axis if locked to x',
  (assert) => {
    const component = ReactTestUtils.renderIntoDocument(
      <Draggable lock={'x'}>
        <div className='child'>
          <div className='inner' />
        </div>
      </Draggable>
    );

    const mouseDownEvent = {
      type: 'mousedown',
      clientX: 0,
      clientY: 0,
      changedTouches: [
        {
          clientX: 0,
          clientY: 0,
        },
      ],
    };

    const mouseMoveEvent =
      eventHelper.createEvent('MouseEvents', 'mousemove', 0, 0, -300, -200);
    const mouseUpEvent =
      eventHelper.createEvent('MouseEvents', 'mouseup', 0, 0, -300, -200);
    const node = ReactDOM.findDOMNode(component);

    ReactTestUtils.Simulate.mouseDown(node, mouseDownEvent);
    eventHelper.dispatchEvent(document, mouseMoveEvent);
    eventHelper.dispatchEvent(document, mouseUpEvent);

    assert.equal(node.firstChild.style.WebkitTransform,
      'translate3d(-300px, 0px, 0px)');
    ReactDOM.unmountComponentAtNode(document);
    assert.end();
  });


test('Draggable component: component should not be able to be dragged on' +
  ' the x axis if locked to y',
  (assert) => {
    const component = ReactTestUtils.renderIntoDocument(
      <Draggable lock={'y'}>
        <div className='child'>
          <div className='inner' />
        </div>
      </Draggable>
    );

    const mouseDownEvent = {
      type: 'mousedown',
      clientX: 0,
      clientY: 0,
      changedTouches: [
        {
          clientX: 0,
          clientY: 0,
        },
      ],
    };

    const mouseMoveEvent =
      eventHelper.createEvent('MouseEvents', 'mousemove', 0, 0, -150, -300);
    const mouseUpEvent =
      eventHelper.createEvent('MouseEvents', 'mouseup', 0, 0, -150, -300);
    const node = ReactDOM.findDOMNode(component);

    ReactTestUtils.Simulate.mouseDown(node, mouseDownEvent);
    eventHelper.dispatchEvent(document, mouseMoveEvent);
    eventHelper.dispatchEvent(document, mouseUpEvent);

    assert.equal(node.firstChild.style.WebkitTransform,
      'translate3d(0px, -300px, 0px)');
    ReactDOM.unmountComponentAtNode(document);
    assert.end();
  });


test('Draggable component: component should not be able to be dragged if' +
  ' the disabled prop is set to true',
  (assert) => {
    const component = ReactTestUtils.renderIntoDocument(
      <Draggable disabled>
        <div className='child'>
          <div className='inner' />
        </div>
      </Draggable>
    );

    const mouseDownEvent = {
      type: 'mousedown',
      clientX: 0,
      clientY: 0,
      changedTouches: [
        {
          clientX: 0,
          clientY: 0,
        },
      ],
    };

    const mouseMoveEvent =
      eventHelper.createEvent('MouseEvents', 'mousemove', 0, 0, -150, -300);
    const mouseUpEvent =
      eventHelper.createEvent('MouseEvents', 'mouseup', 0, 0, -150, -300);
    const node = ReactDOM.findDOMNode(component);

    ReactTestUtils.Simulate.mouseDown(node, mouseDownEvent);
    eventHelper.dispatchEvent(document, mouseMoveEvent);
    eventHelper.dispatchEvent(document, mouseUpEvent);

    assert.equal(node.firstChild.style.WebkitTransform,
      '');
    ReactDOM.unmountComponentAtNode(document);
    assert.end();
  });


test('Draggable component: component should not be able to be dragged outside' +
  ' of bounds',
  (assert) => {
    const component = ReactTestUtils.renderIntoDocument(
      <Draggable
        lock={'x'}
        bounds={{ x1: -300, y1: 0, x2: 300, y2: 300 }}
      >
        <div className='child'>
          <div className='inner' />
        </div>
      </Draggable>
    );

    const mouseDownEvent = {
      type: 'mousedown',
      clientX: 0,
      clientY: 0,
      changedTouches: [
        {
          clientX: 0,
          clientY: 0,
        },
      ],
    };

    const mouseMoveEvent =
      eventHelper.createEvent('MouseEvents', 'mousemove', 0, 0, -400, -200);
    const mouseUpEvent =
      eventHelper.createEvent('MouseEvents', 'mouseup', 0, 0, -400, -200);
    const node = ReactDOM.findDOMNode(component);

    ReactTestUtils.Simulate.mouseDown(node, mouseDownEvent);
    eventHelper.dispatchEvent(document, mouseMoveEvent);
    eventHelper.dispatchEvent(document, mouseUpEvent);

    assert.equal(node.firstChild.style.WebkitTransform,
      'translate3d(-300px, 0px, 0px)');
    ReactDOM.unmountComponentAtNode(document);
    assert.end();
  });


test('Draggable component: component should fire the dragStartCallback function',
  (assert) => {
    let callBackFired = false;
    const component = ReactTestUtils.renderIntoDocument(
      <Draggable
        dragStartCallback={function () {
          callBackFired = true;
        }}
        translate3d
        lock={'x'}
      >
        <div className='child'>
          <div className='inner' />
        </div>
      </Draggable>
    );

    const mouseDownEvent = {
      type: 'mousedown',
      clientX: 0,
      clientY: 0,
      changedTouches: [
        {
          clientX: 0,
          clientY: 0,
        },
      ],
    };

    const mouseMoveEvent =
      eventHelper.createEvent('MouseEvents', 'mousemove', 0, 0, -400, 0);
    const mouseUpEvent =
      eventHelper.createEvent('MouseEvents', 'mouseup', 0, 0, -400, 0);
    const node = ReactDOM.findDOMNode(component);

    ReactTestUtils.Simulate.mouseDown(node, mouseDownEvent);
    eventHelper.dispatchEvent(document, mouseMoveEvent);
    eventHelper.dispatchEvent(document, mouseUpEvent);

    assert.equal(callBackFired, true);
    ReactDOM.unmountComponentAtNode(document);
    assert.end();
  });


test('Draggable component: component should fire the dragCallback function',
  (assert) => {
    let callBackFired = false;
    const component = ReactTestUtils.renderIntoDocument(
      <Draggable
        dragCallback={function () {
          callBackFired = true;
        }}
        translate3d
        lock={'x'}
      >
        <div className='child'>
          <div className='inner' />
        </div>
      </Draggable>
    );

    const mouseDownEvent = {
      type: 'mousedown',
      clientX: 0,
      clientY: 0,
      changedTouches: [
        {
          clientX: 0,
          clientY: 0,
        },
      ],
    };

    const mouseMoveEvent =
      eventHelper.createEvent('MouseEvents', 'mousemove', 0, 0, -400, 0);
    const mouseUpEvent =
      eventHelper.createEvent('MouseEvents', 'mouseup', 0, 0, -400, 0);
    const node = ReactDOM.findDOMNode(component);

    ReactTestUtils.Simulate.mouseDown(node, mouseDownEvent);
    eventHelper.dispatchEvent(document, mouseMoveEvent);
    eventHelper.dispatchEvent(document, mouseUpEvent);

    assert.equal(callBackFired, true);
    ReactDOM.unmountComponentAtNode(document);
    assert.end();
  });


test('Draggable component: component should fire the dragStopCallback function',
  (assert) => {
    let callBackFired = false;
    const component = ReactTestUtils.renderIntoDocument(
      <Draggable
        dragStopCallback={function () {
          callBackFired = true;
        }}
        translate3d
        lock={'x'}
      >
        <div className='child'>
          <div className='inner' />
        </div>
      </Draggable>
    );

    const mouseDownEvent = {
      type: 'mousedown',
      clientX: 0,
      clientY: 0,
      changedTouches: [
        {
          clientX: 0,
          clientY: 0,
        },
      ],
    };

    const mouseMoveEvent =
      eventHelper.createEvent('MouseEvents', 'mousemove', 0, 0, -400, 0);
    const mouseUpEvent =
      eventHelper.createEvent('MouseEvents', 'mouseup', 0, 0, -400, 0);
    const node = ReactDOM.findDOMNode(component);

    ReactTestUtils.Simulate.mouseDown(node, mouseDownEvent);
    eventHelper.dispatchEvent(document, mouseMoveEvent);
    eventHelper.dispatchEvent(document, mouseUpEvent);

    assert.equal(callBackFired, true);
    ReactDOM.unmountComponentAtNode(document);
    assert.end();
  });

test('Draggable component: component should not be draggable when the user is' +
  ' scrolling on a touch device and the touchScrollLock prop is set to true',
  (assert) => {
    const component = ReactTestUtils.renderIntoDocument(
      <Draggable
        initialPosition={{ x: 10, y: 10 }}
        touchScrollLock
        lock={'x'}
      >
        <div className='child'>
          <div className='inner' />
        </div>
      </Draggable>
    );

    const mouseDownEvent = {
      type: 'mousedown',
      clientX: 0,
      clientY: 0,
      changedTouches: [
        {
          clientX: 0,
          clientY: 0,
        },
      ],
    };

    const mouseMoveEvent =
      eventHelper.createEvent('MouseEvents', 'mousemove', 0, 0, -20, -100);
    const mouseUpEvent =
      eventHelper.createEvent('MouseEvents', 'mouseup', 0, 0, -20, -100);
    const node = ReactDOM.findDOMNode(component);

    ReactTestUtils.Simulate.mouseDown(node, mouseDownEvent);
    eventHelper.dispatchEvent(document, mouseMoveEvent);
    eventHelper.dispatchEvent(document, mouseUpEvent);

    assert.equal(node.firstChild.style.WebkitTransform,
      'translate3d(10px, 10px, 0px)');
    ReactDOM.unmountComponentAtNode(document);
    assert.end();
  });

# react-responsive-image
A wrapper React component that adds draggable functionality to an element. Uses transform values with the option to use transform3d. Works with touch devices.

## to install
```
npm i react-draggable
```

## to run demo
```
npm start
```
Then navigate to [http://localhost:3000/demo.html](http://localhost:3000/demo.html)

## to run tests
```
npm test
```

## to build
```
npm run build
```

## usage
```
import ReactDraggable from 'react-draggable';

<Draggable
  supportsCssTransforms3d={supportsCssTransforms3d}
>
  <div className='draggable-content'>DRAG</div>
</Draggable>

```

## props
**additionalClass {String}** - A string of additional classnames to add to the element
**bounds {Object}** - An array of coordinates, forming a square, that the user cannot drag the component outside of, in the format {x1: Number, y1: Number, x2: Number, y2: Number}
**contentPosition {String}** - The css positioning for for the element ('absolute' or 'fixed', defaults to 'absolute')
**dragCallback {Function}** - The function to call while the user is dragging
**dragStartCallback {Function}** - The function to call when the user starts dragging
**dragStopCallback {Function}** - The function to call when the user stops dragging
**dragLeaveCallback {Function}** - A function to call when the user is dragging and the mouse/touch leaves the draggable component
**initialPosition {Object}** - An object with initial x and y values for the content
**lock {String}** - An axis to lock element to when dragging, either 'x' or 'y'
**preventDefaultEvents {Boolean}** - Whether to prevent default mouse/touch events
**touchScrollLock {String}** - If set to true, prevents the content from being dragged if the user is scrolling in the opposite direction on a touchend device
**translate3d {Boolean}** - Whether to use css3 transform3d for positioning

## methods
**setEnabled({Boolean})** - Sets the whether the draggability is enabled
**setStyle({Object})** - Sets the style of the component
**setPosition({Object})** - Sets the position of the component with an object passed in format {x: Number, y: number}
**getPosition()** - Gets the current x and y position of the component

# react-draggable-component
A wrapper React component that adds draggable functionality to an element using transform3d. Works with touch devices.

## to install
```
npm i react-draggable-component
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
import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable-component';

<Draggable>
  <div className='draggable-content'>DRAG</div>
</Draggable>

```

## props
**additionalClass {String}** - A string of additional classnames to add to the element  
**bounds {Object}** - An array of coordinates, forming a square, that the user cannot drag the component   outside of, in the format {x1: Number, y1: Number, x2: Number, y2: Number}  
**contentPosition {String}** - The css positioning for for the element (i.e. 'absolute' or 'fixed', defaults to 'absolute')  
**dragCallback {Function}** - A callback function while the user is dragging  
**dragStartCallback {Function}** - A callback function for when the user starts dragging  
**dragStopCallback {Function}** - A callback function for when the user stops dragging  
**dragLeaveCallback {Function}** - A callback function for when the user is dragging and the mouse/touch leaves the draggable component  
**initialPosition {Object}** - An object with initial x and y values for the content  
**lock {String}** - An axis to lock element to when dragging, either 'x' or 'y'  
**preventDefaultEvents {Boolean}** - Whether to prevent default mouse/touch events  
**touchScrollLock {String}** - If set to true, prevents the content from being dragged if the user is scrolling in the opposite direction on a touch device  

## methods
**enable()** - Enables draggability
**disable()** - Disables draggability
**setStyle({Object})** - Sets the style of the component  
**setPosition({Object})** - Sets the position of the component with an object passed in format {x: Number, y: number}  
**getPosition()** - Gets the current x and y position of the component  

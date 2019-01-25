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
or
```
yarn start
```
Then navigate to [http://localhost:3000/demo.html](http://localhost:3000/demo.html)

## to run tests
```
npm test
```
or
```
yarn test
```

## to build
```
npm run build
```
or
```
yarn run build
```

## requirements
```react``` 
```prop-types```


## usage
```javascript
import React from 'react';
import Draggable from 'react-draggable-component';

<Draggable>
  <div className='draggable-content'>DRAG</div>
</Draggable>
```

## props
```javascript
additionalClass {String} // A string of additional classnames to add to the element
```

```javascript
bounds {Object} // An array of coordinates, forming a square, that the user cannot drag the component   outside of, in the format {x1: Number, y1: Number, x2: Number, y2: Number}
```

```javascript
contentPosition {String} // The css positioning for for the element (i.e. 'absolute' or 'fixed', defaults to 'absolute')
```

```javascript
disabled {Boolean} // If the component is disabled
```

```javascript
dragCallback {Function} // A callback function while the user is dragging
```

```javascript
dragStartCallback {Function} // A callback function for when the user starts dragging
```

```javascript
dragStopCallback {Function} // A callback function for when the user stops dragging
```

```javascript
dragLeaveCallback {Function} // A callback function for when the user is dragging and the mouse/touch leaves the draggable component
```

```javascript
lock {String} // An axis to lock element to when dragging, either 'x' or 'y'
```

```javascript
position {Object} // An object with x and y values for the content
```

```javascript
preventDefaultEvents {Boolean} // Whether to prevent default mouse/touch events
```

```javascript
touchScrollLock {String} // If set to true, prevents the content from being dragged if the user is scrolling in the opposite direction on a touch device
```

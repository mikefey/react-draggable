/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from './components/Draggable.jsx';
import '../../css/src/main.scss';


/**
 * Calls a function when the DOM is ready
 * @param {Function} callback - The function to call
 * @returns {undefined} undefined
 */
function domReady(callback) {
  const doc = document;
  const attach = 'addEventListener';

  if (doc[attach]) {
    doc[attach]('DOMContentLoaded', callback);
  } else {
    window.attachEvent('onload', callback);
  }
}


/**
 * Loads the app
 * @param {Function} callback - The function to call
 * @returns {undefined} undefined
 */
domReady(() => {
  const appContainer = document.getElementsByClassName('app-container')[0];

  ReactDOM.render(
    <Draggable>
      <div className='draggable-content'>
        DRAG
      </div>
    </Draggable>,
    appContainer);
});

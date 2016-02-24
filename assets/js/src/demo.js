
import './../../css/src/main.scss';

import Draggable from './components/Draggable.jsx';
import React from 'react';
import ReactDOM from 'react-dom';


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
  const htmlEl = document.getElementsByTagName('html')[0];
  const supportsCssTransforms3d =
    htmlEl.className.indexOf('no-csstransforms3d') === -1;
  const appContainer = document.getElementsByClassName('app-container')[0];

  ReactDOM.render(
    <Draggable
      supportsCssTransforms3d={supportsCssTransforms3d}
    >
    <div className='draggable-content'>DRAG</div>
    </Draggable>

    , appContainer);
});

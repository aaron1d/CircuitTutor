import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/app';
import circuitApp from './reducers/index';

const persistedState = {
  compsById: {
    0: {
      id: 0,
      compType: 'RESISTOR',
      isSelected: false,
      layout: {
        cx: 210,
        cy: 90,
        rot: 45,
      },
      movement: {
        isDragging: false,
        startx: undefined,
        starty: undefined,
      }
    },
    1: {
      id: 1,
      compType: 'INDUCTOR',
      isSelected: false,
      layout: {
        cx: 120,
        cy: 210,
        rot: 90,
      },
      movement: {
        isDragging: false,
        startx: undefined,
        starty: undefined,
      }
    },
    2: {
      id: 2,
      compType: 'CAPACITOR',
      isSelected: false,
      layout: {
        cx: 240,
        cy: 150,
        rot: 0,
      },
      movement: {
        isDragging: false,
        startx: undefined,
        starty: undefined,
      }
    }
  },
  allIds: [0,1,2],
  // width: 600,
  // height: 300,
};

// const createStoreWithMiddleware = applyMiddleware()(createStore);
//
// ReactDOM.render(
//   <Provider store={createStoreWithMiddleware(circuitApp,persistedState)}>
//     <App />
//   </Provider>
//   , document.querySelector('.container'));



const store = createStore(
  //  circuitApp, persistedState,
  circuitApp,
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    , document.querySelector('.container'));

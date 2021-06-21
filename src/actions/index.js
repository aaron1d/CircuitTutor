//import {v4} from 'uuid';
import {generateId} from '../utils';
const snapRes=10;

export function dragStart(id,startx,starty) {
    // const startX = typeof e.clientX === 'undefined' ? e.changedTouches[0].clientX : e.clientX;
    // const startY = typeof e.clientY === 'undefined' ? e.changedTouches[0].clientY : e.clientY;
    //const {startx, starty} = startPosition;
    //console.log('drag start action');
    startx -= startx%snapRes;
    starty -= starty%snapRes;
    return {
      type: 'DRAG_START',
      id,
      startx,
      starty,
    };
}

// export function dragStartWire(id,startx,starty) {
//     // const startX = typeof e.clientX === 'undefined' ? e.changedTouches[0].clientX : e.clientX;
//     // const startY = typeof e.clientY === 'undefined' ? e.changedTouches[0].clientY : e.clientY;
//     //const {startx, starty} = startPosition;
//     //console.log('drag start action');
//     startx -= startx%snapRes;
//     starty -= starty%snapRes;
//     return {
//       type: 'DRAG_START_WIRE',
//       id,
//       startx,
//       starty,
//     };
// }

export function dragMove(id,startx,starty,currentx,currenty) {
  //console.log('drag move action')
  currentx -= currentx%snapRes;
  currenty -= currenty%snapRes;
  return {
    type: 'DRAG_MOVE',
    id,
    startx,
    starty,
    currentx,
    currenty,
  };
}

// export function dragMoveWire(id,startx,starty,currentx,currenty) {
//   //console.log('drag move action')
//   currentx -= currentx%snapRes;
//   currenty -= currenty%snapRes;
//   return {
//     type: 'DRAG_MOVE_WIRE',
//     id,
//     startx,
//     starty,
//     currentx,
//     currenty,
//   };
// }

export function dragEnd(id,startx,starty,currentx,currenty,isConflicting) {
  //console.log('drag move action')
  currentx -= currentx%snapRes;
  currenty -= currenty%snapRes;
  return {
    type: 'DRAG_END',
    id,
    startx,
    starty,
    currentx,
    currenty,
  };
}

// export function dragEndWire(id,startx,starty,currentx,currenty,isConflicting) {
//   //console.log('drag move action')
//   currentx -= currentx%snapRes;
//   currenty -= currenty%snapRes;
//   return {
//     type: 'DRAG_END_WIRE',
//     id,
//     startx,
//     starty,
//     currentx,
//     currenty,
//   };
// }

export function deselect(id) {
  return {
    type:'DESELECT',
    id,
  };
}

export function rotate(id) {
  return {
    type: 'ROTATE',
    id,
  };
}

export function addComp(compType,nextLocation,nextIndex,prevPoint,nextPoint) {
  // if(compType != 'W') {
    return {
      type: 'ADD_COMP',
      id: generateId(),
      compType,
      nextLocation,
      nextIndex,
    };
}

export function updateCompValue(id,values) {
  return {
    type: 'UPDATE_COMP_VALUE',
    id: id,
    values: values,
  };
}

// export function addWireStart() {
//   return {
//     type: 'ADD_WIRE_START',
//   };
// }

// export function addWirePointInitial(x,y) {
//   return {
//     type: 'ADD_WIRE_POINT_INITIAL',
//     x: x,
//     y: y,
//   };
// }

// export function addWirePointSubsequent(x,y) {
//   return {
//     type: 'ADD_WIRE_POINT_SUBSEQUENT',
//     id: generateId(),
//     x: x,
//     y: y,
//   };
// }

// export function addWireEnd() {
//   return {
//     type: 'ADD_WIRE_END',
//   };
// }


export function toggleNodeLabelVisibility() {
  return {
    type: 'TOGGLE_NODE_LABEL_VISIBILITY',
  };
}

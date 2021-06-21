const snapRes = 10;
import {getp1,getp2} from '../utils';
import {drawDim} from '../constants';

const singleLeadPointGroup = (state,action) => {

  switch(action.type){
    case 'DRAG_START':
      //console.log('DragStart', action);

      return {
        ...state,
        movement: {
          isDragging: true,
          startx: action.startx,
          starty: action.starty,
        },
      };


    case 'DRAG_MOVE':
      //console.log('DragMove,action');

      return {
        ...state,
        cx: state.cx + action.currentx-action.startx,
        cy: state.cy + action.currenty-action.starty,
        '1': {x: state[1].x + action.currentx-action.startx, //action.nextLocation[0]-drawDim,
              y: state[1].y + action.currenty-action.starty,//action.nextLocation[1],
              schemNodeNumber: null,
              isConnected: false, //TODO
              // isVisible: true,
              // isHighlighted: false,
            },
        '2': {x: state[2].x + action.currentx-action.startx, //action.nextLocation[0]-drawDim,
              y: state[2].y + action.currenty-action.starty,//action.nextLocation[1],
              schemNodeNumber: null,
              isConnected: false, //TODO
              // isVisible: true,
              // isHighlighted: false,
            },
        movement: {
          isDragging:true,
          startx: action.currentx,
          starty: action.currenty,
        },
      };

    case 'DRAG_END':
      //console.log('DragMove,action');

      return {
        ...state,
        cx: state.cx + action.currentx-action.startx,
        cy: state.cy + action.currenty-action.starty,
        '1': {x: state[1].x + action.currentx-action.startx, //action.nextLocation[0]-drawDim,
              y: state[1].y + action.currenty-action.starty,//action.nextLocation[1],
              schemNodeNumber: null,
              isConnected: false, //TODO
              // isVisible: true,
              // isHighlighted: false,
            },
        '2': {x: state[2].x + action.currentx-action.startx, //action.nextLocation[0]-drawDim,
              y: state[2].y + action.currenty-action.starty,//action.nextLocation[1],
              schemNodeNumber: null,
              isConnected: false, //TODO
              // isVisible: true,
              // isHighlighted: false,
            },
        movement: {
          isDragging: false,
          startx: null,
          starty: null,
        },
      };

    case 'ROTATE':

      let p1 = getp1(state.cx,state.cy,(state.rot+45)%360);
      let p2 = getp2(state.cx,state.cy,(state.rot+45)%360);
      return {
        ...state,
        rot: (state.rot+45)%360,
        '1': {x: p1.x,
              y: p1.y,
              isConnected: state[1].isConnected,
              isHighlighted: false, //TODO
            },
        '2': {x: p2.x,
              y: p2.y,
              isConnected: state[2].isConnected,
              isHighlighted: false, //TODO
            },
      };


    // case 'DESELECT':
    //   return {
    //     ...state,
    //     isSelected: false,
    //   };

    case 'ADD_COMP':
      // if(action.compType != 'W') {
      return {
        id: action.id,
        compType: action.compType,
        cx: action.nextLocation[0],
        cy: action.nextLocation[1],
        rot: 0,
        '1': {x: action.nextLocation[0]+drawDim,
              y: action.nextLocation[1],
              schemNodeNumber: null,
              isConnected: false,
              // isVisible: true,
              // isHighlighted: false,
            },
        '2': {x: action.nextLocation[0]-drawDim,
              y: action.nextLocation[1],
              schemNodeNumber: null,
              isConnected: false,
            },
        movement: {
          isDragging: false,
          startx: null,
          starty: null,
        },
      };
      // }
      // else {
      //   return {
      //     id: action.id,
      //     compType: 'W',
      //     label: `${action.compType}${action.nextIndex}`,
      //     isSelected: false,
      //     layout: {
      //       cx: 0.5*(action.prevPoint.x + action.nextPoint.x),
      //       cy: 0.5*(action.prevPoint.y + action.nextPoint.y),
      //       rot: null, //TODO
      //       p1: {x: action.prevPoint.x, y: action.prevPoint.y},
      //       p2: {x: action.nextPoint.x, y: action.nextPoint.y},
      //     },
      //     movement: {
      //       isDragging: false,
      //       startx: null,
      //       starty: null,
      //     },
      //   };
      // }

    default:
      return state;

  }
};

export default singleLeadPointGroup;

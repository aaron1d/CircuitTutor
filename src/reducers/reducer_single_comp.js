const snapRes = 10;
import {getp1,getp2} from '../utils';
import {drawDim} from '../constants';

const singleComp = (state,action) => {

  switch(action.type){
    case 'DRAG_START':
      //console.log('DragStart', action);
      return {
        ...state,
        isSelected: true,
        movement: {
          isDragging: true,
          startx: action.startx,
          starty: action.starty,
        },
        // layout: {
        //   cx: state.layout.cx,
        //   cy: state.layout.cy,
        //   rot: state.layout.rot,
        //   p1: state.layout.p1,
        //   p2: state.layout.p2,
        // },
      };

    case 'DRAG_MOVE':
      //console.log('DragMove,action');
      return {
        ...state,
        isSelected: true,
        layout: {
          cx: state.layout.cx + action.currentx-action.startx,
          cy: state.layout.cy + action.currenty-action.starty,
          rot: state.layout.rot,
          // p1: {x: state.layout.p1.x + action.currentx-action.startx, y: state.layout.p1.y + action.currenty-action.starty},
          // p2: {x: state.layout.p2.x + action.currentx-action.startx, y: state.layout.p2.y + action.currenty-action.starty},
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
        isSelected: true,
        layout: {
          cx: state.layout.cx + action.currentx-action.startx,
          cy: state.layout.cy + action.currenty-action.starty,
          rot: state.layout.rot,
          // p1: {x: state.layout.p1.x + action.currentx-action.startx, y: state.layout.p1.y + action.currenty-action.starty},
          // p2: {x: state.layout.p2.x + action.currentx-action.startx, y: state.layout.p2.y + action.currenty-action.starty},
        },
        movement: {
          isDragging:false,
          startx: null,
          starty: null,
        },
      };

      case 'ROTATE':
        //if(action.compType != 'W') {
          return {
            ...state,
            layout: {
              cx: state.layout.cx,
              cy: state.layout.cy,
              rot: (state.layout.rot+45)%360,
              // p1: getp1(state.layout.cx,state.layout.cy, (state.layout.rot+45)%360),
              // p2: getp2(state.layout.cx,state.layout.cy, (state.layout.rot+45)%360),
            },
          };
        //}
      //else { return state; }

    case 'DESELECT':
      return {
        ...state,
        isSelected: false,
      };

    case 'ADD_COMP':
      //if(action.compType != 'W') {
        return {
          id: action.id,
          compType: action.compType,
          label: `${action.compType}${action.nextIndex}`,
          isSelected: true,
          values: {
            value: '',
            multiplier: 1, gain: null,
            voltage: null, current: null, power: null, },
          layout: {
            cx: action.nextLocation[0],
            cy: action.nextLocation[1],
            rot: 0,
            // p1: {x: action.nextLocation[0]-drawDim, y: action.nextLocation[1]},
            // p2: {x: action.nextLocation[0]+drawDim, y: action.nextLocation[1]},
          },
          movement: {
            isDragging: false,
            startx: null,
            starty: null,
          },
        };
      //}
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

    case 'UPDATE_COMP_VALUE':
      return {
        ...state,
        values: { ...action.values }
      };

    default:
      return state;

  }
};

export default singleComp;

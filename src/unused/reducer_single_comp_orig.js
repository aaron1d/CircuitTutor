const snapRes = 10;

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
      };

    case 'DRAG_MOVE':
      //console.log('DragMove,action');
      return {
        ...state,
        isSelected: true,
        layout: {
          // cx: state.layout.cx + snapRes*Math.round((action.currentx-action.startx)/snapRes),
          // cy: state.layout.cy + snapRes*Math.round((action.currenty-action.starty)/snapRes),
          cx: state.layout.cx + action.currentx-action.startx,
          cy: state.layout.cy + action.currenty-action.starty,
          rot: state.layout.rot,
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
          },
          movement: {
            isDragging:false,
            startx: null,
            starty: null,
          },
        };

      case 'ROTATE':
        return {
          ...state,
          layout: {
            cx: state.layout.cx,
            cy: state.layout.cy,
            rot: state.layout.rot+45,
          },
        };

      case 'DESELECT':
        return {
          ...state,
          isSelected: false,
        };

    default:
      return state;

  }
};

export default singleComp;

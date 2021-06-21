//import singleComp from './reducer_single_comp';
// import singleWire from './reducer_single_wire';

const schematicNodes = (state={}, action) => {
  switch(action.type) {
    case 'DRAG_START':
    case 'DRAG_MOVE':
    case 'DRAG_END':
    case 'ROTATE':
    case 'DESELECT':
    case 'ADD_COMP':
      return {
        ...state,
        [action.id]: singleComp(state[action.id], action)
      };

    default:
      return state;

  }

}

export default schematicNodes;

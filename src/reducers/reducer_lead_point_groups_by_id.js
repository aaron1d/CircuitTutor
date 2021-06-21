import singleLeadPointGroup from './reducer_single_lead_point_group';
// import singleWire from './reducer_single_wire';

const leadPointGroupsById = (state={}, action) => {
  switch(action.type) {
    case 'DRAG_START':
    case 'DRAG_MOVE':
    case 'DRAG_END':
    case 'ROTATE':
    //case 'DESELECT':
    case 'ADD_COMP':
      return {
        ...state,
        [action.id]: singleLeadPointGroup(state[action.id], action)
      };

    default:
      return state;

  }

}

export default leadPointGroupsById;

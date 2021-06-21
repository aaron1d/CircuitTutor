// import {remove} from 'lodash';

const allIds = (state=[], action) => {
  switch(action.type) {
    case 'DRAG_START':
      //return [action.id].concat(state.filter((id) => id != action.id));
      return (state.filter((id) => id != action.id)).concat([action.id])

    case 'ADD_COMP':
      return [...state, action.id];

    default:
      return state;
  }
}

export default allIds;

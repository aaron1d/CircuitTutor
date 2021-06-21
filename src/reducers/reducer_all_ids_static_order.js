// import {remove} from 'lodash';

const allIdsStaticOrder = (state=[], action) => {
  switch(action.type) {


    case 'ADD_COMP':
      return [...state, action.id];

    default:
      return state;
  }
}

export default allIdsStaticOrder;

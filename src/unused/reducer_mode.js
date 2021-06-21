const mode = (state='MODE_DEFAULT', action) => {
  switch(action.type) {
    case 'ADD_WIRE_START':
      return 'MODE_ADDING_WIRE';

    case 'ADD_WIRE_END':
      return 'MODE_DEFAULT';

    default:
      return state;
  }
}

export default mode;

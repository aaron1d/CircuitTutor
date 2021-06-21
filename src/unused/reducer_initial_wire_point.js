const initialWirePoint = (state=null, action) => {
  switch(action.type) {
    case 'ADD_WIRE_POINT_INITIAL':
      return {x: action.x, y:action.y}

    case 'ADD_WIRE_END':
      return null;

    default:
      return state;
  }
}

export default mode;

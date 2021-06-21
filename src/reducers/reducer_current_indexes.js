const initialIndexes = {
  V: 0,
  I: 0,
  R: 0,
  L: 0,
  C: 0,
  E: 0, //VCVS
  F: 0, //ICIS
  G: 0, //VCIS
  H: 0, //ICVS
  S: 0,
  U: 0,
  W: 0,
};



const currentIndexes = (state=initialIndexes, action) => {
  switch(action.type) {
    case 'ADD_COMP':
      return {...state,
        [action.compType]: state[action.compType]+1,
       };

    default:
      return state;
  }
}

export default currentIndexes;

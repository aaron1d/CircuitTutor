// import {remove} from 'lodash';

const defaultSettings= {
  showNodeLabels: false,
};

const settings = (state=defaultSettings, action) => {
  switch(action.type) {
    case 'TOGGLE_NODE_LABEL_VISIBILITY':
      return {
        ...state,
        showNodeLabels: !(state.showNodeLabels),
      };

    default:
      return state;
  }
}

export default settings;

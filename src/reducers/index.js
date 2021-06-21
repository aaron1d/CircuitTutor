import { combineReducers } from 'redux';
import compsById from './reducer_comps_by_id';
import allIds from './reducer_all_ids';
import currentIndexes from './reducer_current_indexes';
import leadPointGroupsById from './reducer_lead_point_groups_by_id';
import allIdsStaticOrder from './reducer_all_ids_static_order';
import settings from './reducer_settings';
//import mode from './reducer_mode';
//import wiresById from './reducer_wires_by_id';



const circuitApp = combineReducers({
  compsById: compsById,
  allIds: allIds,
  currentIndexes: currentIndexes,
  leadPointGroupsById: leadPointGroupsById,
  allIdsStaticOrder: allIdsStaticOrder,
  settings: settings,
  //mode: mode,
  //wiresById: wiresById,
  // width: 600,
  // height: 300,

});

export default circuitApp;

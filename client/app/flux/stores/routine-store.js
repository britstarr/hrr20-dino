/**
 *      routine store
 */

import AppDispatcher from '../dispatcher/app-dispatcher';
import RoutineConstants from '../constants/routine-constants';
import Store from './store';

class RoutineStore extends Store {
  constructor() {
    super({
      storeName: 'routines'
    });
    this.data.currentRoutine = null;
  }
}

let that = new RoutineStore();

that.dispatchToken = AppDispatcher.register(action => {
  switch (action.actionType) {
    case RoutineConstants.ADD_ROUTINE:
      that._add(action.data);
      break;

    case RoutineConstants.UPDATE_ROUTINE:
      that._update(action.id, action.newData);
      break;

    case RoutineConstants.REMOVE_ROUTINE:
      that._remove(action.id);
      break;

    default:
    // no op
  }

});

export default that;

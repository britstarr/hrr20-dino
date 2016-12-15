import AppDispatcher from '../dispatcher/app-dispatcher';
import RoutineConstants from '../constants/routine-constants';

export default {
  add(data) {
    console.log('add invoked in routine-actions, data = ' + JSON.stringify(data));
    
    AppDispatcher.dispatch({
      actionType: RoutineConstants.ADD_ROUTINE,
      data: data
    });
  },

  remove(id) {
    AppDispatcher.dispatch({
      actionType: RoutineConstants.REMOVE_ROUTINE,
      id: id
    });
  },

  update(data) {
    AppDispatcher.dispatch({
      actionType: RoutineConstants.UPDATE_ROUTINE,
      id: data.id,
      newData: data.newData
    });
  }
};

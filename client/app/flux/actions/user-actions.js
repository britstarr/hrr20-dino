import AppDispatcher from '../dispatcher/app-dispatcher';
import UserConstants from '../constants/user-constants';

export default {
  add(data) {
        console.log('Add invoked in User-actions, data = ' + JSON.stringify(data));

    AppDispatcher.dispatch({
      actionType: UserConstants.ADD_USER,
      data: data
    });
  },

  remove(id) {
    AppDispatcher.dispatch({
      actionType: UserConstants.REMOVE_USER,
      id: id
    });
  },

  update(data) {
    AppDispatcher.dispatch({
      actionType: UserConstants.UPDATE_USER,
      id: data.id,
      newData: data.newData
    });
  },

  setCurrentUser(data) {
    AppDispatcher.dispatch({
      actionType: UserConstants.SET_CURRENT_USER,
      user: data
    });
  }
};

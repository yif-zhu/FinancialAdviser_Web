// 用户信息模块
import { UserApi } from "../../api/UserApi";
import cookie from '../../utils/cookie.js';
import keys from "../../utils/keys";

export default {
  state: {
    displayName: '',
    userName: '',
    userId: '',
    loggedTime: 0,
    isRoot: false,
    lastActiveDate: '',
  },
  mutations: {
    setUserName(state, userName) {
      state.userName = userName;
    },
    setUserDisplayName(state, displayName) {
      state.userDisplayName = displayName;
    },
    setUserId(state, userId) {
      state.userId = userId;
    },
    setLastActiveDate(state, lastActiveDate) {
      state.lastActiveDate = lastActiveDate;
    },
    setIsRoot(state, isRoot) {
      state.isRoot = isRoot || false;
    }
  },
  actions: {
    handleUserLogin({ commit }, data) {
      return new Promise((resolve, reject) => {
        UserApi.postUserLogin(data).then(res => {
          console.log(res)
          if(typeof res === 'boolean' && !res) {
            resolve(false);
          }else if (res.UserName) {
            commit('setLoginStatus', true, { root: true });
            commit('setUserId', res.UserID);
            commit('setUserName', res.UserName);
            commit('setUserDisplayName', res.DisplayName);
            commit('setIsRoot', res.IsRoot);
            resolve(res);
          } else {
            reject();
          }
        });
      });
    },
    handleUserLogout() {
      return new Promise((resolve) => {
        UserApi.postUserLogout().then(res => {
          resolve(res);
        });
      });
    },
    getUserInfo({ commit }) {
      let data = cookie.get(keys.userInfo);
      if (data) {
        data = JSON.parse(data);
        console.log(data)
        commit('setLoginStatus', true, { root: true });
        commit('setUserId', data.UserID);
        commit('setUserName', data.UserName);
        commit('setIsRoot', data.IsRoot);
        commit('setLastActiveDate', data.LastActiveDate);
        commit('setUserDisplayName', data.DisplayName);
      }
    }
  }
};

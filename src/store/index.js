import {createStore} from 'vuex';
const store = createStore({
 
  state: {
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
  },
 
  mutations: {
    // 修改token，并将token存入localStorage
    CHANGELOGIN (state, token) {
      state.Authorization = token;
      localStorage.setItem('Authorization', token);
    }
  }
});
 
export default store;
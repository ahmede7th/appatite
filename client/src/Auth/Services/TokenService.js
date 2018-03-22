export default {
  save(token) {
    window.localStorage.setItem('authToken', token);
  },

  saveUserId(id) {
    console.log('TOKEN--->', id);
    window.localStorage.setItem('id', id);
  },

  saveUsername(username) {
    console.log('TOKEN--->', username);
    window.localStorage.setItem('username', username);
  },

  read() {
    return window.localStorage.getItem('authToken') || ' ';
  },

  destroy() {
    window.localStorage.removeItem('authToken');
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('id');
  },
};

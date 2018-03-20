export default {
  save(token) {
    window.localStorage.setItem('authToken', token);
  },

  saveUser(id) {
    console.log('TOKEN--->', id);
    window.localStorage.setItem('id', id);
  },

  read() {
    return window.localStorage.getItem('authToken') || ' ';
  },

  destroy() {
    window.localStorage.removeItem('authToken');
  },
};

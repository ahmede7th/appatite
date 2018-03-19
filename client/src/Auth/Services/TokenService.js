export default {
  save(token) {
    window.localStorage.setItem('authToken', token);
  },

  read() {
    return window.localStorage.getItem('authToken') || ' ';
  },

  destroy() {
    window.localStorage.removeItem('authToken');
  },
};

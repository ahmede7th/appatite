const options = {
  query: (e) => {
    console.log(e.query);
  },
};

const pgp = require(`pg-promise`)(options);
const dbConfig = require(`../config/dbConfig`);

module.exports = pgp(dbConfig);

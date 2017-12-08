const pool = require('./postgres.js');

const controller = {
  getUser: async function(id, cb) {
    pool.connect(async (error, client, done) => {
      const result = await client.query(`SELECT (u.userid, u.name, u.avatar, u.stocks) FROM users u WHERE u.userid = ('${id}');`);
      done();
      if (result.rows.length !== 0) {
        const arr = result.rows[0].row.split(',');
        arr[0] = arr[0].split('').filter((c, i) => i !== 0).join('');
        arr[2] = arr[2].split('').filter((c, i, a) => i !== a.length - 1).join('');
        const user = {};
        user.id = arr[0];
        user.name = arr[1];
        user.avatar = arr[2];
        user.stocks = arr[3];
        cb(user);
      } else {
        cb(void 0);
      }
    });
  },
  postUser: async function(id, name, avatar, cb) {
    pool.connect(async (error, client, done) => {
      await client.query(`INSERT INTO users (userid, name, avatar) VALUES ('${id}', '${name}', '${avatar}');`);
      const result = await client.query(`SELECT (u.userid, u.name, u.avatar, u.stocks) FROM users u WHERE u.userid = ('${id}');`);
      done();
      if (result.rows.length !== 0) {
        const arr = result.rows[0].row.split(',');
        arr[0] = arr[0].split('').filter((c, i) => i !== 0).join('');
        arr[2] = arr[2].split('').filter((c, i, a) => i !== a.length - 1).join('');
        const user = {};
        user.id = arr[0];
        user.name = arr[1];
        user.avatar = arr[2];
        cb(user);
      } else {
        cb(void 0);
      }
    });
  },
  postUserStocks: async function(req, res, next) {
    pool.connect(async (error, client, done) => {
      const newStock = req.params.stock;
      const userId = req.params.userid;
      const result = await client.query(`SELECT stocks FROM users WHERE userid = ('${userId}');`);
      await client.query(`UPDATE users SET stocks = stocks || '{${newStock}}' WHERE userid = ('${userId}');`)
      done();
      next();
    });
  }
}

module.exports = controller;

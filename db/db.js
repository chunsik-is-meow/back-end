const db = require("../app/models");
const role = db.role;

const initial = async () => {
    role.create({
      id: 1,
      name: "user"
    });

    role.create({
      id: 2,
      name: "verifier"
    });

    role.create({
      id: 3,
      name: "admin"
    });
}

exports.init = async () => {
    await db.sequelize.sync({force: true});
    console.log('Drop and Resync Db');
    await initial();
}
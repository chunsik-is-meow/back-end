const { authJwt } = require("../middleware");
const controller = require("../controllers/file.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/download/:type/:filename",
    [authJwt.verifyToken],
    controller.download
  );

  app.post(
    "/api/upload/:type",
    [authJwt.verifyToken],
    controller.upload
  );
};
import express from "express";

import userCtrl from "../controllers/user.controller.js";

var router = express.Router();

router
  .route('/api/user/createUser')
  .post(userCtrl.createUser);

router
  .route('/api/user/readUser/:id')
  .get(userCtrl.readUser);

router
  .route('/api/user/updateUser')
  .post(userCtrl.updateUser);

router
  .route('/api/user/deleteUser')
  .post(userCtrl.deleteUser);

router
  .route('/api/user/getAllUser')
  .get(userCtrl.getAllUser);

export default router;
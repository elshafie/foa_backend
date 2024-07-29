
import { Router } from 'express';
import userController from '../controllers/userController';
import { jwtCheck, jwtParse } from '../middleware/auth';
import {  validateMyUserRequest } from '../middleware/validation';

const router = Router()


//  /api/user

router.get("/", jwtCheck, jwtParse, userController.getCurrentUser)


router.post('/', jwtCheck ,userController.createCurrentUser)


router.put(
  "/",
  jwtCheck,
  jwtParse,
  validateMyUserRequest,
  userController.updateUser
);

export default router
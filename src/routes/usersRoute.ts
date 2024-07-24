
import { Router } from 'express';
import userController from '../controllers/userController';
import { jwtCheck, jwtParse } from '../middleware/auth';
import {  validateUserRequest } from '../middleware/validation';

const router = Router()


//  /api/user

router.get("/", jwtCheck, jwtParse, userController.getCurrentUser)


router.post('/', jwtCheck ,userController.createCurrentUser)


router.put(
  "/",
  jwtCheck,
  jwtParse,
  validateUserRequest,
  userController.updateUser
);

export default router
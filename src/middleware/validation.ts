import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const handleValidationErrors = async (req: Request, res:Response, next: NextFunction) =>{
  const errors = validationResult(req);

  if(!errors.isEmpty()){return res.status(400).json({errors: errors.array()})}

  next()
}

export const validateUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a String"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("Address must be a String"),
  body("city").isString().notEmpty().withMessage("City must be a String"),
  body("country").isString().notEmpty().withMessage("Country must be a String"),
  handleValidationErrors,
];

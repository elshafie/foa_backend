import { Request, Response } from "express";
import User from "../models/user";

const createCurrentUser = async(req: Request, res: Response) => {
  // - check if user exist
  // - create the user if it doesn't exist
  // - returb the user object to the calling client


  try {
    const {auth0Id} = req.body
    const existingUser = await User.findOne({auth0Id})

    if (existingUser) {
      return res.status(200).send()
    }

    const newUser = new User(req.body)

    await newUser.save()

    res.status(201).json(newUser.toObject())
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message:"Error when creating user!!!!"
    })
  }
}


const updateUser = async(req: Request, res: Response) => {

  try {
    const {name, addressLine1, country, city} = req.body

    const user = await User.findById(req.userId)

    if (!user){
      return res.status(404).json({message: "User not found"})
    }

    user.name = name
    user.addressLine1= addressLine1
    user.country = country
    user.city = city

    await user.save()

    res.send(user)

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Error when Updating user!!!!",
    });
  }
}


const getCurrentUser = async(req: Request, res:Response) => {
  try {
    const currentUser = await User.findOne({_id: req.userId})

    if(!currentUser) {
      return res.status(404).json({message: "User not found"})
    }

    res.json(currentUser)

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Something went wrong",
    });
  }
}


export default {
  createCurrentUser,
  updateUser,
  getCurrentUser,
};
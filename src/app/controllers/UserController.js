
import { v4 } from "uuid";
import * as Yup from 'yup';

import User from "../models/User";
import { error } from "es5-ext";

//import { password } from "./config/database";
 
class UserController{
    async store(request,response){
        const schema = Yup.object({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
            admin: Yup.boolean(),
        });

      try{
        schema.validateSync(request.body, {abortEarly: false});
      }catch(err){
        return response.status(400)
        .json({error:err.errors});
      }


   
      // biome-ignore lint/correctness/noUnusedVariables: <explanation>
      const {name,email,password, admin} =  request.body

      const userExists = await User.findOne({
        whare:{
            email,
        }
      })

      if(userExists){
        return response.status(400)
        .json({error: 'User already exists'});
      }
 console.log(userExists);
 

        const user =  await User.create({
            id: v4(),
            name,
            email,
            password,
            admin,
        });
        return response.status(201).json({
            id: user.id,
            name,
            email,
            admin,
        })
    }
}

export default new UserController();

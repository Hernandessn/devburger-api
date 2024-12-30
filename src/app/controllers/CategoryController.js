import * as Yup from 'yup'
import Category from '../models/Category';
import User from '../models/User';
import { request } from 'express';
import { error } from 'es5-ext';

class CategoryController{
    async store(request,response){
        const schema = Yup.object({
            name: Yup.string().required(),
        });


        try{
          schema.validateSync(request.body, {abortEarly: false});
        }catch(err){
          return response.status(400)
          .json({error:err.errors});
        }

       //Validar se o usuario é um ADM
          const user = await User.findByPk(request.userId);
  
          if (!user) {
              return response.status(404).json({ error: 'User not found' });
          }
  
          const { admin: isAdmin } = user;
  
          if (!isAdmin) {
              return response.status(401).json({ error: 'User is not authorized' });
          }
//------

        const {filename: path} = request.file;
        const {name} = request.body;

        const categoryExists = await Category.findOne({
          where:{
            name,
          }
        });

        if(categoryExists){
          return response.status(400)
          .json({error:"Category already exists"});
        }

        const { id} = Category.create({
          name,
          path
        });



        return response.status(201).json({id, name});
        }

        async update(request,response){
          const schema = Yup.object({
              name: Yup.string(),
          });
  
  
          try{
            schema.validateSync(request.body, {abortEarly: false});
          }catch(err){
            return response.status(400)
            .json({error:err.errors});
          }
  //Validar se o usuario é um ADM
          const user = await User.findByPk(request.userId);
  
          if (!user) {
              return response.status(404).json({ error: 'User not found' });
          }
  
          const { admin: isAdmin } = user;
  
          if (!isAdmin) {
              return response.status(401).json({ error: 'User is not authorized' });
          }
//------
          const {id} = request.params;

          const categoryExists = await Category.findByPk(id);

          if(!categoryExists){
            return response
            .status(400)
            .json({message:'Make sure your category ID is correct'});
          }
  

          let path;
          if (request.file) {
            path = request.file.filename;
          }

          const {name} = request.body;


         if(name){
          const categoryNameExists = await Category.findOne({
            where:{
              name,
            }
          });
  
          if(categoryNameExists && categoryNameExists.id !== +id ){
            return response
            .status(400)
            .json({error:"Category already exists"});
          }

         }
          await Category.update({
            name,
            path,
          },
          {
            where:{
              id,
            }
          });
        

          return response.status(200).json();
          }

        async index(request,response){
          const categories = await Category.findAll();

          console.log({userId: request.userId});
          

          return response.json(categories);
        }
      }

      
       
        

     

export default new CategoryController()
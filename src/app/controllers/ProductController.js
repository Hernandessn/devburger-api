import * as Yup from 'yup';
import Product from '../models/Products';
import Category from '../models/Category';
import User from '../models/User';

class ProductController {
  // Método para criar um novo produto
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category_id: Yup.number().required(),
      offer: Yup.boolean(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false }); // Assíncrona
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const user = await User.findByPk(request.userId);

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    const { admin: isAdmin } = user;

    if (!isAdmin) {
      return response.status(401).json({ error: 'User is not authorized' });
    }

    const { filename: path } = request.file;
    const { name, price, category_id, offer } = request.body;

    try {
      const product = await Product.create({
        name,
        price,
        category_id,
        path,
        offer,
      });

      return response.status(201).json(product); // Retorna o produto criado
    } catch (err) {
      return response.status(500).json({ error: 'Error creating product' });
    }
  }

  // Método para atualizar um produto
  async update(request, response) {
    const schema = Yup.object({
      name: Yup.string(),
      price: Yup.number(),
      category_id: Yup.number(),
      offer: Yup.boolean(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false }); // Assíncrona
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const user = await User.findByPk(request.userId);

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    const { admin: isAdmin } = user;

    if (!isAdmin) {
      return response.status(401).json({ error: 'User is not authorized' });
    }

    const { id } = request.params;
    const findProduct = await Product.findByPk(id);

    if (!findProduct) {
      return response.status(400).json({ error: 'Product ID is incorrect' });
    }

    let path;
    if (request.file) {
      path = request.file.filename;
    }

    const { name, price, category_id, offer } = request.body;

    try {
      await Product.update(
        {
          name,
          price,
          category_id,
          path,
          offer,
        },
        {
          where: { id },
        }
      );

      return response.status(200).json({ message: 'Product updated successfully' });
    } catch (err) {
      return response.status(500).json({ error: 'Error updating product' });
    }
  }

  // Método para listar produtos
  async index(request, response) {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
    });

    return response.json(products);
  }
}

export default new ProductController();

import * as Yup from 'yup';
import User from '../models/User';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

class SessionController {
  async store(request, response) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    const isValid = await schema.isValid(request.body);

    const emailDrPasswordIncorrect = () => {
       response.status(401).json({
        error: "Make sure your password or email are correct",
      });
    };

    // Validação do schema
    if (!isValid) {
      return emailDrPasswordIncorrect();
    }

    const { email, password } = request.body;

    // Busca de usuário
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return emailDrPasswordIncorrect();
    }

    // Comparação de senha
    const isSamePassword = await user.checkPassword(password);

    if (!isSamePassword) {
      return emailDrPasswordIncorrect();
    }

    console.log(isSamePassword);

    // Resposta de sucesso
    return response.status(201).json({
      id: user.id,
      name: user.name,
      email,
      admin: user.admin,
      token: jwt.sign({ id: user.id, name: user.name}, authConfig.secret,{
        expiresIn: authConfig.expiresIn,
      })
    });
  }
}

export default new SessionController();

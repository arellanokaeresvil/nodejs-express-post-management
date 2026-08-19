
import UserRepository from '../repositories/userRepository';
import UserService from '../services/userServices';
import UserController from '../controllers/userController';

const userRepository = new UserRepository();

const userService =new UserService(userRepository);

const userController =new UserController(userService);

export default userController;
import AuthService from "../services/authServices";
import AuthController from "../controllers/authController";
import UserRepository from "../repositories/userRepository";

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

export default authController;

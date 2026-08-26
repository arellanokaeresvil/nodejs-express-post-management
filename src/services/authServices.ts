import userRepository from "../repositories/userRepository";
import generateToken from "../utils/generateToken";
import bcrypt from "bcryptjs";
import AppError from "../utils/appError";

class AuthService {

    private userRepository: userRepository;

    constructor(userRepository:  userRepository) {
        this.userRepository = userRepository;
    }

    login = async (email: string, password: string) => {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new AppError("No user found", 404);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new AppError("Invalid password");
        }

        const token = generateToken(user.id);
        return { user, token };
    }

    logout = async (data: any) =>{

        return{
            message: "Login successful"
        }

    }
}

export default AuthService;

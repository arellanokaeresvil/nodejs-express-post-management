import userRepository from "../repositories/userRepository";
import generateToken from "../utils/generateToken";
import bcrypt from "bcryptjs";

class AuthService {

    private userRepository: userRepository;

    constructor(userRepository:  userRepository) {
        this.userRepository = userRepository;
    }

    login = async (email: string, password: string) => {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("No user found");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

        const token = generateToken(user.id);
        return { message: "Login successful", data: user, token };
    }
}

export default AuthService;

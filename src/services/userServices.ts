import UserRepository from "../repositories/userRepository";
import bcrypt from 'bcryptjs'
import AppError from "../utils/appError";

class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async list(req: object) {
        return this.userRepository.usersList(req);
    }

    async findAll() {
        return this.userRepository.findAll();
    }

    async findById(id: number) {
        return this.userRepository.findById(id);
    }

    async create(data: any) {
        const find = await this.userRepository.findByEmail(data.email)
        if(find) throw new AppError('Validation failed', 422, ['Email is already taken']) // validate if email is taken

        data.password = await bcrypt.hash(data.password, 10); // to hassh password
        return this.userRepository.create(data);
    }

    async update(id: number, data: any) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        return this.userRepository.update(id, data);
    }

    async delete(id: number) {
        return this.userRepository.delete(id);
    }

    async restore(id: number) {
        return this.userRepository.restore(id);
    }

}

export default UserService;
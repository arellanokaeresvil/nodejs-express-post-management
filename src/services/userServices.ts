import UserRepository from "../repositories/userRepository";

class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async findAll() {
        return this.userRepository.findAll();
    }

    async findById(id: string) {
        return this.userRepository.findById(id);
    }

    async create(data: any) {
        return this.userRepository.create(data);
    }

    async update(id: string, data: any) {
        return this.userRepository.update(id, data);
    }

    async delete(id: string) {
        return this.userRepository.delete(id);
    }
}

export default UserService;
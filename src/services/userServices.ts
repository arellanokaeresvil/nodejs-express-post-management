import UserRepository from "../repositories/userRepository";

class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async findAll() {
        return this.userRepository.findAll();
    }

    async findById(id: number) {
        return this.userRepository.findById(id);
    }

    async create(data: any) {
        return this.userRepository.create(data);
    }

    async update(id: number, data: any) {
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
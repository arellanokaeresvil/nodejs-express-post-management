import  BaseRepository  from './baseRepository';
import  AppDataSource  from '../config/database';
import { User } from '../entities/User';

class userRepository extends BaseRepository {
    constructor() {
        super(AppDataSource.getRepository(User));
    }

    async findByEmail(email: string) {
        return AppDataSource.getRepository(User).findOne({ where: { email } });
    }


}

export default userRepository;

import  BaseRepository  from './baseRepository';
import  AppDataSource  from '../config/database';
import { User } from '../entities/User';

class userRepository extends BaseRepository {
    constructor() {
        super(AppDataSource.getRepository(User));
    }
}

export default userRepository;

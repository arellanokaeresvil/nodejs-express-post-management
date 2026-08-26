import  BaseRepository  from './baseRepository';
import  AppDataSource  from '../config/database';
import { User } from '../entities/User';
import PaginationRepository from './paginationRepository';


interface UserQueryOptions{
        search?: string,
        page?: number,
        limit?: number,
        sortBy?: string,
        orderBy?: "ASC" | "DESC"

}
class userRepository extends BaseRepository {

    private pagination = new PaginationRepository<User>(this.model)

    constructor() {
        super(AppDataSource.getRepository(User));

    }

 

    async findByEmail(email: string) {
        return AppDataSource.getRepository(User)
        .createQueryBuilder("user")
        .addSelect("user.password")
        .where("user.email = :email", { email })
        .getOne();
    }


    async usersList(options: UserQueryOptions ){ /// to control query for data list and pagination with conditional, search and filter query

        const query = this.model.createQueryBuilder('user')

        if(options.search){
            query.andWhere(
                `(
                    user.first_name LIKE:search
                )`,
                {
                    search: `%${options.search}%`
                }
            )
        }

        return this.pagination.paginate(
            query,
            options.page ?? 1,
            options.limit ?? 10,
            options.sortBy ?? 'updated_at',
            options.orderBy?? 'DESC'
        )
    }


}

export default userRepository;

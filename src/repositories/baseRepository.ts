import AppError from "../utils/appError";
import Pagination from "../utils/pagination";

class BaseRepository {

    protected model: any;

    constructor(model:any) {
        this.model = model;
    }

    async list(req: {search?: string, page?: number, limit?: number}){

        const query = await this.model.createQueryBuilder('user')

        const page = req.page ?? 1
        const limit = req.limit ?? 10

        const skip = ( page - 1) * limit 
        const [data, total] = await query
        .skip(skip)
        .take(limit)
        .getManyAndCount();


        return {
            list:data,
            pagination: Pagination(page,limit,total)
        }

    }

    async findAll() {
        return this.model.find();
    }

    async findById(id:number) {
        return this.model.findOneByOrFail({
            id
        });
    }

    async create(data:object) {
        try {
            return await this.model.save(data);
        } catch (error) {
            throw new AppError(`Error creating item`, 500 ,error);
        }
    }

    async update(id:number, data:object) {
        try {
            const find = await this.findById(id);
            if(!find) throw new AppError("Resource not found",404);
            return await this.model.update(id, data);
        } catch (error) {
            throw new AppError(`Error updating item`,500, error);
        }
    }

    async delete(id:number) {
        try{
            const find = await this.findById(id);
            if(!find) throw new AppError("Resource not found",404);
            return this.model.softDelete(id);
        }catch (error) {
            throw new AppError(`Error deleting item`,500, error);
        }
        
    }

    async restore(id:number) {
        try {
            const find = await this.findDeletedById(id);
            if(!find) throw new AppError("Resource not found",404);
            return this.model.restore(id);
        } catch (error) {
            throw new AppError(`Error restoring item`, 500, error);
        }
    }

    async findDeletedById(id:number) {
        try {
            return await this.model.findOne({
                where: {
                    id
                },
                withDeleted: true
            });
        } catch (error) {
            throw new AppError(`Error finding deleted item`,500 , error);
        }
    }

}

export default BaseRepository;

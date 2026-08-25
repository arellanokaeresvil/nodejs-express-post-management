
class BaseRepository {

    protected model: any;

    constructor(model:any) {
        this.model = model;
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
            throw new Error(`Error creating item ${error}`);
        }
    }

    async update(id:number, data:object) {
        try {
            const find = await this.findById(id);
            if(!find) throw new Error("Item not found");
            return await this.model.update(id, data);
        } catch (error) {
            throw new Error(`Error updating item ${error}`);
        }
    }

    async delete(id:number) {
        try{
            const find = await this.findById(id);
            if(!find) throw new Error("Item not found");
            return this.model.softDelete(id);
        }catch (error) {
            throw new Error(`Error deleting item ${error}`);
        }
        
    }

    async restore(id:number) {
        try {
            const find = await this.findDeletedById(id);
            if(!find) throw new Error("Item not found");
            return this.model.restore(id);
        } catch (error) {
            throw new Error(`Error restoring item ${error}`);
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
            throw new Error(`Error finding deleted item ${error}`);
        }
    }

}

export default BaseRepository;

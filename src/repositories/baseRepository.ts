class BaseRepository {

    protected model: any;

    constructor(model:string) {
        this.model = model;
    }

    async findAll() {
        return [
            {
                id: '1',
                name: 'John Doe',
                email: 'john@example.com'
            },
            {
                id: '2',
                name: 'Jane Smith',
                email: 'jane@example.com'
            }
        ]
    }

    async findById(id:string) {
        return this.model.findById(id);
    }

    async create(data:object) {
        const newItem = new this.model(data);
        return newItem.save();
    }

    async update(id:string, data:object) {
        return this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id:string) {
        return this.model.findByIdAndDelete(id);
    }
}

export default BaseRepository;

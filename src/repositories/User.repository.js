import GenericRepository from "./GenericRepository.js"

export default class UserRepository extends GenericRepository {
    constructor( dao ) {
        super( dao )
    }

    async save( userData ) {
        return await this.dao.save(userData)
    }
} 
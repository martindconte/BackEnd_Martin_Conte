export  default class GenericRepository {
    
    constructor(dao) {
        this.dao = dao
    }

    async get( params ){
        return await this.dao.get( params )
    }
    
    async getById( id ){
        return await this.dao.getById( id )
    }

    async create( doc ){
        return await this.dao.create( doc )
    }
    
    async updateById( id, update, options ){
        return await this.dao.updateById( id, update, options )
    }
    
    async deleteById( id ){
        return await this.dao.deleteById( id )
    }

    async paginate( filter, options ){
        return await this.dao.paginate( filter, options )
    }
}
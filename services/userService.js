const {userRepository} = require("../repositories/userRepository");

class UserService{
    async getAll(){
        return await userRepository.getAll()
    }

    async create(user){
        return await userRepository.create(user)
    }

    async getById(id){
        return await userRepository.getById(id)
    }

    async update(id, query) {
        return await userRepository.update(id,query)
    }

    async deleteAll(){
        return await userRepository.deleteAll()
    }

    async deleteById(id){
        return await userRepository.deleteById(id)
    }
}

const userService = new UserService()

module.exports={
    userService
}
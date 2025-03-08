const {read, write, destroy} = require("../services/fsService");

class UserRepository {
    async getAll() {
        return read()
    }

    async create(user) {
        const users = await read()
        const newUser = {
            id: users.length ? users[users.length - 1].id + 1 : 1,
            name: user.name,
            surname: user.surname,
            age: user.age,
        }
        users.push(newUser)
        await write(users)
        return newUser
    }

    async getById(id){
        const users = await read()
        const userIndex = users.findIndex(user => user.id === Number(id))
        return users[userIndex]
    }

    async update(id,query){
        const users = await read()
        const userIndex = users.findIndex(user => user.id === Number(id))
        users[userIndex] = {
            ...users[userIndex],
            ...query
        }
        await write(users)
        return users[userIndex]
    }

    async deleteAll(){
       return await destroy()
    }

    async deleteById(id){
        const users = await read()
        const userIndex = users.findIndex(user=> user.id === Number(id))
        users.splice(userIndex,1)
        await write(users)
        return users
    }
}

const userRepository = new UserRepository()

module.exports = {
    userRepository
}
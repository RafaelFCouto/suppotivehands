const HttpStatusCode = require('http-status-codes');
const UserService = require('../services/user-service');

class UserController {

    handleGetUser = async (request, response) => {
        try{
            console.info(`Handling Get User`);
            const {id, email} = request.body;
            let user;

            if(!id && !email){
                return response.status(HttpStatusCode.BAD_REQUEST).json({error: 'Missing required fields'});
            }

            if(id){
                user = await UserService.getUserById(id);
            }
            else{
                user = await UserService.getUserByEmail(email);
            }

            if(!user){
                return response.status(HttpStatusCode.BAD_REQUEST).json({error: 'User not exist'});
            }

            return response.status(HttpStatusCode.OK).json(user);
        }
        catch(error){
            console.error(`Error get user: Error: ${error.message}`);
            return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({error: error.message});
        }
    }

    handleGetAllUser = async(request, response) => {
        try{
            console.info(`Handling Get All Users`);

            const users = await UserService.getAllUsers();

            if(!users.length){
                return response.status(HttpStatusCode.BAD_REQUEST).json({error:'No registered users'});
            }

            return response.status(HttpStatusCode.OK).json(users);
        }
        catch(error){
            console.error(`Error get All users: Error: ${error.message}`);
            return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({error: error.message});
        }
    }

    handlePostUser = async (request, response) => {
        try{
            console.info(`Handling Post User`);
            const {name, email, password} =  request.body;

            if (!name || !email || !password) {
                return response.status(HttpStatusCode.BAD_REQUEST).json({error: 'Missing required fields'});
            }

            const result = await UserService.createUser(
                name,
                email,
                password
            );

            response.status(HttpStatusCode.OK).json(result);
        }
        catch(error){
            console.info(`Error handling create user: Error: ${error.message}`);
            return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({error: error.message});
        }
    }

    handleUpdateUser = async (request, response) => {
        try{
            console.info(`Handling Update User`);

            const { id, userData } = request.body;

            if(!id){
                return response.status(HttpStatusCode.BAD_REQUEST).json({error: 'Missing required fields'});
            }

            const userUpdated = await UserService.updateUser(id, userData);

            return response.status(HttpStatusCode.OK).json(userUpdated);

        }
        catch(error){
            console.info(`Error handling update user: Error: ${error.message}`);
            return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({error: error.message});
        }
    }

    handleDeleteUser = async (request, response) => {
        try{
            console.info(`Handling Delete User`);

            const { id } = request.body;

            if(!id){
                return response.status(HttpStatusCode.BAD_REQUEST).json({error: 'Missing required fields'});
            }

            const deleteUser = await UserService.deleteUser(id);

            return response.status(HttpStatusCode.OK).json(deleteUser);
        }
        catch(error){
            console.info(`Error handling delete user: Error: ${error.message}`);
            return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({error: error.message});
        }
    }
}

module.exports = new UserController();
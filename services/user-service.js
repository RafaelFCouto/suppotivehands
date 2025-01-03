const bcryptjs = require('bcryptjs');
const  User = require('../models/user');

class UserService{
    constructor(){}

    createUser = async (name, email, password, password_hash = null) => {
        try{
            console.info(`Creating user: ${name}, ${email}`);

            const existUser = await this.getUserByEmail(email);

            if(existUser){
                throw new Error(`Email ${email} is already registered`);
            }

            const user = await User.create({
                name,
                email,
                password,
                password_hash,
            });
            console.info(`User successfully created: ${name}, ${email}`);
            return user;
        }
        catch(error){
            console.error(`Error creating user: ${error.message}`);
            throw new Error(error.message);
        }
    }

    updateUser = async (id, userData) => {
        try{
            console.info(`updating user data: ${userData.name}, ${userData.email}`);
            const existUser = await this.getUserById(id);
            if(!existUser){
                throw new Error(`User wiht id: ${id} not exist`);
            }

            if(userData.password){
                userData.password_hash = await this.#updatePassword(
                    id,
                    userData.password.currentPassword,
                    userData.password.newPassword
                );
            }
            await User.update(userData,{
                where: {id},
            });

            const user = await this.getUserById(id);

            console.info(`Successfully Updated user data: ${user.name}, ${user.email}`);
            return user;
        }
        catch(error){
            console.error(`Error updated user: ${error.message}`);
            throw new Error(error.message);
        }
    }

    getUserById = async (id) => {
        try{
            console.info(`Get user by id: ${id}`);
            const user = await User.findOne({where: {id}});
            console.info(`Successfully get user by id: ${id}`);
            return user;
        }
        catch(error){
            console.error(`Error get user by id: ${error.message}`);
            throw new Error(error.message);
        }
    }

    getUserByEmail = async (email) => {
        try{
            console.info(`Get user by email: ${email}`);
            const user = await User.findOne({where: {email}});
            console.info(`Successfully get user by Email: ${email}`);
            return user;
        }
        catch(error){
            console.error(`Error get user by email: ${error.message}`);
            throw new Error(error.message);
        }
    }

    getAllUsers = async () => {
        try{
            console.info(`Get all users`);
            const users = await User.findAll();
            console.info(`Successfully get all users`);
            return users;
        }
        catch(error){
            console.error(`Error get all users: ${error.message}`);
            throw new Error(error.message);
        }
    }

    deleteUser = async (id) => {
        try{
            console.info(`Deliting User: ${id}`);

            const user = await this.getUserById(id);

            if(!user){
                throw new Error(`User with Id: ${id} not exist`);
            }

            await User.destroy({where: {id}});

            console.info(`Successfully deleted user: ${user.name}, ${user.email}`);

            return {
                message: 'User successfully deleted',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            };
        }
        catch(error){
            console.error(`Error deleted user: ${error.message}`);
            throw new Error(error.message);
        }
    }

    #updatePassword = async (id, currentPassword, newPassword) => {
        try{
            console.info(`updating password to user with id: ${id}`);

            const user = await this.getUserById(id);

            const checkPassword = await user.checkPassword(currentPassword);

            if(!checkPassword){
                throw Error('Old password does not match!');
            }

            const encryptedPassword = await bcryptjs.hash(newPassword,8);

            console.info(`Successfully Updated password`);

            return encryptedPassword;
        }
        catch(error){
            console.error(`Error updated password: ${error.message}`);
            throw new Error(error.message);
        }
    }
}

module.exports = new UserService();
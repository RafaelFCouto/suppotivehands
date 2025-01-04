const UserService = require('../services/user-service');
const GeneralSecurityUtils = require('../utils/general-security-utils');

class AuthService {
    constructor(){}

    authenticateUser = async (email, password) => {
        try{
            console.info(`authenticating user with email: ${email}`);
            const user  = await UserService.getUserByEmail(email);

            if(!user){
                throw new Error(`User not registred`);
            }

            const isValidPassword = await GeneralSecurityUtils.comparePassword(password, user.password_hash);

            if(!isValidPassword){
                throw new Error(`Email or password incorrects`);
            }

            const token = await GeneralSecurityUtils.generateToken(email);

            console.info(`Successfully authenticated`);

            return {
                user: user,
                token: token
            };
        }
        catch(error){
            console.error(`Error into login: ${error.message}`);
            throw new Error(error.message);
        }
    }
}

module.exports = new AuthService();
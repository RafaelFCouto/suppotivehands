const HttpStatusCode = require('http-status-codes');
const AuthService = require('../services/auth-service');

class AuthController {
    handleLogin = async (request, response) => {
        try{
            const { email, password } = request.body;

            if(!email || !password){
                return response.status(HttpStatusCode.BAD_REQUEST).json({error: 'Missing required fields'});
            }

            const result = await AuthService.authenticateUser(email, password);

            return response.status(HttpStatusCode.OK).json(result);
        }
        catch(error){
            console.error(`Error authenticate user: Error: ${error.message}`);
            return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({error: error.message});
        }
    }
}

module.exports = new AuthController();
const HttpStatusCode = require('http-status-codes');
const GeneralSecurityUtils = require('../utils/general-security-utils');

class GeneralSecurityMiddleware {

    authenticateRequestWithJwtToken = async (request, response, next) => {
        try{

            console.info(`Authenticating Request with JWT Token`);

            const authHeader = request.headers.authorization;


            if(!authHeader){
                console.error(`Erro on validate token: Unset Token`);
                return response.status(HttpStatusCode.UNAUTHORIZED).json({error: 'Unset Token'});
            }

            const payload = await GeneralSecurityUtils.decryptedToken(authHeader);

            if(!payload){
                return response.status(HttpStatusCode.UNAUTHORIZED).json({error: 'Unauthorized Token'});
            }

            request.payload = payload;
            console.info(`Authenticated Request with JWT Token`);
            next();
        }
        catch (error) {
            console.error(`Erro on validate token: ${error.message}`);
            return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({error: error.message});
        }
    }
}

module.exports = new GeneralSecurityMiddleware();
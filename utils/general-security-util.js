const SecurityConstants = require('../constants/security-constants');
const crypto = require('crypto');

class GeneralSecurityUtil {
    constructor(){}

    encryt = async (password) => {
        try{
            console.info(`Encryting password`);

            const cipher = crypto.createCipheriv(SecurityConstants.ALGORITHM, SecurityConstants.SECRET_CRYPTO, crypto.randomBytes(16));
            const encrypted = Buffer.concat([cipher.update(password.toString()), cipher.final()]);

            console.info(`Successfully encryted password`);

            return {
                iv: iv.toString('hex'),
                content: encrypted.toString('hex'),
            }
        }
        catch (error){
            console.error(`Error encryting password: ${error.message}`);
            throw new Error(error.message);
        }
    }

    decrypt = async (hash) => {
        try{
            console.info(`Decrypting password`);

            const [newIv, text] = hash.split(':');
            const decipher = crypto.createDecipheriv(SecurityConstants.ALGORITHM, SecurityConstants.SECRET_CRYPTO, Buffer.from(newIv, 'hex'));
            const decrypted = Buffer.concat
            (
                [decipher.update(Buffer.from(text, 'hex')), decipher.final()],
            );

            console.info(`Successfully decrypted password`);

            return decrypted.toString();
        }
        catch (error){
            console.error(`Error Encryting password: ${error.message}`);
            throw new Error(error.message);
        }
    }
}

module.exports = new GeneralSecurityUtil();
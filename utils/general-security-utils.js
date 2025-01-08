const SecurityConstants = require('../constants/security-constants');
const crypto = require('crypto');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const util = require('util');

class GeneralSecurityUtils {
    constructor(){}

    decryptedToken = async (token) => {
        try{
            console.info(`Decrypting JWT Token`);
            const [,jwtToken] = token.split(' ');

            const verifyAsync = util.promisify(jwt.verify);

            const payload = await verifyAsync(jwtToken, SecurityConstants.HASH_BCRYPT);

            payload.key = await this.decrypt(payload.key);

            return payload;
        }
        catch (error){
            console.error(`Error Decrypting JWT Token: ${error.message}`);
            throw new Error(error.message);
        }
    }

    comparePassword = async (password, passwordHash) => {
        try{
            const isValidPassword = await bcryptjs.compareSync(password, passwordHash);

            return isValidPassword;
        }
        catch (error){
            console.error(`Error verify password: ${error.message}`);
            throw new Error(error.message);
        }
    }

    generateToken = async (key) => {
        try{
            console.info(`Generate JWT Token`);

            const { stringIv, content } = await this.encrypt(key);

            const encryptedKey = `${stringIv}:${content}`;


            const token = jwt.sign(
                { key: encryptedKey },
                SecurityConstants.HASH_BCRYPT,
                { expiresIn: SecurityConstants.EXPIRE_IN }
            );

            console.info(`Generated JWT Token`);

            return token;
        }
        catch (error){
            console.error(`Error Decrypting JWT Token: ${error.message}`);
            throw new Error(error.message);
        }
    }

    encrypt = async (text) => {
        try{
            console.info(`Encrypting test`);

            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipheriv(SecurityConstants.ALGORITHM, SecurityConstants.SECRET_CRYPTO, iv);
            const encrypted = Buffer.concat([cipher.update(text.toString()), cipher.final()]);

            const stringIv = await iv.toString('hex');
            const content = await encrypted.toString('hex');


            console.info(`Successfully encrypted text`);

            return {
                stringIv,
                content
            }
        }
        catch (error){
            console.error(`Error encrypting password: ${error.message}`);
            throw new Error(error.message);
        }
    }

    decrypt = async (hash) => {
        try{
            console.info(`Decrypting password`);

            const [newIv, text] = hash.split(':');
            const decipher = crypto.createDecipheriv(SecurityConstants.ALGORITHM, SecurityConstants.SECRET_CRYPTO, Buffer.from(newIv, 'hex'));
            let decrypted = Buffer.concat
            (
                [decipher.update(Buffer.from(text, 'hex')), decipher.final()],
            );

            console.info(`Successfully decrypted password`);

            decrypted = decrypted.toString();

            return decrypted;
        }
        catch (error){
            console.error(`Error Decrypting password: ${error.message}`);
            throw new Error(error.message);
        }
    }
}

module.exports = new GeneralSecurityUtils();
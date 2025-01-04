const SecurityConstants = require('../constants/security-constants');
const crypto = require('crypto');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const util = require('util');

class GeneralSecurityUtils {
    constructor(){}

    encryt = async (text) => {
        try{
            console.info(`Encryting test`);

            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipheriv(SecurityConstants.ALGORITHM, SecurityConstants.SECRET_CRYPTO, iv);
            const encrypted = Buffer.concat([cipher.update(text.toString()), cipher.final()]);

            console.info(`Successfully encryted text`);

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
            console.error(`Error Decrypting password: ${error.message}`);
            throw new Error(error.message);
        }
    }

    decryptedToken = async (token) => {
        try{
            console.info(`Decrypting JWT Token`);
            const [,jwtToken] = token.split(' ');

            const verifyAsync = util.promisify(jwt.verify);

            return await verifyAsync(jwtToken, SecurityConstants.HASH_BCRYPT);
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

            const { iv, content } =  this.encryt(key);

            const encryptedKey = `${iv}:${content}`;


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
}

module.exports = new GeneralSecurityUtils();
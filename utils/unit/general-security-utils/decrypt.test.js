const crypto = require('crypto');
const GeneralSecurityUtils = require('../../general-security-utils');

describe('Testing decrypt - GeneralSecurityUtils', () => {
    const text = 'validText';
    let encryptedKey;

    beforeAll(async () => {
        const { stringIv, content } = await GeneralSecurityUtils.encrypt(text);
        encryptedKey = `${stringIv}:${content}`;
    });

    describe('Success case', () => {
        it('Should decrypt the hash correctly', async () => {
            const decryptedText = await GeneralSecurityUtils.decrypt(encryptedKey);

            expect(decryptedText).toBe(text);
        });
    });

    describe('fails case', () => {
        it('Should throw an error when decryption fails', async () => {
            const mockError = new Error('Decryption failed');
            jest.spyOn(crypto, 'createDecipheriv').mockImplementation(() => {
                throw mockError
            });

            await expect(GeneralSecurityUtils.decrypt(encryptedKey)).rejects.toThrow(mockError);
        });
    });
});
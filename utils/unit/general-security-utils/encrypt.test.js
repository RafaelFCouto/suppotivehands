const crypto = require('crypto');
const GeneralSecurityUtils = require('../../general-security-utils');

describe('Testing encrypt - GeneralSecurityUtils', () => {
    const text = 'validText';
    let decryptedText;

    describe('Success case', () => {
        it('Should encrypt the text correctly', async () => {
            const {stringIv, content} = await GeneralSecurityUtils.encrypt(text);

            expect(stringIv).toBeDefined();
            expect(content).toBeDefined();
            expect(stringIv).not.toBe(text);
            expect(content).not.toBe(text);
        });
    });

    describe('fails case', () => {
        it('Should throw an error when encryption fails', async () => {
            const mockError = new Error('Encryption failed');
            jest.spyOn(crypto, 'createCipheriv').mockImplementation(() => {
                throw mockError
            });

            await expect(GeneralSecurityUtils.encrypt(text)).rejects.toThrow(mockError);
        });
    });
});
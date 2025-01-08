const jwt = require('jsonwebtoken');
const GeneralSecurityUtils = require('../../general-security-utils');

describe('Testing generateToken - GeneralSecurityUtils', () => {
    const mockKey = 'test-key';
    describe('Success case', () => {
        it('Should generate a valid JWT token successfully', async () => {

            const token = await GeneralSecurityUtils.generateToken(mockKey);
            const parts = token.split('.');

            expect(token).toBeDefined();
            expect(parts.length).toBe(3);
        });
    });

    describe('fails case', () => {
        it('Should throw an error when jwt.sign fails', async () => {
            jest.spyOn(jwt, 'sign').mockImplementation(() => {
                throw new Error('JWT signing failed');
            });

            await expect(GeneralSecurityUtils.generateToken(mockKey)).rejects.toThrow('JWT signing failed');
        });
    });
});
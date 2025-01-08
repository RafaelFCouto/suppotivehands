const jwt = require('jsonwebtoken');
const GeneralSecurityUtils = require('../../general-security-utils');

describe('Testing decryptedToken - GeneralSecurityUtils', () => {

    let token;
    const userEmail = 'test-valid@email';
    let validRequestHeadersAuthorization;

    beforeAll(async ()=>{
        token = await GeneralSecurityUtils.generateToken(userEmail);
        validRequestHeadersAuthorization = `Bearer ${token}`;
    });
    describe('Success case', () => {
        it('Should generate a valid JWT token successfully', async () => {
            const payload = await GeneralSecurityUtils.decryptedToken(validRequestHeadersAuthorization);

            expect(payload).toBeDefined();
            expect(payload.key).toBe(userEmail);
        });
    });

    describe('fails case', () => {
        it('Should generate a valid JWT token successfully', async () => {
            jest.spyOn(jwt, 'verify').mockImplementation(() => {
                throw new Error('jwt must be provided');
            });

            await expect(GeneralSecurityUtils.decryptedToken(validRequestHeadersAuthorization)).rejects.toThrow('jwt must be provided');
        });
    });
});
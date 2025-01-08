const bcryptjs = require('bcryptjs');
const GeneralSecurityUtils = require('../../general-security-utils');

describe('Testing comparePassword - GeneralSecurityUtils', () => {

    let isValidPassword;
    let password;
    let passwordHash;

    beforeEach(async()=>{
        password = 'valid-password';
        passwordHash = await bcryptjs.hashSync(password, 10);
    });

    describe('Success case', () => {
        it('Should return true where password match', async () => {
            isValidPassword = await GeneralSecurityUtils.comparePassword(password, passwordHash);

            expect(isValidPassword).toBeTruthy();
        });

        it('Should return false where password not match', async () => {
            const invalidPassoord = 'invalid-password';
            isValidPassword = await GeneralSecurityUtils.comparePassword(invalidPassoord, passwordHash);

            expect(isValidPassword).toBeFalsy();
        });
    });

    describe('fails case', () => {
        it('Should throw an error if bcryptjs.compareSync fails', async () => {
            jest.spyOn(bcryptjs, 'compareSync').mockImplementation(() => {
                throw new Error('compareSync failed');
            });

            await expect(GeneralSecurityUtils.comparePassword(password, passwordHash)).rejects.toThrow('compareSync failed');
        });
    });
});
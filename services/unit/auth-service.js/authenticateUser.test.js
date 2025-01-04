const AuthService = require('../../auth-service');
const UserService = require('../../user-service');
const GeneralSecurityUtils = require('../../../utils/general-security-utils');
const AuthServiceHelper = require('../../../helpers/services/auth-service-helper');

describe('Testing authenticateUser - AuthService', () => {
    let userDatas = AuthServiceHelper.getValidDatas();
    let mockUser = AuthServiceHelper.getMockUser();

    afterEach(async() => {
        jest.restoreAllMocks();
    });
    describe('Success cases', () => {
        it('Should return user and token', async() => {
            jest.spyOn(UserService, 'getUserByEmail').mockResolvedValue(mockUser);
            jest.spyOn(GeneralSecurityUtils, 'comparePassword').mockResolvedValue(true);

            const result = await AuthService.authenticateUser(userDatas.email, userDatas.password);

            expect(result).toHaveProperty('user', mockUser);
            expect(result).toHaveProperty('token');
        });
    });

    describe('Fails cases', () => {
        let expectError;
        it('Should return error if password not match', async() => {
            expectError = AuthServiceHelper.getPasswordError();

            jest.spyOn(UserService, 'getUserByEmail').mockResolvedValue(mockUser);
            jest.spyOn(GeneralSecurityUtils, 'comparePassword').mockResolvedValue(false);

            await expect(AuthService.authenticateUser(
                userDatas.email,
                userDatas.password)
            ).rejects.toThrow(expectError);
        });

        it('Should return error if usernot exist', async() => {
            expectError = AuthServiceHelper.getUserError();

            jest.spyOn(UserService, 'getUserByEmail').mockResolvedValue(null);

            await expect(AuthService.authenticateUser(
                userDatas.email,
                userDatas.password)
            ).rejects.toThrow(expectError);

        });

        it('Should return error if UserService throws an error', async() => {
            expectError = AuthServiceHelper.getUserServiceError();
            jest.spyOn(UserService, 'getUserByEmail').mockRejectedValue(new Error(expectError));

            await expect(AuthService.authenticateUser(
                userDatas.email,
                userDatas.password)
            ).rejects.toThrow(expectError);
        });
    });
});
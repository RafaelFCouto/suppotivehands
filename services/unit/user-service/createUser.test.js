const { sequelize, User } = require('../../../models');
const UserService = require('../../user-service');
const UserServiceHelper = require('../../../helpers/services/user-service-helper');

describe('Testing Create User - UserService', () => {

    let user;
    let userData;

    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    beforeEach(async () => {
        userData = await UserServiceHelper.getValidUserData();
    });

    afterAll(async () => {
        await sequelize.close();
    });


    describe('Success cases', () => {
        it('Should create a new user successfully', async () => {

            user = await UserService.createUser(
                userData.name,
                userData.email,
                userData.password,
                userData.password_hash,
            );

            expect(user).toBeDefined();
            expect(user.email).toBe(userData.email);
            expect(user.name).toBe(userData.name);
        });
    });
    describe('Fail cases', () => {
        it('should throw an error if email is already registered', async () => {
            await expect(
                UserService.createUser(
                    userData.name,
                    userData.email,
                    userData.password,
                    userData.password_hash,
                )
            ).rejects.toThrow(`Email ${userData.email} is already registered`);
        });
        it('should throw an error when User.create fails', async () => {

            const mockError = UserServiceHelper.getDatabaseError();
            jest.spyOn(User, 'create').mockRejectedValue(new Error(mockError));

            userData.email= 'ValidEmail@email.com';

            await expect(
                UserService.createUser(
                    userData.name,
                    userData.email,
                    userData.password,
                    userData.password_hash,
                )
            ).rejects.toThrow(mockError);
        });
    })
});
const { sequelize, User } = require('../../../models');
const UserService = require('../../user-service');
const UserServiceHelper = require('../../../helpers/services/user-service-helper');

describe('Testing Get All users - UserService', () => {

    let users;
    let usersDatas;

    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    beforeEach(async () => {
        usersDatas = await UserServiceHelper.getValidUsersDatas();
    });

    afterAll(async () => {
        await sequelize.close();
    });

    describe('Success cases', () => {

        it('Should return [] if not exist users', async () => {

            users = await UserService.getAllUsers();
            expect(users).toEqual([]);
        });

        it('Should return all users', async () => {

            await Promise.all(
                usersDatas.map((userData) =>
                  UserService.createUser(
                    userData.name,
                    userData.email,
                    userData.password_hash,
                    userData.password
                  )
                )
            );

            users = await UserService.getAllUsers();

            expect(users).toHaveLength(3);
            users.forEach((user, index) => {
                expect(user).toHaveProperty('id', index+1);
                expect(user).toHaveProperty('email', user.email);
                expect(user).toHaveProperty('name', user.name);
            });
        });
    });
    describe('Fail cases', () => {
        it('should throw an error when User.findAll fails', async () => {

            const mockError = UserServiceHelper.getDatabaseError();
            const getUserByIdMock = jest.spyOn(User, 'findAll').mockRejectedValue(new Error(mockError));

            await expect(
                UserService.getAllUsers()
            ).rejects.toThrow(mockError);
        });
    })
});
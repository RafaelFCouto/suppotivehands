const { sequelize, User } = require('../../../models');
const UserService = require('../../user-service');
const UserServiceHelper = require('../../../helpers/services/user-service-helper');

describe('Testing Delete User - UserService', () => {

    let users;
    let deleteUser;
    let id;
    let usersDatas;

    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    beforeEach(async () => {
        id = 1;
        usersDatas = await UserServiceHelper.getValidUsersDatas();
    });

    afterAll(async () => {
        await sequelize.close();
    });

    describe('Success cases', () => {
        it('Should remove specific user', async () => {

            const expectDeleteMessage = 'User successfully deleted';

            await Promise.all(
                usersDatas.map((userData) =>
                  UserService.createUser(
                    userData.name,
                    userData.email,
                    userData.password,
                    userData.password_hash,
                  )
                )
            );

            deleteUser = await UserService.deleteUser(id);
            users = await UserService.getAllUsers();

            expect(usersDatas).toHaveLength(3); //usersDatas contains 3 datas to register in database.
            expect(deleteUser).toHaveProperty('message', expectDeleteMessage);
            expect(deleteUser).toHaveProperty('user');
            expect(users).toHaveLength(2); //validate the number of users in database after delete user.
        });
    });
    describe('Fail cases', () => {
        it('should throw an error when User not exist', async () => {
            const expectError = `User with Id: ${id} not exist`

            await expect(
                UserService.deleteUser(
                    id
                )
            ).rejects.toThrow(expectError);
        });

        it('should throw an error when User.destroy fails', async () => {

            const mockError = UserServiceHelper.getDatabaseError();
            const deleteUserMock = jest.spyOn(User, 'destroy').mockRejectedValue(new Error(mockError));
            id = 2;

            await expect(
                UserService.deleteUser(
                    id
                )
            ).rejects.toThrow(mockError);
        });
    })
});
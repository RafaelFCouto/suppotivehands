const UserService = require('../../../services/user-service');
const UserController = require('../../user-controller');
const UserControllerHelper = require('../../../helpers/controllers/user-controller-helper');
const HttpStatusCode = require('http-status-codes');

const mockResponse = () => {
    const response = {};
    response.status = jest.fn().mockReturnValue(response);
    response.json = jest.fn().mockReturnValue(response);
    return response;
};

describe('Testing HandleGetAllUsers - UserController', () => {

    let request;
    let response;

    beforeEach(async () => {
        response = mockResponse();
    });

    describe('Success cases', () => {
        it('Should return all users', async() => {
            const mockUsers = UserControllerHelper.getMockUsers();

            jest.spyOn(UserService, 'getAllUsers').mockResolvedValue(mockUsers);

            await UserController.handleGetAllUser(request, response);

            expect(response.status).toHaveBeenCalledWith(HttpStatusCode.OK);
            expect(response.json).toHaveBeenCalledWith(mockUsers);
        });
    });

    describe('Fails cases', () => {
        it('Should return BAD_REQUEST if no registered users', async() => {
            const errorGetAllUsers = UserControllerHelper.getErrorVoidGetAllUsers();
            jest.spyOn(UserService, 'getAllUsers').mockResolvedValue([]);

            await UserController.handleGetAllUser(request, response);

            expect(response.status).toHaveBeenCalledWith(HttpStatusCode.BAD_REQUEST);
            expect(response.json).toHaveBeenCalledWith(errorGetAllUsers);
        });

        it('Should return INTERNAL_SERVER_ERROR if service throws an error', async() => {
            const errorService = UserControllerHelper.getMockServiceError();
            jest.spyOn(UserService, 'getAllUsers').mockRejectedValue(
                new Error(errorService)
            );
            await UserController.handleGetAllUser(request, response);

            expect(response.status).toHaveBeenCalledWith(HttpStatusCode.INTERNAL_SERVER_ERROR);
            expect(response.json).toHaveBeenCalledWith({error: errorService});
        });
    });
});
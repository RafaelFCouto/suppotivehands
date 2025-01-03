
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

describe('Testing HandlePostUser - UserController', () => {

    let response;
    let invalidRequestBody;
    let errorMessageMissingFields;
    let validRequestBody;

    beforeEach(async () => {
        response = mockResponse();
    });

    describe('Success cases', () => {

        it('Should create a user successfully', async () => {
            validRequestBody = UserControllerHelper.getValidRequestBody();
            const mockUserCreate = UserControllerHelper.getMockUserCreate();
            jest.spyOn(UserService, 'createUser').mockResolvedValue(mockUserCreate);

            await UserController.handlePostUser(validRequestBody, response);

            expect(response.status).toHaveBeenCalledWith(HttpStatusCode.OK);
            expect(response.json).toHaveBeenCalledWith(mockUserCreate);

        });
    });

    describe('Fails cases', () => {
        errorMessageMissingFields = UserControllerHelper.getErrorMessageFieldsMissing();

        it('should return INTERNAL_SERVER_ERROR if service throws an error', async () => {
            const mockErrorCreateUser = UserControllerHelper.getMockServiceError();
            validRequestBody = UserControllerHelper.getValidRequestBody();

            jest.spyOn(UserService, 'createUser').mockRejectedValue(
                new Error(mockErrorCreateUser)
            );

            await UserController.handlePostUser(validRequestBody, response);

            expect(response.status).toHaveBeenCalledWith(HttpStatusCode.INTERNAL_SERVER_ERROR);
            expect(response.json).toHaveBeenCalledWith({error: mockErrorCreateUser});
        });

        it('should return BAD_REQUEST if field: Name are missing', async () => {
            invalidRequestBody = UserControllerHelper.getInvalidRequestBodyWithoutName();
            await UserController.handlePostUser(invalidRequestBody, response);

            expect(response.status).toHaveBeenCalledWith(HttpStatusCode.BAD_REQUEST);
            expect(response.json).toHaveBeenCalledWith(errorMessageMissingFields);

        });

        it('should return BAD_REQUEST if field: Email are missing', async () => {
            invalidRequestBody = UserControllerHelper.getInvalidRequestBodyWithoutEmail();

            await UserController.handlePostUser(invalidRequestBody, response);

            expect(response.status).toHaveBeenCalledWith(HttpStatusCode.BAD_REQUEST);
            expect(response.json).toHaveBeenCalledWith(errorMessageMissingFields);

        });

        it('should return BAD_REQUEST if field: Password are missing', async () => {
            invalidRequestBody = UserControllerHelper.getInvalidRequestBodyWithoutPassword();

            await UserController.handlePostUser(invalidRequestBody, response);

            expect(response.status).toHaveBeenCalledWith(HttpStatusCode.BAD_REQUEST);
            expect(response.json).toHaveBeenCalledWith(errorMessageMissingFields);
        });
    });
});

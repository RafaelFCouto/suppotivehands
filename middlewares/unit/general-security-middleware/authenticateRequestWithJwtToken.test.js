const HttpStatusCode = require('http-status-codes');
const GeneralSecurityMiddleware = require('../../general-security-middleware');
const GeneralSecurityUtils = require('../../../utils/general-security-utils');

jest.mock('../../../utils/general-security-utils');

describe('GeneralSecurityMiddleware', () => {
    let request, response, next;

    beforeEach(() => {
        request = { headers: {} };
        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('Failure Cases', () => {
        it('should return UNAUTHORIZED if the token is missing', async () => {
            await GeneralSecurityMiddleware.authenticateRequestWithJwtToken(request, response, next);

            expect(response.status).toHaveBeenCalledWith(HttpStatusCode.UNAUTHORIZED);
            expect(response.json).toHaveBeenCalledWith({ error: 'Unset Token' });
            expect(next).not.toHaveBeenCalled();
        });

        it('should return UNAUTHORIZED if the token is invalid', async () => {
            request.headers.authorization = 'invalid-token';
            GeneralSecurityUtils.decryptedToken.mockResolvedValue(null);

            await GeneralSecurityMiddleware.authenticateRequestWithJwtToken(request, response, next);

            expect(response.status).toHaveBeenCalledWith(HttpStatusCode.UNAUTHORIZED);
            expect(response.json).toHaveBeenCalledWith({ error: 'Unauthorized Token' });
            expect(next).not.toHaveBeenCalled();
        });

        it('should return INTERNAL_SERVER_ERROR for unexpected errors', async () => {
            request.headers.authorization = 'some-token';
            GeneralSecurityUtils.decryptedToken.mockRejectedValue(new Error('Unexpected error'));

            await GeneralSecurityMiddleware.authenticateRequestWithJwtToken(request, response, next);

            expect(response.status).toHaveBeenCalledWith(HttpStatusCode.INTERNAL_SERVER_ERROR);
            expect(response.json).toHaveBeenCalledWith({ error: 'Unexpected error' });
            expect(next).not.toHaveBeenCalled();
        });
    });

    describe('Success Cases', () => {
        it('should call next() when the token is valid', async () => {
            request.headers.authorization = 'valid-token';
            GeneralSecurityUtils.decryptedToken.mockResolvedValue({ key: 'encrypted-key' });

            await GeneralSecurityMiddleware.authenticateRequestWithJwtToken(request, response, next);

            expect(GeneralSecurityUtils.decryptedToken).toHaveBeenCalledWith('valid-token');
            expect(request.payload).toEqual({ key: 'encrypted-key' });
            expect(next).toHaveBeenCalled();
            expect(response.status).not.toHaveBeenCalled();
            expect(response.json).not.toHaveBeenCalled();
        });
    });
});



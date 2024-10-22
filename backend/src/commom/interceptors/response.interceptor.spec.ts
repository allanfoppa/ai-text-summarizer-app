import { ResponseInterceptor } from './response.interceptor';
import { ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { CallHandler } from '@nestjs/common/interfaces';
import { of, throwError } from 'rxjs';

describe('ResponseInterceptor', () => {
  let interceptor: ResponseInterceptor;
  let mockContext: Partial<ExecutionContext>;
  let mockCallHandler: Partial<CallHandler>;

  beforeEach(() => {
    interceptor = new ResponseInterceptor();

    // Mocking ExecutionContext
    mockContext = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: jest.fn().mockReturnValue({
          statusCode: HttpStatus.OK,
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        }),
        getRequest: jest.fn().mockReturnValue({
          url: '/test-url',
        }),
      }),
    };

    // Mocking CallHandler
    mockCallHandler = {
      handle: jest.fn(),
    };
  });

  it('should handle successful response correctly', async () => {
    // Arrange
    const mockResponse = {
      metadata: { message: 'Success' },
      content: { data: 'Test Data' }
    };

    (mockCallHandler.handle as jest.Mock).mockReturnValue(of(mockResponse));

    // Act
    const result = await interceptor.intercept(mockContext as ExecutionContext, mockCallHandler as CallHandler).toPromise();

    // Assert
    expect(result).toEqual({
      metadata: {
        status: 'success',
        statusCode: HttpStatus.OK,
        successInfo: {
          path: '/test-url',
          message: 'Success',
          timestamp: expect.any(String),
        }
      },
      data: { data: 'Test Data' }
    });
  });

  it('should handle error response correctly', async () => {
    // Arrange
    const mockError = new HttpException('Test Error', HttpStatus.BAD_REQUEST);

    (mockCallHandler.handle as jest.Mock).mockReturnValue(throwError(() => mockError));

    const mockResponse = mockContext.switchToHttp().getResponse();

    // Act & Assert
    await interceptor.intercept(mockContext as ExecutionContext, mockCallHandler as CallHandler).toPromise().catch(() => {});

    // Ensure errorHandler is called
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockResponse.json).toHaveBeenCalledWith({
      metadata: {
        status: 'error',
        statusCode: HttpStatus.BAD_REQUEST,
        errorInfo: {
          path: '/test-url',
          message: 'Test Error',
          timestamp: expect.any(String),
        },
      }
    });
  });
});

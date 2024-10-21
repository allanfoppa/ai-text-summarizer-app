import { ResponseHelper } from './response.helper';

describe('ResponseHelper', () => {
  let responseHelper: ResponseHelper;

  beforeEach(() => {
    responseHelper = new ResponseHelper();
  });

  it('should create a response with message and content', () => {
    // Arrange
    const message = 'Success';
    const content = { data: 'some data' };

    // Act
    const result = responseHelper.createResponse(message, content);

    // Assert
    expect(result).toEqual({
      metadata: {
        message,
        aditionalMetadata: undefined, // Check that additionalMetadata is undefined by default
      },
      content,
    });
  });

  it('should create a response with additional metadata', () => {
    // Arrange
    const message = 'Success';
    const content = { data: 'some data' };
    const additionalMetadata = { requestId: '12345' };

    // Act
    const result = responseHelper.createResponse(message, content, additionalMetadata);

    // Assert
    expect(result).toEqual({
      metadata: {
        message,
        aditionalMetadata: additionalMetadata, // Ensure additionalMetadata is included
      },
      content,
    });
  });

  it('should create a response with no content and additional metadata', () => {
    // Arrange
    const message = 'No content';

    // Act
    const result = responseHelper.createResponse(message);

    // Assert
    expect(result).toEqual({
      metadata: {
        message,
        aditionalMetadata: undefined, // Check that additionalMetadata is undefined
      },
      content: undefined, // Check that content is undefined
    });
  });
});

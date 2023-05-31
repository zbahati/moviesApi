const fetchMock = require('jest-fetch-mock');
const { getCommentCount } = require('./comments.js');

// Configure the fetch mock
fetchMock.enableMocks();

describe('getCommentCount', () => {
  beforeEach(() => {
    // Reset the fetch mock and clear all mocks before each test
    fetchMock.resetMocks();
    jest.clearAllMocks();
    // Reset the document body
    document.body.innerHTML = '';
  });

  it('should update comment count', async () => {
    // Mock the fetch response
    const comments = [{ id: 1, text: 'Great movie!' }];
    fetchMock.mockResponseOnce(JSON.stringify(comments));

    // Create a comment count element
    const movieId = 1;
    const commentCountElement = document.createElement('div');
    commentCountElement.id = `comment-count-${movieId}`;
    document.body.appendChild(commentCountElement);

    // Call the getCommentCount function
    await getCommentCount(movieId);

    // Expect the comment count element to have the correct value
    expect(commentCountElement.textContent).toBe('1');
  });

  it('should handle fetch error', async () => {
    // Mock the console.error method
    const consoleErrorSpy = jest.spyOn(console, 'error');

    // Simulate a fetch error
    fetchMock.mockRejectOnce('Fetch error');

    // Create a comment count element
    const movieId = 1;
    const commentCountElement = document.createElement('div');
    commentCountElement.id = `comment-count-${movieId}`;
    document.body.appendChild(commentCountElement);

    // Call the getCommentCount function
    await getCommentCount(movieId);

    // Expect the console.error method to be called with the correct error message
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error fetching comment count:',
      'Fetch error',
    );
  });
});
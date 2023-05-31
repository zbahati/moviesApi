// Import the function to be tested
const { getCommentCount } = require('./comments.js');

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ comment: 'Test comment' }]),
  })
);

// Mock the DOM element
document.body.innerHTML = `
  <div id="comment-count-movieId"></div>
`;

// Test the getCommentCount function
describe('getCommentCount', () => {
  it('should update the comment count', async () => {
    const movieId = '123';
    await getCommentCount(movieId);

    const commentCountElement = document.getElementById(`comment-count-${movieId}`);
    expect(commentCountElement.textContent).toBe('1');
  });

  it('should handle error fetching comment count', async () => {
    // Mock the fetch function to throw an error
    global.fetch.mockImplementationOnce(() => Promise.reject('Fetch error'));

    const movieId = '123';
    await getCommentCount(movieId);

    const consoleSpy = jest.spyOn(console, 'error');
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching comment count:', 'Fetch error');
  });

  it('should handle comment count element not found', async () => {
    // Remove the comment count element from the DOM
    const commentCountElement = document.getElementById(`comment-count-movieId`);
    commentCountElement.parentNode.removeChild(commentCountElement);

    const movieId = '123';
    await getCommentCount(movieId);

    const consoleSpy = jest.spyOn(console, 'error');
    expect(consoleSpy).toHaveBeenCalledWith('Comment count element not found');
  });
});
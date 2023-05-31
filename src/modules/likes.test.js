import { getLikeCount } from './likes';

describe('getLikeCount', () => {
  it('should fetch and display the like count', async () => {
    // Mock the fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ count: 10 }), // Mocked response with a count of 10
      })
    );

    // Call the function under test
    const likeCount = await getLikeCount(1);

    // Verify that the fetch function was called with the correct URL
    expect(global.fetch).toHaveBeenCalledWith('https://example.com/likes?item_id=1');

    // Verify the returned like count
    expect(likeCount).toBe(10);
  });

  it('should handle fetch errors', async () => {
    // Mock the fetch function to throw an error
    global.fetch = jest.fn(() => Promise.reject(new Error('Fetch error')));

    // Call the function under test
    const likeCount = await getLikeCount(1);

    // Verify that the fetch function was called with the correct URL
    expect(global.fetch).toHaveBeenCalledWith('https://example.com/likes?item_id=1');

    // Verify that the like count is null or an appropriate default value
    expect(likeCount).toBeNull();
  });
});
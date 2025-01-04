import '@testing-library/jest-native/extend-expect';

// Function to generate mock posts
export const generateMockPosts = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `post-${i}`,
    title: `Test Post ${i}`,
    content: `This is test content for post ${i}`,
    likes: Math.floor(Math.random() * 100),
    author: `Author ${i}`,
    createdAt: { seconds: Date.now() / 1000, nanoseconds: 0 },
    replies: Math.floor(Math.random() * 20),
    likedByUser: false,
  }));
};
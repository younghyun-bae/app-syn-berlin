import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { generateMockPosts } from './mocks/mockPosts';
import ThreadScreen, { ThreadScreenProps }  from '../ThreadScreen'; // Ensure this is the correct import
import * as firebase from 'firebase/firestore';

interface Post {
  id: string;
  title: string;
  content: string;
  likes: number;
  author: string;
  createdAt: Date;
  replies: number;
  likedByUser: boolean;
}

describe('ThreadScreen Performance Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const runPerformanceTest = async (Component: React.ComponentType<ThreadScreenProps>, numPosts: number, maxTime: number) => {
    const mockPosts = generateMockPosts(numPosts);
    (firebase.getDocs as jest.Mock).mockResolvedValueOnce({
      docs: mockPosts.map(post => ({
        id: post.id,
        data: () => post,
      })),
    });

    const startTime = performance.now();

    const { findAllByTestId } = render(<Component initialNumToRender={numPosts} />);
    
    await act(async () => {
      await findAllByTestId(/^post-item-\d+$/);
    });

    const posts = await findAllByTestId(/^post-item-\d+$/);
    const endTime = performance.now();
    
    expect(posts).toHaveLength(numPosts);
    const duration = endTime - startTime;
    console.log(`Render time for ${numPosts} posts: ${duration}ms`);
    expect(duration).toBeLessThan(maxTime);
  };

  describe('Baseline Performance', () => {
    it('should render 10 posts within 500ms (unoptimized)', async () => {
      await runPerformanceTest(ThreadScreen, 10, 500);
    });

    it('should render 100 posts within 2000ms (unoptimized)', async () => {
      await runPerformanceTest(ThreadScreen, 100, 2000);
    });
  });

  describe('Optimized Performance', () => {
    it('should render 10 posts within 500ms (optimized)', async () => {
      await runPerformanceTest(ThreadScreen, 10, 500);
    });

    it('should render 100 posts within 2000ms (optimized)', async () => {
      await runPerformanceTest(ThreadScreen, 100, 2000);
    });
  });
});
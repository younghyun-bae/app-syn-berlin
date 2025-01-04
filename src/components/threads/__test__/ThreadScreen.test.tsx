import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { generateMockPosts } from './mocks/mockPosts';
import ThreadScreen from '../ThreadScreen';
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

  describe('Bulk Post Rendering Performance', () => {
    it('should render initial 10 posts within 500ms', async () => {
      const mockPosts = generateMockPosts(10);
      (firebase.getDocs as jest.Mock).mockResolvedValueOnce({
        docs: mockPosts.map(post => ({
          id: post.id,
          data: () => post,
        })),
      });

      const startTime = performance.now();
      const { findAllByTestId } = render(<ThreadScreen />);
      
      const posts = await findAllByTestId(/^post-item-\d+$/);
      const endTime = performance.now();
      
      expect(posts).toHaveLength(10);
      expect(endTime - startTime).toBeLessThan(500);
    });

    it('should render 100 posts within 2 seconds', async () => {
      const mockPosts = generateMockPosts(100);
      (firebase.getDocs as jest.Mock).mockResolvedValueOnce({
        docs: mockPosts.map(post => ({
          id: post.id,
          data: () => post,
        })),
      });

      const startTime = performance.now();
      const { findAllByTestId } = render(<ThreadScreen />);
      
      const posts = await findAllByTestId(/^post-item-\d+$/);
      const endTime = performance.now();
      
      expect(posts).toHaveLength(100);
      expect(endTime - startTime).toBeLessThan(2000);
    });

    it('should measure initial render time with 10 items', () => {
      const mockPosts = generateMockPosts(10);
      (firebase.getDocs as jest.Mock).mockResolvedValueOnce({
        docs: mockPosts.map(post => ({
          id: post.id,
          data: () => post,
        })),
      });

      const startTime = performance.now();
      render(<ThreadScreen initialNumToRender={10} />);
      const endTime = performance.now();
      console.log(`Initial render time with 10 items: ${endTime - startTime}ms`);
    });

    it('should measure initial render time with 100 items', () => {
      const mockPosts = generateMockPosts(100);
      (firebase.getDocs as jest.Mock).mockResolvedValueOnce({
        docs: mockPosts.map(post => ({
          id: post.id,
          data: () => post,
        })),
      });

      const startTime = performance.now();
      render(<ThreadScreen initialNumToRender={100} />);
      const endTime = performance.now();
      console.log(`Initial render time with 100 items: ${endTime - startTime}ms`);
    });
  });

  describe('Real-time Update Performance', () => {
    it('should process like update within 16ms', async () => {
      const mockPosts = generateMockPosts(1);
      (firebase.getDocs as jest.Mock).mockResolvedValueOnce({
        docs: mockPosts.map(post => ({
          id: post.id,
          data: () => post,
        })),
      });

      const { getByTestId } = render(<ThreadScreen />);
      await waitFor(() => getByTestId('like-button-0'));

      const startTime = performance.now();
      const likeButton = getByTestId('like-button-0');
      
      fireEvent.press(likeButton);
      
      await waitFor(() => {
        const endTime = performance.now();
        expect(endTime - startTime).toBeLessThan(16);
      });
    });
  });
});
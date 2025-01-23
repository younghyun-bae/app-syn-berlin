export interface Post {
  id: string;
  title: string;
  content: string;
  likes: number;
  author: string;
  authorId: string;
  jobTitle: string;
  createdAt: any;
  replies: number;
  likedByUser?: boolean;
  isAuthor: boolean;
  onEdit: () => void;
  onDelete: () => void;
}
export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
  isAuthor: boolean;
  jobTitle?: string;
  onEdit: () => void;
  onDelete: () => void;
}
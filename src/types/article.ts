
export interface FormRequestData {
  title: string;
  excerpt?: string;
  content: string | null;
  imagePreview: string;
  isPublished: boolean;
  category: string;
  tags: string[];
}
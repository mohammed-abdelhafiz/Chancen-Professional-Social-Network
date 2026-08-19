export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  headline?: string;
  bio?: string;
  company?: string;
  avatar?: {
    publicId: string;
    secure_url: string;
  };
  coverPhoto?: {
    publicId: string;
    secure_url: string;
  };
  resume?: {
    publicId: string;
    secure_url: string;
  };
  createdAt: string;
  updatedAt: string;
}

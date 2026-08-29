export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  headline?: string | null;
  bio?: string | null;
  company?: string | null;
  avatar?: {
    publicId: string;
    secure_url?: string;
    url?: string;
    resourceType?: string;
  } | null;
  coverPhoto?: {
    publicId: string;
    secure_url?: string;
    url?: string;
    resourceType?: string;
  } | null;
  resume?: {
    publicId: string;
    secure_url?: string;
    url?: string;
    resourceType?: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

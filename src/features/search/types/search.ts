export interface SearchUser {
  id: string;
  firstName: string;
  lastName: string;
  avatar: { url: string; secure_url: string } | null;
  headline: string | null;
}

export interface SearchPost {
  id: string;
  content: string;
  image: { url: string } | null;
  createdAt: string;
  user: SearchUser;
  _count: {
    postLikes: number;
    comments: number;
  };
}

export interface SearchJob {
  id: string;
  title: string;
  company: string;
  description: string;
  location: string | null;
  salary: string | null;
  type: string;
  createdAt: string;
  user: SearchUser;
  _count: {
    applications: number;
  };
}

export interface SearchResults {
  users: SearchUser[];
  posts: SearchPost[];
  jobs: SearchJob[];
}

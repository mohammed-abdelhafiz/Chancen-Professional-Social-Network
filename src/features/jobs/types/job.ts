import { User } from "@/features/auth/types/user";

export type JobType = "full_time" | "part_time" | "contract" | "internship" | "remote";
export type JobStatus = "open" | "closed" | "draft";
export type ApplicationStatus = "pending" | "accepted" | "rejected";

export interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
  location?: string | null;
  type: JobType;
  salary?: string | null;
  requirements?: string | null;
  benefits?: string | null;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: Pick<User, "id" | "firstName" | "lastName" | "avatar" | "headline">;
  _count: { applications: number };
}

export interface JobApplication {
  id: string;
  coverLetter?: string | null;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
  userId: string;
  jobId: string;
  user: Pick<User, "id" | "firstName" | "lastName" | "avatar" | "headline" | "email">;
}

export interface MyApplication {
  id: string;
  coverLetter?: string | null;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
  userId: string;
  jobId: string;
  job: Pick<Job, "id" | "title" | "company" | "location" | "type" | "status">;
}

export interface GetJobsResponse {
  jobs: Job[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateJobInput {
  title: string;
  description: string;
  company: string;
  location?: string;
  type?: JobType;
  salary?: string;
  requirements?: string;
  benefits?: string;
}

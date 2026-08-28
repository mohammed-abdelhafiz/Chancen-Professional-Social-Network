import api from "@/lib/axios";
import { CreateJobInput, GetJobsResponse, Job, JobApplication } from "../types/job";

export const getJobs = async (
  page = 1,
  limit = 10,
  search?: string,
  type?: string
): Promise<GetJobsResponse> => {
  const params = new URLSearchParams();
  params.set("page", page.toString());
  params.set("limit", limit.toString());
  if (search) params.set("search", search);
  if (type) params.set("type", type);
  const res = await api.get(`/jobs?${params.toString()}`);
  return res.data;
};

export const getJob = async (id: string): Promise<Job> => {
  const res = await api.get(`/jobs/${id}`);
  return res.data;
};

export const createJob = async (data: CreateJobInput): Promise<Job> => {
  const res = await api.post("/jobs", data);
  return res.data;
};

export const updateJob = async (id: string, data: Partial<CreateJobInput>): Promise<Job> => {
  const res = await api.put(`/jobs/${id}`, data);
  return res.data;
};

export const deleteJob = async (id: string) => {
  const res = await api.delete(`/jobs/${id}`);
  return res.data;
};

export const applyToJob = async (jobId: string, coverLetter?: string) => {
  const res = await api.post(`/jobs/${jobId}/apply`, { coverLetter });
  return res.data;
};

export const getJobApplications = async (jobId: string): Promise<JobApplication[]> => {
  const res = await api.get(`/jobs/${jobId}/applications`);
  return res.data;
};

export const getMyJobs = async (): Promise<Job[]> => {
  const res = await api.get("/jobs/my-jobs");
  return res.data;
};

export const getMyApplications = async (): Promise<any[]> => {
  const res = await api.get("/jobs/my-applications");
  return res.data;
};

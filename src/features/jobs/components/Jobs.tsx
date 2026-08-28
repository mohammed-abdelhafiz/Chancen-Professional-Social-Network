"use client";

import { JobList } from "./JobList";
import { CreateJobForm } from "./CreateJobForm";
import { useAuthStore } from "@/features/auth/store/auth.store";

export const Jobs = () => {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="py-6 px-4 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Jobs</h1>
        {user && <CreateJobForm />}
      </div>
      <JobList />
    </div>
  );
};

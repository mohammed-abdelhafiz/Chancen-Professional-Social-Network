"use client";

import { useState } from "react";
import { JobList } from "./JobList";
import { CreateJobForm } from "./CreateJobForm";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useGetMyJobs } from "../hooks/useGetMyJobs";
import { useGetMyApplications } from "../hooks/useGetMyApplications";
import { JobCard } from "./JobCard";
import { Job, MyApplication } from "../types/job";

export const Jobs = () => {
  const user = useAuthStore((s) => s.user);
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="py-6 px-4 max-w-4xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between mb-6"
      >
        <h1 className="text-2xl font-bold">Jobs</h1>
        {user && <CreateJobForm />}
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="all" className="flex-1">All Jobs</TabsTrigger>
          {user && <TabsTrigger value="my-jobs" className="flex-1">My Jobs</TabsTrigger>}
          {user && <TabsTrigger value="applied" className="flex-1">Applied</TabsTrigger>}
        </TabsList>

        <TabsContent value="all">
          <JobList />
        </TabsContent>

        {user && (
          <TabsContent value="my-jobs">
            <MyJobsContent />
          </TabsContent>
        )}

        {user && (
          <TabsContent value="applied">
            <MyApplicationsContent />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

function MyJobsContent() {
  const { data: jobs, isLoading } = useGetMyJobs();

  if (isLoading) {
    return <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-32 rounded-lg bg-muted animate-pulse" />)}</div>;
  }

  if (!jobs || jobs.length === 0) {
    return <div className="text-center py-12 text-muted-foreground text-sm">You haven&apos;t posted any jobs yet</div>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
      className="space-y-3"
    >
      {jobs.map((job: Job) => (
        <motion.div key={job.id} variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
          <JobCard job={job} showActions />
        </motion.div>
      ))}
    </motion.div>
  );
}

function MyApplicationsContent() {
  const { data: applications, isLoading } = useGetMyApplications();

  if (isLoading) {
    return <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-24 rounded-lg bg-muted animate-pulse" />)}</div>;
  }

  if (!applications || applications.length === 0) {
    return <div className="text-center py-12 text-muted-foreground text-sm">You haven&apos;t applied to any jobs yet</div>;
  }

  return (
    <div className="space-y-3">
      {applications.map((app: MyApplication) => (
        <div key={app.id} className="border rounded-lg p-4 bg-card">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-medium">{app.job.title}</p>
              <p className="text-sm text-muted-foreground">{app.job.company}</p>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${app.status === "accepted" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : app.status === "rejected" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : "bg-muted text-muted-foreground"}`}>
              {app.status}
            </span>
          </div>
          {app.coverLetter && <p className="text-sm mt-2 text-muted-foreground whitespace-pre-wrap">{app.coverLetter}</p>}
          <p className="text-xs text-muted-foreground mt-2">Applied {new Date(app.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}

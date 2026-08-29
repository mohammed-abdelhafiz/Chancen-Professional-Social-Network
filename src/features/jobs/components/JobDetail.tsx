"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { useGetJob } from "../hooks/useGetJob";
import { useApplyToJob } from "../hooks/useApplyToJob";
import { useGetMyApplications } from "../hooks/useGetMyApplications";
import { useGetJobApplications } from "../hooks/useGetJobApplications";
import { useUpdateApplicationStatus } from "../hooks/useUpdateApplicationStatus";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { MapPinIcon, ClockIcon, UsersIcon, BuildingIcon, BanknoteIcon, CheckIcon, XIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { JobsSkeleton } from "./JobsSkeleton";
import { MyApplication, JobApplication } from "../types/job";

interface Props {
  jobId: string;
}

const jobTypeLabels: Record<string, string> = {
  full_time: "Full-time",
  part_time: "Part-time",
  contract: "Contract",
  internship: "Internship",
  remote: "Remote",
};

const jobTypeColors: Record<string, string> = {
  full_time: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  part_time: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  contract: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  internship: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  remote: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
};

export const JobDetail = ({ jobId }: Props) => {
  const { data: job, isLoading } = useGetJob(jobId);
  const applyMutation = useApplyToJob();
  const { data: myApplications } = useGetMyApplications();
  const currentUser = useAuthStore((s) => s.user);
  const [coverLetter, setCoverLetter] = useState("");
  const [showApplyForm, setShowApplyForm] = useState(false);
  const isOwner = currentUser?.id === job?.userId;
  const { data: applications } = useGetJobApplications(jobId, !!isOwner);
  const updateStatus = useUpdateApplicationStatus();

  if (isLoading) {
    return (
      <div className="py-6 px-4 max-w-3xl mx-auto w-full">
        <JobsSkeleton />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="py-6 px-4 max-w-3xl mx-auto w-full">
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-sm">Job not found</p>
        </div>
      </div>
    );
  }

  const isApplied = myApplications?.some((app: MyApplication) => app.jobId === job?.id);

  const handleApply = () => {
    applyMutation.mutate(
      { jobId: job.id, coverLetter: coverLetter || undefined },
      {
        onSuccess: () => {
          setShowApplyForm(false);
          setCoverLetter("");
        },
      }
    );
  };

  return (
    <div className="py-6 px-4 max-w-3xl mx-auto w-full">
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <Link href={`/profile/${job.user.id}`}>
              <UserAvatar user={job.user} size="lg" />
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{job.title}</h1>
              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                <BuildingIcon className="size-4" />
                <span>{job.company}</span>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                {job.location && (
                  <span className="flex items-center gap-1">
                    <MapPinIcon className="size-4" /> {job.location}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <ClockIcon className="size-4" /> {jobTypeLabels[job.type]}
                </span>
                {job.salary && (
                  <span className="flex items-center gap-1 font-medium text-foreground">
                    <BanknoteIcon className="size-4" /> {job.salary}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <UsersIcon className="size-4" /> {job._count.applications} applicants
                </span>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${jobTypeColors[job.type]}`}>
                  {jobTypeLabels[job.type]}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold text-base mb-2">Description</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{job.description}</p>
          </div>

          {job.requirements && (
            <div>
              <h3 className="font-semibold text-base mb-2">Requirements</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{job.requirements}</p>
            </div>
          )}

          {job.benefits && (
            <div>
              <h3 className="font-semibold text-base mb-2">Benefits</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{job.benefits}</p>
            </div>
          )}

          {!isOwner && currentUser && !isApplied && (
            <div className="border-t pt-4">
              {!showApplyForm ? (
                <Button onClick={() => setShowApplyForm(true)}>
                  Apply Now
                </Button>
              ) : (
                <div className="space-y-3">
                  <Textarea
                    placeholder="Write a cover letter (optional)"
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    rows={4}
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={handleApply}
                      disabled={applyMutation.isPending}
                    >
                      {applyMutation.isPending ? "Submitting..." : "Submit Application"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowApplyForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {!isOwner && currentUser && isApplied && (
            <div className="border-t pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckIcon className="size-4 text-green-500" />
                <span>You have already applied to this job</span>
              </div>
            </div>
          )}

          {!currentUser && (
            <div className="border-t pt-4">
              <Link href="/sign-in">
                <Button>Sign in to apply</Button>
              </Link>
            </div>
          )}

          {isOwner && (
            <div className="border-t pt-6 mt-6">
              <h3 className="font-semibold text-base mb-4 flex items-center gap-2">
                <MailIcon className="size-4" /> Applications ({applications?.length ?? 0})
              </h3>
              {!applications || applications.length === 0 ? (
                <p className="text-sm text-muted-foreground">No applications yet</p>
              ) : (
                <div className="space-y-3">
                  {applications.map((app: JobApplication) => (
                    <div key={app.id} className="border rounded-lg p-4 flex items-start justify-between gap-3 bg-muted/20">
                      <div className="flex gap-3 flex-1 min-w-0">
                        <Link href={`/profile/${app.user.id}`}>
                          <UserAvatar user={app.user} size="default" />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">
                            {app.user.firstName} {app.user.lastName}
                          </p>
                          <p className="text-xs text-muted-foreground">{app.user.email}</p>
                          {app.coverLetter && (
                            <p className="text-sm mt-2 whitespace-pre-wrap bg-background p-2 rounded border">{app.coverLetter}</p>
                          )}
                          <p className="text-xs text-muted-foreground mt-1">Applied {new Date(app.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium text-center ${
                            app.status === "accepted"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : app.status === "rejected"
                                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}
                        >
                          {app.status}
                        </span>
                        {app.status === "pending" && (
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              onClick={() =>
                                updateStatus.mutate({ jobId: job.id, applicationId: app.id, status: "accepted" })
                              }
                              disabled={updateStatus.isPending}
                              className="h-7 px-2 text-xs"
                            >
                              <CheckIcon className="size-3 mr-1" /> Accept
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                updateStatus.mutate({ jobId: job.id, applicationId: app.id, status: "rejected" })
                              }
                              disabled={updateStatus.isPending}
                              className="h-7 px-2 text-xs"
                            >
                              <XIcon className="size-3 mr-1" /> Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { Job } from "../types/job";
import { MapPinIcon, ClockIcon, UsersIcon, BuildingIcon, TrashIcon, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { useDeleteJob } from "../hooks/useDeleteJob";
import { useAuthStore } from "@/features/auth/store/auth.store";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface Props {
  job: Job;
  showActions?: boolean;
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

export const JobCard = ({ job, showActions = false }: Props) => {
  const currentUser = useAuthStore((s) => s.user);
  const deleteMutation = useDeleteJob();
  const isOwner = currentUser?.id === job.userId;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <Link href={`/profile/${job.user.id}`}>
              <UserAvatar user={job.user} size="default" />
            </Link>
            <div className="flex-1 min-w-0">
              <Link
                href={`/jobs/${job.id}`}
                className="font-semibold text-base hover:underline line-clamp-1"
              >
                {job.title}
              </Link>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BuildingIcon className="size-3.5" />
                <span>{job.company}</span>
              </div>
            </div>
          </div>
          {isOwner && showActions && (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="ghost" size="icon-xs" />}
              >
                <span className="sr-only">Actions</span>
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" />
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem render={<Link href={`/jobs/${job.id}`} />}>
                  <ExternalLinkIcon className="size-4 mr-2" /> View
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => deleteMutation.mutate(job.id)}
                  className="text-destructive"
                >
                  <TrashIcon className="size-4 mr-2" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          {job.location && (
            <span className="flex items-center gap-1">
              <MapPinIcon className="size-3.5" /> {job.location}
            </span>
          )}
          <span className="flex items-center gap-1">
            <ClockIcon className="size-3.5" /> {jobTypeLabels[job.type]}
          </span>
          {job.salary && (
            <span className="font-medium text-foreground">{job.salary}</span>
          )}
          <span className="flex items-center gap-1">
            <UsersIcon className="size-3.5" /> {job._count.applications} applicants
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${jobTypeColors[job.type]}`}>
            {jobTypeLabels[job.type]}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

"use client";

import { useGetJobs } from "../hooks/useGetJobs";
import { JobCard } from "./JobCard";
import { JobsSkeleton } from "./JobsSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { JobType } from "../types/job";

const jobTypes: { value: string; label: string }[] = [
  { value: "", label: "All" },
  { value: "full_time", label: "Full-time" },
  { value: "part_time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
  { value: "remote", label: "Remote" },
];

interface Props {
  showFilters?: boolean;
}

export const JobList = ({ showFilters = true }: Props) => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedType, setAppliedType] = useState("");

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetJobs({
    search: appliedSearch || undefined,
    type: appliedType || undefined,
  });

  const jobs = data?.pages.flatMap((page) => page.jobs) || [];
  const totalJobs = data?.pages[0]?.meta.total || 0;

  const handleSearch = () => {
    setAppliedSearch(search);
    setAppliedType(type);
  };

  const handleClearSearch = () => {
    setSearch("");
    setType("");
    setAppliedSearch("");
    setAppliedType("");
  };

  return (
    <div className="space-y-4">
      {showFilters && (
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-9"
              />
            </div>
            <Button onClick={handleSearch}>Search</Button>
            {(appliedSearch || appliedType) && (
              <Button variant="ghost" onClick={handleClearSearch}>
                <XIcon className="size-4 mr-1" /> Clear
              </Button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {jobTypes.map((jt) => (
              <button
                key={jt.value}
                onClick={() => {
                  setType(jt.value);
                  setAppliedType(jt.value);
                }}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                  appliedType === jt.value
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {jt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {isLoading ? (
        <JobsSkeleton />
      ) : jobs.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-sm">No jobs found</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">{totalJobs} jobs found</p>
          <div className="space-y-3">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          {hasNextPage && (
            <div className="flex justify-center pt-4">
              <Button
                variant="outline"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? "Loading..." : "Load more"}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Users, 
  FileText, 
  Briefcase, 
  Search, 
  ArrowRight, 
  MapPin, 
  DollarSign, 
  Calendar,
  Sparkles,
  MessageSquare,
  ThumbsUp
} from "lucide-react";

import { useSearch } from "../hooks/useSearch";
import { SearchUser, SearchPost, SearchJob } from "../types/search";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { cn } from "@/lib/utils";

type SearchTab = "all" | "people" | "posts" | "jobs";

export const SearchResults = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const initialTab = (searchParams.get("type") as SearchTab) || "all";
  const [activeTab, setActiveTab] = useState<SearchTab>(initialTab);

  const { data, isLoading } = useSearch(query);

  const handleTabChange = (tab: SearchTab) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams);
    if (tab === "all") {
      params.delete("type");
    } else {
      params.set("type", tab);
    }
    router.replace(`/search?${params.toString()}`);
  };

  const usersCount = data?.users.length || 0;
  const postsCount = data?.posts.length || 0;
  const jobsCount = data?.jobs.length || 0;
  const totalCount = usersCount + postsCount + jobsCount;

  return (
    <div className="py-6 px-4 max-w-5xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Search className="size-5 text-primary" />
            Search results for &ldquo;<span className="text-primary">{query}</span>&rdquo;
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isLoading ? "Searching..." : `Found ${totalCount} result${totalCount === 1 ? "" : "s"}`}
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1.5 p-1 bg-muted/60 rounded-xl border border-border/50 self-start sm:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => handleTabChange("all")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap",
              activeTab === "all"
                ? "bg-background text-foreground shadow-sm font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Sparkles className="size-3.5" />
            All ({totalCount})
          </button>
          <button
            onClick={() => handleTabChange("people")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap",
              activeTab === "people"
                ? "bg-background text-foreground shadow-sm font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Users className="size-3.5" />
            People ({usersCount})
          </button>
          <button
            onClick={() => handleTabChange("posts")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap",
              activeTab === "posts"
                ? "bg-background text-foreground shadow-sm font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <FileText className="size-3.5" />
            Posts ({postsCount})
          </button>
          <button
            onClick={() => handleTabChange("jobs")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap",
              activeTab === "jobs"
                ? "bg-background text-foreground shadow-sm font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Briefcase className="size-3.5" />
            Jobs ({jobsCount})
          </button>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-4 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-muted" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-muted rounded w-1/3" />
                  <div className="h-3 bg-muted/60 rounded w-1/2" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : totalCount === 0 ? (
        <Card className="text-center py-12 px-4">
          <div className="size-14 rounded-full bg-muted/50 text-muted-foreground mx-auto flex items-center justify-center mb-3">
            <Search className="size-6" />
          </div>
          <h3 className="font-semibold text-base text-foreground">No matches found</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
            Try checking for typos or searching for broader terms like general job titles or names.
          </p>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* People Section */}
          {(activeTab === "all" || activeTab === "people") && usersCount > 0 && (
            <div className="space-y-3">
              {activeTab === "all" && (
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Users className="size-4 text-primary" /> People
                  </h2>
                  <Button variant="link" size="xs" onClick={() => handleTabChange("people")}>
                    See all {usersCount} people <ArrowRight className="size-3 ml-1" />
                  </Button>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data?.users.map((user: SearchUser) => (
                  <Card key={user.id} className="p-3.5 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <UserAvatar
                        user={user as any}
                        size="default"
                        href={`/profile/${user.id}`}
                      />
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/profile/${user.id}`}
                          className="font-semibold text-sm hover:underline text-foreground block truncate"
                        >
                          {user.firstName} {user.lastName}
                        </Link>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                          {user.headline || "Chancen member"}
                        </p>
                        <div className="mt-2.5 flex items-center gap-2">
                          <Link href={`/profile/${user.id}`}>
                            <Button size="xs" variant="outline" className="rounded-full text-xs">
                              View Profile
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Posts Section */}
          {(activeTab === "all" || activeTab === "posts") && postsCount > 0 && (
            <div className="space-y-3">
              {activeTab === "all" && (
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <FileText className="size-4 text-primary" /> Posts
                  </h2>
                  <Button variant="link" size="xs" onClick={() => handleTabChange("posts")}>
                    See all {postsCount} posts <ArrowRight className="size-3 ml-1" />
                  </Button>
                </div>
              )}
              <div className="space-y-3">
                {data?.posts.map((post: SearchPost) => (
                  <Card key={post.id} className="p-4 hover:shadow-sm transition-shadow">
                    <div className="flex items-start gap-3">
                      <UserAvatar
                        user={post.user as any}
                        size="default"
                        href={`/profile/${post.user.id}`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/profile/${post.user.id}`}
                            className="font-semibold text-sm hover:underline text-foreground"
                          >
                            {post.user.firstName} {post.user.lastName}
                          </Link>
                          <span className="text-xs text-muted-foreground">
                            • {new Date(post.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <Link href={`/posts/${post.id}`} className="block mt-2">
                          <p className="text-sm text-foreground/90 line-clamp-3 whitespace-pre-wrap">
                            {post.content}
                          </p>
                        </Link>
                        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="size-3.5" />
                            {post._count?.postLikes || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="size-3.5" />
                            {post._count?.comments || 0}
                          </span>
                          <Link
                            href={`/posts/${post.id}`}
                            className="text-primary hover:underline ml-auto"
                          >
                            Read discussion →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Jobs Section */}
          {(activeTab === "all" || activeTab === "jobs") && jobsCount > 0 && (
            <div className="space-y-3">
              {activeTab === "all" && (
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Briefcase className="size-4 text-primary" /> Jobs
                  </h2>
                  <Button variant="link" size="xs" onClick={() => handleTabChange("jobs")}>
                    See all {jobsCount} jobs <ArrowRight className="size-3 ml-1" />
                  </Button>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data?.jobs.map((job: SearchJob) => (
                  <Card key={job.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link
                            href={`/jobs/${job.id}`}
                            className="font-semibold text-sm hover:underline text-foreground block"
                          >
                            {job.title}
                          </Link>
                          <p className="text-xs text-muted-foreground">{job.company}</p>
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary shrink-0">
                          {job.type}
                        </span>
                      </div>

                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {job.description}
                      </p>

                      <div className="flex items-center gap-3 pt-2 text-xs text-muted-foreground">
                        {job.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="size-3" />
                            {job.location}
                          </span>
                        )}
                        {job.salary && (
                          <span className="flex items-center gap-1">
                            <DollarSign className="size-3" />
                            {job.salary}
                          </span>
                        )}
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-[11px] text-muted-foreground">
                          {job._count?.applications || 0} applicants
                        </span>
                        <Link href={`/jobs/${job.id}`}>
                          <Button size="xs" className="rounded-full text-xs">
                            View Job
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

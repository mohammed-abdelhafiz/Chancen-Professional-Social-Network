"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SearchIcon, XIcon, ArrowRight, Sparkles } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { useSearch } from "../hooks/useSearch";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { data, isLoading } = useSearch(query);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFocus = () => {
    if (query.trim().length > 0) {
      setIsOpen(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value.trim().length > 0) {
      setIsOpen(true);
    }
  };

  const handleClear = () => {
    setQuery("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim().length > 0) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSeeAll = () => {
    if (query.trim().length > 0) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const hasResults =
    data &&
    (data.users.length > 0 || data.posts.length > 0 || data.jobs.length > 0);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          placeholder="Search users, posts, jobs... (Press Enter)"
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          className="pl-9 pr-9"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 -translate-y-1/2 size-6"
          >
            <XIcon className="size-3.5" />
          </Button>
        )}
      </div>

      {isOpen && query.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border/80 rounded-xl shadow-xl z-50 overflow-hidden max-h-[440px] overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
              <Sparkles className="size-4 animate-pulse text-primary" />
              <span>Searching...</span>
            </div>
          ) : !hasResults ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No results found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            <>
              {data.users.length > 0 && (
                <div className="p-2">
                  <p className="text-xs font-semibold text-muted-foreground px-2 py-1 uppercase tracking-wider">
                    People
                  </p>
                  {data.users.slice(0, 3).map((user) => (
                    <Link
                      key={user.id}
                      href={`/profile/${user.id}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 p-2 hover:bg-muted/60 rounded-lg transition-colors"
                    >
                      <UserAvatar user={user as any} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {user.firstName} {user.lastName}
                        </p>
                        {user.headline && (
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {user.headline}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {data.posts.length > 0 && (
                <div className="p-2 border-t border-border/40">
                  <p className="text-xs font-semibold text-muted-foreground px-2 py-1 uppercase tracking-wider">
                    Posts
                  </p>
                  {data.posts.slice(0, 2).map((post) => (
                    <Link
                      key={post.id}
                      href={`/posts/${post.id}`}
                      onClick={() => setIsOpen(false)}
                      className="block p-2 hover:bg-muted/60 rounded-lg transition-colors"
                    >
                      <p className="text-sm line-clamp-2 text-foreground/90">{post.content}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        by {post.user.firstName} {post.user.lastName}
                      </p>
                    </Link>
                  ))}
                </div>
              )}

              {data.jobs.length > 0 && (
                <div className="p-2 border-t border-border/40">
                  <p className="text-xs font-semibold text-muted-foreground px-2 py-1 uppercase tracking-wider">
                    Jobs
                  </p>
                  {data.jobs.slice(0, 2).map((job) => (
                    <Link
                      key={job.id}
                      href={`/jobs/${job.id}`}
                      onClick={() => setIsOpen(false)}
                      className="block p-2 hover:bg-muted/60 rounded-lg transition-colors"
                    >
                      <p className="text-sm font-medium text-foreground">{job.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {job.company}
                      </p>
                    </Link>
                  ))}
                </div>
              )}

              <div className="p-2 bg-muted/40 border-t border-border/60">
                <button
                  onClick={handleSeeAll}
                  className="w-full py-1.5 px-2 text-xs font-semibold text-primary hover:text-primary/80 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>See all results for &ldquo;{query}&rdquo;</span>
                  <ArrowRight className="size-3" />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

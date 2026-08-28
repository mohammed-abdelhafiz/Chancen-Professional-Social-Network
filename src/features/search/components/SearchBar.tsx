"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearch } from "../hooks/useSearch";
import Link from "next/link";
import { UserAvatar } from "@/components/shared/UserAvatar";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
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

  const hasResults =
    data &&
    (data.users.length > 0 || data.posts.length > 0 || data.jobs.length > 0);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          placeholder="Search users, posts, jobs..."
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
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
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-lg shadow-lg z-50 overflow-hidden max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Searching...
            </div>
          ) : !hasResults ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No results found
            </div>
          ) : (
            <>
              {data.users.length > 0 && (
                <div className="p-2">
                  <p className="text-xs font-medium text-muted-foreground px-2 py-1">
                    People
                  </p>
                  {data.users.map((user) => (
                    <Link
                      key={user.id}
                      href={`/profile/${user.id}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 p-2 hover:bg-muted rounded-md"
                    >
                      <UserAvatar user={user} size="sm" />
                      <div>
                        <p className="text-sm font-medium">
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
                <div className="p-2 border-t">
                  <p className="text-xs font-medium text-muted-foreground px-2 py-1">
                    Posts
                  </p>
                  {data.posts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/feed#${post.id}`}
                      onClick={() => setIsOpen(false)}
                      className="block p-2 hover:bg-muted rounded-md"
                    >
                      <p className="text-sm line-clamp-2">{post.content}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        by {post.user.firstName} {post.user.lastName}
                      </p>
                    </Link>
                  ))}
                </div>
              )}

              {data.jobs.length > 0 && (
                <div className="p-2 border-t">
                  <p className="text-xs font-medium text-muted-foreground px-2 py-1">
                    Jobs
                  </p>
                  {data.jobs.map((job) => (
                    <Link
                      key={job.id}
                      href={`/jobs/${job.id}`}
                      onClick={() => setIsOpen(false)}
                      className="block p-2 hover:bg-muted rounded-md"
                    >
                      <p className="text-sm font-medium">{job.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {job.company}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

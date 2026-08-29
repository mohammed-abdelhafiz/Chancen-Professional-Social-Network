"use client";

import { AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "../../services/feed.api";
import { PostCard } from "./PostCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function PostDetail({ postId }: { postId: string }) {
  const { data: post, isLoading, isError } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPost(postId),
  });

  if (isLoading) return <div className="flex justify-center py-12"><Loader2 className="size-6 animate-spin text-muted-foreground" /></div>;
  if (isError || !post) return <Card><CardContent className="flex flex-col items-center gap-3 py-12 text-center"><AlertCircle className="size-8 text-destructive" /><p>Post not found.</p><Link href="/feed"><Button variant="outline"><ArrowLeft />Back to feed</Button></Link></CardContent></Card>;

  return <div className="mx-auto w-full max-w-2xl px-4 py-6"><Link href="/feed"><Button variant="ghost" size="sm" className="mb-3"><ArrowLeft />Back to feed</Button></Link><PostCard post={post} /></div>;
}

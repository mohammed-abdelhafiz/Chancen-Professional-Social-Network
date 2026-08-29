import { PostDetail } from "@/features/feed/components/feed/PostDetail";

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PostDetail postId={id} />;
}

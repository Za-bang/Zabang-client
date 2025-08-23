import CommunityPostDetail from "../Components/CommunutyPostDetail";
import { MOCK_COMMUNITY_POST } from "@/data/demoPosts";

export function generateStaticParams() {
  return MOCK_COMMUNITY_POST.map((p) => ({ id: p.id }));
}

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CommunityPostPage({ params }: PageProps) {
  const { id } = await params;

  const post = MOCK_COMMUNITY_POST.find((p) => p.id === id);
  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return <CommunityPostDetail post={post} />;
}

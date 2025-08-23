// import CommunityPostDetail from "../Components/CommunutyPostDetail";
// import { MOCK_COMMUNITY_POST } from "@/data/demoPosts";

// export function generateStaticParams() {
//   return MOCK_COMMUNITY_POST.map((p) => ({ id: p.id }));
// }

// export default function CommunityPostPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const post = MOCK_COMMUNITY_POST.find((p) => p.id === params.id);

//   if (!post) {
//     return <div>게시글을 찾을 수 없습니다.</div>;
//   }

//   return <CommunityPostDetail post={post} />;
// }

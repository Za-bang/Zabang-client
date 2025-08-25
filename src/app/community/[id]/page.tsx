import Client from "./Client";

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Array<{ id: string }>> {
  const ids = (process.env.COMMUNITY_IDS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return ids.map((id) => ({ id }));
}

export default function Page({ params }: { params: { id: string } }) {
  return <Client id={params.id} />;
}

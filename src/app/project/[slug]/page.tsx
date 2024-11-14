import { notFound } from "next/navigation";
import ClientProjectDetailPage from "./client-page";

export default async function ProjectDetail({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const projectResponse = await fetch(
    `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_ID}/${slug}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    },
  );

  if (!projectResponse.ok) {
    if (projectResponse.status === 404) {
      notFound();
    }
    throw new Error(`HTTP error! status: ${projectResponse.status}`);
  }

  const projectRawData = await projectResponse.json();

  if (!projectRawData.fields.Show) {
    notFound();
  }

  const { fields } = projectRawData;
  const project: ProjectDetail = {
    id: projectRawData.id,
    name: fields.Name,
    description: fields.Details,
    thumbnail: fields.Logo?.[0].thumbnails.large.url,
    oneLiner: fields["One-Liner"],
    tags: fields.Tags,
    index: fields.ID,
    website: fields.Website,
    twitter: fields.Twitter,
  };

  return <ClientProjectDetailPage project={project} />;
}

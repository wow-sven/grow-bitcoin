import { notFound } from "next/navigation";
import ClientProjectDetailPage from "./client-page";
import { projectsTable } from "@/utils/airtable";

export default async function ProjectDetail({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const projectsResponse = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_PROJECT_TABLE_ID}?filterByFormula=${encodeURIComponent(`{Slug} = "${slug}"`)}&maxRecords=1`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
  );
  const projectRawData = (await projectsResponse.json()).records[0];

  if (!projectRawData.fields.Show) {
    notFound();
  }

  const { fields } = projectRawData;
  const project: ProjectDetail = {
    id: projectRawData.id,
    slug: fields.Slug,
    name: fields.Name,
    description: fields.Details,
    thumbnail: fields.Logo?.[0].thumbnails.large.url,
    oneLiner: fields["One-Liner"],
    tags: fields.Tags,
    website: fields.Website,
    twitter: fields.Twitter,
    icon: `https://unavatar.io/x/${fields.Twitter.slice(fields.Twitter.lastIndexOf('/')+1)}`
  };

  return <ClientProjectDetailPage project={project} />;
}

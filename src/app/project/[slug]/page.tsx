import { notFound } from "next/navigation";
import ClientProjectDetailPage from "./client-page";
import { projectsTable } from "@/utils/airtable";

function getProject(slug: string): Promise<any> {
  console.log(slug)
  return new Promise((resolve, reject) => {
    projectsTable
      .select({
        filterByFormula: `{Slug} = "${slug}"`,
        maxRecords: 1,
      })
      .firstPage((err, records: any) => {
        if (err) {
          reject(err);
        } else {
          if (records.length > 0) {
            resolve(records[0]);
          } else {
            reject(new Error("Project not found"));
          }
        }
      });
  });
}

export default async function ProjectDetail({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  let projectRawData;
  try {
    projectRawData = await getProject(slug);
  } catch (error) {
    notFound();
  }

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
  };

  return <ClientProjectDetailPage project={project} />;
}

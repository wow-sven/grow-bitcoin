import ClientProjectsPage from "./client-page";

export default async function Projects() {
  const projectsResponse = await fetch(
    `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_PROJECT_TABLE_ID}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    },
  );
  const projectsRawData = await projectsResponse.json();

  const projects = projectsRawData.records.reduce((a: Project[], c: any) => {
    if (c.fields.Show) {
      const { fields } = c;
      a.push({
        id: c.id,
        slug: fields.Slug,
        name: fields.Name,
        thumbnail: fields.Logo?.[0].thumbnails.large.url,
        oneLiner: fields["One-Liner"],
        tags: fields.Tags || [],
      });
    }
    return a;
  }, []);

  const tags: string[] = Array.from(
    new Set<string>(projects.flatMap((i: Project) => i.tags)),
  ).sort((a, b) =>
    a.localeCompare(b, "en", {
      sensitivity: "base",
      numeric: true,
    }),
  );

  return <ClientProjectsPage projects={projects} tags={tags} />;
}

"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Flex,
  Grid,
  Group,
  Image,
  Input,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";

import { IconSearch, IconThumbUp, IconChevronDown } from "@tabler/icons-react";

function ProjectCard({ data }: { data: Project }) {
  return (
    <Card radius="lg" h="100%" display="flex" withBorder>
      <Group align="center" gap="xs">
        <Image
          src={data.thumbnail}
          alt="project name"
          w="40"
          miw="40"
          h="40"
          radius="50%"
        />
        <Title order={4}>{data.name}</Title>
      </Group>
      <Text c="gray.7" mt="8">
        {data.oneLiner}
      </Text>
      <Group gap="xs" mt="sm" mb="lg">
        {data.tags.map((tag) => (
          <Badge key={tag} bg="dark.3">
            {tag}
          </Badge>
        ))}
      </Group>
      <Flex align="center" justify="space-between" mt="auto">
        <Button
          size="xs"
          variant="outline"
          leftSection={<IconThumbUp size="1rem" />}
          radius="xl"
        >
          135 votes
        </Button>
        <Button
          component={Link}
          href={`/project/${data.slug}`}
          size="xs"
          radius="xl"
        >
          View Project
        </Button>
      </Flex>
    </Card>
  );
}

export default function ClientProjectsPage({
  projects,
  tags,
}: {
  projects: Project[];
  tags: string[];
}) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [mobileTocExpanded, setMobileTocExpanded] = useState(false);

  useEffect(() => {
    if (selectedTags.length === tags.length) {
      setSelectedTags([]);
    }
  }, [tags, selectedTags]);

  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0 && searchKeyword === "") return projects;

    if (selectedTags.length === 0 && !!searchKeyword.length) {
      return projects.filter((project) =>
        project.name.toLowerCase().includes(searchKeyword.toLowerCase()),
      );
    }

    return projects.filter(
      (project) =>
        selectedTags.some((tag) => project.tags.includes(tag)) &&
        project.name.toLowerCase().includes(searchKeyword.toLowerCase()),
    );
  }, [projects, selectedTags, searchKeyword]);

  const FilterCheckboxGroup = useMemo(
    () => (
      <Stack gap="xs" mt="md">
        <Checkbox
          label="All"
          checked={!selectedTags.length}
          onChange={(e) => {
            if (e.currentTarget.checked) {
              setSelectedTags([]);
            }
          }}
        />
        {tags.map((tag) => (
          <Checkbox
            key={tag}
            label={tag}
            checked={selectedTags.includes(tag)}
            onChange={(e) => {
              if (e.currentTarget.checked) {
                setSelectedTags([...selectedTags, tag]);
              } else {
                setSelectedTags(selectedTags.filter((t) => t !== tag));
              }
            }}
          />
        ))}
      </Stack>
    ),
    [selectedTags, tags],
  );

  return (
    <>
      <NavigationBar />

      <Container size="lg" py="lg">
        <Flex gap="lg" direction={{ base: "column", sm: "row" }}>
          <Box flex="none" w="10rem" component="aside" visibleFrom="md">
            <Box style={{ position: "sticky", top: "1rem" }}>
              <Title order={3} mb="xs">
                Filters
              </Title>
              {FilterCheckboxGroup}
            </Box>
          </Box>
          <Box flex={1}>
            <Box
              bg="white"
              style={{ position: "sticky", top: 0, zIndex: 3 }}
              hiddenFrom="md"
              py="md"
            >
              <Flex
                align="center"
                justify="space-between"
                onClick={() => setMobileTocExpanded(!mobileTocExpanded)}
              >
                <Title order={3}>Filters</Title>
                <IconChevronDown
                  style={{
                    transform: `rotate(${mobileTocExpanded ? "180deg" : "0deg"})`,
                  }}
                />
              </Flex>
              {mobileTocExpanded && FilterCheckboxGroup}
            </Box>

            <Flex gap="md" direction={{ base: "column", xs: "row" }}>
              <Input
                flex={1}
                placeholder="Search projects"
                leftSection={<IconSearch size="1.25rem" />}
                radius="md"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.currentTarget.value)}
              />
              <Select
                placeholder="Sort by Votes"
                data={["Highest to Lowest", "Lowest to Highest"]}
                comboboxProps={{ radius: "md" }}
                radius="md"
              />
            </Flex>
            <Grid pt="lg">
              {filteredProjects.length ? (
                filteredProjects.map((project) => (
                  <Grid.Col span={{ base: 12, xs: 6 }} key={project.id}>
                    <ProjectCard data={project} />
                  </Grid.Col>
                ))
              ) : (
                <Text>No Results</Text>
              )}
            </Grid>
          </Box>
        </Flex>
      </Container>

      <Footer />
    </>
  );
}

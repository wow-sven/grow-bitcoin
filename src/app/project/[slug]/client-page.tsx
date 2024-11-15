"use client";

import {
  Anchor,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Group,
  Image,
  Input,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";

import {
  IconChevronLeft,
  IconThumbUp,
  IconExternalLink,
} from "@tabler/icons-react";
import {useRouter} from "next/router";

export default function ProjectDetail({ project }: { project: ProjectDetail }) {

  return (
    <>
      <NavigationBar />

      <Container size="sm" py="xl">
        <Anchor component={Link} href="/projects" mb="md">
          <IconChevronLeft />
          Back to projects
        </Anchor>
        <Card mt="sm" radius="lg" withBorder>
          <Group align="center">
            <Image
              src={project.thumbnail}
              alt="project name"
              w="80"
              miw="80"
              h="80"
              radius="lg"
            />
            <Box>
              <Title order={2}>{project.name}</Title>
              <Text c="gray.7">{project.oneLiner}</Text>
            </Box>
          </Group>

          <Box mt="lg">
            <Title order={3}>About the Project</Title>
            <Text mt="8">{project.description}</Text>
          </Box>

          <Box mt="lg">
            <Title order={3}>Tags</Title>
            <Group mt="8">
              {project.tags.map((tag) => (
                <Badge key={tag} bg="dark.3">
                  {tag}
                </Badge>
              ))}
            </Group>
          </Box>

          <Group mt="lg">
            <Anchor
              href={project.website}
              style={{ display: "inline-flex", alignItems: "center", gap: 2 }}
            >
              Visit Website <IconExternalLink size="1em" />
            </Anchor>
            <Anchor
              href={project.twitter}
              style={{ display: "inline-flex", alignItems: "center", gap: 2 }}
            >
              Twitter <IconExternalLink size="1em" />
            </Anchor>
          </Group>

          {/*<Flex*/}
          {/*  align={{ base: "unset", xs: "center" }}*/}
          {/*  justify="space-between"*/}
          {/*  gap="xs"*/}
          {/*  mt="xl"*/}
          {/*  direction={{ base: "column", xs: "row" }}*/}
          {/*>*/}
          {/*  <Button*/}
          {/*    variant="outline"*/}
          {/*    leftSection={<IconThumbUp size="1.5em" />}*/}
          {/*    radius="xl"*/}
          {/*  >*/}
          {/*    124 Votes*/}
          {/*  </Button>*/}
          {/*  <Group gap="0">*/}
          {/*    <Input*/}
          {/*      flex={1}*/}
          {/*      placeholder="Amount"*/}
          {/*      radius="md"*/}
          {/*      styles={{*/}
          {/*        input: {*/}
          {/*          borderTopRightRadius: 0,*/}
          {/*          borderBottomRightRadius: 0,*/}
          {/*          borderRight: 0,*/}
          {/*        },*/}
          {/*      }}*/}
          {/*    />*/}
          {/*    <Button*/}
          {/*      radius="md"*/}
          {/*      style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}*/}
          {/*    >*/}
          {/*      Vote*/}
          {/*    </Button>*/}
          {/*  </Group>*/}
          {/*</Flex>*/}
          {/*<Flex ta="right" gap="xs" justify="flex-end" mt="6" c="gray.7">*/}
          {/*  <Text size="sm">Your $GROW Balance:</Text>*/}
          {/*  <Text size="sm">996 $GROW</Text>*/}
          {/*</Flex>*/}

          <Card bg="gray.0" radius="lg" mt="xl" p="lg">
            <Title order={4}>Your Votes</Title>
            <Text mt="4">
              You have voted 4 times for the project and earned 4 BitXP as well
              as 4 Project Alpha XP.
            </Text>
          </Card>
        </Card>
      </Container>

      <Footer />
    </>
  );
}

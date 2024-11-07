import Link from "next/link";
import { Box, Container, Stack, Flex, Anchor } from "@mantine/core";
import LogoSVG from "../assets/logo.svg";

import {
  IconBrandX,
  IconBrandInstagram,
  IconBrandYoutubeFilled,
  IconBrandLinkedin,
} from "@tabler/icons-react";

export default function Footer() {
  return (
    <Box mt="lg" py="md">
      <Container size="lg">
        <Stack>
          <Link href="/" style={{ width: "max-content" }}>
            <LogoSVG width={80} />
          </Link>

          <Flex gap="xs">
            <Anchor c="dark" href="https://twitter.com/RoochNetwork">
              <IconBrandX />
            </Anchor>
            <Anchor c="dark">
              <IconBrandInstagram />
            </Anchor>
            <Anchor c="dark">
              <IconBrandYoutubeFilled />
            </Anchor>
            <Anchor c="dark">
              <IconBrandLinkedin />
            </Anchor>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
}

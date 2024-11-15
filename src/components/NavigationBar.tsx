"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Container,
  Anchor,
  Flex,
  Button,
  UnstyledButton,
  Stack,
  Drawer,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import LogoSVG from "@/assets/logo.svg";

import { IconMenu2 } from "@tabler/icons-react";
import { useCurrentAddress } from "@roochnetwork/rooch-sdk-kit";
import { shortAddress } from "@/utils/address";
import { WalletConnectModal } from "./connect-model";
import { useState } from "react";

function DesktopNavigationBar({ style }: { style?: Object }) {
  const currentAddress = useCurrentAddress();
  const pathname = usePathname();

  const [showConnectModel, setShowConnectModel] = useState(false);

  return (
    <Box style={style}>
      <WalletConnectModal
        isOpen={showConnectModel}
        onClose={() => setShowConnectModel(false)}
      />
      <Container size="lg">
        <Flex py="md" align="center" gap="lg">
          <Link href="/">
            <LogoSVG height={56} />
          </Link>
          <Anchor
            component={Link}
            href="/"
            c="dark"
            underline="never"
            fw={pathname === "/" ? "500" : "400"}
          >
            Home
          </Anchor>
          <Anchor
            component={Link}
            href="/stake"
            c="dark"
            underline="never"
            fw={pathname === "/grow" ? "500" : "400"}
          >
            Get $GROW
          </Anchor>
          <Anchor
            component={Link}
            href="/projects"
            c="dark"
            underline="never"
            fw={pathname === "/projects" ? "500" : "400"}
          >
            Projects
          </Anchor>
          <Anchor
            component={Link}
            href="/docs"
            c="dark"
            underline="never"
            fw={pathname === "/docs" ? "500" : "400"}
          >
            Docs
          </Anchor>
          <Anchor
            component={Link}
            href="/portfolio"
            c="dark"
            underline="never"
            fw={pathname === "/portfolio" ? "500" : "400"}
          >
            My Portfolio
          </Anchor>
          <Button
            radius="md"
            ml="auto"
            onClick={() => {
              setShowConnectModel(currentAddress === undefined);
            }}
          >
            {currentAddress
              ? shortAddress(currentAddress.toStr())
              : "Connect Wallet"}
          </Button>
        </Flex>
      </Container>
    </Box>
  );
}

function MobileNavigationBar({ style }: { style?: Object }) {
  const [opened, { open, close }] = useDisclosure(false);
  const pathname = usePathname();

  const currentAddress = useCurrentAddress();
  const [showConnectModel, setShowConnectModel] = useState(false);

  return (
    <Box style={style}>
      <WalletConnectModal
        isOpen={showConnectModel}
        onClose={() => setShowConnectModel(false)}
      />
      <Container size="lg">
        <Flex py="md" align="center" gap="lg">
          <Link href="/">
            <LogoSVG height={56} />
          </Link>

          <UnstyledButton
            ml="auto"
            onClick={open}
            style={{ display: "flex", alignItems: "center" }}
          >
            <IconMenu2 />
          </UnstyledButton>

          <Button
            radius="md"
            onClick={() => {
              setShowConnectModel(currentAddress === undefined);
            }}
          >
            {currentAddress
              ? shortAddress(currentAddress.toStr())
              : "Connect Wallet"}
          </Button>
        </Flex>
      </Container>

      <Drawer opened={opened} onClose={close} title="Menu">
        <Stack gap="sm">
          <Button
            component={Link}
            href="/"
            style={{ borderRadius: "0.325rem" }}
            variant={pathname === "/" ? "filled" : "outline"}
          >
            Home
          </Button>
          <Button
            component={Link}
            href="/stake"
            style={{ borderRadius: "0.325rem" }}
            variant={pathname === "/stake" ? "filled" : "outline"}
          >
            Get $GROW
          </Button>
          <Button
            component={Link}
            href="/projects"
            style={{ borderRadius: "0.325rem" }}
            variant={pathname === "/projects" ? "filled" : "outline"}
          >
            Projects
          </Button>
          <Button
            component={Link}
            href="/docs"
            style={{ borderRadius: "0.325rem" }}
            variant={pathname === "/docs" ? "filled" : "outline"}
          >
            Docs
          </Button>
          <Button
            component={Link}
            href="/portfolio"
            style={{ borderRadius: "0.325rem" }}
            variant={pathname === "/portfolio" ? "filled" : "outline"}
          >
            My Portfolio
          </Button>
        </Stack>
      </Drawer>
    </Box>
  );
}

export default function NavigationBar({ style }: { style?: Object }) {
  const mobileMatches = useMediaQuery("(max-width: 48em)");

  if (mobileMatches) {
    return <MobileNavigationBar style={style} />;
  }

  return <DesktopNavigationBar style={style} />;
}

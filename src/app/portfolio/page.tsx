"use client";

import {useState, useMemo, useEffect} from "react";
import {
    Anchor,
    Box,
    Card,
    Center,
    CloseButton,
    Container,
    Flex,
    Grid,
    Input,
    Table,
    Text,
    Title,
    UnstyledButton,
} from "@mantine/core";
import Link from "next/link";

import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";

import {
    IconSearch,
    IconArrowsSort,
    IconSortAscending,
    IconSortDescending,
} from "@tabler/icons-react";
import {getTokenInfo, TokenInfo} from "@/app/stake/util";
import {useCurrentAddress, useRoochClient, useRoochClientQuery} from "@roochnetwork/rooch-sdk-kit";
import {useNetworkVariable} from "@/app/networks";

const entries = [
    {
        name: "Project Alpha",
        votes: 100,
        exEarned: 100,
        projectSlug: "",
    },
    {
        name: "Project Beta",
        votes: 250,
        exEarned: 250,
        projectSlug: "",
    },
    {
        name: "Project Gamma",
        votes: 50,
        exEarned: 50,
        projectSlug: "",
    },
];

function TableButton({
                         active,
                         order,
                         onClick,
                         children,
                     }: {
    active: boolean;
    order: "ASC" | "DESC";
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <UnstyledButton
            onClick={onClick}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
            }}
        >
            {children}
            {active ? (
                order === "ASC" ? (
                    <IconSortAscending size="1rem"/>
                ) : (
                    <IconSortDescending size="1rem"/>
                )
            ) : (
                <IconArrowsSort size="1rem" opacity={0.5}/>
            )}
        </UnstyledButton>
    );
}

export default function Portfolio() {
    const [sortColumn, setSortColumn] = useState("name");
    const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC");
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const client = useRoochClient();
    const addr = useCurrentAddress();
    const contractAddr = useNetworkVariable("contractAddr");
    const [balance, setBalance] = useState(0);
    const [RGasBalance, setRGasBalance] = useState(0)

    useEffect(() => {
        if (!addr) {
            return;
        }

        client.getBalance({owner: addr.genRoochAddress().toStr(), coinType: '0x3::gas_coin::RGas'}).then((result) => {
            setRGasBalance(Math.floor(Number(result.balance) / Math.pow(10, result.decimals)))
        })

        getTokenInfo(client, contractAddr).then((result) => {
            client
                .getBalance({
                    coinType: result.coinInfo.type,
                    owner: addr.genRoochAddress().toStr(),
                })
                .then((result) => {
                    console.log(result)
                    setBalance(Number(result.balance));
                });
        });
    }, [client, contractAddr, addr]);
    const handleSort = (column: string) => {
        if (column === sortColumn) {
            setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
        } else {
            setSortColumn(column);
            setSortOrder("ASC");
        }
    };

    const sortedAndFilteredEntries = useMemo(() => {
        const sortedEntries = [...entries].sort((a, b) => {
            let comparison = 0;
            if (sortColumn === "NAME") {
                comparison = a.name.localeCompare(b.name);
            } else if (sortColumn === "VOTES") {
                comparison = a.votes - b.votes;
            } else if (sortColumn === "EARNED") {
                comparison = a.exEarned - b.exEarned;
            }
            return sortOrder === "ASC" ? comparison : -comparison;
        });

        if (!searchKeyword) return sortedEntries;

        return sortedEntries.filter((entry) =>
            entry.name.toLowerCase().includes(searchKeyword.toLowerCase()),
        );
    }, [sortColumn, sortOrder, searchKeyword]);

    return (
        <>
            <NavigationBar/>

            <Container size="lg" py="xl">
                <Box>
                    <Title order={3}>My Portfolio</Title>
                    <Grid mt="md" gutter="lg">
                        <Grid.Col span={{base: 12, xs: 6, md: 3}}>
                            <Card radius="lg" withBorder>
                                <Flex align="center" justify="space-between">
                                    <Title order={6} c="gray.7">
                                        $GROW Balance
                                    </Title>
                                </Flex>
                                <Text size="2rem" lh="2.5rem" mt="4">
                                    {balance === 0 ? '-' : balance}
                                </Text>
                                {/*<Text size="sm" c="gray.7">*/}
                                {/*  $GROW tokens*/}
                                {/*</Text>*/}
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={{base: 12, xs: 6, md: 3}}>
                            <Card radius="lg" withBorder>
                                <Flex align="center" justify="space-between">
                                    <Title order={6} c="gray.7">
                                        $RGAS Balance
                                    </Title>
                                </Flex>
                                <Text size="2rem" lh="2.5rem" mt="4">
                                    {RGasBalance === 0 ? '-' : RGasBalance}
                                </Text>
                                {/*<Text size="sm" c="gray.7">*/}
                                {/*  $GROW tokens*/}
                                {/*</Text>*/}
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={{base: 12, xs: 6, md: 3}}>
                            <Card radius="lg" withBorder>
                                <Flex align="center" justify="space-between">
                                    <Title order={6} c="gray.7">
                                        Total BitXP Earned
                                    </Title>
                                </Flex>
                                <Text size="2rem" lh="2.5rem" mt="4">
                                    -
                                </Text>
                                {/*<Text size="sm" c="gray.7">*/}
                                {/*  $GROW tokens*/}
                                {/*</Text>*/}
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={{base: 12, xs: 6, md: 3}}>
                            <Card radius="lg" withBorder>
                                <Flex align="center" justify="space-between">
                                    <Title order={6} c="gray.7">
                                        Projects Voted
                                    </Title>
                                </Flex>
                                <Text size="2rem" lh="2.5rem" mt="4">
                                    -
                                </Text>
                                {/*<Text size="sm" c="gray.7">*/}
                                {/*  $GROW tokens*/}
                                {/*</Text>*/}
                            </Card>
                        </Grid.Col>
                    </Grid>
                </Box>

                <Box mt="3rem">
                    <Flex
                        align={{base: "unset", xs: "center"}}
                        justify="space-between"
                        direction={{base: "column", xs: "row"}}
                        gap="xs"
                    >
                        <Title order={3}>Voted Projects</Title>
                        <Input
                            leftSection={<IconSearch size="1.25rem"/>}
                            radius="md"
                            placeholder="Search projects..."
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.currentTarget.value)}
                            rightSectionPointerEvents="all"
                            rightSection={
                                <CloseButton
                                    aria-label="Clear input"
                                    onClick={() => setSearchKeyword("")}
                                    style={{display: searchKeyword ? undefined : "none"}}
                                />
                            }
                        />
                    </Flex>
                    <Card
                        mt="md"
                        p="0"
                        radius="lg"
                        style={{overflowX: "auto"}}
                        withBorder
                    >
                        <Table w="100%" miw="max-content">
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th px="lg" py="md">
                                        <TableButton
                                            active={sortColumn === "NAME"}
                                            order={sortOrder}
                                            onClick={() => handleSort("NAME")}
                                        >
                                            Project Name
                                        </TableButton>
                                    </Table.Th>
                                    <Table.Th px="lg" py="md">
                                        <TableButton
                                            active={sortColumn === "VOTES"}
                                            order={sortOrder}
                                            onClick={() => handleSort("VOTES")}
                                        >
                                            Votes
                                        </TableButton>
                                    </Table.Th>
                                    <Table.Th px="lg" py="md">
                                        <TableButton
                                            active={sortColumn === "EARNED"}
                                            order={sortOrder}
                                            onClick={() => handleSort("EARNED")}
                                        >
                                            XP Earned
                                        </TableButton>
                                    </Table.Th>
                                    <Table.Th px="lg" py="md" ta="right">
                                        Action
                                    </Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {!sortedAndFilteredEntries.length ? (
                                    sortedAndFilteredEntries.map((element) => (
                                        <Table.Tr key={element.name}>
                                            <Table.Td p="lg">{element.name}</Table.Td>
                                            <Table.Td p="lg">{element.votes}</Table.Td>
                                            <Table.Td p="lg">{element.exEarned}</Table.Td>
                                            <Table.Td p="lg" ta="right">
                                                <Anchor
                                                    component={Link}
                                                    href={element.projectSlug}
                                                    size="sm"
                                                >
                                                    View
                                                </Anchor>
                                            </Table.Td>
                                        </Table.Tr>
                                    ))
                                ) : (
                                    <Table.Tr>
                                        <Table.Td colSpan={4} p="lg">
                                            <Center>
                                                <Text c="gray.6">No projects found.</Text>
                                            </Center>
                                        </Table.Td>
                                    </Table.Tr>
                                )}
                            </Table.Tbody>
                        </Table>
                    </Card>
                </Box>
            </Container>

            <Footer/>
        </>
    );
}

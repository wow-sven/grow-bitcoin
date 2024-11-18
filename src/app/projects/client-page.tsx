"use client";

import {useEffect, useMemo, useState} from "react";
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

import {IconSearch, IconThumbUp, IconChevronDown} from "@tabler/icons-react";
import {useRoochClient, useRoochClientQuery} from "@roochnetwork/rooch-sdk-kit";
import {useNetworkVariable} from "@/app/networks";
import {AnnotatedMoveStructView} from "@roochnetwork/rooch-sdk/src/client/types/generated";
import {toB64} from "@roochnetwork/rooch-sdk";

function ProjectCard({project, contractProject}: { project: Project, contractProject?: ContractProjectType }) {
    console.log(project)
    return (
        <Card radius="lg" h="100%" display="flex" withBorder>
            <Group align="center" gap="xs">
                <Image
                    src={project.icon}
                    alt="project name"
                    w="40"
                    miw="40"
                    h="40"
                    radius="50%"
                />
                <Title order={4}>{project.name}</Title>
            </Group>
            <Text c="gray.7" mt="8">
                {project.oneLiner}
            </Text>
            <Group gap="xs" mt="sm" mb="lg">
                {project.tags.map((tag) => (
                    <Badge key={tag} bg="dark.3">
                        {tag}
                    </Badge>
                ))}
            </Group>
            <Flex align="center" justify="space-between" mt="auto">
                <Button
                    size="xs"
                    variant="outline"
                    loading={contractProject === undefined}
                    leftSection={<IconThumbUp size="1rem"/>}
                    radius="xl"
                >
                    135 votes
                </Button>
                <Button
                    component={Link}
                    size="xs"
                    href={`/project/${project.slug}`}
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
    // const contractAddr = useNetworkVariable('contractAddr')
    const contractAddr = '0x1d6f6657fc996008a1e43b8c13805e969a091560d4cea57b1db9f3ce4450d977'
    const client = useRoochClient()
    // const [contractProjectTable, setContractProjectTable] = useState<ContractProjectTableType>()
    const [contractProjects, _] = useState<Map<string, ContractProjectType>>(new Map())

    const {data: project_table} = useRoochClientQuery('queryObjectStates', {
        filter: {
            object_type: `${contractAddr}::grow_information_v3::GrowProjectList`
        },
        queryOption: {
            decode: true
        }
    })

    useEffect(() => {
        if (project_table) {
            const view = project_table.data[0].decoded_value!.value
            const tableId = (((view['project_list'] as AnnotatedMoveStructView).value['handle']) as AnnotatedMoveStructView).value['id'] as string
            const isOpen = view['is_open'] as boolean
            // setContractProjectTable({
            //   tableId: tableId,
            //   isOpen: view['is_open'] as boolean,
            // })
            client.listStates({
                accessPath: `/table/${tableId}`,
                stateOption: {
                    decode: true
                }
            }).then((_contractProjects) => {
                _contractProjects.data?.map((item) => {
                    const view = (item.state.decoded_value!.value['value'] as AnnotatedMoveStructView).value
                    const id = view['id'] as string
                    contractProjects.set(id, {
                        id: id,
                        isOpen: isOpen,
                        vote: view['vote_value'] as string
                    })
                })
                console.log(_contractProjects)
            })
        }
    }, [client, contractProjects, project_table]);


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
            <NavigationBar/>

            <Container size="lg" py="lg">
                <Flex gap="lg" direction={{base: "column", sm: "row"}}>
                    <Box flex="none" w="10rem" component="aside" visibleFrom="md">
                        <Box style={{position: "sticky", top: "1rem"}}>
                            <Title order={3} mb="xs">
                                Filters
                            </Title>
                            {FilterCheckboxGroup}
                        </Box>
                    </Box>
                    <Box flex={1}>
                        <Box
                            bg="white"
                            style={{position: "sticky", top: 0, zIndex: 3}}
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

                        <Flex gap="md" direction={{base: "column", xs: "row"}}>
                            <Input
                                flex={1}
                                placeholder="Search projects"
                                leftSection={<IconSearch size="1.25rem"/>}
                                radius="md"
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.currentTarget.value)}
                            />
                            <Select
                                placeholder="Sort by Votes"
                                data={["Highest to Lowest", "Lowest to Highest"]}
                                comboboxProps={{radius: "md"}}
                                radius="md"
                            />
                        </Flex>
                        <Grid pt="lg">
                            {filteredProjects.length ? (
                                filteredProjects.map((project) => (
                                    <Grid.Col span={{base: 12, xs: 6}} key={project.id}>
                                        <ProjectCard project={project}
                                                     contractProject={contractProjects.get(project.slug)}/>
                                    </Grid.Col>
                                ))
                            ) : (
                                <Text>No Results</Text>
                            )}
                        </Grid>
                    </Box>
                </Flex>
            </Container>

            <Footer/>
        </>
    );
}
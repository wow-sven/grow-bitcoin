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
import {useCurrentAddress, useCurrentSession, useRoochClient, useRoochClientQuery} from '@roochnetwork/rooch-sdk-kit'
import {Args, Transaction} from '@roochnetwork/rooch-sdk'
import {AnnotatedMoveStructView} from '@roochnetwork/rooch-sdk/src/client/types/generated'
import {useEffect, useState} from 'react'
import {getTokenInfo, TokenInfo} from '@/app/stake/util'
import {useNetworkVariable} from '@/app/networks'
import {WalletConnectModal} from '@/components/connect-model'
import {CreateSessionModal} from '@/components/session-model'

export default function ProjectDetail({ project }: { project: ProjectDetail }) {
  const [showConnectModel, setShowConnectModel] = useState(false);
  const [showCreateSessionModel, setShowCreateSessionModel] = useState(false);
  const session = useCurrentSession()
  const contractAddr = useNetworkVariable('contractAddr')
  const contractAddrTest = '0x1d6f6657fc996008a1e43b8c13805e969a091560d4cea57b1db9f3ce4450d977'
  const [balance, setBalance] = useState(-1);
  const [amount, setAmount] = useState('')
  const client = useRoochClient()
  const addr = useCurrentAddress()
  const projectListObj = Args.object({
    address: contractAddrTest,
    module:'grow_information_v5',
    name: 'GrowProjectList'
  })
  const { data } = useRoochClientQuery('executeViewFunction', {
    target: `${contractAddrTest}::grow_information_v5::borrow_grow_project`,
    args: [projectListObj, Args.string('test1')]
  })

  useEffect(() => {
    if (!addr) {
      return;
    }
    getTokenInfo(client, contractAddr).then((result) => {
      client
        .getBalance({
          coinType: result.coinInfo.type,
          owner: addr.genRoochAddress().toStr() || "",
        })
        .then((result) => {
          setBalance(Number(result.balance));
        });
    });
  }, [client, contractAddr, addr]);

  console.log(amount)

  const handleVote = async ()=> {
    if (addr === null) {
      setShowConnectModel(true)
      return
    }
    if (session === null) {
      setShowCreateSessionModel(true)
      return
    }
    const tx = new Transaction()
    tx.callFunction({
      target: `${contractAddrTest}::grow_information_v5::vote_entry`,
      args: [projectListObj, Args.string('test1'), Args.u256(BigInt(amount))]
    })
    const reuslt = await client.signAndExecuteTransaction({
      transaction: tx,
      signer: session
    })

    console.log(reuslt)
  }

  return (
    <>
      <NavigationBar />
      <WalletConnectModal isOpen={showConnectModel} onClose={() => setShowConnectModel(false)}/>
      <CreateSessionModal isOpen={showCreateSessionModel} onClose={() => setShowCreateSessionModel(false)}/>
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
          {data?.vm_status === 'Executed' ?
          <>
            <Flex
              align={{ base: "unset", xs: "center" }}
              justify="space-between"
              gap="xs"
              mt="xl"
              direction={{ base: "column", xs: "row" }}
            >
              <Button
                variant="outline"
                leftSection={<IconThumbUp size="1.5em" />}
                radius="xl"
                disabled={true}
              >
                {
                  (data!.return_values![0].decoded_value as AnnotatedMoveStructView).value['vote_value'] as string
                }
              </Button>
              <Group gap="0">
                <Input
                  flex={1}
                  placeholder="Amount"
                  radius="md"
                  disabled={!addr}
                  type='number'
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value)
                  }}
                  styles={{
                    input: {
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                      borderRight: 0,
                    },
                  }}
                />
                <Button
                  radius="md"
                  disabled={!addr}
                  style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                  onClick={handleVote}
                >
                  Vote
                </Button>
              </Group>
            </Flex>
            <Flex ta="right" gap="xs" justify="flex-end" mt="6" c="gray.7">
              {
                addr ? <>
                  <Text size="sm">{`Your $GROW Balance: ${balance === -1 ? '-' : balance}`}</Text>
                  {
                    balance === 0 ? <Link href={'/stake'} style={{ color: 'inherit', fontSize: 'smaller' }}>
                        <Text size="sm">To Stake</Text>
                      </Link>:
                      <></>
                  }
                  </>:<Text size="sm">Please connect your wallet first</Text>
              }
            </Flex></>:<></>
          }

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

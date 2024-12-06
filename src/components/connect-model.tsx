// Copyright (c) RoochNetwork
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react'
import { Modal, Button, Stack } from '@mantine/core'
import { useConnectWallet, useWallets, Wallet } from '@roochnetwork/rooch-sdk-kit'

interface WalletConnectModalProps {
  isOpen: boolean
  onClose: () => void
}

export const WalletConnectModal: React.FC<WalletConnectModalProps> = ({ isOpen, onClose }) => {
  const wallets = useWallets()
  const { mutateAsync: connectWallet } = useConnectWallet()
  const [installInfos, setInstallInfos] = useState<Map<string, boolean>>(new Map())

  useEffect(() => {
    wallets.forEach((v) => {
      v.checkInstalled().then((result) => {
        setInstallInfos((prevS) => {
          const newS = new Map(prevS)
          newS.set(v.getName(), result)
          return newS
        })
      })
    })
  }, [setInstallInfos, wallets])

  const handleConnectWallet = async (wallet: Wallet) => {
    if (installInfos.get(wallet.getName()) === false) {
      window.open(wallet.getInstallUrl(), '_blank')
      return
    }

    await connectWallet({ wallet })
    onClose()
  }

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title="Choose your preferred wallet to connect:"
      radius="md"
      yOffset="25vh"
    >
      <Stack mt="xs" gap="sm">
        {wallets.map((wallet) => (
          <Button
            disabled={installInfos.get(wallet.getName()) === undefined}
            radius="md"
            key={wallet.getName()}
            onClick={() => handleConnectWallet(wallet)}
          >
            {installInfos.get(wallet.getName()) === false
              ? `Install ${wallet.getName()}`
              : installInfos.get(wallet.getName()) === undefined
                ? `Checking ${wallet.getName()}`
                : wallet.getName()}
          </Button>
        ))}
      </Stack>
    </Modal>
  )
}

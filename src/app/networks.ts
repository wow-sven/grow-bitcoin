// Copyright (c) RoochNetwork
// SPDX-License-Identifier: Apache-2.0

import { getRoochNodeUrl } from '@roochnetwork/rooch-sdk';
import { createNetworkConfig } from '@roochnetwork/rooch-sdk-kit';

const { networkConfig, useNetworkVariable, useNetworkVariables } = createNetworkConfig({
	mainnet: {
		url: getRoochNodeUrl('mainnet'),
		variables: {
			contractAddr: '0x701c21bf1c8cd5af8c42983890d8ca55e7a820171b8e744c13f2d9998bf76cc3',
			contractVersion: 'v3'
		},
	},
	testnet: {
		url: getRoochNodeUrl('testnet'),
		variables: {
			contractAddr: '0x701c21bf1c8cd5af8c42983890d8ca55e7a820171b8e744c13f2d9998bf76cc3',
			contractVersion: 'v3'
		},
	},
	localnet: {
		url: getRoochNodeUrl('localnet'),
		variables: {
			contractAddr: '0x701c21bf1c8cd5af8c42983890d8ca55e7a820171b8e744c13f2d9998bf76cc3',
			contractVersion: 'v3'
		},
	},
});

export { networkConfig, useNetworkVariable, useNetworkVariables };
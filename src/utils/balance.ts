// Copyright (c) RoochNetwork
// SPDX-License-Identifier: Apache-2.0

export function formatBalance(balance: number, decimals: number, precision = 2) {
  const divisor = 10 ** decimals
  return Number((balance / divisor).toFixed(precision))
}

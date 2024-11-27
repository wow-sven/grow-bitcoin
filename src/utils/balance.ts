// Copyright (c) RoochNetwork
// SPDX-License-Identifier: Apache-2.0
export function formatBalance(number: number): string {
  return Intl.NumberFormat('en-us').format(number)
}

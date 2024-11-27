// Copyright (c) RoochNetwork
// SPDX-License-Identifier: Apache-2.0
export function getXAvatar(xUrl: string): string {
  if (xUrl.endsWith('/')) {
    xUrl = xUrl.slice(0, -1)
  }

  return `https://unavatar.io/x/${xUrl.slice(xUrl.lastIndexOf('/') + 1)}`
}

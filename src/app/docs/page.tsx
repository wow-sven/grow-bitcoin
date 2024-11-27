// Copyright (c) RoochNetwork
// SPDX-License-Identifier: Apache-2.0
import getDocumentHTML from './getDocumentHTML'
import ClientDocPage from './client-page'
import './page.scss'

export default async function Docs() {
  const { contentHTML, tocHTML } = await getDocumentHTML()

  return <ClientDocPage contentHTML={contentHTML} tocHTML={tocHTML} />
}

// Copyright (c) RoochNetwork
// SPDX-License-Identifier: Apache-2.0
import Airtable from 'airtable'

const projectsBase = new Airtable({
  apiKey: process.env.AIRTABLE_ACCESS_TOKEN,
}).base(process.env.AIRTABLE_BASE_ID!)

const projectsTable = projectsBase(process.env.AIRTABLE_PROJECT_TABLE_ID!)

export { projectsTable }

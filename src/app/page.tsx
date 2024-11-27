// Copyright (c) RoochNetwork
// SPDX-License-Identifier: Apache-2.0
import Home from '@/app/client-page'

export default async function Index() {
  const projectsResponse = await fetch(
    `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_FAQ_TABLE_ID}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    },
  )

  const projectsData = await projectsResponse.json()

  const faqList: FAQ[] = projectsData.records.reduce((a: FAQ[], c: any) => {
    const { fields } = c
    a.push({
      id: '',
      icon: '',
      questions: fields.Questions,
      answer: fields.Answer,
    })
    return a
  }, [])

  const shortFaqList = faqList.sort((a, b) => a.answer.length - b.answer.length)
  return (
    <>
      <Home faq={shortFaqList} />
    </>
  )
}

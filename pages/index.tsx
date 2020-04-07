import matter from 'gray-matter'
import { useLocalJsonForm } from 'next-tinacms-json'

import Layout from '../components/Layout'
import BlogList from '../components/BlogList'
import React from 'react'
import { NextPage } from 'next'

interface IProps {
  jsonFile: any
  allBlogs: any
}

const Index: NextPage<IProps> = ({ jsonFile, allBlogs }) => {
  const formOptions = {
    fields: [
      {
        name: 'title',
        label: 'Site Title',
        component: 'text',
      },
      {
        name: 'description',
        label: 'Site Description',
        component: 'text',
      },
      {
        name: 'repositoryUrl',
        label: 'Repository Url',
        component: 'text',
      },
    ],
  }
  const [data] = useLocalJsonForm(jsonFile, formOptions)

  return (
    <Layout
      pathname="/"
      siteTitle={data.title}
      siteDescription={data.description}
    >
      <section>
        <BlogList allBlogs={allBlogs} />
      </section>
    </Layout>
  )
}

export default Index

Index.getInitialProps = async function () {
  const content = await import(`../data/config.json`)
  // get all blog data for list
  const posts = ((context) => {
    const keys = context.keys()
    const values = keys.map(context)
    const data = keys.map((key, index) => {
      // Create slug from filename
      const slug = key
        .replace(/^.*[\\\/]/, '')
        .split('.')
        .slice(0, -1)
        .join('.')
      const value: any = values[index]
      // Parse yaml metadata & markdownbody in document
      const document = matter(value.default)
      return {
        document,
        slug,
      }
    })
    return data
  })(require.context('../posts', true, /\.md$/))

  return {
    jsonFile: {
      fileRelativePath: `src/data/config.json`,
      data: content.default,
    },

    allBlogs: posts,
  }
}

import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'

const PageTemplate = ({ title }) => (
  <div>{ title }</div>
);


const Page = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <PageTemplate
        title={frontmatter.title}
      />
    </Layout>
  )
}

export default Page

export const pageQuery = graphql`
  query PatientsPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "patients-page" } }) {
      frontmatter {
        title
      }
    }
  }
`

import React, {useState} from 'react'
import { graphql } from 'gatsby'
import axios from 'axios'
import { ThemeProvider, css } from 'styled-components'

import theme from '../themes/default'
import Layout from '../components/Layout'
import {
  FullWidthImage,
  Content,
  Title,
  Subtitle,
  Form,
  Select,
  Button,
} from '../components/Common'

const PageTemplate = ({ title, subtitle, backgroundImage, form, onSubmit }) => (
  <FullWidthImage backgroundImage={backgroundImage} imageStyle={css`
    filter: blur(3px) brightness(1.3) grayscale(0.5);
    opacity: 0.6;
  `} style={{
    flexDirection: 'column',
  }}>
    <Content >
      <Title><span>{title}</span></Title>
      <Subtitle><span>{subtitle}</span></Subtitle>
    </Content>
    <Content>
      <Form onSubmit={onSubmit}>
        <div className="field is-horizontal">
          <div className="control" style={{width: '100%'}}>
            <Select name="searchType" {...form.searchType} style={{ width: '68%', marginRight: '10px'}}/>
            <Select name="location" {...form.location} style={{ width: '28%'}}/>
          </div>
        </div>
        <div className="field" style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '40px',
        }}>
          <div className="control">
            <Button style={{
              width: '150px',
            }}>{form.action}</Button>
          </div>
        </div>
      </Form>
    </Content>
  </FullWidthImage>
);

const Page = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  const [searchResults, setSearchResults] = useState({});

  const onSubmit = async (e) => {
    console.log(e.target);

    const result = await axios(
      '/.netlify/functions/hello',
    );

    console.log(result)

    setSearchResults(result);
  }

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <PageTemplate
          {...frontmatter}
          onSubmit={onSubmit}
        />
      </Layout>
    </ThemeProvider>
  )
}

export default Page

export const pageQuery = graphql`
  query PatientsPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "patients-page" } }) {
      frontmatter {
        title
        subtitle
        backgroundImage {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        form {
          searchType {
            placeholder
            items {
              value
              title
            }
          }
          location {
            placeholder
            items {
              value
              title
            }
          }
          action
        }
      }
    }
  }
`

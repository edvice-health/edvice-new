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

const PageTemplate = ({ title, subtitle, backgroundImage, form, onSubmit, searchResults }) => {
  const [state, setState] = useState({})

  return <React.Fragment>
    {!searchResults && <FullWidthImage backgroundImage={backgroundImage} imageStyle={css`
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
        <Form onSubmit={(e) => {
          e.preventDefault()
          onSubmit(state)}
        }>
          <div className="field is-horizontal">
            <div className="control" style={{width: '100%'}}>
              <Select
                name="searchType"
                {...form.searchType}
                style={{ width: '68%', marginRight: '10px'}}
                onChange={e => setState({...state, searchType: e.target.value})}
              />
              <Select
                name="location"
                {...form.location}
                style={{ width: '28%'}}
                onChange={e => setState({...state, location: e.target.value})}
              />
            </div>
          </div>
          <div className="field" style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '40px',
          }}>
            <div className="control">
              <Button
                style={{ width: '150px' }}
                disabled={!state.searchType || !state.location}
              >{form.action}</Button>
            </div>
          </div>
        </Form>
      </Content>
    </FullWidthImage>}
    {searchResults && <div className="section">
      <div className="container">
        <div className="content">
          <div className="columns multiline" style={{ flexWrap: 'wrap' }}>
            {searchResults.map(specialist => (
              <div key={specialist.id} className="is-parent column is-6">
                <Specialist {...specialist}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>}
  </React.Fragment>
}

const Specialist = ({ name, tags = [], description, }) => (
  <div className="card">
    <div className="card-content">
      <div className="media">
        <div className="media-left">
          <figure className="image is-96x96" style={{ margin: 0 }}>
            <img src="https://bulma.io/images/placeholders/96x96.png" alt="" />
          </figure>
        </div>
        <div className="media-content">
          <p className="title is-4">{name}</p>
          <p className="subtitle is-6">
            {tags.map(tag => <span key={tag}>{tag}</span>)}
          </p>
        </div>
      </div>

      <div className="content">{description}</div>
    </div>
  </div>
)

const Page = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = async (params) => {
    console.log(params)

    const { data } = await axios(
      '/.netlify/functions/hello', { params }
    );

    if (!data || !data.results) {
      setError("Could not load data");
      return;
    }

    setSearchResults(data.results);
  }

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        {error ? <div>
          <h1>Error <span role="img" aria-label="">😵</span></h1>
          <p>{error}</p>
        </div> : <PageTemplate
          {...frontmatter}
          searchResults={searchResults}
          onSubmit={onSubmit}
        />}
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

/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import styled, { css, ThemeProvider } from 'styled-components'

import theme from '../themes/default'
import Layout from '../components/Layout'
import { FullWidthImage, ButtonStyle } from '../components/Common'
import logo from '../img/logo.svg'

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
}) => (
  <div>
    <FullWidthImage backgroundImage={image} imageStyle={css`
      filter: brightness(1.1);
      opacity: 0.6;
    `}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
      }}>
        <div
          style={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Separator/>
          <img src={logo} alt="Edvice" style={{ width: '170px', height: '150px' }} />
          <Separator/>
        </div>
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            padding: '28px 10px',
            alignSelf: 'flex-end',
            position: 'absolute',
            bottom: 0,
          }}
        >
          <Button to="/patients" style={{marginLeft: '30vw'}}>Patients</Button>
          <Button to="/index" style={{marginRight: '30vw'}}>Specialists</Button>
        </div>
      </div>
    </FullWidthImage>
    {/*<PitchSection mainpitch={mainpitch} heading={heading} description={description} intro={intro} />*/}
  </div>
)

const Button = styled(Link).attrs({
  className: 'button is-size-6'
})`
  ${ButtonStyle}
  min-width: 120px;
  margin: 0 15px;
`;

const Separator = styled.div`
  flex-grow: 1;
  position: relative;
  &:after {
    content: '';
    width: 1px;
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    background-color: ${props => props.theme.colors.white};
  }
`

const PitchSection = ({ mainpitch, heading, description, intro, }) => (
  <section className="section section--gradient">
    <div className="container">
      <div className="section">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="content">
              <div className="content">
                <div className="tile">
                  <h1 className="title">{mainpitch.title}</h1>
                </div>
                <div className="tile">
                  <h3 className="subtitle">{mainpitch.description}</h3>
                </div>
              </div>
              <div className="columns">
                <div className="column is-12">
                  <h3 className="has-text-weight-semibold is-size-2">
                    {heading}
                  </h3>
                  <p>{description}</p>
                </div>
              </div>
              <Features gridItems={intro.blurbs} />
              <div className="columns">
                <div className="column is-12 has-text-centered">
                  <Link className="btn" to="/products">
                    See all products
                  </Link>
                </div>
              </div>
              <div className="column is-12">
                <h3 className="has-text-weight-semibold is-size-2">
                  Latest stories
                </h3>
                <BlogRoll />
                <div className="column is-12 has-text-centered">
                  <Link className="btn" to="/blog">
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <IndexPageTemplate
          image={frontmatter.image}
          title={frontmatter.title}
          heading={frontmatter.heading}
          subheading={frontmatter.subheading}
          mainpitch={frontmatter.mainpitch}
          description={frontmatter.description}
          intro={frontmatter.intro}
        />
      </Layout>
    </ThemeProvider>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`

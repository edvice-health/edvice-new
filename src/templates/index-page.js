import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Features from '../components/Features'
import BlogRoll from '../components/BlogRoll'
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
    <div
      className="full-width-image margin-top-0"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`,
        backgroundPosition: `center`,
        backgroundAttachment: `fixed`,
        minHeight: `calc(100vh - 52px)`,
        'position': 'relative',
      }}
    >
      <div style={{ position: 'absolute', 'top': 0, 'left': 0, 'right': 0, 'bottom': 0, background: 'rgba(255,255,255,0.5)'}}/>
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
          }}
        >
          <img src={logo} alt="Edvice" style={{ width: '170px', height: '150px' }} />
        </div>
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            padding: '20px 10px',
            alignSelf: 'flex-end',
          }}
        >
          <Button to="/patients">Patients</Button>
          <Button to="/index">Specialists</Button>
        </div>
      </div>
    </div>
    {/*<PitchSection mainpitch={mainpitch} heading={heading} description={description} intro={intro} />*/}
  </div>
)

//#64CAC2
//#59B4DC

const Button = ({ children, to }) => (
  <Link className="btn" to={to}
    style={{
      display: 'block',
      textAlign: 'center',
      // background: 'rgb(100,202,194)',
      background: 'linear-gradient(110deg, rgba(100,202,194,1) 0%, rgba(89,180,220,1) 100%)',
      color: '#fff',
      boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.1)',
      borderRadius: '3px',
      fontSize: '1rem',
      padding: '10px',
      width: '45%',
      maxWidth: '250px',
      margin: '0 10px',
    }}
  >
    { children }
  </Link>
);

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

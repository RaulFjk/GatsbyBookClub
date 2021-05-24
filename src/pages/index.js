import * as React from "react"
import { Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import BookItem from "../components/BookItem"
import Helmet from "react-helmet"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = props => {
  return (
    <section>
      <Helmet>
        <html lang="en" />
        <title>Google</title>
        <meta
          name="google-site-verification"
          content="96Jn-meJ8QUTjUvtxgo9HoyP7iPLjlKKipVvRFAv_D4"
        />
      </Helmet>
      {/* <SEO title="Home" /> */}
      {props.data.allBook.edges.map(edge => (
        <BookItem
          bookCover={edge.node.localImage.childImageSharp.gatsbyImageData}
          authorName={edge.node.author.name}
          bookSummary={edge.node.summary}
          bookTitle={edge.node.title}
        >
          <div className="flex justify-end">
            <Link to={`/book/${edge.node.id}`}>
              <span className="hover:underline text-purple-700 text-right">
                Join conversation
              </span>
            </Link>{" "}
          </div>
        </BookItem>
      ))}
    </section>
  )
}
export const query = graphql`
  {
    allBook {
      edges {
        node {
          summary
          title
          localImage {
            childImageSharp {
              gatsbyImageData(layout: FIXED, width: 300)
            }
          }
          id
          author {
            name
          }
        }
      }
    }
  }
`

export default IndexPage

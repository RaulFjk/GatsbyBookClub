import React, { useContext } from "react"
import Layout from "../components/layout"
import styled from "styled-components"
import "../components/layout.css"
import BookItem from "../components/BookItem"
import BookComments from "../components/BookComments"
import { graphql } from "gatsby"
import { FirebaseContext } from "../components/Firebase"

const BookTemplate = props => {
  const { firebase } = useContext(FirebaseContext)
  return (
    <section>
      <BookItem
        bookCover={props.data.book.localImage.childImageSharp.gatsbyImageData}
        authorName={props.data.book.author.name}
        bookSummary={props.data.book.summary}
        bookTitle={props.data.book.title}
      />
      {!!firebase && (
        <BookComments firebase={firebase} bookId={props.data.book.id} />
      )}
    </section>
  )
}

export const query = graphql`
  query BookQuery($bookId: String!) {
    book(id: { eq: $bookId }) {
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
`

export default BookTemplate

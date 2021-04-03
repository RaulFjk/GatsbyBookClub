import React from 'react';
import Layout from '../components/layout'
import styled from 'styled-components'
import "../components/layout.css"
import BookItem from '../components/BookItem'
import { graphql } from 'gatsby'




const BookTemplate = (props) => {
    return (
        <Layout>
           <BookItem 
           bookCover={props.data.book.localImage.childImageSharp.gatsbyImageData}
           authorName={props.data.book.author.name}
           bookSummary={props.data.book.summary}
           bookTitle={props.data.book.title}
           />   
        </Layout>
    )
}

export const query = graphql`
    query BookQuery($bookId: String!){
        book(id: {eq: $bookId }){
            summary
            title
            localImage{
              childImageSharp{
                  gatsbyImageData(layout: FIXED
                    width: 300)
                }
            }
            id
            author {
                        name
            }
        }
    }
`;



export default BookTemplate;
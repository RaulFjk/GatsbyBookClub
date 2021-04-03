import React from 'react';
import "../components/layout.css"
import { GatsbyImage,  getImage } from "gatsby-plugin-image"



const BookItem = ({authorName, bookSummary, bookTitle, bookCover, children}) => {
    // const image = getImage(bookCover)
    return (
        <section className="flex border-2 border-gray-200 p-3 mb-3">
            <div classname="max-w-xs">
                <GatsbyImage image={bookCover} alt="book cover"/>
            </div>
            <div className="flex-grow pl-5">
                <h2>
                    {bookTitle}  <small className="text-sm pl-2 text-gray-400">{authorName}</small>
                </h2>
                <p>
                    {bookSummary}
                </p>
                <div>
                    {children}
                </div>
            </div>
        </section>
    )
}

export default BookItem;
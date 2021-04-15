import { comment } from "postcss"
import React, { useEffect, useState } from "react"
import moment from 'moment';

const BookComments = ({ firebase, bookId }) => {
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const unsubscribe = firebase.subscribeToBookComments({
      bookId,
      onSnapshot: snapshot => {
        console.log(snapshot)
        const snapshotComments = []
        snapshot.forEach(doc => {
          snapshotComments.push({
            id: doc.id,
            ...doc.data(),
          })
        })

        setComments(snapshotComments)
      },
    })

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

  console.log(comments)

  function handlePostCommentSubmit(e){
    e.preventDefault();
    console.log(commentText);
    firebase.postComment({
      text: commentText,
      bookId
    });
  }

  return (
    
    <div>
        <form className="flex my-6" onSubmit={handlePostCommentSubmit}>
            <textarea className="border-2 flex-grow mx-auto my-auto" onChange={e => {
              e.persist();
              setCommentText(e.target.value);
            }} /> 
            <button type="submit" className=" border-2 p-2 bg-purple-800 text-white ml-4 my-auto">Post Comment</button>
        </form>
      {comments.map(comment => (
        <div className="text-xs text-gray-700 border-b-2 p-2 " key={comment.id}>
          <strong>{comment.username} - {moment(comment.dateCreated.toDate()).format('HH:mm Do MMM YYYY')}</strong>
          <div>{comment.text}</div>
        </div>
      ))}
    </div>
  )
}

export default BookComments

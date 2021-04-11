import { comment } from "postcss"
import React, { useEffect, useState } from "react"

const BookComments = ({ firebase, bookId }) => {
  const [comments, setComments] = useState([])

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

  return (
    
    <div>
        <div className="flex my-6">
            <textarea className="border-2 flex-grow mx-auto my-auto" /> 
            <button className=" border-2 p-2 bg-purple-800 text-white ml-4 my-auto">Post Comment</button>
        </div>
      {comments.map(comment => (
        <div className="text-xs text-gray-700 border-b-2 p-2 " key={comment.id}>
          <strong>{comment.username}</strong>
          <div>{comment.text}</div>
        </div>
      ))}
    </div>
  )
}

export default BookComments

import firebase from "firebase"
import React, { useState, useContext, useEffect } from "react"
import { FirebaseContext } from "../components/Firebase"

const AddAuthor = () => {
  const {firebase} = useContext(FirebaseContext);
  const [authorName, setAuthorName] = useState("")
  const [success, setSuccess] = useState(false)

  let isMounted = true;

  useEffect(() =>{
    return () => {
      isMounted = false;
    }
  })

  function handleSubmit(e) {
    e.preventDefault()

    firebase
      .createAuthor({
        authorName,
      })
      .then(() => {
        if(isMounted){
          setAuthorName('');
          setSuccess(true);
        }
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-3xl w-full font-bold text-dark flex justify-center mb-5 ">
        <span>Add new author</span>
      </h1>
      <label
        for="author"
        className="block text-s font-bold text-dark uppercase"
      >
        Author
      </label>
      <input
        className="block rounded-lg w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
        name="author"
        onChange={e => {
          e.persist()
          setSuccess(false)
          setAuthorName(e.target.value)
        }}
        value={authorName}
        placeholder="author name"
        type="text"
      />
      {!!success && <span>Author has been successfully created!</span>}
      <button
        className="w-full py-3 mt-6 font-medium tracking-widest rounded-md text-white uppercase bg-purple-800 shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
        type="submit"
      >
        Add new author
      </button>
    </form>
  )
}

export default AddAuthor

import { func } from "prop-types"
import React, { useContext, useState, useEffect } from "react"
import { FirebaseContext } from "../components/Firebase"

let fileReader;

if(typeof window !== 'undefined'){
  fileReader = new FileReader();
}

const AddBook = () => {
  const { firebase } = useContext(FirebaseContext)
  const [authors, setAuthors] = useState([])
  const [bookCover, setBookCover] = useState('');
  const [bookName, setBookName] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [summary, setSummary] = useState('');
  const [success, setSuccess] = useState(false);

  let isMounted = true;

  useEffect(() => {
    return () => {
      isMounted = false;
    }
  }, [])

  useEffect(() => {
    fileReader.addEventListener('load', () =>{
        setBookCover(fileReader.result);
    })
  }, [])

  //useEffect is sinonym to ComponentWillMount/componentDidMount
  useEffect(() => {
    //query all the available authors
    if (firebase) {
      firebase.getAuthors().then(snapshot => {
        if(isMounted){
        const availableAuthors = []
        snapshot.forEach(doc => {
          availableAuthors.push({
            id: doc.id,
            ...doc.data(),
          })
        })

        setAuthorId(availableAuthors[0].id);

        setAuthors(availableAuthors)
      }
      })
    }
  }, [firebase])

  function handleSubmit(e){
      e.preventDefault();
      firebase.createBook({
        bookCover,
        bookName,
        authorId,
        summary
      }).then(() => {
        if(isMounted){
          setSuccess(true);
        }
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-3xl w-full font-bold text-dark flex justify-center mb-5 ">
        <span>Add new book</span>
      </h1>
      <label for="book" className="block text-s font-bold text-dark uppercase">
        Book Name
      </label>
      <input
        className="block rounded-lg w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
        name="book"
        value={bookName}
        onChange={e => {
            e.persist();
            setSuccess(false);
            setBookName(e.target.value);
        }}
        placeholder="author name"
        type="text"
      />
      <label
        for="author"
        className="block text-s font-bold text-dark uppercase mt-3 "
      >
        Select Author Name
      </label>
      <select 
      className="border-2 rounded w-full p-3 mt-2 bg-gray-200 focus:bg-gray-300 text-gray-700 focus:outline-none"
      value={authorId}
      onChange={e => {
        e.persist();
        setSuccess(false);
        setAuthorId(e.target.value);
    }} >
        {authors.map(a => (
          <option key={a.id} value={a.id}>
            {a.name}
          </option>
        ))}
      </select>
      <label
        for="bookCover"
        className="block text-s font-bold text-dark mt-10 uppercase"
      >
        Book Cover
      </label>
      <input
        type="file"
        name="bookCover"
        onChange={e => {
            e.persist();
            setSuccess(false);
            fileReader.readAsDataURL(e.target.files[0])
        }}
        className="block rounded-lg w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
      />
       <label
        for="bookCover"
        className="block text-s font-bold text-dark mt-10 uppercase"
      >
        Summary
      </label>
      <textarea
       className="block rounded-lg w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
       value={summary}
       type="text"
       onChange={e => {
        e.persist();
        setSuccess(false);
        setSummary(e.target.value);
    }}
       />
       {!!success && <span>Book added with success!</span>}
      <button
        className="w-full py-3 mt-6 font-medium tracking-widest rounded-md text-white uppercase bg-purple-800 shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
        type="submit"
      >
        Add new book
      </button>
    </form>
  )
}

export default AddBook

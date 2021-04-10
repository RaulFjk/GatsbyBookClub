import React, { useState } from "react"

const Register = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  function handleSubmit(e) {
    e.preventDefault()
  }

  function handleInputChange(e) {
    setFormValues(currentValues =>({
        ...currentValues,
        [e.target.name]: e.target.value
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-3xl w-full font-bold text-dark flex justify-center mb-5 ">
        <span>Register</span>
      </h1>
      <label for="email" className="block text-s font-bold text-dark uppercase">
        E-mail
      </label>
      <input
        className="block rounded-lg w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
        name="email"
        onChange={handleInputChange}
        placeholder="email"
        type="email"
      />
      <label
        for="password"
        className="block mt-2 text-s font-bold text-dark uppercase"
      >
        Password
      </label>
      <input
        className="block rounded-lg w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
        name="password"
        onChange={handleInputChange}
        placeholder="password"
        type="password"
      />
      <label className="block mt-2 text-s font-bold text-dark uppercase">
        Confirm Password
      </label>
      <input
        className="block rounded-lg w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
        name="confirmPassword"
        onChange={handleInputChange}
        placeholder="confirm password"
        type="password"
      />
      <button
        className="w-full py-3 mt-6 font-medium tracking-widest rounded-md text-white uppercase bg-purple-800 shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
        type="submit"
      >
        Register
      </button>
    </form>
  )
}

export default Register

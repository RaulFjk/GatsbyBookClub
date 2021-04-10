import React,{ useState, useContext } from "react"
import { Link, navigate } from "gatsby"
import { FirebaseContext } from '../components/Firebase';
import SEO from "../components/seo"

const LoginPage = () => {

    const [formValues, setFormValues] = useState({email: '', password: ''});
    const { firebase } = useContext(FirebaseContext);

    function handleSubmit(e){
        e.preventDefault();

        firebase.login({email: formValues.email, password: formValues.password});
        navigate('/');
    }

    function handleInputChange(e) {
        e.persist();
        setFormValues(currentValues => ({
            ...currentValues,
            [e.target.name]: e.target.value
        }));
    }
    return (
        <section>
             <div className="grid grid-cols-6 w-full h-full">
                <div className="col-start-2 col-span-4 p-12 bg-purple-600 mb-5 rounded-lg shadow-xl bg-transparent bg-opacity-60 sm:w-8/12 md:w-1/2 lg:w-11/12">
                    <form onSubmit={handleSubmit}>
                        <h1 className="text-3xl w-full font-bold text-dark flex justify-center mb-5 "><span>Sign in</span></h1>
                        <label for="email" className="block text-s font-bold text-dark uppercase">E-mail</label>
                        <input value={formValues.email} className="block rounded-lg w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"  name="email" onChange={handleInputChange} placeholder="email" type="email" />
                        <label for="password" className="block mt-2 text-s font-bold text-dark uppercase">Password</label>
                        <input value={formValues.password} className="block rounded-lg w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" name="password" onChange={handleInputChange} placeholder="password" type="password" />
                        <button className="w-full py-3 mt-6 font-medium tracking-widest rounded-md text-white uppercase bg-purple-800 shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none" type="submit">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );

} 

export default LoginPage;

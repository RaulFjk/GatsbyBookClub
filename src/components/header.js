import PropTypes from "prop-types"
import { Link, navigate } from "gatsby"
import React, {useContext} from 'react'
import {FirebaseContext} from './Firebase'
import  SignedOutLinks from '../components/SignedOutLinks'

const Header = ({ siteTitle }) => {
  const {firebase, user} = useContext(FirebaseContext);
  console.log(user);

  function handleLogOutClick(){
    firebase.logout().then(()=> navigate('/login'));
  }
  return(
    <header
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
          display: 'flex'
        }}
      >
        <h1 style={{ margin: 0, flexGrow: 1 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
        <div className="my-auto mx-0">
          {!!user && !!user.email &&
            <div className="flex">
              {!!user.isAdmin &&
              <div className="mr-3"> 
                <Link className="text-white" to="/add-author">
                  Add author
                </Link>
                <span>|</span>
                <Link className="text-white" to="/add-book">
                  Add book
                </Link>
              </div>
              }
              Hello, {user.username || user.email}
              <div className="text-right">
                 <button onClick={handleLogOutClick} className="hover:underline hover:text-white cursor-pointer">Logout</button>
              </div>
            </div>
          }
          {
            (!user || !user.email) && 
            <SignedOutLinks />
          }
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import CentredHEading from '../../../components/headings/centred'
import RegistrationForm from '../../../components/forms/reg-form'
import CenteredElement from '../../../components/frames/centered-element'

const Registration = () => {

  useEffect(() => {
    document.title = 'Quiz App | Create Account';

  }, []);
  return (
    <CenteredElement height='100vh'>
      <div className="card-shadow p-3 mt-lg-5 mt-2">
        <div className="my-lg-3 my-1">
          <CentredHEading title='Sign Up' />
        </div>
        <RegistrationForm />
        <small>Having an account ? <Link to='/teacher-login' >Login</Link></small>
      </div>
    </CenteredElement>
  )
}

export default Registration

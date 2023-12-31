import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import CentredHEading from '../../../components/headings/centred'
import LoginForm from '../../../components/forms/login-form'
import CenteredElement from '../../../components/frames/centered-element'

const Login = () => {

  useEffect(() => {
    document.title = 'Quiz App | Log In';

  }, []);

  return (
    <CenteredElement height='100vh'>
      <div className="card-shadow p-3 mt-lg-5 mt-2">
        <div className="my-lg-3 my-1">
          <CentredHEading title='Log In' />
        </div>
        <LoginForm />
        <small>Not registered with us ? <Link to='/teacher-register' >create now</Link> </small>
      </div>
    </CenteredElement>
  )
}

export default Login

import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AdminMiddleware = (props) => {
  const { authData } = useAuth()

  if (!authData.isAuth) {
    return <Navigate to="/admin/login" />
  }

  return <>{props.children}</>
}

export default AdminMiddleware
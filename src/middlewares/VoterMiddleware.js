import React from 'react'
import { Navigate } from 'react-router-dom'
import { useVoter } from '../context/VoterContext'

const VoterMiddleware = (props) => {
  const { voterData } = useVoter()

  if (!voterData.isValid) {
    return <Navigate to="/login" />
  }

  return <>{props.children}</>
}

export default VoterMiddleware
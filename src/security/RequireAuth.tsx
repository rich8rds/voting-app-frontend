import { Navigate, Outlet, useLocation } from "react-router-dom"
import { GetEmailFromToken } from '../security/roleUrlRouter'


const RequireAuth = () => {
  const location = useLocation()
  const { email } = GetEmailFromToken() 

  console.log(`requireAuth: ${email}`)
  return (
    email ? <Outlet /> : <Navigate to="/login" state={ { from: location } } />
  )
}

export default RequireAuth
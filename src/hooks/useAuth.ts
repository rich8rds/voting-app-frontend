import { useContext } from "react"
import { AuthContext } from "../context/useAuthContext"

 const useAuth = () => useContext(AuthContext)

 export default useAuth
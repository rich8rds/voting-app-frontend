import { Link } from 'react-router-dom'
import '../scss/navbar.scss'
import useAuth from '../hooks/useAuth';
import { GetEmailFromToken } from '../security/roleUrlRouter'

const Navbar = () => {
    const { email } = GetEmailFromToken() 
    const { SignOut } = useAuth()

    const handleLogout = () => SignOut()

  return (
    <section className="navbar">

    <div className="display">
      <div className="left" > Live Votes </div>

      <div className="middle">
        <Link className="nav-link" to="/">Votes</Link>
        { email ? 
          <Link className="nav-link remove-border" onClick={handleLogout} to="/login">Logout</Link> :
          <Link className="nav-link remove-border" to="/login">Login</Link> 
        }
        {/* { */}
          {/* email ? <Link className='nav-link' to='/login'></Link> : "" */}
        {/* } */}
        <Link className="nav-link remove-border" to="/register">Register</Link>
      </div>
    </div>

    </section>
  );
};

export default Navbar;

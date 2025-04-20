import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }
  return (
    <>
      <nav className="navv">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
        <ul className="ull">
          <Link to="/" className="nav-text">
            <li>Home</li>
          </Link>
          <Link to="/jobs" className="nav-text">
            <li>Jobs</li>
          </Link>
        </ul>
        <button className="btn" onClick={onLogout}>
          Logout
        </button>
      </nav>
    </>
  )
}

export default withRouter(Header)

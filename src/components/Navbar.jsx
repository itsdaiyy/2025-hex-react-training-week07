import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../services/apiAuth";

// 重構成共用組件
function Navbar({ routes = [], hasLogoutBtn = false }) {
  const navigate = useNavigate();
  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <nav
      className="navbar bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container">
        <ul className="navbar-nav flex-row gap-5 fs-5">
          {routes.map((route) => (
            <li className="nav-item" key={route.path}>
              <NavLink className="nav-link" aria-current="page" to={route.path}>
                {route.name}
              </NavLink>
            </li>
          ))}
          {hasLogoutBtn && (
            <li className="nav-item">
              <button className="nav-link" onClick={handleLogout}>
                登出
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

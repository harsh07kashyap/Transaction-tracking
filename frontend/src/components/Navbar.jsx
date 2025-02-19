import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";


const Navbar = () => {
  return (
    <>
      <div className={`${styles.header} container`}>
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4  border-bottom">
          <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
              <a className={`${styles.myClass} navbar-brand`} href="#">
                <i className="bi bi-flower1"></i>
                Transaction Tracking
              </a>
            </div>
          </nav>

          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link to="/" className={`${styles.myClass1} nav-link px-2`}>
                TRANSACTIONS
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className={`${styles.myClass1} nav-link px-2`}
              >
                DASHBOARD
              </Link>
            </li>
            <li>
              <Link to="/budgets" className={`${styles.myClass1} nav-link px-2`}>
                BUDGET
              </Link>
            </li>
            
          </ul>
         
          </header>
          </div>
          </>
  );
};

export default Navbar;
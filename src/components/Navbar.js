import { Link } from 'react-router-dom';

import styles from '../styles/navbar.module.css';

const Navbar= ()=>{
    return(
        <div className={styles.nav}>
            <div className={styles.leftDiv}>
                <Link to="/">
                    <img src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png" alt=''/>
                </Link>
            </div>
            <div className={styles.rightNav}>
                <div className={styles.user}>
                    <a href='/'>
                    <img src="https://cdn-icons.flaticon.com/png/128/2202/premium/2202112.png?token=exp=1641154389~hmac=f187d32f1036e6335e0df8e005cffd20" alt='' className={styles.userDp}/> 
                    </a>
                    <span>Parth</span>
                </div>

                <div className={styles.navLinks}>
                    <ul>
                        <li>
                            <Link to="/login">Log In</Link>
                        </li>
                        <li>
                            <a href='/'>Log Out</a>
                        </li>
                        <li>
                            <a href="/">Register</a>
                        </li>
                    </ul>
                    
                </div>
            </div>
        </div>
    )
}

export default Navbar;
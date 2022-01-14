import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';

import styles from '../styles/navbar.module.css';

const Navbar= ()=>{
    const auth = useAuth();

    return(
        <div className={styles.nav}>
            <div className={styles.leftDiv}>
                <Link to="/">
                    <img src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png" alt=''/>
                </Link>
            </div>
            <div className={styles.rightNav}>
                {auth.user && (<div className={styles.user}>
                    <Link to="/settings">
                    <img 
                    src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png" 
                    alt="error" 
                    className={styles.userDp} /> 
                    </Link>
                    <span>{auth.user.name}</span>
                </div>)}

                <div className={styles.navLinks}>
                    <ul>
                        {auth.user ?
                         <>
                            <li>
                                <button onClick={auth.logout}>Log Out</button>
                            </li>
                         </>
                         : <>
                                <li>
                                    <Link to="/login">Log In</Link>
                                </li>
                                
                                <li>
                                    <Link to="/register">Sign Up</Link>
                                </li>
                            </>}
                        
                    </ul>
                    
                </div>
            </div>
        </div>
    )
}

export default Navbar;
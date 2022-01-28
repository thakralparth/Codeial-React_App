import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { searchUsers } from '../api';
import { useAuth } from '../hooks';

import styles from '../styles/navbar.module.css';

const Navbar= ()=>{
    const [results,setResults] = useState([]);
    const [searchText, setSearchText] = useState('');
    const auth = useAuth();

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await searchUsers(searchText);

            if(response.success) {
                setResults(response.data.users);
            }
        };

        if(searchText.length > 2){
            fetchUsers();
        }else{
            setResults([]);
        }
    },[searchText]);

    return(
        <div className={styles.nav}>
            <div className={styles.leftDiv}>
                <Link to="/">
                    <img src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png" alt=''/>
                </Link>
            </div>


            <div className={styles.searchContainer}>
                <img 
                className={styles.searchIcon}
                src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png"
                alt=""
                />

                <input 
                placeholder="search users"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                />

                {results.length > 0 && (
                    <div className={styles.searchResults}>
                        <ul>
                            {results.map((user) => (
                                <li className={styles.searchResultsRow}
                                key={`user-${user._id}`}
                                
                                >
                                    <Link to={`/user/${user._id}`} >
                                        <img 
                                        src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png"
                                        alt=""
                                        />
                                        <span>{user.name}</span>
                                    </Link>

                                </li>
                            ))}
                        </ul>
                    </div>
                ) }
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
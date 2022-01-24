import styles from '../styles/settings.module.css';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks';
import { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { fetchUserProfile } from '../api';
import { Loader } from '../components';


const UserProfile= () =>{
    const[user,setUser] = useState({});
    const [loading,setLoading]=useState(true);
    const { userId } = useParams();
    const { addToast } = useToasts();
    const navigate= useNavigate();
    const auth = useAuth();
    console.log('auth',auth);
    // const location = useLocation();
    // console.log('location',location);
    
    // const {user = {}}=location.state;  //user ={} if state is empty user is empty object
    

    console.log('userId',userId);

    useEffect(()=>{
        const getUser = async () => {
            const response = await fetchUserProfile(userId);
            console.log('response',response);

            if(response.success){
                setUser(response.data.user);
            }else{
                addToast(response.message,{
                    appearance:'error'
                });
                 navigate('/');
            }

            setLoading(false);
        }

        getUser();
    },[userId,navigate,addToast]);
    
    if(loading){
        return <Loader />;
    }


    const checkIfUserIsAFriend = ()=>{
        const friends = auth.user.friends;
        console.log('friends', friends);
        const friendIds = friends.map((friend) => friend.to_user._id);
        const index = friendIds.indexOf(userId);

        if(index!== -1){
            return true;
        }
        return false;
    }

    // const showAddFriendsBtn = checkIfUserIsAFriend();
    return (
        <div className={styles.settings}>
            <div className={styles.imgContainer}>
                <img
                src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png"
                alt=""
                />
            </div>

            <div className={styles.field}>
                <div className={styles.fieldLabel}>Email</div>
                <div className={styles.fieldValue}>{user.email}</div>
            </div>

            <div className={styles.field}>
                <div className={styles.fieldLabel}>Name</div>
                
                    <div className={styles.fieldValue}>{user.name}</div>

                
            </div>
            

            <div className={styles.btnGrp}>
                {checkIfUserIsAFriend() ? (<button className={`button ${styles.saveBtn}`}>Remove Friend</button>) :
                    (<button className={`button ${styles.saveBtn}`}>Add Friend</button>)
                
            }
                    
                    

            </div>
        </div>
    )
}


export default UserProfile;
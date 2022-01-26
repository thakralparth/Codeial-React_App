import { Link } from "react-router-dom";
import { useAuth } from "../hooks"
import styles from '../styles/home.module.css';


const FriendsList = ()=>{
    const auth= useAuth();
    const { friends =[] }=auth.user;

    return (
        <div className={styles.friendsList}>
            <div className={styles.header}>
                Friends
            </div>

            {friends && friends.length ===0 &&(
                <div className={styles.noFriends}>No Friends</div>
            )}

            {friends && friends.map((friend)=>(
                <div key ={`friend-${friend.to_user._id}`}>
                    <Link className={styles.friendsItem} to={`/user/${friend.to_user._id}`}>
                        <div className={styles.friendsImg}>
                            <img 
                            src="https://cdn-icons.flaticon.com/png/128/924/premium/924915.png?token=exp=1643203027~hmac=d072d0ce9f0bf83a44966e2818730b4e"
                            alt=""
                            />
                        </div>
                        <div className={styles.friendsName}>{friend.to_user.email}</div>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default FriendsList;
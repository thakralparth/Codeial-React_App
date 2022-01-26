import PropTypes from 'prop-types';
// import {Comment} from '../components';
import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { getPosts } from '../api';
import { Loader,Comment,FriendsList, CreatePost } from '../components';

import styles from '../styles/home.module.css';
import { useAuth } from '../hooks';

const Home = () => {
    const [posts, setPosts] =  useState([]);
  const [loading, setLoading]=useState(true);
  const auth = useAuth();
  

  useEffect(()=>{
    const fetchPosts = async ()=>{
      const response = await getPosts();
      // console.log('response',response);
      if(response.success){
        setPosts(response.data.posts);
      }

      setLoading(false);
    }

    fetchPosts();

  },[]);

  if (loading){
    return <Loader />
  }

  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        <CreatePost />
          {posts.map((post)=>(
              <div className={styles.postWrapper} key={`post-${post._id}`}>
              <div className={styles.postHeader}>
                <div className={styles.postAvatar}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/4333/4333609.png"
                    alt="user-pic"
                  />
                  <div>
                    <Link to={`/user/${post.user._id}`} className={styles.postAuthor}>{post.user.name}</Link>
                    <span className={styles.postTime}>a minute ago</span>
                  </div>
                </div>
                <div className={styles.postContent}>{post.content}</div>
      
                <div className={styles.postActions}>
                  <div className={styles.postLike}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/126/126473.png"
                      alt="likes-icon"
                    />
                    <span>{post.likes.length}</span>
                  </div>
      
                  <div className={styles.postCommentsIcon}>
                    <img
                      src="https://cdn-icons.flaticon.com/png/128/3193/premium/3193015.png?token=exp=1643204576~hmac=bfe6727df3ff820486ce98230f65e22b"
                      alt="comments-icon"
                    />
                    <span>2</span>
                  </div>
                </div>
                <div className={styles.postCommentBox}>
                  <input placeholder="Start typing a comment" />
                </div>
      
                <div className={styles.postCommentsList}>
                    {post.comments.map((comment)=>(
                        <Comment comment={comment} />
                    ))}
                  
                </div>
              </div>
            </div>
          ))}
        
      </div>
      {auth.user && <FriendsList />}
    </div>
  );
};

Home.propTypes={
    posts:PropTypes.object.isRequired,
}

export default Home;

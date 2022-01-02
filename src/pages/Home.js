import styles from '../styles/home.module.css';

const Home = ({posts}) => {
  return (
    <div className={styles.postsList}>
        {posts.map((post)=>(
            <div className={styles.postWrapper}>
            <div className={styles.postHeader}>
              <div className={styles.postAvatar}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/4333/4333609.png"
                  alt="user-pic"
                />
                <div>
                  <span className={styles.postAuthor}>{post.user.name}</span>
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
                  <span>5</span>
                </div>
    
                <div className={styles.postCommentsIcon}>
                  <img
                    src="https://cdn-icons.flaticon.com/png/128/2076/premium/2076218.png?token=exp=1641130904~hmac=267c6407f0159e69e91738eb7c121ac5"
                    alt="comments-icon"
                  />
                  <span>2</span>
                </div>
              </div>
              <div className={styles.postCommentBox}>
                <input placeholder="Start typing a comment" />
              </div>
    
              <div className={styles.postCommentsList}>
                <div className={styles.postCommentsItem}>
                  <div className={styles.postCommentHeader}>
                    <span className={styles.postCommentAuthor}>Bill</span>
                    <span className={styles.postCommentTime}>a minute ago</span>
                    <span className={styles.postCommentLikes}>22</span>
                  </div>
    
                  <div className={styles.postCommentContent}>Random comment</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      
    </div>
  );
};

export default Home;

import PropTypes from "prop-types";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import { createComment } from '../api';
import { usePosts } from '../hooks';
import styles from '../styles/home.module.css';
import { Comment } from './';

const Post = ({post}) => {
  const [comment, setComment] = useState('');
  const [creatingComment, setCreatingComment]=useState(false);
  const posts= usePosts();
  const { addToast } = useToasts();

  const handleAddComment = async (e) =>{
    if(e.key === 'Enter'){
      setCreatingComment(true);

      const response = await createComment(comment,post._id);

      if(response.success){
        setComment('');
        posts.addComment(response.data.comment,post._id);
        addToast('Comment created successfully',{
          appearance:'success'
        });
      }else{
        addToast(response.message,{
          appearance:'error',
        });
      }

      setCreatingComment(false);
    }
  };

  return(

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
                  <input 
                  placeholder="Start typing a comment"
                  value={comment}
                  onChange={(e)=>setComment(e.target.value)}
                  onKeyDown={handleAddComment}
                  />
                </div>
      
                <div className={styles.postCommentsList}>
                    {post.comments.map((comment)=>(
                        <Comment comment={comment} />
                    ))}
                  
                </div>
              </div>
            </div>

  )
}

Post.propTypes = {
  posts: PropTypes.object.isRequired,
};

export default Post;

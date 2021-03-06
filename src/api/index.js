import { API_URLS,LOCALSTORAGE_TOKEN_KEY } from "../utils";
import { getFormBody } from "../utils";

const customFetch= async (url,{ body , ...customConfig })=>{    //body -> userid/password    destructure
    const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);   //get token from API after logging in for storing in local storgae

    const headers={
        // 'content-type': 'application/json',
        // Accept: 'application/json'
        'content-type': 'application/x-www-form-urlencoded',  //server accepts data in format form-urlencoded
    }

    if(token){
        headers.Authorization = `Bearer ${token}`;
    }

    const config={
        ...customConfig,
        headers:{
            ...headers,
            ...customConfig.headers,
        }
    }
    
    if(body){
        // config.body = JSON.stringify(body);
        config.body=getFormBody(body);
    }
    


    try{
        const response = await fetch(url,config);
        const data= await response.json();

        if(data.success){
            return {
                data:data.data,
                success: true,
            }
        }
        throw new Error(data.message);
    }catch(error){
        console.log(error);
        return {
            message:error.message,
            success: false,
        }
    }
};

export const getPosts=(page=1,limit=5)=>{
    return customFetch(API_URLS.posts(page, limit),{
        method: 'GET',
    });
};

export const login=(email,password)=>{
    return customFetch(API_URLS.login(),{
        method: 'POST',
        body: {email,password},
    });
};

export const register = async (name , email , password , confirmPassword ) => {
    return customFetch(API_URLS.signup(),{
        method: 'POST',
        body: { name , email, password , confirm_password: confirmPassword },
    });
}

export const editProfile = async (userId, name , password , confirmPassword ) => {
    return customFetch(API_URLS.editUser(),{
        method: 'POST',
        body: { id:userId, name ,  password , confirm_password: confirmPassword },
    });
}

export const fetchUserProfile=(userId)=>{
    return customFetch(API_URLS.userInfo(userId),{
        method: 'GET',
    });
};

export const fetchUserFriends = () => {
    return customFetch(API_URLS.friends(), {
      method: 'GET',
    });
  };

  export const addFriend = (userId) => {
    return customFetch(API_URLS.createFriendship(userId), {
      method: 'POST',
    });
  };

  export const removeAFriend = (userId) => {
    return customFetch(API_URLS.removeFriend(userId), {
      method: 'POST',
    });
  };

  export const addPost = (content) => {
    return customFetch(API_URLS.createPost(), {
      method: 'POST',
      body:{
          content,
      }
    });
  };

  export const createComment = async (content, postId) => {
      return customFetch(API_URLS.comment(),{
          method:'POST',
          body:{
              post_id: postId,
              content, 
          }
      });
  };


  export const toggleLike = (itemId, itemType) => {
    return customFetch(API_URLS.toggleLike(itemId,itemType), {
      method: 'POST',
    });
  };

  export const searchUsers = ( Searchtext)=> {
    return customFetch(API_URLS.searchUsers(Searchtext), {
      method: 'GET',
    });
  };



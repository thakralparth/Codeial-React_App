// import { useEffect, useState } from 'react';

import { BrowserRouter as Router,Routes, Route,Link, Navigate } from 'react-router-dom'
import { Loader,Navbar } from './';
// import { getPosts } from '../api';
import { Home, Login, Settings, Signup,UserProfile} from '../pages'
import { useAuth } from '../hooks';


function PrivateRoute({children}){
  const auth =useAuth();

  return auth.user ? children : <Navigate to="/login" />
     
    
    
      // if(auth.user){
      //   return children;
      // }

      // return <Navigate to="/login" />
    
    
  
}

const About = ()=>{
  return <h1>About</h1>
}

const UserInfo = ()=>{
  return <h1>UserInfo</h1>
}

const Page404 = ()=>{
  return <h1>404</h1>
}

function App() {
  // const [posts, setPosts] =  useState([]);
  // const [loading, setLoading]=useState(true);
  const auth=useAuth();

  // useEffect(()=>{
  //   const fetchPosts = async ()=>{
  //     const response = await getPosts();
  //     // console.log('response',response);
  //     if(response.success){
  //       setPosts(response.data.posts);
  //     }

  //     setLoading(false);
  //   }

  //   fetchPosts();

  // },[]);

  if (auth.loading){
    return <Loader />
  }
  return (
    <div className="App">
      {/* <h1>Hello World</h1> */}
      <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Home posts={posts}/>} /> */}
          
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
          
        

        <Route path="/register" element={<Signup />} />

        <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />

        <Route path="/user/:userId" element={<PrivateRoute ><UserProfile /></PrivateRoute>} />

        
          
        

        <Route path="/userinfo" element={<UserInfo />} />
          
        {/* <Route path="*" element={<Page404 />} /> */}
        
      </Routes>
      </Router>
    
    </div>
  );
}

export default App;

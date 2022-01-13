// import { useEffect, useState } from 'react';

import { BrowserRouter as Router,Routes, Route,Link } from 'react-router-dom'
import { Loader,Navbar } from './';
// import { getPosts } from '../api';
import { Home, Login, Signup} from '../pages'
import { useAuth } from '../hooks';


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
          
        

        <Route path="/userinfo" element={<UserInfo />} />
          
        <Route path="*" element={<Page404 />} />
        
      </Routes>
      </Router>
    
    </div>
  );
}

export default App;

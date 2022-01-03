import { useEffect, useState } from 'react';

import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import { Loader,Navbar } from './';
import { getPosts } from '../api';
import { Home, Login } from '../pages'


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
  const [posts, setPosts] =  useState([]);
  const [loading, setLoading]=useState(true);


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
    <div className="App">
      {/* <h1>Hello World</h1> */}
      <Navbar />
      <Router>
      <Routes>
        <Route path="/" element={<Home posts={posts}/>} />
          
        

        <Route path="/login" element={<Login />} />
          
        

        <Route path="/about" element={<About />} />
          
        

        <Route path="/userinfo" element={<UserInfo />} />
          
        <Route path="*" element={<Page404 />} />
        
      </Routes>
      </Router>
    
    </div>
  );
}

export default App;

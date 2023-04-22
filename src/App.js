import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './views/Home/Home.js';
import About from './views/About/About.js';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import { AuthProvider } from './contexts/AuthContext';
import {onAuthStateChanged} from 'firebase/auth'
import {useState, useEffect} from 'react'
import { useAuthentication } from './hooks/useAuthentication';
import CreatePost from './views/CreatePost/CreatePost';
import Dashboard from './views/Dashboard/Dashboard';
import Search from './views/Search/Search';
import Post from './views/Post/Post';
import EditPost from './views/EditPost/EditPost';

function App() {
  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()
  const loadingUser = user === undefined

  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      setUser(user)
    })
  }, [auth])

  if(loadingUser){
    return <p>Carregando...</p>
  }
  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <NavBar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/search" element={<Search />} />
              <Route path="/posts/:id" element={<Post />} />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/register"
                element={!user ? <Register /> : <Navigate to="/" />}
              />
              <Route
                path="/posts/create"
                element={user ? <CreatePost /> : <Navigate to="/login" />}
              />
              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/posts/edit/:id"
                element={user ? <EditPost /> : <Navigate to="/login" />}
              />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;

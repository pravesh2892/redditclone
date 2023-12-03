
import './App.css';
import Rightbar from './Components/Rightbar/Rightbar';
import Sidebar from './Components/Sidebar/SIdebar';
import Navbar from './Components/navBar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import RedditQr from './Components/redditQr/RedditQr';
import SignIn from './Pages/SignIn/SignIn';
import Signup from './Pages/singup/Signup';


function App() {
  return (
    <>
    <Router>
    <Sidebar />
    <Navbar />
    {/* <Rightbar /> */}
   <Routes>
    <Route  path="/" element={<Home />}/>
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<Signup />} />
    <Route  path="/redditqr" element={<RedditQr />}/>
   </Routes>
   </Router>
 
    </>
  );
}

export default App;

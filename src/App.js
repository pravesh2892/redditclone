
import './App.css';
import Rightbar from './Components/Rightbar/Rightbar';
import Sidebar from './Components/Sidebar/SIdebar';
import Navbar from './Components/navBar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import RedditQr from './Components/redditQr/RedditQr';
import SignIn from './Pages/SignIn/SignIn';
import Signup from './Pages/singup/Signup';
import Premium from './Components/Premium/Premium';
import CommingSoon from './Components/CommingSoon/CommingSoon';
import Coins from './Components/Coins/Coins';
import Message from './Pages/Message/Message';
import CreatePost from './Components/CreatePost/CreatePost';
import SearchPage from './Pages/SearchResult/SearchPage';
import Popular from './Pages/Popular/Popular';


function App() {
  return (
    <>
    <Router>
    <Sidebar />
    <Navbar />
    
   <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/redditqr" element={<RedditQr />}/>
    <Route path="/premium" element={<Premium />} />
    <Route path="/comingpage" element ={<CommingSoon />} />
    <Route path="/coins" element={<Coins />} />
    <Route path="/message" element={<Message />} />
    <Route path='/createpost' element={<CreatePost />} />
    <Route path='/search' element={<SearchPage />} />
    <Route path='/popular' element={<Popular />} />
   </Routes>
   </Router>
 
    </>
  );
}

export default App;

import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

//Database
import { doc, getDoc } from 'firebase/firestore';
import { db } from './helpers/firebase';

//Components
import ScrollToTop from './helpers/scrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import IdeasForm from './pages/IdeasForm';
import Admin from './pages/Admin';
import Stories from './pages/Stories';
import LogInPage from './pages/LogInPage';
import EditUser from './pages/EditUser';
import SignUpPage from './pages/SignUpPage';
import StoryDetails from './pages/StoryDetails';
import TreesLeaves from './components/TreesLeaves';
import Maintenance from './components/Maintenance';
import Loading from './components/Loading';
import RefreshPage from './components/RefreshPage';
import Games from './pages/Games';
import Songs from './pages/Songs';

function App() {
  const [maintenance, setMaintenance] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isTimeout, setIsTimeout] = useState(false);

  useEffect(() => {
    const fetchStoryData = async () => {
      const extraRef = doc(db, 'extra', 'maintenance');
      const extraDoc = await getDoc(extraRef);
      const extraData = extraDoc.data();
      const maintenaceState = extraData.state || false;

      if (maintenaceState) {
        setMaintenance(true);
      } else {
        setMaintenance(false);
      }
      setIsLoading(false);
    };

    const timeout = new Promise((resolve) =>
      setTimeout(() => resolve('timeout'), 6000)
    );

    Promise.race([fetchStoryData(), timeout]).then((result) => {
      if (result === 'timeout') {
        setIsTimeout(true);
      }
    });
  }, []);

  if (isTimeout) {
    return <RefreshPage />;
  }

  if (isLoading) {
    return (
      <div className='mainPage'>
        <Loading />
      </div>
    );
  }

  return (
    <>
      {maintenance ? (
        <div className='row maintenance_row'>
          <Router>
            <Routes>
              <Route path='/' element={<Maintenance />} />
              <Route path='/admin-mixalis' element={<Admin />} />
            </Routes>
            <TreesLeaves />
          </Router>
        </div>
      ) : (
        <div className='row'>
          <Router>
            <Header />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/ideas' element={<IdeasForm />} />
              <Route path='/favorites' element={<Favorites />} />
              <Route path='/signup' element={<SignUpPage />} />
              <Route path='/login' element={<LogInPage />} />
              <Route path='/stories' element={<Stories />} />
              <Route path='/games' element={<Games />} />
              <Route path='/songs' element={<Songs />} />
              <Route path='/stories/:id' element={<StoryDetails />} />
              <Route path='/admin-mixalis' element={<Admin />} />
              <Route path='/edit-account' element={<EditUser />} />
            </Routes>
            <TreesLeaves />
            <Footer />
            <ScrollToTop />
          </Router>
        </div>
      )}
    </>
  );
}

export default App;

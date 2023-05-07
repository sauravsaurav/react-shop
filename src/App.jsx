import './App.scss';
import React, {useEffect , useContext} from 'react';
import {Routes , Route} from "react-router-dom";
import Loader from './components/Loader/Loader.component';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './store/user.context';
import { DirectoryContext } from './store/directory.context';

const Navigation = React.lazy(() => import('./routes/Navigation/Navigation.component'));
const CodeEditor = React.lazy(() => import('./routes/CodeEditor/CodeEditor'));
const Authentication = React.lazy(() => import('./routes/Authentication/Authentication.component'));


const App = () => {
  const {currentUser} = useContext(UserContext);
  const {setDirectoryOption} = useContext(DirectoryContext);

  const navigate = useNavigate();

  useEffect(()=>{
    if(currentUser){
      navigate("/");
    }else{
      navigate("/signin");
    }
  },[currentUser, navigate]);

  useEffect(()=>{
    if(currentUser){
      setDirectoryOption(currentUser);
    }
  },[currentUser , setDirectoryOption]);


  return (
    <React.Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<Navigation/>}>
                <Route path='/' index element={<CodeEditor />}></Route>
                <Route path='/signin' element={<Authentication />}></Route>
        </Route>
      </Routes>
    </React.Suspense>
  )
}
export default App;

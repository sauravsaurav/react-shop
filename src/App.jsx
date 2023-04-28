import './App.scss';
import React from 'react';
import {Routes , Route} from "react-router-dom";
import Loader from './components/Loader/Loader.component';


const Navigation = React.lazy(() => import('./routes/Navigation/Navigation.component'));
const CodeEditor = React.lazy(() => import('./routes/CodeEditor/CodeEditor'));
const Authentication = React.lazy(() => import('./routes/Authentication/Authentication.component'));


const App = () => {
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

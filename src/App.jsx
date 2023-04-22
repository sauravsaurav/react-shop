import './App.scss';

import {Routes , Route} from "react-router-dom";
import Navigation from './routes/Navigation/Navigation.component';
import CodeEditor from './routes/CodeEditor/CodeEditor';
import Authentication from './routes/Authentication/Authentication.component';
const App = () => {
  return (
    <Routes>
      <Route element={<Navigation/>}>
        <Route path='/' index element={<CodeEditor />}></Route>
        <Route path='/signin' element={<Authentication />}></Route>
      </Route>
    </Routes>
  )
}
export default App;

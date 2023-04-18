import './App.scss';

import {Routes , Route} from "react-router-dom";
import Navigation from './routes/Navigation/Navigation.component';

const App = () => {
  return (
    <Routes>
      <Route element={<Navigation/>}>
        <Route path='/' index element={<p>This is homepage  </p>}></Route>
        <Route path='/shop' index element={<p>This is shop page  </p>}></Route>
        <Route path='/cart' index element={<p>This is cart page  </p>}></Route>
      </Route>
    </Routes>
  )
}
export default App;

import React from "react";
import { Link, Route, Routes} from "react-router-dom";
import { Home } from './Home';
import { Pizza } from './Pizza';


const App = () => {
  return (
    <>
      <h1>Lambda Eats</h1>
      <p>You can remove this code and create your own header</p>
      <nav>
        <Link to='/'>Home</Link>&nbsp;
        <Link to='/pizza'>Pizza</Link>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/pizza' element={<Pizza />} />
      </Routes>
    </>
  );
};
export default App;

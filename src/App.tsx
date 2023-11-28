import { Routes, Route } from 'react-router-dom'
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Votes from "./pages/Votes"
import Page404 from './pages/Page404'
import Home from './pages/Home'


function App() {

  return (
    <section className="app">
      <Routes>
        {/**PROTECT ROUTE */}
        {/* <Route element={ <RequireAuth /> } > */}
          <Route path='/' index element={<Home />} />
          <Route path="/votes" element={<Votes />} />
        {/* </Route> */}
          <Route path="/login" element={<Signin />} />
          <Route path="/register" element={<Signup />} />
          <Route path="*" element={<Page404 />} />
      </Routes>
    </section>
  )
}

export default App

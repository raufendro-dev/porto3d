import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import {Home, About, Projects, Contact} from './pages';
const App = () => {
  return (
    <main className='bg-slate-300/20'>
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element = {<Home/>}/>
                <Route path="/about" element = {<About/>}/>
                <Route path="/projects" element = {<Projects/>}/>
                <Route path="/contact" element = {<Contact/>}/>

              
            </Routes>
        </Router>

    </main>
  )
}
// https://sketchfab.com/3d-models/malevolent-shrine-by-tyo155q-3aa644a24c714e5b8f579c0c7a6b23c4

export default App
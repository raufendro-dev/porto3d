import { NavLink } from "react-router-dom"


const Navbar = () => {
  return (
    <header className="header">
    <NavLink to="/" className=" items-center justify-center flex font-bold  ">
    <p>raufendro-dev</p>
    </NavLink>
    <nav className="flex text-lg gap-7 font-medium">
        <NavLink to="/about" className={({isActive}) => isActive ? 'text-black' : 'text-gray-400'}> About</NavLink>
        <NavLink to="/projects" className={({isActive}) => isActive ? 'text-black' : 'text-gray-400'}> Projects</NavLink>
        <NavLink to="/contact" className={({isActive}) => isActive ? 'text-black' : 'text-gray-400'}> Contact</NavLink>
    </nav>
    </header>
  )
}

export default Navbar
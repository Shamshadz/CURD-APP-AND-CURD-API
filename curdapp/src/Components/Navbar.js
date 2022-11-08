import { useState } from "react";
import { Link } from "react-router-dom";
import Search from "./search";

const Navbar = () => {

    const title = "CURD APP"

    const[search,setSearch] = useState(false)

    return ( 
      <div>
        <nav>
          <h2>{title}</h2>
          <div>
            <Search />
          </div>
          <div className="links">
            <Link to="/">Home</Link>
            <Link to="/create">Add Product</Link>
          </div>
        </nav>
      </div>
    );
}
 
export default Navbar;
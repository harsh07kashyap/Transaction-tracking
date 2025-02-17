import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        {/* <h1 className="text-xl font-bold">Finance Visualizer</h1> */}
        <div>
          <Link to="/" className="px-4">Transactions</Link>
          <Link to="/dashboard" className="px-4">Dashboard</Link>
          <Link to="/budgets" className="px-4">Budgets</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

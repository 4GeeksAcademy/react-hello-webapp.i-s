import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/contacts">
					<span className="navbar-brand mb-0 h1">Contact App</span>
				</Link>
				<div className="ml-auto d-flex gap-2">
					<Link to="/contacts/add">
						<button className="btn btn-success">Add Contact</button>
					</Link>
					<Link to="/demo">
						<button className="btn btn-outline-primary">Demo</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};

import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { profileFetchAction, profileResetAction } from "../../store/actions/profileActions";
import { useDispatch } from "react-redux";
import AppContainer from "../../helpers/AppContainer";
import 'bootstrap/dist/js/bootstrap.bundle';

const Navbar = () => {
	
	const { keycloak, initialized } = useKeycloak();
	const dispatch = useDispatch();

	useEffect(() => {
	if (!keycloak.idTokenParsed)
		dispatch(profileResetAction());
	else {
		dispatch(profileFetchAction(keycloak.idTokenParsed.sub));
		// console.log(keycloak.tokenParsed.user_role[0])	
	}
}, [keycloak.idTokenParsed]);
		

	return (
		<nav className="navbar navbar-expand-md navbar-light bg-light mb-3 navbar-static-top">
			<AppContainer>
				<Link className="navbar-brand" to="#">MeFit</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbar">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<NavLink className="nav-link" to="/">Home</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/secured">Secured page</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/workouts">Workouts page</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/exercises">Exercise page</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/programs">Programs page</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/update-profile">Profile page</NavLink>
						</li>
					</ul>
					<ul className="navbar-nav ml-auto" style={{display: "inline-block"}}>
						{!keycloak.authenticated && (
							<button
								type="button"
								className="btn btn-outline-success"
								onClick={() => keycloak.login()}>
								Login
							</button>
						)}
						{!!keycloak.authenticated && (
							<div className="d-flex">
								<li style={{paddingRight: "1em"}} className="nav-item">
									<NavLink className="nav-link d-flex" to="/update-profile">{keycloak.tokenParsed.preferred_username}</NavLink>
								</li>

								<button
									type="button"
									className="btn btn-outline-success"
									onClick={() => keycloak.logout()}>
									Logout
								</button>
							</div>
						)}
					</ul>
				</div>
			</AppContainer>
		</nav>
	);
};

export default Navbar;
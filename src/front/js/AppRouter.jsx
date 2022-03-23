import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import injectContext from "./store/appContext";

// Views
import Home from "./views/Home/Home.jsx";
import Explore from "./views/Explore/Explore.jsx";
import MainUser from "./views/MainUser/MainUser.jsx";
import PostView from "./views/PostView/PostView.jsx";
import Register from "./views/Register/register.jsx";
import Tags from "./views/Tags/Tags.jsx";
import NotFound from "./views/NotFound/NotFound.jsx";


import Login from "./views/Login/login.jsx";


// Layout
import Layout from "./Layout/Layout.jsx";

//create your first component
const AppRouter = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Layout>
						<Switch>
							<Route exact path="/">
								<Home />
							</Route>

							<Route exact path="/login">
								<Login />
               				</Route>

							 <Route exact path="/register">
								<Register />
                			</Route>

							<Route exact path="/explore">
								<Explore />
							</Route>

							<Route exact path="/user/:username">
								<MainUser />
							</Route>

							<Route exact path="/post/:post_id">
								<PostView />
							</Route>

							<Route exact path="/tags/:tag">
								<Tags />
							</Route>

							<Route exact path="/notfound">
								<NotFound />
							</Route>
						</Switch>
					</Layout>
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(AppRouter);



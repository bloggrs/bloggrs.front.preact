import { h } from 'preact';
import { Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Profile from '../routes/profile';
import { useEffect, useState } from 'preact/hooks';
import HomeCustomizable from '../routes/home-customizable';

window.bloggrs = new window.bloggrs.Bloggrs("fa1dc96f-2136-4c0c-bdbc-95a4f4b7d4fb");;
Object.defineProperty(String.prototype, 'capitalize', {
	value: function() {
		return this.charAt(0).toUpperCase() + this.slice(1);
	},
	enumerable: false
});

// window.get_bloggrs_token = () => localStorage.getItem("bloggrs::token");

const App = () => {
	const [ context, setContext ] = useState({ user: undefined })
	useEffect(async () => {
		const { user } = await window.bloggrs.auth.getAuth();
		setContext({ user });
	},[])
	const { user } = context;
	if (!user) return <></>
	return (
		<div id="app">
			<Header />
			<Router>
				<Home context={context} path="/" />
				<HomeCustomizable context={context} path="/home-customizable" />
				<Profile path="/profile/" user="me" />
				<Profile path="/profile/:user" />
			</Router>
		</div>
	)
}

export default App;

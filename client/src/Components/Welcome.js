import React from 'react';

const Welcome = () => {
	return (
		<div>
			<h1>Welcome</h1>

			<p>
			   Are you hungry?  Are you always looking for places to eat 
		   	   only to find a 5 star rated restaurant written by people who have 
			   no idea what good food is.  You have come to the right place
			</p>

			<button><a href="/register">Sign up</a></button>
			<button><a href="/login">Log In</a></button>
		</div>
	)
}

export default Welcome;
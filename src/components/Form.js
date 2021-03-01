import React from "react";

const Form = () => {
	return (
		<form class="uk-form-stacked">
			<div class="uk-margin">
				<input class="uk-input" placeholder="Search" />
			</div>
			<div class="uk-margin">
				<select class="uk-select">
					<option selected disabled>
						Filter by:
					</option>
					<option>Name</option>
					<option>Age</option>
					<option>Gender</option>
					<option>Location</option>
					<option>Email</option>
					<option>Username</option>
				</select>
			</div>
		</form>
	);
};

export default Form;

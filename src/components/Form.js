import React from "react";

const Form = () => {
	return (
		<form className="uk-form-stacked">
			<div className="uk-margin">
				<input className="uk-input" placeholder="Search" />
			</div>
			<div className="uk-margin">
				<select defaultValue="" className="uk-select">
					<option value="" disabled>
						Filter by:
					</option>
					<option>Name</option>
					<option>Age</option>
					<option>Location</option>
					<option>Email</option>
					<option>Username</option>
				</select>
			</div>
		</form>
	);
};

export default Form;

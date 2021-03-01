import React from "react";

class Form extends React.Component {
	state = {
		filterOption: "",
		filterText: "",
	};

	handleSubmit = event => {
		event.preventDefault();

		this.props.filterSubmit(this.state.filterOption, this.state.filterText);
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit} className="uk-form-stacked">
				<div className="uk-margin">
					<input
						autoCapitalize="off"
						autoComplete="off"
						value={this.state.filterText}
						onChange={event =>
							this.setState({ filterText: event.target.value })
						}
						className="uk-input"
						placeholder="Search"
					/>
				</div>
				<div className="uk-margin">
					<select
						onChange={event =>
							this.setState({ filterOption: event.target.value })
						}
						defaultValue=""
						className="uk-select"
					>
						<option value="" disabled>
							Filter by:
						</option>
						<option value="name">Name</option>
						<option value="age">Age</option>
						<option value="location">Location</option>
						<option value="email">Email</option>
						<option value="username">Username</option>
					</select>
				</div>
			</form>
		);
	}
}

export default Form;

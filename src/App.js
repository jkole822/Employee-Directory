import React from "react";
import Form from "./components/Form";
import Table from "./components/Table";

class App extends React.Component {
	state = {
		filterOption: "",
		filterText: "",
	};

	handleSubmit = (filterOption, filterText) => {
		this.setState({ filterOption, filterText });
	};

	render() {
		return (
			<div className="uk-container">
				<Form filterSubmit={this.handleSubmit} />
				<Table
					filterText={this.state.filterText}
					filterOption={this.state.filterOption}
				/>
			</div>
		);
	}
}

export default App;

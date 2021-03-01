import React from "react";
import axios from "axios";

import TableRow from "./TableRow";

class Table extends React.Component {
	state = {
		employees: [],
	};

	async componentDidMount() {
		const res = await axios.get("https://randomuser.me/api/?results=500");
		this.setState({ employees: [...res.data.results] });
	}

	render() {
		return (
			<div>
				<table class="uk-table uk-table-striped uk-table-justify">
					<thead>
						<tr>
							<th class="uk-table-shrink"></th>
							<th>Name</th>
							<th>DOB</th>
							<th>Gender</th>
							<th>Location</th>
							<th>Email</th>
							<th>Username</th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>
		);
	}
}

export default Table;

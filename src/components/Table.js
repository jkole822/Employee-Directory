import React from "react";
import axios from "axios";

import TableRow from "./TableRow";

class Table extends React.Component {
	state = {
		employeeList: [],
		employees: [],
	};

	async componentDidMount() {
		const res = await axios.get(
			"https://randomuser.me/api/?results=500&nat=us"
		);
		this.setState({
			employeeList: res.data.results,
			employees: res.data.results,
		});
	}

	renderRows = () => {
		return this.state.employees.map(employee => {
			return (
				<TableRow
					key={employee.login.sha256}
					image={employee.picture.thumbnail}
					firstName={employee.name.first}
					lastName={employee.name.last}
					state={employee.location.state}
					city={employee.location.city}
					dob={employee.dob.date}
					age={employee.dob.age}
					email={employee.email}
					username={employee.login.username}
				/>
			);
		});
	};

	render() {
		return (
			<div>
				<table className="uk-table uk-table-striped uk-table-justify">
					<thead>
						<tr>
							<th className="uk-table-shrink"></th>
							<th>Name</th>
							<th>DOB</th>
							<th>Location</th>
							<th>Email</th>
							<th>Username</th>
						</tr>
					</thead>
					<tbody>{this.renderRows()}</tbody>
				</table>
			</div>
		);
	}
}

export default Table;

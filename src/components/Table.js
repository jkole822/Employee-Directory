import React from "react";
import axios from "axios";

import TableRow from "./TableRow";
import TableHeader from "./TableHeader";

class Table extends React.Component {
	state = {
		data: [],
		employeeList: [],
		employees: [],
		sortCategory: "name",
		sortOrder: true,
	};

	async componentDidMount() {
		const res = await axios.get(
			"https://randomuser.me/api/?results=100&nat=us"
		);

		const pageCount = Math.ceil(res.data.results.length / 10);
		this.props.getPageCount(pageCount);

		this.setState({
			employeeList: [...res.data.results],
			data: [...res.data.results],
		});

		this.sortEmployees();
	}

	resetEmployeeList = async () => {
		await this.setState({
			employeeList: [...this.state.data],
		});

		const pageCount = Math.ceil(this.state.data.length / 10);
		this.props.getPageCount(pageCount);

		this.sortEmployees();
	};

	async componentDidUpdate(prevProps, prevState) {
		if (
			prevProps.filterText !== this.props.filterText ||
			prevProps.filterOption !== this.props.filterOption
		) {
			const text = this.props.filterText.toLowerCase().trim();
			const filteredEmployees = this.state.data.filter(employee => {
				switch (this.props.filterOption) {
					case "name":
						return `${employee.name.first} ${employee.name.last}`
							.toLowerCase()
							.includes(text);
					case "age":
						return employee.dob.age === parseInt(text);
					case "location":
						return `${employee.location.city}, ${employee.location.state}`
							.toLowerCase()
							.includes(text);
					case "email":
						return employee.email.toLowerCase().includes(text);
					case "username":
						return employee.login.username.toLowerCase().includes(text);
					default:
						return this.resetEmployeeList();
				}
			});

			if (this.props.filterOption) {
				const pageCount = Math.ceil(filteredEmployees.length / 10);
				this.props.getPageCount(pageCount);

				await this.setState({ employeeList: filteredEmployees });

				this.sortEmployees();
			}
		} else if (
			prevState.sortCategory !== this.state.sortCategory ||
			prevState.sortOrder !== this.state.sortOrder
		) {
			this.sortEmployees();
		} else if (prevProps.currentPage !== this.props.currentPage) {
			this.paginateEmployees();
		}
	}

	handleClick = sortCategory => {
		if (this.state.sortCategory === sortCategory) {
			this.setState({ sortOrder: !this.state.sortOrder });
		} else {
			this.setState({ sortOrder: true });
		}

		this.setState({ sortCategory });
	};

	sortEmployees = async () => {
		const sortedEmployees = [...this.state.employeeList].sort((a, b) => {
			switch (this.state.sortCategory) {
				case "name":
					return this.state.sortOrder
						? a.name.last < b.name.last
							? -1
							: 1
						: a.name.last > b.name.last
						? -1
						: 1;
				case "dob":
					return this.state.sortOrder
						? new Date(a.dob.date).getTime() - new Date(b.dob.date).getTime()
						: new Date(b.dob.date).getTime() - new Date(a.dob.date).getTime();
				case "location":
					return this.state.sortOrder
						? a.location.city < b.location.city
							? -1
							: 1
						: a.location.city > b.location.city
						? -1
						: 1;
				case "email":
					return this.state.sortOrder
						? a.email < b.email
							? -1
							: 1
						: a.email > b.email
						? -1
						: 1;
				case "username":
					return this.state.sortOrder
						? a.login.username < b.login.username
							? -1
							: 1
						: a.login.username > b.login.username
						? -1
						: 1;
				default:
					return null;
			}
		});

		await this.setState({ employeeList: sortedEmployees });
		this.paginateEmployees();
	};

	paginateEmployees = () => {
		const firstIndex = (this.props.currentPage - 1) * 10;
		const secondIndex = (this.props.currentPage - 1) * 10 + 10;

		this.setState({
			employees: this.state.employeeList.slice(firstIndex, secondIndex),
		});
	};

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
			<div className="uk-overflow-auto">
				<table className="uk-table uk-table-striped uk-table-justify">
					<thead>
						<tr>
							<TableHeader uiClass="uk-table-shrink" />
							<TableHeader
								currentCategory={this.state.sortCategory}
								currentOrder={this.state.sortOrder}
								title="Name"
								selectCategory={this.handleClick}
							/>
							<TableHeader
								currentCategory={this.state.sortCategory}
								currentOrder={this.state.sortOrder}
								title="DOB"
								selectCategory={this.handleClick}
							/>
							<TableHeader
								currentCategory={this.state.sortCategory}
								currentOrder={this.state.sortOrder}
								title="Location"
								selectCategory={this.handleClick}
							/>
							<TableHeader
								currentCategory={this.state.sortCategory}
								currentOrder={this.state.sortOrder}
								title="Email"
								selectCategory={this.handleClick}
							/>
							<TableHeader
								currentCategory={this.state.sortCategory}
								currentOrder={this.state.sortOrder}
								title="Username"
								selectCategory={this.handleClick}
							/>
						</tr>
					</thead>
					<tbody>{this.renderRows()}</tbody>
				</table>
			</div>
		);
	}
}

export default Table;

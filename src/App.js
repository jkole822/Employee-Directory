import React from "react";
import Form from "./components/Form";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import "./App.css";

class App extends React.Component {
	state = {
		filterOption: "",
		filterText: "",
		pageCount: 1,
		currentPage: 1,
	};

	handlePageClick = page => {
		if (page === "prev" && this.state.currentPage > 1) {
			this.setState({ currentPage: this.state.currentPage - 1 });
		} else if (
			page === "next" &&
			this.state.currentPage < this.state.pageCount
		) {
			this.setState({ currentPage: this.state.currentPage + 1 });
		} else if (typeof page === "number") {
			this.setState({ currentPage: page });
		}
	};

	handleSubmit = (filterOption, filterText) => {
		this.setState({ filterOption, filterText });
	};

	handleReset = () => {
		this.setState({ filterOption: "", filterText: "" });
	};

	renderPagination = () => {
		return this.state.pageCount > 1 ? (
			<div className="uk-flex uk-flex-center uk-margin">
				<Pagination
					pageCount={this.state.pageCount}
					currentPage={this.state.currentPage}
					handlePageClick={this.handlePageClick}
				/>
			</div>
		) : null;
	};

	render() {
		return (
			<div>
				<h1
					id="header"
					className="uk-text-center uk-padding uk-margin-large-bottom"
				>
					Employee Directory
				</h1>
				<div className="uk-container">
					<Form
						filterSubmit={this.handleSubmit}
						filterReset={this.handleReset}
					/>
					{this.renderPagination()}
					<Table
						getPageCount={pageCount => this.setState({ pageCount })}
						currentPage={this.state.currentPage}
						filterText={this.state.filterText}
						filterOption={this.state.filterOption}
					/>
				</div>
			</div>
		);
	}
}

export default App;

/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const Pagination = ({ pageCount, currentPage, handlePageClick }) => {
	const controlDisplay = i => {
		if (currentPage >= 5 && currentPage <= pageCount - 3) {
			if (i >= currentPage - 2 && i <= currentPage + 2) {
				return styles.displayInline;
			} else {
				return styles.displayNone;
			}
		} else if (currentPage < 5) {
			return i <= 6 ? styles.displayInline : styles.displayNone;
		} else if (currentPage > pageCount - 3) {
			return i >= pageCount - 5 ? styles.displayInline : styles.displayNone;
		}
	};

	const renderSimplePagination = () => {
		const pages = [];
		for (let i = 2; i < pageCount; i++) {
			pages.push(
				<li key={i} className={currentPage === i ? "uk-active" : ""}>
					<a href="#" onClick={() => handlePageClick(i)}>
						{i}
					</a>
				</li>
			);
		}

		return pages;
	};

	const renderComplexPagination = () => {
		const pages = [
			<li key="ellipsis-left" className="uk-disabled">
				<span>...</span>
			</li>,
		];

		for (let i = 2; i < pageCount; i++) {
			pages.push(
				<li
					key={i}
					className={currentPage === i ? "uk-active" : ""}
					style={controlDisplay(i)}
				>
					<a href="#" onClick={() => handlePageClick(i)}>
						{i}
					</a>
				</li>
			);
		}

		pages.push(
			<li key="ellipsis-right" className="uk-disabled">
				<span>...</span>
			</li>
		);

		return pages;
	};

	return (
		<ul className="uk-pagination">
			<li>
				<a href="#" onClick={() => handlePageClick("prev")}>
					<span uk-icon="icon: chevron-left"></span>
				</a>
			</li>
			<li className={currentPage === 1 ? "uk-active" : ""}>
				<a href="#" onClick={() => handlePageClick(1)}>
					1
				</a>
			</li>

			{pageCount < 8 ? renderSimplePagination() : renderComplexPagination()}

			<li className={currentPage === pageCount ? "uk-active" : ""}>
				<a href="#" onClick={() => handlePageClick(pageCount)}>
					{pageCount}
				</a>
			</li>
			<li>
				<a href="#" onClick={() => handlePageClick("next")}>
					<span uk-icon="icon: chevron-right"></span>
				</a>
			</li>
		</ul>
	);
};

const styles = {
	displayNone: {
		display: "none",
	},
	displayInline: {
		display: "inline",
	},
};

export default Pagination;

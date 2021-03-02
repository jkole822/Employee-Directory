import React from "react";

const TableHeader = ({
	title,
	uiClass,
	selectCategory,
	currentCategory,
	currentOrder,
}) => {
	const renderChevron = () => {
		let el;
		if (title) {
			if (title.toLowerCase() === currentCategory) {
				return currentOrder ? (
					<span uk-icon="icon: chevron-up"></span>
				) : (
					<span uk-icon="icon: chevron-down"></span>
				);
			}
		}

		return el;
	};

	return (
		<th onClick={() => selectCategory(title.toLowerCase())} className={uiClass}>
			{title} {renderChevron()}
		</th>
	);
};

export default TableHeader;

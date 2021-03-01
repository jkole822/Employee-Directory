import React from "react";

const TableRow = ({
	image,
	firstName,
	lastName,
	state,
	city,
	dob,
	age,
	email,
	username,
}) => {
	return (
		<tr>
			<td>
				<img
					src={image}
					className="uk-preserve-width uk-border-circle"
					alt={`${firstName} ${lastName}`}
				/>
			</td>
			<td>{`${firstName} ${lastName}`}</td>
			<td>{new Date(dob).toLocaleDateString()}</td>
			<td>{`${city}, ${state}`}</td>
			<td>{email}</td>
			<td>{username}</td>
		</tr>
	);
};

export default TableRow;

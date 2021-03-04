import React from "react";
import { useMediaQuery } from "react-responsive";

const Button = ({
	type,
	onClick,
	className,
	text,
	verticalMargin,
	horizontalMargin,
}) => {
	const isSmallScreen = useMediaQuery({ query: "(max-width: 960px)" });

	return (
		<button
			type={type}
			className={
				isSmallScreen
					? `${verticalMargin}  ${className}`
					: `${horizontalMargin} ${className}`
			}
			onClick={onClick}
		>
			{text}
		</button>
	);
};

export default Button;

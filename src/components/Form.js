import React from "react";
import { useMediaQuery } from "react-responsive";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";

import Button from "./Button";

const Form = ({ filterSubmit, filterReset }) => {
	const isSmallScreen = useMediaQuery({ query: "(max-width: 960px)" });

	return (
		<Formik
			initialValues={{ filterText: "", filterOption: "" }}
			validationSchema={Yup.object({
				filterText: Yup.string().required("Search Term Required"),
				filterOption: Yup.string().required("Filter Option Required"),
			})}
			onSubmit={async (
				{ filterText, filterOption },
				{ setSubmitting, resetForm, setFieldTouched }
			) => {
				filterSubmit(filterOption, filterText);
				setSubmitting(false);
				resetForm();
				document.getElementById("filterText-input").blur();
				setFieldTouched("filterText", false);
			}}
		>
			<FormikForm>
				<div className="uk-flex uk-flex-center@m uk-flex-wrap">
					<Field
						name="filterOption"
						as="select"
						className={
							isSmallScreen
								? "uk-margin-small-bottom uk-select uk-width-1-1@s uk-width-1-5@m"
								: "uk-margin-small-bottom uk-margin-small-right uk-select uk-width-1-1@s uk-width-1-5@m"
						}
					>
						<option value="" disabled>
							Filter by:
						</option>
						<option value="name">Name</option>
						<option value="age">Age</option>
						<option value="location">Location</option>
						<option value="email">Email</option>
						<option value="username">Username</option>
					</Field>

					<Field
						name="filterText"
						type="text"
						id="filterText-input"
						className={
							isSmallScreen
								? "uk-margin-small-bottom uk-input uk-width-1-1@s uk-width-1-2@m"
								: "uk-margin-small-bottom uk-margin-small-left uk-input uk-width-1-1@s uk-width-1-2@m"
						}
						placeholder="Search"
					/>
				</div>
				<div className="uk-flex uk-flex-center uk-margin-small-bottom uk-text-danger uk-text-bold">
					<div className="uk-margin-small-right">
						<ErrorMessage name="filterOption" />
					</div>
					<div className="uk-margin-small-left">
						<ErrorMessage name="filterText" />
					</div>
				</div>

				<div className="uk-flex uk-flex-center@m uk-flex-wrap">
					<Button
						type="submit"
						className="uk-button uk-button-primary uk-width-1-1@s uk-width-1-6@m"
						horizontalMargin="uk-margin-small-right"
						verticalMargin="uk-margin-small-bottom"
						text="Submit"
					/>

					<Button
						type="reset"
						onClick={filterReset}
						className="uk-button uk-button-default uk-width-1-1@s uk-width-1-6@m"
						horizontalMargin="uk-margin-small-left"
						verticalMargin="uk-margin-small-bottom"
						text="Reset"
					/>
				</div>
			</FormikForm>
		</Formik>
	);
};

export default Form;

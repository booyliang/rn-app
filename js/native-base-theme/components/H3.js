import variable from "./../variables/platform";

export default (variables = variable) => {
	const h3Theme = {
		color: variables.textColor,
		fontSize: variables.fontSizeH3,
	};

	return h3Theme;
};

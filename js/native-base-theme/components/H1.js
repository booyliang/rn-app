import variable from "./../variables/platform";

export default (variables = variable) => {
	const h1Theme = {
		color: variables.textColor,
		fontSize: variables.fontSizeH1,
	};

	return h1Theme;
};
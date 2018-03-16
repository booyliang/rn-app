import variable from "./../variables/platform";

export default (variables = variable) => {
	const textTheme = {
		fontSize: variables.fontSizeBase,
		fontFamily: variables.fontFamily,
		color: variables.textColor,
		includeFontPadding: false,
		".note": {
			color: "#a7a7a7",
			fontSize: variables.noteFontSize
		}
	};

	return textTheme;
};

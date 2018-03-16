import variable from "./../variables/platform";

export default (variables = variable) => {
	const viewTheme = {
		".padder": {
			paddingHorizontal: variables.contentPadding
		}
	};

	return viewTheme;
};

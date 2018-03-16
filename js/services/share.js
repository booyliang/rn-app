let instance = null;
const share = {
	init(element) {
		instance = element;
	},

	open(data) {
		return new Promise((resolve) => {
			instance.resolve = resolve;
			instance.setState({
				data
			});
			instance.open();
		});
	}
};

export default share;
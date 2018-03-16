function handlePressReview() {
	this.props.navigation.navigate('ReviewList', {
		appId: this.props.appId
	});
}

export {
	handlePressReview
};
export default {
	handlePressReview
};
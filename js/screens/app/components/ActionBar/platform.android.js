function handlePressReview() {
	this.props.navigation.navigate('NewReview', {
		appId: this.props.appId
	});
}

export {
	handlePressReview
};
export default {
	handlePressReview
};
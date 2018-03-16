import React from 'react';
function withPage(WrappedComponent) {
	class WithPage extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				refreshing: false,
				data: [],
				page: 1,
				seed: 1,
			};
		}
		componentDidMount() {

			this.fetchData();
		}
		fetchData = async () => {

			const { page, seed } = this.state;
			const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;

			fetch(url)
				.then(res => res.json())
				.then(res => {

					this.setState({
						data: page === 1 ? res.results : [...this.state.data, ...res.results],
						refreshing: false
					});
				})
				.catch(error => {
					this.setState({ error, refreshing: false });
				});



		};
		handleRefresh = () => {
			// Toast.show({text: 'handleRefresh'})
			this.setState(
				{
					page: 1,
					refreshing: true,
					seed: this.state.seed + 1,

				}, this.fetchData);
		};

		handleLoadMore = () => {

			this.setState({
				page: this.state.page + 1,
			}, this.fetchData);
		};
		render() {

			return <WrappedComponent

				keyExtractor={(item) => item.email}
				refreshing={this.state.refreshing}
				data={this.state.data}
				onRefresh={this.handleRefresh}
				onEndReached={this.handleLoadMore}
				{...this.props}
			/>;
		}

	}


	return WithPage;

}

export default withPage;

// renderItem: (item) => (
// 	<ListItem
// 	roundAvatar
// 	title={`${item.name.first} ${item.name.last}`}
// 	subtitle={item.email}
// 	avatar={{ uri: item.picture.thumbnail }}
// 	containerStyle={{ borderBottomWidth: 0 }}
// />
// )
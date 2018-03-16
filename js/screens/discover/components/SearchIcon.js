import React, { Component } from 'react';
import { StyleSheet, Button, YIcon, withNavigation, View} from '@components';
import { transformSize, textSecondaryColor } from '@styles';
@withNavigation
export default class SearchIcon extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Button onPress={this.goToSearch.bind(this)} transparent>
				<YIcon name="search" style={styles.searchTrigger} />
			</Button>
		);
	}

	goToSearch = () => {
		this.props.navigation.navigate('SearchScreen');
	};
}

const styles = StyleSheet.create({
	searchTrigger: {
		fontSize: transformSize(51),
		color: textSecondaryColor
	}
});
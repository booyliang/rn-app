import React from 'react';
import {
	StyleSheet
} from 'react-native';
import {
	Container,
	Nav,
	FlowList,
	ActItem,
	Button,
	YIcon,
	View,
	Platform,
	withNavigation
} from '@components';
import styles from '@styles';
import { YZhugeIo } from '@ydk';
@withNavigation
class Act extends React.Component {
	render() {
		return (
			<Container>
				<Nav title="活动" hideLeftIcon rightComponent={this.renderNavRight()} />
				<FlowList
					request="/services/app/v1/activity/list"
					ref={(r) => {this._refActList = r;}}
					renderItem={this.renderItem}
					ItemSeparatorComponent={this.renderSeparator}
					enableCacheFirstPage
				/>
			</Container>
		);
	}

	renderItem = ({item}) => {
		return <ActItem data={item} onPress={this.handleActPress} style={s.item} />;
	};

	renderNavRight = () => {
		return (
			<Button onPress={this.goToSearch} transparent>
				<YIcon name="search" style={s.searchTrigger} />
			</Button>
		);
	};

	renderSeparator = () => {
		return <View style={s.separator}></View>;
	};

	handleActPress = (data) => {
		// let articleIds = this._refActList.state.data.map(item => item.id);
		this.props.navigation.navigate('Article', {
			id: data.id,
			articleIds:[data.id]
		});
		YZhugeIo.track('活动', {
			活动标题: data.title
		});
	};

	goToSearch = () => {
		this.props.navigation.navigate('SearchScreen');
	};
}

const s = StyleSheet.create({
	searchTrigger: {
		fontSize: styles.transformSize(51),
		color: styles.textSecondaryColor
	},
	separator: {
		height: styles.transformSize(34)
	}
});

export default Act;
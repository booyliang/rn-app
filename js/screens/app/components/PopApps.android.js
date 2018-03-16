import React from 'react';
import {
	FlatList,
	StyleSheet,
} from 'react-native';
import {
	View,
	Text,
	YIcon,
	Touchable,
	withNavigation,
} from '@components';
import {
	http
} from '@services';
import styles from '@styles';
import Logo from './Logo';
import { YZhugeIo } from '@ydk';
@withNavigation
class PopApps extends React.Component {
	render() {
		return (
			<View style={styles.padder}>
				<View style={style.main}>
					<View style={style.title}>
						<Text style={style.titleText}><YIcon />为您推荐</Text>
					</View>
					<View style={style.listWrapper}>
						<FlatList
							data={this.state.data}
							renderItem={this.renderItem}
							keyExtractor={(item) => item.id}
							ItemSeparatorComponent={ItemSeparator}
							style={style.list}
						/>
					</View>
				</View>
			</View>
		);
	}

	componentWillMount() {
		this.getData();
	}

	getData = async () => {
		this.setState({
			data: (await http('/services/app/v1/application/list/1/3')).data.data.entities
		});
	};

	renderItem = ({ item }) => {
		return (
			<Touchable type="highlight" onPress={() => { this.handleItemPress(item); }}>
				<View style={style.item}>
					<Logo uri={item.appliIcon} style={style.itemLogo} />
					<Text numberOfLines={4} style={style.itemIntro}>{item.description}</Text>
				</View>
			</Touchable>
		);
	};

	handleItemPress = (item) => {
		this.props.navigation.navigate('App', {
			id: item.id
		});
		YZhugeIo.track('点评推荐', {
			'文章标题': item.appliName,
		});
	};

	state = {
		data: []
	};
}

class ItemSeparator extends React.Component {
	render() {
		return <View style={style.itemSeparator}></View>;
	}
}

const border = {
	borderWidth: styles.transformSize(4),
	borderColor: styles.themeColor,
};
const itemPaddingHorizontal = '4%';
const style = StyleSheet.create({
	title: {
		...styles.round,
		...border,
		zIndex: 1,
		alignSelf: 'center',
		paddingVertical: styles.transformSize(22),
		paddingHorizontal: styles.transformSize(75),
		backgroundColor: 'white',
	},
	titleText: {
		fontSize: styles.transformSize(60),
		color: styles.themeColor,
	},
	listWrapper: {
		...border,
		paddingTop: styles.transformSize(90),
		borderRadius: styles.transformSize(50),
		marginTop: styles.transformSize(-58),
		overflow: 'hidden'
	},
	list: {
		paddingVertical: styles.transformSize(10)
	},
	item: {
		...styles.inlineWrap,
		...styles.centerWrap,
		paddingHorizontal: itemPaddingHorizontal,
		paddingVertical: styles.transformSize(50),
		backgroundColor: 'white'
	},
	itemSeparator: {
		...styles.borderBottom,
		marginHorizontal: itemPaddingHorizontal
	},
	itemLogo: {
		marginRight: styles.transformSize(36)
	},
	itemIntro: {
		flex: 1,
		fontSize: styles.transformSize(52)
	}
});

export default PopApps;
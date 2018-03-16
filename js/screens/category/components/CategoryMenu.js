import React from 'react';
import { ScrollView, View, Text, StyleSheet,  } from '@components';
import { TouchableWithoutFeedback } from 'react-native';
import styles from '@styles';
import { YZhugeIo } from '@ydk';
import { cache } from '@utils';
export default class CategoryMenu extends React.Component {
	constructor(props) {
		super(props);
		this.currSubClassifiId = '';

	}
	state = { menuItems: [] };
	render() {
		let { menuItems } = this.state;	// 默认值
		return (
			<View style={[style.outWrap, this.props.style]}>
				<ScrollView style={{ height: '100%', }} showsVerticalScrollIndicator={false}>
					{menuItems.map(this.renderItem)}
				</ScrollView>
			</View>
		);
	}

	handleMenuClick = (ev, item) => {
		if (this.currSubClassifiId === item.id) {
			return;
		}

		let id = item.id;

		if (this.currSubClassifiId) {
			this['touchable' + this.currSubClassifiId].setNativeProps({ style: style.hove });
		}

		this.currSubClassifiId = id;

		this['touchable' + id].setNativeProps({ style: style.activity });
		this.setState({ currSubClassifiId: item.id }, () => {
			this.props.onMenuClick(item);
		});

		// if(this.currSubClassifiId)
		// item.id === this.state.currSubClassifiId ? style.activity
	}

	componentDidMount() {
		cache(`/services/app/v1/classify/top`, (res) => {
			let menuItems = res.data.data;
			if (menuItems.length > 0) {
				this.setState({ menuItems }, () => {
					this.handleMenuClick(null, menuItems[0]);
				});
			}
		});

	}
	renderItem = (item) => {
		return (
			<TouchableWithoutFeedback
				style={[style.menuBtn]}
				key={item.id}

				onPress={(ev) => this.handleMenuClick(ev, item)}
			>
				<Text ref={(component) => this['touchable' + item.id] = component}
					style={style.menuText}
					numberOfLines={1}>
					{item.classifyName}
				</Text>
			</TouchableWithoutFeedback>
		);
	}
}

const style = StyleSheet.create({
	outWrap: {
		backgroundColor: '#f7f9fb',
		height: '100%',
	},
	menuBtn: {
		height: styles.transformSize(171),
		alignItems: 'center',
	},
	menuText: {
		color: styles.textPrimaryColor,
		fontSize: styles.transformSize(45),
		paddingVertical: styles.transformSize(57),
		textAlign: 'center',
	},
	activity: {
		backgroundColor: '#fff',
		color: '#ff9160',
		fontWeight: '600',
	},
	hove: {
		backgroundColor: 'transparent',
		color: styles.textPrimaryColor,
		fontWeight: 'normal',
	}
});
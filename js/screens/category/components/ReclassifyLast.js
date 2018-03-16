import React from 'react';
import { View, StyleSheet, Image, TagGroup, Tag, withNavigation } from '@components';
import styles from '@styles';
@withNavigation
export default class ReclassifyLast extends React.Component {
	render() {
		let { itemCategory = [] } = this.props;
		return (
			<View style={style.wrap}>
				<Image
					style={style.imageIcon}
					source={{ uri: this.props.navigation.state.params.classifyIcon }}
				/>
				<TagGroup>
					{itemCategory.map(this.CategoryInfoLasttag)}
				</TagGroup>
			</View>
		);
	}

	CategoryInfoLasttag = (item) => {
		return (
			<Tag style={style.lable}
				key={item.id}
				numberOfLines={1}
				onPress={() => this.props.navigation.navigate('TagPage', {
					tagId: item.id
				})}
			>{item.labelName}</Tag>
		);
	}
}

const style = StyleSheet.create({
	wrap: {
		paddingTop: styles.transformSize(78),
		paddingBottom: styles.transformSize(30),
		marginBottom: styles.transformSize(42),
		backgroundColor: '#fff',
		alignItems: 'center',
	},
	imageIcon: {
		width: styles.transformSize(250),
		height: styles.transformSize(250),
		marginBottom: styles.transformSize(48),
		borderRadius: styles.transformSize(36),
		...styles.border,
	},
	lable: {
		maxWidth: styles.transformSize(318),
		paddingVertical: styles.transformSize(27),
		paddingHorizontal: styles.transformSize(48),
		marginHorizontal: styles.transformSize(16),
		borderRadius: styles.transformSize(12),
		backgroundColor: 'transparent',
		...styles.border,
		borderColor: styles.themeColor,
		color: styles.themeColor,
		fontSize: styles.transformSize(45),
	}

});
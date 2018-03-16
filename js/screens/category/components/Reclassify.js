import React from 'react';
import { TagGroup, Tag, StyleSheet, withNavigation } from '@components';
import {
	YZhugeIo
} from '@ydk';
import styles from '@styles';
@withNavigation
export default class Reclassify extends React.Component {

	tagList = (item) => {
		return (
			<Tag style={style.tagItem}
				key={item.id}
				numberOfLines={1}
				onPress={this.goToSub(item)}
			>
				{item.classifyName}
			</Tag>
		);
	}

	render() {
		return (
			<TagGroup style={style.Wrap}>
				{this.props.itemCategory.map(this.tagList)}
			</TagGroup>
		);
	}

	goToSub = (item) => () => {
		YZhugeIo.track('子分类名称', {
			"子分类名称": item.classifyName
		});
		this.props.navigation.navigate('SubCategory', {
			classifyId: item.id,
			classifyName: item.classifyName,
			lastStageFlag: item.lastStageFlag,
			classifyIcon: item.icon
		})
	};
}

const style = StyleSheet.create({
	Wrap: {
		paddingHorizontal: styles.transformSize(42),
		paddingVertical: styles.transformSize(46),
		marginBottom: styles.transformSize(42),
		flexWrap: 'wrap',
		backgroundColor: '#fff',
	},
	tagItem: {
		width: '21%',
		paddingVertical: styles.transformSize(21),
		marginVertical: styles.transformSize(18),
		marginHorizontal: styles.transformSize(21),
		borderRadius: styles.transformSize(10),
		textAlign: 'center',
		textAlignVertical: 'center',
		includeFontPadding: false,
		...styles.border,
		backgroundColor: 'transparent',
		color: styles.themeColor,
		borderColor: styles.themeColor,
		fontSize: styles.transformSize(45),
		borderWidth: styles.transformSize(3),
	}
});
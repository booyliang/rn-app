import React from 'react';
import PropTypes from 'prop-types';
import {
	StyleSheet
} from 'react-native';
import {
	Touchable,
	View,
	Text,
	TagGroup,
	Tag,
	Image,
	Button,
	withNavigation,
} from '../';
import styles from '@styles';
import { tranformNum } from '@utils';

@withNavigation
class AppBar extends React.Component {
	render() {
		let appIcon = require('@assets/images/no-pic.jpg');
		let { appliName = '', labels = [], downloadCount, appliIcon } = this.props.data;

		if (appliIcon) {
			appIcon = { uri: appliIcon };
		}
		// when labels is null
		if (!labels) {
			labels = [];
		}
		const tagsComponent = labels.map((tag) => <Tag key={tag.id} style={style.tag}>{tag.labelName}</Tag>);

		return (
			<Touchable type="highlight" onPress={this.handlePress.bind(this)} style={this.props.touchableStyle}>
				<View style={[style.main, this.props.style]}>
					<Image source={appIcon} style={style.logo} />
					<View style={style.appDesc}>
						<Text style={style.appName}>{appliName}</Text>
						<TagGroup>
							{tagsComponent}
						</TagGroup>
					</View>
					<Button rounded block bordered disabled style={[style.downloadButton, this.props.btnStyle]}>
						<Text style={[style.downText, this.props.downTxtStyle]}>去关注</Text>
					</Button>
				</View>
			</Touchable>
		);
	}

	handlePress() {
		this.props.navigation.navigate('App', {
			id: this.props.data.id
		});
	}

	static propTypes = {
		data: PropTypes.object
	};
}

const style = StyleSheet.create({
	main: {
		...styles.inlineWrap,
		...styles.padder,
		alignItems: 'center',
		backgroundColor: styles.backgroundColor,
		paddingVertical: styles.transformSize(28),
	},
	logo: {
		...styles.border,
		flex: 0,
		width: styles.transformSize(123),
		height: styles.transformSize(123),
		borderWidth: styles.transformSize(2),
		borderRadius: styles.transformSize(26),
		overflow: 'hidden',
		marginRight: styles.transformSize(32),
		overlayColor: 'transparent'
	},
	appDesc: {
		flex: 1,
		alignSelf: 'center',
	},
	appName: {
		fontSize: styles.transformSize(52),
		marginBottom: styles.transformSize(12),
	},
	tag: {
		marginBottom: 0
	},
	downNum: {
		backgroundColor: '#36dbb9',
	},
	downloadButton: {
		flex: 0,
		height: styles.transformSize(84),
		alignSelf: 'center',
		borderWidth: styles.transformSize(3),
		borderColor: styles.themeColor,
		paddingHorizontal: styles.transformSize(30),
		borderRadius: styles.transformSize(42)
	},
	downText: {
		fontSize: styles.transformSize(46),
		color: styles.themeColor,
	}
});

export default AppBar;
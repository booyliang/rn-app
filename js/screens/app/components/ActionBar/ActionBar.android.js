import React from 'react';
import PropTypes from 'prop-types';
import {
	StyleSheet
} from 'react-native';
import {
	Button,
	ButtonWithAuth,
	View,
	Text,
	withNavigation,
	Toast,
	YIcon,
} from '@components';
import {
	http
} from '@services';
import styles from '@styles';
import {
	tranformNum
} from '@utils';
import { YZhugeIo } from '@ydk';
import platform from './platform';

@withNavigation
class ActionBar extends React.Component {
	render() {
		const followIconStyle = [s.actionIcon];
		let followText = '关注';

		if (this.props.followed) {
			followIconStyle.push(s.activeActionIcon);
			followText = '已关注';
		}

		return (
			<View style={s.actionBar}>
				<Button block onPress={this.handlePressReview} style={s.action}>
					<View style={[s.actionInner, s.firstActionInner]}>
						<YIcon name="edit" style={s.actionIcon} />
						<Text style={s.actionText}>点评（{tranformNum(this.props.reviewCount)}）</Text>
					</View>
				</Button>
				<ButtonWithAuth
					block
					disabled={this.state.following}
					onPress={this.follow}
					style={s.action}
				>
					<View style={s.actionInner}>
						<YIcon name="heart" style={followIconStyle} />
						<Text style={s.actionText}>{followText}（{tranformNum(this.props.followCount)}）</Text>
					</View>
				</ButtonWithAuth>
			</View>
		);
	}

	follow = async () => {
		if (this.props.followed) {
			Toast.show({
				text: '您已关注该资源'
			});
			return;
		}

		let request = '';

		switch (this.props.context) {
		case 'app': {
			request = `/services/app/v1/attention/followApp/${this.props.appId}/1`;
			break;
		}

		case 'article': {
			request = `/services/app/v1/attentionArticle/followArticle/${this.props.articleId}/1`;
			break;
		}

		default: {
			console.error(`Invalid context: ${this.props.context}.`);
			return;
		}
		}

		this.setState({
			following: true
		});

		try {
			await http(request);
		} catch (error) {
			throw error;
		} finally {
			this.setState({
				following: false,
			});
			YZhugeIo.track('关注应用', {
				'应用ID': this.props.appId
			});
		}

		Toast.show({
			text: '关注成功'
		});
		this.props.onFollowed();
	};

	handlePressReview = () => {
		return platform.handlePressReview.call(this);
	};

	state = {
		following: false,
	};

	static propTypes = {
		context: PropTypes.string,
		appId: PropTypes.number,
		articleId: PropTypes.number,
		reviewCount: PropTypes.number,
		followCount: PropTypes.number,
		followed: PropTypes.bool,
		onFollowed: PropTypes.func
	};

	static defaultProps = {
		reviewCount: 0,
		followCount: 0,
		followed: false
	};
}

const s = StyleSheet.create({
	actionBar: {
		...styles.inlineWrap,
		...styles.borderTop,
		borderTopWidth: 1,
		paddingBottom: styles.artionBarBottomPadding,
		backgroundColor: 'white',
	},
	action: {
		flex: 1,
		paddingVertical: styles.transformSize(43),
		borderRadius: 0,
		backgroundColor: 'white',
	},
	actionInner: {
		...styles.inlineWrap,
		...styles.centerWrap,
		flex: 1,
	},
	firstActionInner: {
		...styles.borderRight,
		borderRightWidth: 1
	},
	actionIcon: {
		fontSize: styles.transformSize(70),
		color: '#dbdbdb',
		marginRight: styles.transformSize(20)
	},
	activeActionIcon: {
		color: styles.themeColor
	},
	actionText: {
		fontWeight: 'bold',
		backgroundColor: 'transparent'
	},
});

export default ActionBar;
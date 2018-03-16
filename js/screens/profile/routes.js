import ProfileScreen from './ProfileScreen';
import Attention from './Attention';
import CollectWike from './CollectWike';
import Evaluation from './Evaluation';
import Message from './Message';
import Setting from './Setting';
import Intro from './Intro';
import Notice from './Message/Notice';
import Detail from './Message/Detail';
import User from './Attention/User';
import UserAttention from './Attention/UserAttention';
import Operator from './Operator';

export default {
	Profile: {
		screen: ProfileScreen,
	},
	Intro: {
		screen: Intro,
		navigationOptions: (navigation, screenProps) => ({
			title: `个人信息`
		}),
	},
	Attention: {
		screen: Attention,
		navigationOptions: (navigation, screenProps) => ({
			title: `我关注的应用`
		}),
	},
	User: {
		screen: User,
		navigationOptions: (navigation, screenProps) => ({
			title: `用户关注`
		}),
	},
	UserAttention: {
		screen: UserAttention,
		navigationOptions: (navigation, screenProps) => ({
			title: `TA关注的应用`
		}),
	},
	CollectWike: {
		screen: CollectWike,
		navigationOptions: (navigation, screenProps) => ({
			title: `我收藏的威客`
		}),
	},
	Evaluation: {
		screen: Evaluation,
		navigationOptions: (navigation, screenProps) => ({
			title: `我的评价`
		}),
	},
	Message: {
		screen: Message,
		navigationOptions: (navigation, screenProps) => ({
			title: `我的消息`
		}),
	},
	Setting: {
		screen: Setting,
		navigationOptions: (navigation, screenProps) => ({
			title: `设置`
		}),
	},
	Notice: {
		screen: Notice,
		navigationOptions: (navigation, screenProps) => ({
			title: `系统公告`
		}),
	},
	Detail: {
		screen: Detail,
		navigationOptions: (navigation, screenProps) => ({
			title: `系统详情`
		}),
	},
	Operator: {
		screen: Operator,
		navigationOptions: (navigation, screenProps) => ({
			title: '联系我们'
		})
	}

};
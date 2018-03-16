import HelloWorld from '@/components/HelloWorld'
import WitkeyShare from '../view/witkeyShare'
import ArticleShare from '../view/articleShare'
import AppShare from '../view/appShare'
import Myshare from '../view/myShare'
import ShareLoad from '../view/share-load'
import UserAgreement from '../view/user-agreement'
import Recruitment from '../view/recruitment'
import ArticleSpec from '../view/article-specification'
import IosShareLoad from '../view/iosShare-load'
import Disclaimer from '../view/disclaimer'
import SpringLocalism from './../view/activity/spring-localism'
import ArticleContent from '@/view/article-content';


export default {
	mode: "history",
	routes: [
		{
			path: '/',
			name: 'Hello',
			component: HelloWorld
		},
		{
			path: '/witkeyShare/:id',
			name: 'witkeyShare',
			component: WitkeyShare
		},
		{
			path: '/articleShare/:id',
			name: 'articleShare',
			component: ArticleShare
		},
		{
			path: '/appShare/:id',
			name: 'appShare',
			component: AppShare
		},
		{
			path: '/myShare/:id',
			name: 'myShare',
			component: Myshare
		},
		{
			path: '/shareLoad/:id',
			name: 'shareLoad',
			component: ShareLoad
		},
		{
			path: '/userAgreement',
			name: 'userAgreement',
			component: UserAgreement,
		},
		{
			path: '/recruitment',
			name: 'recruitment',
			component: Recruitment,
		},
		{
			path: '/articleSpec',
			name: 'articleSpec',
			component: ArticleSpec,
		},
		{
			path: '/iosShareLoad',
			name: 'iosShareLoad',
			component: IosShareLoad
		},
		{
			path: '/disclaimer',
			name: 'disclaimer',
			component: Disclaimer
		},
		{
			path: '/spring-localism',
			component: SpringLocalism
		},
		{
			path: '/article-content/:id',
			component: ArticleContent
		}
	]
}


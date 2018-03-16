import App from './App';
import ReviewList from './ReviewList';
import NewReview from './NewReview';
import Article from './Article';

export default {
	App: {
		screen: App,
		path: 'app/:id',
	},
	ReviewList: {
		screen: ReviewList,
	},
	NewReview: {
		screen: NewReview,
	},
	Article: {
		screen: Article,
		path: 'article/:id',
	},
};
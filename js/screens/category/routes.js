import SubCategory from './SubCategory';
import Category from './Category';
import TagPage from './TagPage';
import AppList from "./AppList";
const CategoryRoute = {
	SubCategory: {
		screen: SubCategory,
	},
	TagPage: {
		screen: TagPage,
		navigationOptions: (navigation, screenProps) => ({
			title: `TagPage`
		}),
	},
	AppList: {
		screen: AppList,
		navigationOptions: (navigation, screenProps) => ({
			title: `AppList`
		})
	},
	Category: {
		screen: Category,
	}
};
export default CategoryRoute;

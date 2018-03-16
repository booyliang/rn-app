import React from 'react';
import {
	withNavigation,
} from 'react-navigation';

export default function (Component) {
	@withNavigation
	class ComopnentWithNavigation extends React.Component {
		render() {
			return <Component {...this.props} onPress={this.handlePress.bind(this)} />;
		}

		handlePress() {
			const {
				route,
				navigation,
				onPress
			} = this.props;

			if (onPress) {
				if (onPress() === false) {
					return;
				}
			}

			switch (typeof route) {
			case 'undefined': {
				break;
			}

			case 'string': {
				navigation.navigate(route);
				break;
			}

			case 'object': {
				navigation.navigate(route.routeName, route.params, route.actions);
			}
			}
		}
	}

	return ComopnentWithNavigation;
};
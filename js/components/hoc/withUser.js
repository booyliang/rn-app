import React from 'react';
import {
	connect
} from 'react-redux';
import {
	withNavigation
} from '@components';
import {
	sign
} from '@services';

function withUser(shoudSignIn = true) {
	return (Component) => {
		@connect(mapStateToProps)
		@withNavigation
		class ComponentShoudSignIn extends React.Component {
			render() {
				if (this.willSignIn()) {
					return null;
				}

				return <Component {...this.props} />;
			}

			willSignIn() {
				return shoudSignIn && !sign.isIn();
			}

			async componentWillMount() {
				if (this.willSignIn()) {
					try {
						await sign.in();
					} catch (error) {
						this.props.navigation.goBack();
					}
				}
			}
		}

		return ComponentShoudSignIn;
	};
}

function mapStateToProps({user}) {
	return {
		user
	};
}

export default withUser;
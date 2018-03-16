import React from 'react';
import PropTypes from 'prop-types';

function collectProps(Component, propsMap, newPropName = 'data') {
	class ComponentWithCollectedProps extends React.Component {
		render() {
			const props = {};
			const newProp = this.props[newPropName];

			for (let oldPropName in propsMap) {
				let keyConfig = propsMap[oldPropName];

				if (typeof keyConfig === 'string') {
					keyConfig = {
						key: keyConfig
					};
				}

				const {
					key,
					handler
				} = keyConfig;
				const value = newProp[key];
				props[oldPropName] = handler ? handler(value) : value;
			}

			return <Component {...props} {...this.props} />;
		}

		static propTypes = {
			[newPropName]: PropTypes.object
		};
	}

	return ComponentWithCollectedProps;
}

export default collectProps;
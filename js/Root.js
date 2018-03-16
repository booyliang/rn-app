import React, { Component } from 'react';
import {
	sign,
	share,
} from './services';
import getTheme from '../js/native-base-theme/components';
import commonColor from '../js/native-base-theme/variables/commonColor';
import { StyleProvider, Root, View, Share, ActionSheet, Album } from '@components';
import Sign from './screens/sign/Sign';
import Screen from './screens';


class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<StyleProvider style={getTheme(commonColor)} >
				<Root>
					<Screen />
					<Album ref={Album.init} />
					<Sign ref={sign.init} />
					<ActionSheet ref={ActionSheet.init} />
					<Share ref={share.init} />
				</Root>
			</StyleProvider>

		);
	}
}

export default App;





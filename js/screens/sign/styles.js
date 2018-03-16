import {
	StyleSheet
} from 'react-native';
import styles from '@styles';

const style = StyleSheet.create({
	input: {
		fontSize: styles.transformSize(56),
		height: styles.transformSize(186)
	},
	submitTrigger: {
		marginTop: styles.transformSize(150)
	},
	addon: {
		flexDirection: 'row-reverse',
		justifyContent: 'space-between',
		marginTop: styles.transformSize(20)
	},
	addonMainText: {
		color: styles.assistColor
	},
	addonSecondaryText: {
		color: styles.textSecondaryColor
	},
	pureForm: {
		flex: 1,
		paddingTop: styles.transformSize(190)
	},
	pureFormHead: {
		marginBottom: styles.transformSize(150)
	},
	pureFormTitle: {
		fontSize: styles.transformSize(82),
	},
	pureFormSubTitle: {
		fontSize: styles.transformSize(56),
		marginTop: styles.transformSize(48)
	}
});

export default style;
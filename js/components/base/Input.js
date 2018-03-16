import React from 'react';
import { Input } from 'native-base';
import { placeholderColor } from '@styles';
export default InputWarp = (props) => {
	return <Input placeholderTextColor={placeholderColor}   {...props}></Input>;
};
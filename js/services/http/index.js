import  Constants from '../../../ydk/Constants';
import httpFactory from './http';
import mockHttpFactory from './mock';

const factory = Constants.env === 'mock' ? mockHttpFactory : httpFactory;

export default factory();
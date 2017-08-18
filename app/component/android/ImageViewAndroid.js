/**
 * Created by tianzhw on 2017/7/12.
 */
import { PropTypes } from 'react';
import { requireNativeComponent, View } from 'react-native';

const ImageView = requireNativeComponent('JSImageView', {
	name:'ImageView',
    propTypes: {
        ...View.propTypes,// 包含默认的View的属性
        src: PropTypes.string
    }
});
module.exports = ImageView;
/**
 * Created by tianzhw on 2017/7/18.
 */
import React,{PropTypes} from 'react';
import { requireNativeComponent, View } from 'react-native';

const Gallery = requireNativeComponent('JSGallery',{
    name:'Gallery',
    propTypes:{
        ...View.propTypes,
        spacing:PropTypes.number,
    }
});
module.exports = Gallery;
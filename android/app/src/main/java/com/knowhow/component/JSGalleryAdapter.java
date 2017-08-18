package com.knowhow.component;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.Gallery;
import android.widget.ImageView;
import com.facebook.react.bridge.ReactContext;
import com.knowhow.R;


/**
 * Created by tianzhw on 2017/7/18.
 */

public class JSGalleryAdapter extends BaseAdapter {
    private ReactContext mContext;
    private int[] imageResIDs;
    public JSGalleryAdapter(ReactContext context, int[] ids){
        mContext = context;
        imageResIDs = ids;
    }

    @Override
    public int getCount() {
        return Integer.MAX_VALUE;//用于循环滚动
    }

    @Override
    public Object getItem(int position) {
        if (position >= imageResIDs.length) {
            position = position % imageResIDs.length;
        }

        return position;
    }

    @Override
    public long getItemId(int position) {
        if (position >= imageResIDs.length) {
            position = position % imageResIDs.length;
        }

        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {

        ImageView imageView;
        if (convertView != null) {
            imageView = (ImageView) convertView;
        } else {
            imageView = (ImageView)LayoutInflater.from(mContext).inflate(R.layout.gimage, null);
        }

        if (position >= imageResIDs.length) {
            position = position % imageResIDs.length;
        }

        imageView.setImageResource(R.drawable.baba);
//        imageView.setScaleType(ImageView.ScaleType.FIT_XY);
//        Gallery.LayoutParams params = new Gallery.LayoutParams(50, 50);
//        imageView.setLayoutParams(params);
        return imageView;
    }

}

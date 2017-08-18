package com.knowhow.component;

import android.util.Log;
import android.view.LayoutInflater;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.ReactStylesDiffMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.knowhow.R;

/**
 * Created by tianzhw on 2017/7/18.
 */

public class JSGalleryViewManager extends SimpleViewManager<JSGallery> {
    private ReactContext mContext;
    @Override
    public String getName() {
        return "JSGallery";
    }

    @Override
    protected JSGallery createViewInstance(ThemedReactContext reactContext) {
        mContext = reactContext;//记录上下文
        JSGallery gallery = (JSGallery)LayoutInflater.from(reactContext).inflate(R.layout.gallery, null);
        return gallery;
    }

    @ReactProp(name="spacing")
    public void setSpacing(JSGallery gallery, int spacing){
        gallery.setSpacing(spacing);
        String[] aa = {"baba", "mama", "nvbaobai", "baobai"};

        int[] ids = new int[aa.length];
        for(int i = 0; i < aa.length; i++){
            ids[i] = mContext.getResources().getIdentifier(aa[i], "drawable", null);
            Log.d("tianzhw", "setSpacing: " + ids[i] + " =" + R.drawable.baba);
        }
        JSGalleryAdapter adapter = new JSGalleryAdapter(mContext, ids);
        gallery.setAdapter(adapter);
    }

//    @ReactProp(name="image")
//    public void setImage(JSGallery gallery, ReadableMap image){
//
//        String[] aa = {"baba", "mama", "nvbaobai", "baobai"};
//
//        int[] ids = new int[aa.length];
//        for(int i = 0; i < aa.length; i++){
//            ids[i] = mContext.getResources().getIdentifier(aa[i], "drawable", null);
//        }
//        JSGalleryAdapter adapter = new JSGalleryAdapter(mContext, ids);
//        gallery.setAdapter(adapter);
//    }

}

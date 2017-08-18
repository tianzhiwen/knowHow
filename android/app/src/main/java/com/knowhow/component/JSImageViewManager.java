package com.knowhow.component;

import android.support.annotation.Nullable;
import android.util.Log;
import android.view.LayoutInflater;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.knowhow.R;

/**
 * Created by tianzhw on 2017/7/16.
 */

public class JSImageViewManager extends SimpleViewManager<JSImageView> {
    @Override
    public String getName() {
        return "JSImageView";
    }

    @Override
    protected JSImageView createViewInstance(ThemedReactContext reactContext) {
        return (JSImageView) LayoutInflater.from(reactContext).inflate(R.layout.image, null);
    }

    @ReactProp(name="src")
    public void setSrc(JSImageView view, @Nullable String src){
        Log.d("tianzhw", "setSrc: " + src);
    }
}

package com.knowhow.module;

import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by tianzhw on 2017/7/11.
 */

public class JSToastAndroid extends ReactContextBaseJavaModule {

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    public JSToastAndroid(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    //getName 方法返回的字符串会被RN方法到
    @Override
    public String getName() {
        return "JSToastAndroid";
    }
    //常量定义，并暴露给RN使用
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

    //下面的注解标签，该方法会暴露给RN使用
    @ReactMethod
    public void show(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }
}

package com.knowhow;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.knowhow.component.JSGalleryViewManager;
import com.knowhow.component.JSImageViewManager;
import com.knowhow.module.JSCheckVersion;
import com.knowhow.module.JSToastAndroid;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Created by tianzhw on 2017/7/11.
 */

public class JSReactPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new JSToastAndroid(reactContext));
        modules.add(new JSCheckVersion(reactContext));
        return modules;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList(new JSImageViewManager(), new JSGalleryViewManager());
    }
}

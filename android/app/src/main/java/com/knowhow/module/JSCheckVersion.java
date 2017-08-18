package com.knowhow.module;

import android.app.DownloadManager;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by tianzhw on 2017/8/9.
 */

public class JSCheckVersion extends ReactContextBaseJavaModule {
    private long downId;
    public JSCheckVersion(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "JSCheckVersion";
    }

    /**
     * 获取当前APP版本号
     * @param promise
     */
    @ReactMethod
    public void checkVersion(Promise promise){
        try {
            ReactContext context=  getReactApplicationContext();
            String version = context.getPackageManager().getPackageInfo(context.getPackageName(), PackageManager.GET_CONFIGURATIONS).versionName;
            promise.resolve(version);
        } catch (PackageManager.NameNotFoundException e) {
            promise.reject(e.getMessage());
            e.printStackTrace();
        }
    }


    @ReactMethod
    public void downLoadAPK(String url){

        Log.d("tianzhw", "downLoadAPK: " + url);

        DownloadManager manager = (DownloadManager) getReactApplicationContext().getSystemService(ReactContext.DOWNLOAD_SERVICE);

        DownloadManager.Request request = new DownloadManager.Request(Uri.parse(url));

        request.setDestinationInExternalPublicDir("newzhishi", "/download/newzhishi.apk");

        request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_HIDDEN);

        downId = manager.enqueue(request);

    }
}

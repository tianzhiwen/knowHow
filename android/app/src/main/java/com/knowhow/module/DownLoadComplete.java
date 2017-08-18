package com.knowhow.module;

import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Environment;

import java.io.File;

/**
 * Created by tianzhw on 2017/8/9.
 */

public class DownLoadComplete extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        DownloadManager manager = (DownloadManager)context.getSystemService(Context.DOWNLOAD_SERVICE);
        if(DownloadManager.ACTION_DOWNLOAD_COMPLETE.equals(intent.getAction())){
//            DownloadManager.Query query = new DownloadManager.Query();
            //在广播中取出下载任务的id
//            long id = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, 0);
//
//           File f = new File();

            Intent apk = new Intent();
            apk.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            apk.setAction(android.content.Intent.ACTION_VIEW);
            apk.setDataAndType(Uri.parse("file://"+ Environment.getExternalStorageDirectory() + "/newzhishi/download/newzhishi.apk"),
                    "application/vnd.android.package-archive");
            context.startActivity(apk);

        }else if(DownloadManager.ACTION_NOTIFICATION_CLICKED.equals(intent.getAction())){
            long[] ids = intent.getLongArrayExtra(DownloadManager.EXTRA_NOTIFICATION_CLICK_DOWNLOAD_IDS);
            //点击通知栏取消下载
            manager.remove(ids);
           // ShowToastUtil.showShortToast(context, "已经取消下载");
        }
    }

}

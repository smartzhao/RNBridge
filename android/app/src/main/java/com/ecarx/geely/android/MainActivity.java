package com.ecarx.geely.android;

import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.KeyEvent;
import android.view.View;
import android.widget.Toast;

import com.rnbridge.rnactivity.MyReactActivity;
import com.rnbridge.RNBridgeManager;
import com.rnbridge.constants.FileConstant;
import com.rnbridge.hotupdate.HotUpdate;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.shell.MainReactPackage;

public class MainActivity extends AppCompatActivity {

    private long mDownLoadId;
    private CompleteReceiver localReceiver;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        registeReceiver();
    }

    @Override
    protected void onResume() {
        super.onResume();
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if(hasFocus) {
            //ReactNativePreLoader.preLoad(MainActivity.this,"RnBase");
        }
    }

    /**
     * 向RN发送消息
     * @param v
     */
    public void sendMsgToRN(View v) {
        if (RNBridgeManager.getReactPackage() != null) {
            RNBridgeManager.getReactPackage().mModule.nativeCallRn("hello");
        }
    }


    /**
     * 下载更新包
     * @param v
     */
    public void load(View v) {
        checkVersion();
    }

    /**
     * 检查版本号
     */
    private void checkVersion() {
        // 默认有最新版本
        Toast.makeText(this, "开始下载", Toast.LENGTH_SHORT).show();
        downLoadBundle();
    }

    /**
     * 下载最新Bundle
     */
    private void downLoadBundle() {

        // 1.下载前检查SD卡是否存在更新包文件夹
        HotUpdate.checkPackage(getApplicationContext(), FileConstant.LOCAL_FOLDER);
        // 2.下载
        DownloadManager downloadManager = (DownloadManager) getSystemService(Context.DOWNLOAD_SERVICE);
        DownloadManager.Request request = new DownloadManager
                .Request(Uri.parse(FileConstant.JS_BUNDLE_REMOTE_URL));
        request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_HIDDEN);
        request.setAllowedNetworkTypes(DownloadManager.Request.NETWORK_MOBILE| DownloadManager.Request.NETWORK_WIFI);
        request.setDestinationUri(Uri.parse("file://"+ FileConstant.JS_PATCH_LOCAL_PATH));
        mDownLoadId = downloadManager.enqueue(request);
    }

    /**
     * 注册广播
     */
    private void registeReceiver() {
        localReceiver = new CompleteReceiver();
        registerReceiver(localReceiver,new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE));
    }

    /**
     * 跳转到RN界面
     * @param view
     */
    public void toliuliang(View view) {
        RNBridgeManager.startRNActivity(MainActivity.this,"index.dataMall.bundle","index.dataMall","RnBase");
    }

    public void tovpcenter(View view) {
       // RNBridgeManager.startRNActivity(MainActivity.this,"index.VPCenter.bundle","index.VPCenter","RnBase");
        RNBridgeManager.startRNActivity(MainActivity.this,"RnBase", ReactInstanceManager.builder()
                .setApplication(getApplication())
                .setBundleAssetName("index.VPCenter.bundle")
                .setJSMainModulePath("index.VPCenter")
                .addPackage(new MainReactPackage())
                .setUseDeveloperSupport(true)
                .setInitialLifecycleState(LifecycleState.RESUMED)
                .build());
    }

    public void torn(View view) {
        startActivity(new Intent(this,MyReactActivity.class));
    }

    public class CompleteReceiver extends BroadcastReceiver {

        @Override
        public void onReceive(Context context, Intent intent) {
            long completeId = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID,-1);
            if(completeId == mDownLoadId) {
                HotUpdate.handleZIP(getApplicationContext());
            }
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        unregisterReceiver(localReceiver);
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        switch (keyCode) {
            case KeyEvent.KEYCODE_BACK:
                finish();
                break;
        }
        return super.onKeyDown(keyCode, event);
    }
}

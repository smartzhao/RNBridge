package com.zhaochong.android;

import android.app.Application;
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

import com.facebook.react.ReactApplication;
import com.facebook.react.bridge.ReactApplicationContext;
import com.rnbridge.preloadreact.ReactNativePreLoader;
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
    Bundle bundle = new Bundle();
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
        bundle.putString("accessToken","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMDAwNTA0IiwiYXVkIjoiYnJvd3NlciIsImlhdCI6MTUyMDA2MjM3NiwibmJmIjoxNTIwMDYyMzc2LCJleHAiOjE1MjAwNjIzODM4NDEsImlzcyI6ImVjYXJ4IiwianRpIjoxNTIwMDYyMzc2LCJjbGllbnRJZCI6ImJyb3dzZXIiLCJ1aWQiOiIxMDAwNTA0IiwiYXBwSWQiOiJNODIwaWdpaTVsTDR0Y3kiLCJlbnYiOiJ0ZXN0aW5nIn0.NuBQV0i9Bl1IxVnBENDmEUXjdW8NIrGQ7NV5KYhy-qI");
        bundle.putString("userId","15712893500");
        if (hasFocus) {
            //FIXME 首先禁止预加载，防止内存过大
          /*  RNBridgeManager.getInstance().preLoad(MainActivity.this,
                    "RnBase",
                    "index.VPCenter.bundle",
                    ((ReactApplication)getApplication()).getReactNativeHost().getReactInstanceManager(),
                    bundle);
            RNBridgeManager.getInstance().preLoad(MainActivity.this,
                    "RnBase",
                    "index.dataMall.bundle",
                    ((ReactApplication)getApplication()).getReactNativeHost().getReactInstanceManager(),
                    bundle);*/
        }
    }

    /**
     * 向RN发送消息
     *
     * @param v
     */
    public void sendMsgToRN(View v) {
        if (MainApplication.getReactPackage() != null) {
            if (RNBridgeManager.getReactPackage().mModule == null) {
                Toast.makeText(this, "mModule is " + RNBridgeManager.getReactPackage().mModule, Toast.LENGTH_SHORT).show();
                return;
            }
            MainApplication.getReactPackage().mModule.nativeCallRn("hello");
        }
    }


    /**
     * 下载更新包
     *
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
        request.setAllowedNetworkTypes(DownloadManager.Request.NETWORK_MOBILE | DownloadManager.Request.NETWORK_WIFI);
        request.setDestinationUri(Uri.parse("file://" + FileConstant.JS_PATCH_LOCAL_PATH));
        mDownLoadId = downloadManager.enqueue(request);
    }

    /**
     * 注册广播
     */
    private void registeReceiver() {
        localReceiver = new CompleteReceiver();
        registerReceiver(localReceiver, new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE));
    }

    /**
     * 跳转到RN界面
     *
     * @param view
     */
    public void toliuliang(View view) {
        RNBridgeManager.bundleAssetName = "index.dataMall.bundle";
        startActivity(new Intent(this, MyReactActivity.class));
       // RNBridgeManager.startRNActivity(MainActivity.this, "index.dataMall.bundle", "index.dataMall", "RnBase",null);
    }

    public void tovpcenter(View view) {
        RNBridgeManager.startRNActivity(MainActivity.this, "RnBase", ReactInstanceManager.builder()
                .setApplication(getApplication())
                .setBundleAssetName("index.VPCenter.bundle")
                .setJSMainModulePath("index.VPCenter")
                .addPackage(new MainReactPackage())
                .setUseDeveloperSupport(false)
                .setInitialLifecycleState(LifecycleState.RESUMED)
                .build(),
                bundle
                );
    }

    public void torn(View view) {
        RNBridgeManager.bundleAssetName = "index.VPCenter.bundle";
        startActivity(new Intent(this, MyReactActivity.class));
    }

    public class CompleteReceiver extends BroadcastReceiver {

        @Override
        public void onReceive(Context context, Intent intent) {
            long completeId = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1);
            if (completeId == mDownLoadId) {
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

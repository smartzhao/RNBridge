package com.zhaochong.android;

import android.Manifest;
import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.widget.Toast;

import com.kaopiz.kprogresshud.KProgressHUD;
import com.rnbridge.RNBridgeManager;
import com.rnbridge.constants.FileConstant;
import com.rnbridge.constants.RNBridgeConstants;
import com.rnbridge.hotupdate.HotUpdate;
import com.rnbridge.rnactivity.BaseReactActivity;
import com.tbruyelle.rxpermissions2.Permission;
import com.tbruyelle.rxpermissions2.RxPermissions;

import io.reactivex.functions.Consumer;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = "zhaochong_main";
    private long mDownLoadId;
    private CompleteReceiver localReceiver;
    private String token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMDAwNTA0IiwiYXVkIjoiYnJvd3NlciIsImlhdCI6MTUyMDQyMjI2NiwibmJmIjoxNTIwNDIyMjY2LCJleHAiOjE1MjA0MjIyNzQxODMsImlzcyI6ImVjYXJ4IiwianRpIjoxNTIwNDIyMjY2LCJjbGllbnRJZCI6ImJyb3dzZXIiLCJ1aWQiOiIxMDAwNTA0IiwiYXBwSWQiOiJNODIwaWdpaTVsTDR0Y3kiLCJlbnYiOiJ0ZXN0aW5nIn0.2-Fx7Gv5MmFBUWChi2HaYvUijXMaFqj4x9F08CIno48";
    Bundle bundle = new Bundle();
    KProgressHUD hud;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        registeReceiver();
        showRxPermissions();
    }

    @Override
    protected void onResume() {
        super.onResume();
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        bundle.putString("accessToken", token);
        bundle.putString("userId", "15712893500");
        if (hasFocus) {
            //FIXME 首先禁止预加载，1.防止内存过大 2.加载过后无法点击
         /* RNBridgeManager.getInstance().preLoad(MainActivity.this,
                    "RnBase",
                    "index.VPCenter.bundle",
                    ((ReactApplication)getApplication()).getReactNativeHost().getReactInstanceManager(),
                   bundle);*/
          /*     RNBridgeManager.getInstance().preLoad(MainActivity.this,
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
            if (MainApplication.getReactPackage().mModule == null) {
                Toast.makeText(this, "mModule is " + MainApplication.getReactPackage().mModule, Toast.LENGTH_SHORT).show();
                return;
            }
            MainApplication.getReactPackage().mModule.nativeCallRn(RNBridgeConstants.NATIVECALLRN_EVENT, "hello");
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
        RNBridgeManager
                .getInstance()
                .setLaunchOptions(bundle)
                .setComponentName("RnBase")
                .setBundleAssetName("index.dataMall.bundle")
                .startRNActivity(MainActivity.this);
        // RNBridgeManager.startRNActivity(MainActivity.this, "index.dataMall.bundle", "index.dataMall", "RnBase",null);
    }

    public void tovpcenter(View view) {

        RNBridgeManager
                .getInstance()
                .setLaunchOptions(bundle)
                .setComponentName("RnBase")
                .setBundleAssetName("index.VPCenter.bundle")
                .setCustomProgressParams("加载中。。。。", "测试中", KProgressHUD.Style.SPIN_INDETERMINATE)
                .setNativeContants("RNContants", "我是Android常量，hello  RN")
                //  .setRnPushlishMsgListener()
                .startRNActivity(MainActivity.this);
    }

    public void torn(View view) {

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


    public void showRxPermissions() {
        RxPermissions rxPermission = new RxPermissions(MainActivity.this);
        rxPermission
                .requestEach(Manifest.permission.ACCESS_FINE_LOCATION,
                        Manifest.permission.WRITE_EXTERNAL_STORAGE,
                        Manifest.permission.READ_CALENDAR,
                        Manifest.permission.READ_CALL_LOG,
                        Manifest.permission.READ_CONTACTS,
                        Manifest.permission.READ_PHONE_STATE,
                        Manifest.permission.READ_SMS,
                        Manifest.permission.RECORD_AUDIO,
                        Manifest.permission.CAMERA,
                        Manifest.permission.CALL_PHONE,
                        Manifest.permission.SYSTEM_ALERT_WINDOW,
                        Manifest.permission.SEND_SMS)
                .subscribe(new Consumer<Permission>() {
                    @Override
                    public void accept(Permission permission) throws Exception {
                        if (permission.granted) {
                            // 用户已经同意该权限
                            Log.d(TAG, permission.name + " is granted.");
                        } else if (permission.shouldShowRequestPermissionRationale) {
                            // 用户拒绝了该权限，没有选中『不再询问』（Never ask again）,那么下次再次启动时，还会提示请求权限的对话框
                            Log.d(TAG, permission.name + " is denied. More info should be provided.");
                        } else {
                            // 用户拒绝了该权限，并且选中『不再询问』
                            Log.d(TAG, permission.name + " is denied.");
                        }
                    }
                });
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

package com.zhaochong.android;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.kaopiz.kprogresshud.KProgressHUD;
import com.rnbridge.RNBridgeManager;
import com.rnbridge.callback.RNPushlishMsgListener;
import com.rnbridge.rnactivity.BaseReactActivity;

public class TestActivity extends BaseReactActivity implements RNPushlishMsgListener {
    Bundle bundle = new Bundle();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // setContentView(R.layout.activity_test);
        RNBridgeManager
                .getInstance()
                .setLaunchOptions(bundle)
                .setComponentName("RnBase")
                .setBundleAssetName("index.VPCenter.bundle")
                .setCustomProgressParams("加载中。。。。", "测试中", KProgressHUD.Style.SPIN_INDETERMINATE)
                .setNativeContants("RNContants", "我是Android常量，hello  RN")
                //  .setRnPushlishMsgListener()
                .startRNActivity(this);
        finish();
    }

    @Override
    public String rnCallNativeFromPromise(String msg) {
        return null;
    }

    @Override
    public String rnCallNativeFromCallback(String msg) {
        return null;
    }

    @Override
    public void rnCallNative(String s, String action) {

    }
}

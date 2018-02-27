package com.rnbridge.rnactivity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

import com.rnbridge.RNBridgeManager;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.shell.MainReactPackage;

public class RNActivity extends Activity implements DefaultHardwareBackBtnHandler {
    private ReactRootView mReactRootView;
    private ReactInstanceManager mReactInstanceManager;
    public String bundleAssetName;
    public String jsMainModulePath;
    public String moduleName;
    public Bundle bundleParams;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Intent intent = getIntent();
        Bundle bundle = intent.getExtras();
        bundleAssetName = bundle.getString("bundleAssetName");
        jsMainModulePath = bundle.getString("jsMainModulePath");
        moduleName = bundle.getString("moduleName");
        bundleParams = bundle.getBundle("bundleParams");
        mReactRootView = new ReactRootView(this);
        if ( RNBridgeManager.getInstance().getReactInstanceManager() != null) {
            mReactInstanceManager = RNBridgeManager.getInstance().getReactInstanceManager();
        }else {
            mReactInstanceManager = ReactInstanceManager.builder()
                    .setApplication(getApplication())
                    .setBundleAssetName(bundleAssetName)
                    .setJSMainModulePath(jsMainModulePath)
                    .addPackage(new MainReactPackage())
                    .setUseDeveloperSupport(true)
                    .setInitialLifecycleState(LifecycleState.RESUMED)
                    .build();
        }
        mReactRootView.startReactApplication(mReactInstanceManager, moduleName, bundleParams);
        setContentView(mReactRootView);
    }

    @Override
    protected void onResume() {
        super.onResume();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostResume(this, this);
        }
    }

    @Override
    protected void onPause() {
        super.onPause();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostPause();
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostDestroy();
        }
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onBackPressed();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }

}
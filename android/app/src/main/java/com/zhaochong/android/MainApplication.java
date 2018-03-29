package com.zhaochong.android;


import android.app.Application;
import android.util.Log;

import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.rnbridge.RNBridgeManager;
import com.rnbridge.base.BaseReactNativeHost;
import com.rnbridge.callback.Callback;
import com.rnbridge.communication.CommPackage;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.facebook.react.common.ReactConstants.TAG;

/**
 * Created by zhaochong on 2017/12/20.
 */

public class MainApplication extends Application implements ReactApplication {
    static MainApplication instance;
    private static final CommPackage mCommPackage = new CommPackage();
    private Map<String, ReactNativeHost> reactNativeHostMap = new HashMap<>();

    @Override
    public void onCreate() {
        super.onCreate();
        instance = this;
        RNBridgeManager.getInstance().setBundleAssetName("index.VPCenter.bundle");
        reactNativeHostMap.put("index.VPCenter.bundle", getBaseReactNativeHost(this));
        RNBridgeManager.getInstance().setBundleAssetName("index.dataMall.bundle");
        reactNativeHostMap.put("index.dataMall.bundle", getBaseReactNativeHost(this));
        RNBridgeManager.getInstance().init(this, reactNativeHostMap, new Callback() {
            @Override
            public void onResult(Object o) {
                Log.d(TAG, ">>>>>onResult: " + o);
            }

            @Override
            public void onError(int i) {
                Log.d(TAG, ">>>>>onError: " + i);
            }

            @Override
            public void onException(Throwable throwable) {

            }
        });
    }

    @Override
    public ReactNativeHost getReactNativeHost() {
        Log.d(TAG, ">>>>getReactNativeHost: " + RNBridgeManager.getInstance().getBundleAssetName());
        return reactNativeHostMap.get(RNBridgeManager.getInstance().getBundleAssetName());
    }

    /**
     * 获取 reactPackage
     *
     * @return
     */
    public static CommPackage getReactPackage() {
        return mCommPackage;
    }

    public static MainApplication getInstance() {
        return instance;
    }

    public ReactNativeHost getBaseReactNativeHost(Application application) {
        return new BaseReactNativeHost(application) {
            // 本地SD卡加载路径可自定义
            @Override
            protected String getJSBundleFile() {
                return super.getJSBundleFile();
            }


            @Override
            public boolean getUseDeveloperSupport() {
                return com.rnbridge.BuildConfig.DEBUG;
            }

            @Override
            protected List<ReactPackage> getPackages() {
                Log.d(TAG, ">>>> mCommPackage: " + mCommPackage.mModule);
                return Arrays.<ReactPackage>asList(
                        new MainReactPackage(),
                        new VectorIconsPackage(),
                        new LinearGradientPackage(), // <---- and This!
                        mCommPackage

                );
            }
        };
    }
}

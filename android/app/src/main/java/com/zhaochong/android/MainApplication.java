package com.zhaochong.android;


import android.app.Application;
import android.util.Log;

import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.rnbridge.*;
import com.rnbridge.callback.Callback;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.rnbridge.communication.CommPackage;
import com.rnbridge.constants.FileConstant;

import java.io.File;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Nullable;
import static com.facebook.react.common.ReactConstants.TAG;

/**
 * Created by zhaochong on 2017/12/20.
 */

public class MainApplication extends Application implements ReactApplication {
    static MainApplication instance;
    private static final CommPackage mCommPackage = new CommPackage();
    private Map<String,ReactNativeHost> reactNativeHostMap = new HashMap<>();

    @Override
    public void onCreate() {
        super.onCreate();
        instance =this;
        reactNativeHostMap.put("index.VPCenter.bundle",mReactNativeHost);
        reactNativeHostMap.put("index.dataMall.bundle",mReactNativeHost1);
        RNBridgeManager.getInstance().init(this,reactNativeHostMap, new Callback() {
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
    public  final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Nullable
        @Override
        protected String getJSBundleFile() {
            File file = new File(FileConstant.JS_BUNDLE_LOCAL_PATH);
            Log.d(TAG, ">>>> file: "  +  file.getAbsolutePath());
            if (file != null && file.exists()) {
                return FileConstant.JS_BUNDLE_LOCAL_PATH;
            } else {
                return super.getJSBundleFile();
            }
        }
        @Nullable
        @Override
        protected String getBundleAssetName() {
            Log.d(TAG, ">>>> BundleAssetName: "  + RNBridgeManager.bundleAssetName);
            return "index.VPCenter.bundle";
        }

        @Override
        public boolean getUseDeveloperSupport() {
            return com.rnbridge.BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            Log.d(TAG, ">>>> mCommPackage: "  +  mCommPackage.mModule);
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new VectorIconsPackage(),
                    new LinearGradientPackage(), // <---- and This!
                    mCommPackage

            );
        }
    };
    public  final ReactNativeHost mReactNativeHost1 = new ReactNativeHost(this) {

        @Nullable
        @Override
        protected String getJSBundleFile() {
            File file = new File(FileConstant.JS_BUNDLE_LOCAL_PATH);
            Log.d(TAG, ">>>> file: "  +  file.getAbsolutePath());
            if (file != null && file.exists()) {
                return FileConstant.JS_BUNDLE_LOCAL_PATH;
            } else {
                return super.getJSBundleFile();
            }
        }
        @Nullable
        @Override
        protected String getBundleAssetName() {
            Log.d(TAG, ">>>> BundleAssetName: "  + RNBridgeManager.bundleAssetName);
            return "index.dataMall.bundle";
        }

        @Override
        public boolean getUseDeveloperSupport() {
            return com.rnbridge.BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            Log.d(TAG, ">>>> mCommPackage: "  +  mCommPackage.mModule);
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new VectorIconsPackage(),
                    new LinearGradientPackage(), // <---- and This!
                    mCommPackage

            );
        }
    };
    @Override
    public ReactNativeHost getReactNativeHost() {
        Log.d(TAG, ">>>>getReactNativeHost: "  + mReactNativeHost.hasInstance());
        Log.d(TAG, ">>>>getReactNativeHost: "  + RNBridgeManager.bundleAssetName);
        return reactNativeHostMap.get(RNBridgeManager.bundleAssetName);
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
}

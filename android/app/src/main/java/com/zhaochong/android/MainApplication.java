package com.zhaochong.android;


import android.app.Application;
import android.util.Log;

import com.rnbridge.RNBridgeManager;
import com.rnbridge.callback.Callback;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;

import static com.facebook.react.common.ReactConstants.TAG;


/**
 * Created by zhaochong on 2017/12/20.
 */

public class MainApplication extends Application implements ReactApplication {
    static MainApplication instance;

    @Override
    public void onCreate() {
        super.onCreate();
        instance =this;
        RNBridgeManager.getInstance().init(this, new Callback() {
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
        getReactNativeHost();
    }

    @Override
    public ReactNativeHost getReactNativeHost() {
        Log.d(TAG, ">>>>getReactNativeHost: "  +  RNBridgeManager.getInstance().mReactNativeHost.hasInstance());
        return RNBridgeManager.getInstance().mReactNativeHost;
    }

    public static MainApplication getInstance() {
        return instance;
    }
}

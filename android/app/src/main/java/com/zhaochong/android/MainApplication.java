package com.zhaochong.android;


import android.app.Application;

import com.rnbridge.RNBridgeManager;
import com.rnbridge.callback.Callback;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;


/**
 * Created by zhaochong on 2017/12/20.
 */

public class MainApplication extends Application implements ReactApplication {

    @Override
    public void onCreate() {
        super.onCreate();

        RNBridgeManager.getInstance().init(this, new Callback() {
            @Override
            public void onResult(Object o) {

            }

            @Override
            public void onError(int i) {

            }

            @Override
            public void onException(Throwable throwable) {

            }
        });
    }

    @Override
    public ReactNativeHost getReactNativeHost() {
        return RNBridgeManager.getInstance().mReactNativeHost;
    }
}

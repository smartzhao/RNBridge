package com.rnbridge.communication;

import android.util.Log;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.logging.Logger;

import static com.facebook.react.common.ReactConstants.TAG;


/**
 * 通信Module类
 * Created by zhaochong on 2017/12/20.
 */
public class CommPackage implements ReactPackage {

    public CommModule mModule;

    /**
     * 创建Native Module
     * @param reactContext
     * @return
     */
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        mModule = new CommModule(reactContext);
        modules.add(mModule);
        Log.d(TAG, ">>>>createNativeModules: "  +modules);
        return modules;
    }

    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}

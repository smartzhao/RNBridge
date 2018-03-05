package com.rnbridge;

import android.app.Activity;
import android.app.Application;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.ArrayMap;
import android.util.Log;

import com.rnbridge.callback.Callback;
import com.rnbridge.code.ErrorCode;
import com.rnbridge.communication.CommPackage;
import com.rnbridge.constants.FileConstant;
import com.rnbridge.preloadreact.ReactNativePreLoader;
import com.rnbridge.rnactivity.RNActivity;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.io.File;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Nullable;

import static com.facebook.react.common.ReactConstants.TAG;

/**
 * Created by zhaochong on 2018/2/1.
 * rn manager
 */

public class RNBridgeManager {
    private static RNBridgeManager instance;  //静态变量
    public Application context;
    public Callback callback;
    private ReactInstanceManager mReactInstanceManager;
    private static final CommPackage mCommPackage = new CommPackage();
    private ReactNativeHost mReactNativeHost;
    public static  String bundleAssetName = "index.dataMall.bundle";// TODO 临时调试，后面写成index.Android.bundle
    private Map<String,ReactNativeHost> reactNativeHostMap;

    private RNBridgeManager() {
    }  //私有构造函数

    public static RNBridgeManager getInstance() {
        if (instance == null) {  //第一层校验
            synchronized (RNBridgeManager.class) {
                if (instance == null) {  //第二层校验
                    instance = new RNBridgeManager();
                }
            }
        }
        return instance;
    }

    public void init(Application context,Map<String,ReactNativeHost> reactNativeHostMap, Callback callback) {
        if (context == null) {
            callback.onError(ErrorCode.ERROR_CODE_00000);
        }else {
            callback.onResult("success");
            this.context = context;
            setReactNativeHostMap(reactNativeHostMap);
        //    setRNContext(context);
            SoLoader.init(getRNContext(), false);
        }
    }


    /**
     *  跳转到RN界面
     * @param context
     * @param bundleAssetName
     * @param jsMainModulePath
     * @param moduleName
     * @param bundleParams
     */
    public static void startRNActivity(Context context ,String bundleAssetName ,String jsMainModulePath,String moduleName,Bundle bundleParams) {
        Intent intent = new Intent(context, RNActivity.class);
        Bundle bundle = new Bundle();
        bundle.putString("bundleAssetName", bundleAssetName);
        bundle.putString("jsMainModulePath", jsMainModulePath);
        bundle.putString("moduleName", moduleName);
        bundle.putBundle("bundleParams",bundleParams);
        intent.putExtras(bundle);
        context.startActivity(intent);
    }

    /**
     *  跳转到RN界面
     * @param context
     * @param mReactInstanceManager
     * @param bundleParams
     * @param moduleName
     */
    public static void startRNActivity(Context context ,String moduleName ,ReactInstanceManager mReactInstanceManager,Bundle bundleParams) {
        RNBridgeManager.getInstance().setReactInstanceManager(mReactInstanceManager);
        Intent intent = new Intent(context, RNActivity.class);
        Bundle bundle = new Bundle();
        bundle.putString("moduleName", moduleName);
        bundle.putBundle("bundleParams",bundleParams);
        intent.putExtras(bundle);
        context.startActivity(intent);
    }

    public  void setReactInstanceManager(ReactInstanceManager mReactInstanceManager) {
        this.mReactInstanceManager = mReactInstanceManager;
    }

    public static void preLoad(Activity activity,String componentName, String bundleassetname,ReactInstanceManager reactInstanceManager, @Nullable Bundle initialProperties) {
        bundleAssetName = bundleassetname;
        Log.d(TAG, ">>>>preLoad bundleAssetName:  " + bundleAssetName);
        ReactNativePreLoader.preLoad(activity,reactInstanceManager,componentName,bundleassetname,initialProperties);
    }

    public  ReactInstanceManager getReactInstanceManager() {
        return mReactInstanceManager;
    }
    /**
     * 包名
     */
    public String getAppPackageName() {
        return getRNContext().getPackageName();
    }

    /**
     * 获取 reactPackage
     *
     * @return
     */
    public static CommPackage getReactPackage() {
        return mCommPackage;
    }
    /**
     * 获取 Application中 ReactNativeHost
     * @return
     */
    public ReactNativeHost getReactNativeHost() {
        if (getReactNativeHostMap().get(bundleAssetName) != null) {
            return getReactNativeHostMap().get(bundleAssetName);
        }
      return  null;
    }

    /**
     * 获取Application实例
     */
    public void setRNContext(Application context) {
        this.context = context;
    }

    public Context getRNContext() {
        return context;
    }

    public Map<String, ReactNativeHost> getReactNativeHostMap() {
        return reactNativeHostMap;
    }

    public void setReactNativeHostMap(Map<String, ReactNativeHost> reactNativeHostMap) {
        this.reactNativeHostMap = reactNativeHostMap;
    }

}

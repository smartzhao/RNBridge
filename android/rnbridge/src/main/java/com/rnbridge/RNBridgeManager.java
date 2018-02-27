package com.rnbridge;

import android.app.Application;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.rnbridge.callback.Callback;
import com.rnbridge.code.ErrorCode;
import com.rnbridge.communication.CommPackage;
import com.rnbridge.constants.FileConstant;
import com.rnbridge.rnactivity.RNActivity;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.io.File;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Nullable;

import static com.facebook.react.common.ReactConstants.TAG;

/**
 * Created by zhaochong on 2018/2/1.
 * rn manager
 */

public class RNBridgeManager {
    private static RNBridgeManager instance;  //静态变量
    public Context context;
    public Callback callback;
    private ReactInstanceManager mReactInstanceManager;
    public static final CommPackage mCommPackage = new CommPackage();

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

    public void init(Context context, Callback callback) {
        if (context == null) {
            callback.onError(ErrorCode.ERROR_CODE_00000);
        }else {
            callback.onResult("success");
            setRNContext(context);
            SoLoader.init(getRNContext(), false);
        }
    }

    public ReactNativeHost mReactNativeHost = new ReactNativeHost((Application) getRNContext()) {

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
            Log.d(TAG, ">>>> BundleAssetName: "  + super.getBundleAssetName());
            return "index.VPCenter.bundle";
        }

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            Log.d(TAG, ">>>> mCommPackage: "  +  mCommPackage.mModule);
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    mCommPackage

            );
        }
    };

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
     * 获取Application实例
     */
    public void setRNContext(Context context) {
        this.context = context;
    }

    public Context getRNContext() {
        return context;
    }
}

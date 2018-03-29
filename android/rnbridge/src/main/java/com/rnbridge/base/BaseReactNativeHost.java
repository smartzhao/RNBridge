package com.rnbridge.base;

import android.app.Application;
import android.util.Log;

import com.facebook.infer.annotation.Assertions;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactInstanceManagerBuilder;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.devsupport.RedBoxHandler;
import com.facebook.react.uimanager.UIImplementationProvider;
import com.rnbridge.BuildConfig;
import com.rnbridge.RNBridgeManager;
import com.rnbridge.communication.CommPackage;
import com.rnbridge.constants.FileConstant;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;

import java.io.File;
import java.util.List;

import javax.annotation.Nullable;

import static com.facebook.react.common.ReactConstants.TAG;

/**
 * Created by zhaochong on 2018/2/1.
 */

public abstract class BaseReactNativeHost extends ReactNativeHost {

    private final Application mApplication;
    private @Nullable
    ReactInstanceManager mReactInstanceManager;

    protected BaseReactNativeHost(Application application) {
        super(application);
        mApplication = application;
    }

    /**
     * 获取ReactInstanceManager单列
     * @return
     */
    public ReactInstanceManager getReactInstanceManager() {
        if (mReactInstanceManager == null) {
            mReactInstanceManager = createReactInstanceManager();
        }
        return mReactInstanceManager;
    }

    /**
     * 判断单列
     * @return
     */
    public boolean hasInstance() {
        return mReactInstanceManager != null;
    }

    /**
     * 释放mReactInstanceManager
     */
    public void clear() {
        if (mReactInstanceManager != null) {
            mReactInstanceManager.destroy();
            mReactInstanceManager = null;
        }
    }

    /**
     * 实例ReactInstanceManager
     * @return
     */
    protected ReactInstanceManager createReactInstanceManager() {
        ReactInstanceManagerBuilder builder = ReactInstanceManager.builder()
                .setApplication(mApplication)
                .setJSMainModulePath(getJSMainModuleName())
                .setUseDeveloperSupport(getUseDeveloperSupport())
                .setRedBoxHandler(getRedBoxHandler())
                .setJavaScriptExecutorFactory(getJavaScriptExecutorFactory())
                .setUIImplementationProvider(getUIImplementationProvider())
                .setInitialLifecycleState(LifecycleState.BEFORE_CREATE);

        for (ReactPackage reactPackage : getPackages()) {
            builder.addPackage(reactPackage);
        }

        String jsBundleFile = getJSBundleFile();
        if (jsBundleFile != null) {
            builder.setJSBundleFile(jsBundleFile);
        } else {
            builder.setBundleAssetName(Assertions.assertNotNull(getBundleAssetName()));
        }
        return builder.build();
    }


    protected @Nullable
    RedBoxHandler getRedBoxHandler() {
        return null;
    }


    protected @Nullable
    JavaScriptExecutorFactory getJavaScriptExecutorFactory() {
        return null;
    }


    protected UIImplementationProvider getUIImplementationProvider() {
        return new UIImplementationProvider();
    }


    protected String getJSMainModuleName() {
        return "index.android";
    }

    /**
     * 本地sd卡加载路径
     *
     * @return
     */
    protected @Nullable
    String getJSBundleFile() {
        File file = new File(FileConstant.JS_BUNDLE_LOCAL_PATH);
        Log.d(TAG, ">>>> file: " + file.getAbsolutePath());
        if (file != null && file.exists()) {
            return FileConstant.JS_BUNDLE_LOCAL_PATH;
        } else {
            return super.getJSBundleFile();
        }
    }

    /**
     * 默认BundleAssetName
     *
     * @return
     */
    protected @Nullable
    String getBundleAssetName() {
        Log.d(TAG, ">>>> BundleAssetName: " + RNBridgeManager.getInstance().getBundleAssetName());
        return RNBridgeManager.getInstance().getBundleAssetName();
    }

    /**
     * 需要重写环境判断
     * @return
     */
    public abstract boolean getUseDeveloperSupport();

    /**
     * 重写需要自定义的ReactPackage
     * @return
     */
    protected abstract List<ReactPackage> getPackages();
}

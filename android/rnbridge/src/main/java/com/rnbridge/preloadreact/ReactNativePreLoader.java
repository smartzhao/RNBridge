package com.rnbridge.preloadreact;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.ViewGroup;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.shell.MainReactPackage;
import com.rnbridge.RNBridgeManager;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

import static com.facebook.react.common.ReactConstants.TAG;

/**
 * 预加载工具类
 * Created by zhaochong on 2017/12/20.
 */
public class ReactNativePreLoader {

    private static final Map<String, ReactRootView> CACHE = new HashMap<>();

    /**
     * 初始化ReactRootView，并添加到缓存
     *
     * @param reactInstanceManager
     * @param componentName
     */
    public static void preLoad(Activity activity, ReactInstanceManager reactInstanceManager, String componentName, String bundleAssetName, @Nullable Bundle initialProperties) {
        //TODO 通过资源bundle名称来区分缓存,让所需要的bundle的comonentName进行自定义和一致性管理
        if (CACHE.get(bundleAssetName) != null) {
            return;
        }
        // 1.创建ReactRootView
        ReactRootView rootView = new ReactRootView(activity);
        rootView.startReactApplication(
                reactInstanceManager,
                componentName,
                initialProperties);

        // 2.添加到缓存
        CACHE.put(bundleAssetName, rootView);
    }

    /**
     * 获取ReactRootView
     *
     * @param bundleAssetName
     * @return
     */
    public static ReactRootView getReactRootView(String bundleAssetName) {
        return CACHE.get(bundleAssetName);
    }

    /**
     * 从当前界面移除 ReactRootView
     *
     * @param bundleAssetName
     */
    public static void deatchView(String bundleAssetName) {
        try {
            ReactRootView rootView = getReactRootView(bundleAssetName);
            ViewGroup parent = (ViewGroup) rootView.getParent();
            if (parent != null) {
                parent.removeView(rootView);
            }
        } catch (Throwable e) {
            Log.e("ReactNativePreLoader", e.getMessage());
        }
    }
}

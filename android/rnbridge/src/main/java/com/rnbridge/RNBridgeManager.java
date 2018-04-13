package com.rnbridge;

import android.app.Activity;
import android.app.Application;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.ReactApplicationContext;
import com.kaopiz.kprogresshud.KProgressHUD;
import com.rnbridge.callback.Callback;
import com.rnbridge.callback.ICustomProgress;
import com.rnbridge.callback.RNPushlishMsgListener;
import com.rnbridge.code.ErrorCode;
import com.rnbridge.constants.RNBridgeConstants;
import com.rnbridge.preloadreact.ReactNativePreLoader;
import com.rnbridge.rnactivity.BaseReactActivity;
import com.rnbridge.rnactivity.RNActivity;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.soloader.SoLoader;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.annotation.Nullable;

import static com.facebook.react.common.ReactConstants.TAG;

/**
 * Created by zhaochong on 2018/2/1.
 * rn manager
 */

public class RNBridgeManager {
    private volatile static RNBridgeManager instance;  //静态变量
    public Application context;
    public Callback callback;
    private ReactInstanceManager mReactInstanceManager;
    private ReactNativeHost mReactNativeHost;
    public String bundleAssetName;// TODO 临时调试，后面写成index.Android.bundle
    private Map<String, ReactNativeHost> reactNativeHostMap;
    private Bundle initialProperties;
    private String componentName;
    private KProgressHUD hud;
    private String label;
    private String detailsLabel;
    private KProgressHUD.Style style;
    private View progressView;
    private RNPushlishMsgListener rnPushlishMsgListener;
    private Map<String, Object> mapContants = new HashMap<>();
    private static Map<String, Activity> destoryMap = new HashMap<>();

    /**
     * 私有构造函数
     */
    private RNBridgeManager() {
    }

    /**
     * 单例RNBridgeManager
     *
     * @return
     */
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

    /**
     * 初始化入口
     *
     * @param context
     * @param reactNativeHostMap
     * @param callback
     */
    public void init(Application context, Map<String, ReactNativeHost> reactNativeHostMap, Callback callback) {
        if (context == null) {
            callback.onError(ErrorCode.ERROR_CODE_00000);
        } else {
            callback.onResult("success");
            setRNContext(context);
            setReactNativeHostMap(reactNativeHostMap);
            SoLoader.init(getRNContext(), false);
        }
    }


    /**
     * 跳转到RN界面
     *
     * @param context
     * @param bundleAssetName
     * @param jsMainModulePath
     * @param moduleName
     * @param bundleParams
     */
    public static void startRNActivity(Context context, String bundleAssetName, String jsMainModulePath, String moduleName, Bundle bundleParams) {
        Intent intent = new Intent(context, RNActivity.class);
        Bundle bundle = new Bundle();
        bundle.putString("bundleAssetName", bundleAssetName);
        bundle.putString("jsMainModulePath", jsMainModulePath);
        bundle.putString("moduleName", moduleName);
        bundle.putBundle("bundleParams", bundleParams);
        intent.putExtras(bundle);
        context.startActivity(intent);
    }

    /**
     * 自定义跳转activity
     *
     * @param activity
     * @param cls
     */
    public static void startRNActivity( Activity activity, Class<? extends BaseReactActivity> cls) {
        if (cls != null) {
            activity.startActivity(new Intent(activity, cls));
        } else {
            startRNActivity(activity);
        }
    }

    /**
     * 跳转到RN界面
     *
     * @param activity
     */
    public static void startRNActivity(Activity activity) {
        activity.startActivity(new Intent(activity, BaseReactActivity.class));
    }


    /**
     * 设置ReactInstanceManager
     *
     * @param mReactInstanceManager
     * @return
     */
    public RNBridgeManager setReactInstanceManager(ReactInstanceManager mReactInstanceManager) {
        this.mReactInstanceManager = mReactInstanceManager;
        return this;
    }

    /**
     * 获取ReactInstanceManager
     *
     * @return
     */
    public ReactInstanceManager getReactInstanceManager() {
        return mReactInstanceManager;
    }

    /**
     * 预加载bundle
     *
     * @param activity
     * @param componentName
     * @param bundleassetname
     * @param reactInstanceManager
     * @param initialProperties
     */
    public void preLoad(Activity activity, String componentName, String bundleassetname, ReactInstanceManager reactInstanceManager, @Nullable Bundle initialProperties) {
        setBundleAssetName(bundleassetname);
        Log.d(TAG, ">>>>preLoad bundleAssetName:  " + bundleAssetName);
        ReactNativePreLoader.preLoad(activity, reactInstanceManager, componentName, bundleassetname, initialProperties);
    }

    /**
     * 包名
     */
    public String getAppPackageName() {
        return getRNContext().getPackageName();
    }


    /**
     * 获取 Application中 ReactNativeHost
     *
     * @return
     */
    public ReactNativeHost getReactNativeHost() {
        if (getReactNativeHostMap().get(bundleAssetName) != null) {
            return getReactNativeHostMap().get(bundleAssetName);
        }
        return null;
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

    /**
     * 获取启动所需参数
     *
     * @return
     */
    public @Nullable
    Bundle getLaunchOptions() {
        return initialProperties;
    }

    /**
     * 设置参数
     *
     * @param initialProperties
     */
    public RNBridgeManager setLaunchOptions(@Nullable Bundle initialProperties) {
        this.initialProperties = initialProperties;
        return this;
    }

    /**
     * 获取componentName
     *
     * @return
     */
    public String getComponentName() {
        return componentName;
    }

    /**
     * 设置componentName
     *
     * @param componentName
     */
    public RNBridgeManager setComponentName(String componentName) {
        this.componentName = componentName;
        return this;
    }

    @Nullable
    public String getBundleAssetName() {
        Log.d(TAG, ">>>> BundleAssetName: " + bundleAssetName);
        return bundleAssetName;
    }

    public RNBridgeManager setBundleAssetName(String bundleAssetName) {
        this.bundleAssetName = bundleAssetName;
        return this;
    }

    /**
     * 实例化进度progress
     */
    private ICustomProgress customProgress = new ICustomProgress() {
        @Override
        public void show() {
            if (hud != null) {
                hud.show();
            }

        }

        @Override
        public boolean isShowing() {
            if (hud != null) {
                return hud.isShowing();
            }
            return false;
        }

        @Override
        public void dismiss() {
            if (hud != null) {
                hud.dismiss();
            }
        }

        @Override
        public void getActivity(Activity activity) {
            //逻辑上所有的progress显示，需要在getActivity之后再去调用，实例化之后配置参数才能生效
            if (!(label == null || detailsLabel == null)) {//当setCustomProgressParams没有调用的时候，就不展示hud
                hud = KProgressHUD.create(activity)
                        .setLabel(label)
                        .setDetailsLabel(detailsLabel)
                        .setCancellable(true)
                        .setAnimationSpeed(2)
                        .setDimAmount(0.5f)
                        .setAutoDismiss(true);
                if (progressView != null && style != null) {
                    hud.setCustomView(progressView);
                    hud.setStyle(style);
                }
            }
        }
    };

    /**
     * 设置CustomProgressParams的参数和自定义View
     *
     * @param label
     * @param detailsLabel
     * @param style
     * @param view
     * @return
     */
    public RNBridgeManager setCustomProgressParams(String label, String detailsLabel, KProgressHUD.Style style, View view) {
        setCustomProgressParams(label, detailsLabel, style);
        this.progressView = view;
        return this;
    }

    /**
     * 设置CustomProgressParams的参数
     *
     * @param label
     * @param detailsLabel
     * @param style
     * @return
     */
    public RNBridgeManager setCustomProgressParams(String label, String detailsLabel, KProgressHUD.Style style) {
        this.label = label;
        this.detailsLabel = detailsLabel;
        this.style = style;
        return this;
    }

    /**
     * 获取自定义loading实例化
     *
     * @return
     */
    public ICustomProgress getCustomProgress() {
        return customProgress;
    }

    /**
     * native常量获取键值对并入
     *
     * @param key
     * @param value
     */
    public RNBridgeManager setNativeContants(String key, String value) {
        mapContants.put(key, value);
        return this;
    }

    /**
     * Reative native 获取常量的实例化入口
     *
     * @return
     */
    public Map<String, Object> getNativeContantMap() {
        return mapContants;
    }

    /**
     * native常量获取集合并入
     *
     * @param map
     */
    public RNBridgeManager setNativeContantMap(Map<String, Object> map) {
        this.mapContants.putAll(map);
        return this;
    }

    /**
     * 获取RnPushlishMsgListener
     *
     * @return
     */
    public RNPushlishMsgListener getRnPushlishMsgListener() {
        return rnPushlishMsgListener;
    }

    /**
     * 获取同步发送信息
     *
     * @param rnPushlishMsgListener
     * @return
     */
    public RNBridgeManager setRnPushlishMsgListener(RNPushlishMsgListener rnPushlishMsgListener) {
        this.rnPushlishMsgListener = rnPushlishMsgListener;
        return this;
    }
    /**
     * 添加到销毁队列
     *
     * @param activity 要销毁的activity
     */

    public static void addDestoryActivity(Activity activity, String activityName) {
        destoryMap.put(activityName, activity);
    }

    /**
     * 销毁指定Activity
     */
    public static void destoryActivity(String activityName) {
        Set<String> keySet = destoryMap.keySet();
        for (String key : keySet) {
            if (destoryMap.get(key) != null) {
                destoryMap.get(key).finish();
            }
        }
    }
    /**
     * 移除指定Activity
     */
    public static void removeActivity(String activityName) {
        Set<String> keySet = destoryMap.keySet();
        for (String key : keySet) {
            if (destoryMap.get(key) != null) {
                destoryMap.remove(key);
            }
        }
    }
    /**
     * 处理rnCallNativeAction
     *
     * @param action
     * @param params
     * @param mReactApplicationContext
     * @return
     */
    public RNBridgeManager rnCallNativeAction(String action, String params, ReactApplicationContext mReactApplicationContext) {
        switch (action) {
            case RNBridgeConstants.ACTION_DISSMISS_PROGRESSHUD:
                if (RNBridgeManager.getInstance().getCustomProgress() != null) {
                    RNBridgeManager.getInstance().getCustomProgress().dismiss();
                }
                break;
          /*  case RNBridgeConstants.ACTION_COLSE_REACTNATIVE:
                //关闭ReactNative
                try {
                    Activity currentActivity = mReactApplicationContext.getCurrentActivity();
                    if (null != currentActivity) {
                        currentActivity.finish();
                    }
                } catch (Exception e) {
                    throw new JSApplicationIllegalArgumentException(
                            "colseReactNative : " + e.getMessage());
                }
                break;
            case RNBridgeConstants.ACTION_STARTACTIVITY_FROMJS:
                //从JS页面跳转到原生activity 同时也可以从JS传递相关数据到原生
                try {
                    Activity currentActivity = mReactApplicationContext.getCurrentActivity();
                    if (null != currentActivity && null != action) {
                        Class toActivity = Class.forName(action);
                        Intent intent = new Intent(currentActivity, toActivity);
                        intent.putExtra("params", params);
                        currentActivity.startActivity(intent);
                    }
                } catch (Exception e) {
                    throw new JSApplicationIllegalArgumentException(
                            "不能打开Activity : " + e.getMessage());
                }
                break;*/
            default:
                if (rnPushlishMsgListener != null) {
                    rnPushlishMsgListener.rnCallNative(action, params);
                }
                break;
        }

        return this;
    }
}

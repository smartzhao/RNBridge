package com.rnbridge.communication;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.support.annotation.Nullable;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.rnbridge.utils.PermissionUtils;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;
import java.util.Map;

import static android.content.ContentValues.TAG;

/**
 * 通信Module类
 * Created by zhaochong on 2017/12/20.
 */
public class CommModule extends ReactContextBaseJavaModule {

    private ReactApplicationContext mContext;
    public static final String MODULE_NAME = "commModule";
    public static final String EVENT_NAME = "nativeCallRn";
    public static final String EVENT_NAME1 = "getPatchImgs";

    /**
     * 构造方法必须实现
     *
     * @param reactContext
     */
    public CommModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mContext = reactContext;
    }

    /**
     * 在rn代码里面是需要这个名字来调用该类的方法
     *
     * @return
     */
    @Override
    public String getName() {
        return MODULE_NAME;
    }

    /**
     * RN调用Native的方法
     *
     * @param phone
     */
    @ReactMethod
    public void rnCallNative(String phone) {
        Toast.makeText(mContext, phone, Toast.LENGTH_SHORT).show();
        PermissionUtils.requestPermissins(mContext, Manifest.permission.SYSTEM_ALERT_WINDOW);
        Log.d(TAG, "111111rnCallNative: " + phone);
    }


    /**
     * 从JS页面跳转到原生activity 同时也可以从JS传递相关数据到原生
     *
     * @param name   需要打开的Activity的class
     * @param params
     */
    @ReactMethod
    public void startActivityFromJS(String name, String params) {
        try {
            Activity currentActivity = getCurrentActivity();
            if (null != currentActivity && null != name) {
                Class toActivity = Class.forName(name);
                Intent intent = new Intent(currentActivity, toActivity);
                intent.putExtra("params", params);
                currentActivity.startActivity(intent);
            }
        } catch (Exception e) {
            throw new JSApplicationIllegalArgumentException(
                    "不能打开Activity : " + e.getMessage());
        }
    }

    /**
     * 关闭ReactNative
     */
    @ReactMethod
    public void colseReactNative() {
        try {
            Activity currentActivity = getCurrentActivity();
            if (null != currentActivity) {
                currentActivity.finish();
            }
        } catch (Exception e) {
            throw new JSApplicationIllegalArgumentException(
                    "colseReactNative : " + e.getMessage());
        }
    }

    /**
     * Native调用RN
     *
     * @param msg
     */
    public void nativeCallRn(String msg) {
        mContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(EVENT_NAME, msg);
    }

    /**
     * Callback 方式
     * rn调用Native,并获取返回值
     *
     * @param msg
     * @param callback
     */
    @ReactMethod
    public void rnCallNativeFromCallback(String msg, Callback callback) {

        // 1.处理业务逻辑...
        String result = "处理结果：" + msg;
        // 2.回调RN,即将处理结果返回给RN
        callback.invoke(result);
    }

    /**
     * Promise
     *
     * @param msg
     * @param promise
     */
    @ReactMethod
    public void rnCallNativeFromPromise(String msg, Promise promise) {

        Log.e("---", "adasdasda");
        // 1.处理业务逻辑...
        String result = "处理结果：" + msg;
        // 2.回调RN,即将处理结果返回给RN
        promise.resolve(result);
    }

    /**
     * 向RN传递常量
     */
    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        Map<String, Object> params = new HashMap<>();
        params.put("Constant", "我是常量，传递给RN");
        return params;
    }
}

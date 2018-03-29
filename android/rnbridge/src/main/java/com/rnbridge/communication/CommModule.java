package com.rnbridge.communication;

import android.app.Activity;
import android.content.Intent;
import android.support.annotation.Nullable;
import android.util.Log;

import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.rnbridge.RNBridgeManager;
import com.rnbridge.callback.RNPushlishMsgListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.rnbridge.constants.RNBridgeConstants;

import java.util.HashMap;
import java.util.Map;

/**
 * 通信Module类
 * Created by zhaochong on 2017/12/20.
 */
public class CommModule extends ReactContextBaseJavaModule {

    private ReactApplicationContext mContext;
    private RNPushlishMsgListener rnPushlishMsgListener = RNBridgeManager.getInstance().getRnPushlishMsgListener();


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
        return RNBridgeConstants.MODULE_NAME;
    }

    /**
     * RN调用Native的方法
     * <p>
     * 执行本地方法，不进行参数返回。根据action进行判断
     * 方法不能重载
     *
     * @param action
     */

    @ReactMethod
    public void rnCallNativeAction(String action) {

        RNBridgeManager.getInstance().rnCallNativeAction(action, null,mContext);
    }


    /**
     * RN调用Native的方法
     *
     * @param action 执行事件
     * @param params 事件参数
     */
    @ReactMethod
    public void rnCallNativeaAddParams(String action, String params) {

        RNBridgeManager.getInstance().rnCallNativeAction(action, params,mContext);
    }

    /**
     * Native调用RN
     *
     * @param eventName
     * @param data
     */
    public void nativeCallRn(String eventName, @javax.annotation.Nullable Object data) {
        mContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, data);
    }


    /**
     * 下面是React Native主动调用方法获取
     */


    /**
     * Callback 方式
     * rn调用Native,并获取返回值
     *
     * @param msg
     * @param callback
     */
    @ReactMethod
    public void rnCallNativeFromCallback(String msg, Callback callback) {
        Log.d("---Callback", "test" + msg);
        // 1.处理业务逻辑...
        String result = null;
        if (rnPushlishMsgListener != null) {
            result = rnPushlishMsgListener.rnCallNativeFromCallback(msg);
        }
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

        Log.d("---promise", "test" + msg);
        // 1.处理业务逻辑...
        String result = null;
        if (rnPushlishMsgListener != null) {
            result = rnPushlishMsgListener.rnCallNativeFromPromise(msg);
        }
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
        params.putAll(RNBridgeManager.getInstance().getNativeContantMap());
        Log.d("---params", "test");
        return params;
    }
}

package com.rnbridge.callback;

/**
 * Created by zhaochong on 2018/3/28.
 */

public interface RNPushlishMsgListener {

    String rnCallNativeFromPromise(String action, String params);

    String rnCallNativeFromCallback(String action, String params);

    void rnCallNative(String action, String params);


    // void getConstants();

}

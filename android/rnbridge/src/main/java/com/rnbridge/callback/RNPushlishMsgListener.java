package com.rnbridge.callback;

/**
 * Created by zhaochong on 2018/3/28.
 */

public interface RNPushlishMsgListener {

    String rnCallNativeFromPromise(String msg);

    String rnCallNativeFromCallback(String msg);

    void rnCallNative(String s, String action);


    // void getConstants();

}

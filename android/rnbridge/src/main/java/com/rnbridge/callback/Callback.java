package com.rnbridge.callback;
/**
 * Created by zhaochong on 2018/2/1.
 * rn manager
 */
public interface Callback<T> {
    void onResult(T t);

    void onError(int i);

    void onException(Throwable throwable);
}
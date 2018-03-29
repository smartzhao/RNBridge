package com.rnbridge;

/**
 * Created by zhaochong on 2018/2/1.
 * rn manager
 */
public interface ParseData {
    <T> T parse(String httpResponse);
}

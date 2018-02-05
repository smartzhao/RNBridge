package com.rnbridge.rnactivity;


import com.rnbridge.preloadreact.PreLoadReactActivity;

import javax.annotation.Nullable;

/**
 * Created by zhaochong on 2017/12/20.
 */
public class MyReactActivity extends PreLoadReactActivity {

    @Nullable
    @Override
    protected String getMainComponentName() {
        return "RnBase";
    }
}

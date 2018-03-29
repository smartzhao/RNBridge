package com.rnbridge.rnactivity;


import android.os.Bundle;

import com.rnbridge.RNBridgeManager;
import com.rnbridge.callback.ICustomProgress;
import com.rnbridge.preloadreact.PreLoadReactActivity;

import javax.annotation.Nullable;

/**
 * Created by zhaochong on 2017/12/20.
 */
public class BaseReactActivity extends PreLoadReactActivity {

    @Nullable
    @Override
    protected String getMainComponentName() {
        return RNBridgeManager.getInstance().getComponentName();
    }

    @Nullable
    @Override
    protected Bundle getLaunchOptions() {
        if (RNBridgeManager.getInstance().getLaunchOptions() != null) {
            return RNBridgeManager.getInstance().getLaunchOptions();
        }
        return super.getLaunchOptions();
    }

    @Nullable
    @Override
    protected String getBundleAssetName() {
        if (RNBridgeManager.getInstance().getBundleAssetName() != null) {
            return RNBridgeManager.getInstance().getBundleAssetName();
        }
        return super.getBundleAssetName();
    }

    @Nullable
    @Override
    protected ICustomProgress getCustomProgressView() {
        if (RNBridgeManager.getInstance().getCustomProgress() != null) {
            return RNBridgeManager.getInstance().getCustomProgress();
        }
        return super.getCustomProgressView();
    }
}

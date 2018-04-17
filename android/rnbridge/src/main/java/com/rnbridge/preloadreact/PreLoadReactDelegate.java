package com.rnbridge.preloadreact;

import android.annotation.TargetApi;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.support.v4.app.FragmentActivity;
import android.view.KeyEvent;
import android.view.ViewGroup;
import android.widget.Toast;

import com.kaopiz.kprogresshud.KProgressHUD;
import com.rnbridge.RNBridgeManager;
import com.facebook.infer.annotation.Assertions;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.Callback;
import com.facebook.react.devsupport.DoubleTapReloadRecognizer;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.modules.core.PermissionListener;
import com.rnbridge.callback.ICustomProgress;
import com.rnbridge.callback.RNPushlishMsgListener;

import javax.annotation.Nullable;

/**
 * 处理预加载代理类
 * Created by zhaochong on 2017/12/20.
 */

public class PreLoadReactDelegate {

    private Activity mActivity;
    private ReactRootView mReactRootView;
    private Callback mPermissionsCallback;
    private final String mMainComponentName;
    private Bundle initialProperties;
    private String bundleAssetName;
    private final @Nullable
    FragmentActivity mFragmentActivity;
    private PermissionListener mPermissionListener;
    private final int REQUEST_OVERLAY_PERMISSION_CODE = 1111;
    private DoubleTapReloadRecognizer mDoubleTapReloadRecognizer;
    private ICustomProgress iCustomProgress;

    protected ReactRootView createRootView() {
        return new ReactRootView(getContext());
    }

    public PreLoadReactDelegate(Activity activity, @Nullable String mainComponentName, @Nullable String bundleAssetName, @Nullable Bundle initialProperties, @Nullable ICustomProgress iCustomProgress) {
        this.mActivity = activity;
        this.mMainComponentName = mainComponentName;
        this.initialProperties = initialProperties;
        this.bundleAssetName = bundleAssetName;
        this.iCustomProgress = iCustomProgress;
        mFragmentActivity = null;
    }

    public PreLoadReactDelegate(FragmentActivity fragmentActivity, @Nullable String mainComponentName, @Nullable String bundleAssetName, @Nullable Bundle initialProperties, @Nullable ICustomProgress iCustomProgress) {
        this.mActivity = null;
        this.mMainComponentName = mainComponentName;
        this.initialProperties = initialProperties;
        this.bundleAssetName = bundleAssetName;
        this.iCustomProgress = iCustomProgress;
        mFragmentActivity = fragmentActivity;
    }

    public void onCreate() {
        boolean needsOverlayPermission = false;
        if (getReactNativeHost().getUseDeveloperSupport() && Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            // Get permission to show redbox in dev builds.
            if (!Settings.canDrawOverlays(getContext())) {
                needsOverlayPermission = true;
                Intent serviceIntent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:" + getPlainActivity().getPackageName()));
                ((Activity) getContext()).startActivityForResult(serviceIntent, REQUEST_OVERLAY_PERMISSION_CODE);
            }
        }

        if (bundleAssetName != null && !needsOverlayPermission) {
            // 1.从缓存中获取RootView
            mReactRootView = ReactNativePreLoader.getReactRootView(bundleAssetName);
            if (mReactRootView != null) {
                throw new IllegalStateException("Cannot loadApp while app is already running.");
            }
            // 2.缓存中不存在RootView,直接创建
            mReactRootView = createRootView();
            mReactRootView.startReactApplication(
                    getReactInstanceManager(),
                    mMainComponentName,
                    initialProperties);
            // 3.将RootView设置到Activity布局
            getPlainActivity().setContentView(mReactRootView);
        }

        mDoubleTapReloadRecognizer = new DoubleTapReloadRecognizer();
        iCustomProgress.getActivity(getPlainActivity());
        this.iCustomProgress.show();
        RNBridgeManager.addDestoryActivity(getPlainActivity(), "BaseReactActivity");
//        RNBridgeManager.getInstance().setRnPushlishMsgListener((RNPushlishMsgListener) mActivity);
    }

    public void onResume() {
        if (getReactNativeHost().hasInstance()) {
            getReactInstanceManager().onHostResume(getPlainActivity(), (DefaultHardwareBackBtnHandler) getPlainActivity());
        }
        if (mPermissionsCallback != null) {
            mPermissionsCallback.invoke();
            mPermissionsCallback = null;
        }
    }

    public void onPause() {
        if (getReactNativeHost().hasInstance()) {
            getReactInstanceManager().onHostPause(getPlainActivity());
        }
    }

    public void onDestroy() {
        ViewGroup parent;
        if (mReactRootView != null) {
            parent = (ViewGroup) mReactRootView.getParent();
           /* if (parent != null) {
                parent.removeView(mReactRootView);
            }*/
            mReactRootView.unmountReactApplication();
            mReactRootView = null;
        }
        if (getReactNativeHost().hasInstance()) {
            getReactInstanceManager().onHostDestroy(getPlainActivity());
        }
        // RNBridgeManager.removeActivity("BaseReactActivity");
        //   RNBridgeManager.destoryActivity("BaseReactActivity");
        //   getReactNativeHost().clear();
        // 清除View
        ReactNativePreLoader.deatchView(bundleAssetName);
    }

    public boolean onNewIntent(Intent intent) {
        if (getReactNativeHost().hasInstance()) {
            getReactInstanceManager().onNewIntent(intent);
            return true;
        }
        return false;
    }

    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (getReactNativeHost().hasInstance()) {
            getReactInstanceManager().onActivityResult(getPlainActivity(), requestCode, resultCode, data);
        } else {
            // Did we request overlay permissions?
            if (requestCode == REQUEST_OVERLAY_PERMISSION_CODE && Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                if (Settings.canDrawOverlays(mActivity)) {
                    if (mMainComponentName != null) {
                        if (mReactRootView != null) {
                            throw new IllegalStateException("Cannot loadApp while app is already running.");
                        }
                        mReactRootView = new ReactRootView(getPlainActivity());
                        mReactRootView.startReactApplication(
                                getReactInstanceManager(),
                                mMainComponentName,
                                null);
                        mActivity.setContentView(mReactRootView);
                    }
                }
            }
        }
    }

    public boolean onBackPressed() {
        if (getReactNativeHost().hasInstance()) {
            getReactInstanceManager().onBackPressed();
            return true;
        }
        return false;
    }

    public boolean onRNKeyUp(int keyCode) {
        if (getReactNativeHost().hasInstance() && getReactNativeHost().getUseDeveloperSupport()) {
            if (keyCode == KeyEvent.KEYCODE_MENU) {
                getReactInstanceManager().showDevOptionsDialog();
                return true;
            }
            boolean didDoubleTapR = Assertions.assertNotNull(mDoubleTapReloadRecognizer)
                    .didDoubleTapR(keyCode, getPlainActivity().getCurrentFocus());
            if (didDoubleTapR) {
                getReactInstanceManager().getDevSupportManager().handleReloadJS();
                return true;
            }
        }
        return false;
    }

    @TargetApi(Build.VERSION_CODES.M)
    public void requestPermissions(String[] permissions, int requestCode, PermissionListener listener) {
        mPermissionListener = listener;
        mActivity.requestPermissions(permissions, requestCode);
    }

    public void onRequestPermissionsResult(final int requestCode, final String[] permissions, final int[] grantResults) {
        mPermissionsCallback = new Callback() {
            @Override
            public void invoke(Object... args) {
                if (mPermissionListener != null && mPermissionListener.onRequestPermissionsResult(requestCode, permissions, grantResults)) {
                    mPermissionListener = null;
                }
            }
        };
    }

    /**
     * 获取 Application中 ReactNativeHost
     *
     * @return
     */
    private ReactNativeHost getReactNativeHost() {
        return RNBridgeManager.getInstance().getReactNativeHost();
    }

    /**
     * 获取 ReactInstanceManager
     *
     * @return
     */
    private ReactInstanceManager getReactInstanceManager() {
        return getReactNativeHost().getReactInstanceManager();
    }


    private Context getContext() {
        if (mActivity != null) {
            return mActivity;
        }
        return Assertions.assertNotNull(mFragmentActivity);
    }

    private Activity getPlainActivity() {
        return ((Activity) getContext());
    }
}

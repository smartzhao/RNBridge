package com.rnbridge.base;

import android.app.Application;

import com.rnbridge.BuildConfig;
import com.rnbridge.communication.CommPackage;
import com.rnbridge.constants.FileConstant;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.io.File;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Nullable;

/**
 * Created by zhaochong on 2018/2/1.
 */

public abstract class BaseReactNativeHost extends ReactNativeHost {
    public  BaseReactNativeHost instance ;
    public static final CommPackage mCommPackage = new CommPackage();
    protected BaseReactNativeHost(Application application) {
        super(application);
    }

    @Nullable
    @Override
    protected String getJSBundleFile() {
        File file = new File(FileConstant.JS_BUNDLE_LOCAL_PATH);
        if (file != null && file.exists()) {
            return FileConstant.JS_BUNDLE_LOCAL_PATH;
        } else {
            return super.getJSBundleFile();
        }
    }

    @Override
    public boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                mCommPackage
        );
    }

    public BaseReactNativeHost getInstance() {
        return instance;
    }
}

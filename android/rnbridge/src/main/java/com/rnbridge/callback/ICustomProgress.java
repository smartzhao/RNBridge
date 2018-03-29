package com.rnbridge.callback;

import android.app.Activity;

/**
 * Created by zhaochong on 2018/3/27.
 */

public interface ICustomProgress {

    void show();

    boolean isShowing();

    void dismiss();

    void getActivity(Activity activity);
}

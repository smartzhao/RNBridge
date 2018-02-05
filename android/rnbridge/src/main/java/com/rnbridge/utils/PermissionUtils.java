package com.rnbridge.utils;

import android.content.Context;

import com.yanzhenjie.permission.AndPermission;
import com.yanzhenjie.permission.PermissionNo;
import com.yanzhenjie.permission.PermissionYes;

import java.util.List;

/**
 * Created by zhaochong on 2017/12/21.
 */

public class PermissionUtils {
    private static PermissionUtils permissionUtils;

    public static PermissionUtils getInstance() {
        if (permissionUtils != null) {
            permissionUtils = new PermissionUtils();
        }
        return permissionUtils;
    }

    /**
     * 获取运行时权限
     * @param context
     * @param permissions
     */
    public static void requestPermissins(Context context,String... permissions) {
        AndPermission.with(context)
                .permission(permissions)
                .requestCode(300)
                .callback(permissionUtils)
                .start();
    }


    // The 300 is the the requestCode().
    @PermissionYes(300)
    private void getPermissionYes(List<String> grantedPermissions) {
        // Successfully.
    }

    @PermissionNo(300)
    private void getPermissionNo(List<String> deniedPermissions) {
        // Failure.
    }
}

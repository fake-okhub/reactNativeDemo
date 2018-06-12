package com.douban;

import android.content.Intent;
import android.text.TextUtils;

import com.apkfuns.logutils.LogUtils;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.github.alinz.reactnativewebviewbridge.WebViewBridgePackage;

import java.util.Arrays;
import java.util.List;

/**
 * Created by joyson on 2017/8/31.
 */

public class MyReactActivity extends ReactActivity {

    @Override
    protected String getMainComponentName() {
        return "ReactDemo";
    }

    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                new WebViewBridgePackage(),
                new MyReactPackage() //只需添加这里
        );
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if(resultCode == RESULT_OK && requestCode == 100){
            String result = data.getStringExtra("result");
            LogUtils.e("返回数据"+result);
            if (!TextUtils.isEmpty(result)){
                MyConstants.myBlockingQueue.add(result);
            } else {
                MyConstants.myBlockingQueue.add("无数据传回");
            }
        }else{
            LogUtils.e("没有数据");
            MyConstants.myBlockingQueue.add("没有");
        }
    }
}

package com.douban;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.support.annotation.Nullable;
import android.text.TextUtils;

import com.apkfuns.logutils.LogUtils;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by joyson on 2017/8/29.
 */

public class MyIntentModule extends ReactContextBaseJavaModule{
    public static final String REACTCLASSNAME = "MyIntentModule";
    private Context mContext;
    public MyIntentModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    @Override
    public String getName() {
        return REACTCLASSNAME;
    }

    /**
     * js页面跳转到activity 并传数据
     * @param name
     */
    @ReactMethod
    public void startActivityByClassname(String name){
        try{
            Activity currentActivity = getCurrentActivity();
            if(null!=currentActivity){
                Class aimActivity = Class.forName(name);
                Intent intent = new Intent(currentActivity,aimActivity);
                currentActivity.startActivity(intent);
            }
        }catch(Exception e){

            throw new JSApplicationIllegalArgumentException(
                    "无法打开activity页面: "+e.getMessage());
        }
    }

    @ReactMethod
    public void getDataFromIntent(Callback successBack, Callback erroBack){
        try{
            Activity currentActivity = getCurrentActivity();
            String result = currentActivity.getIntent().getStringExtra("result");//会有对应数据放入
            if (TextUtils.isEmpty(result)){
                result = "No Data";
            }
            successBack.invoke(result);
        }catch (Exception e){
            erroBack.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void finishActivity(String result){
        Activity currentActivity = getCurrentActivity();
        Intent intent = new Intent();
        intent.putExtra("result",result);
        currentActivity.setResult(11,intent);
        currentActivity.finish();
    }

    @ReactMethod
    public void dataToJS(Callback successBack, Callback errorBack){
        try{
            Activity currentActivity = getCurrentActivity();
            String result = currentActivity.getIntent().getStringExtra("result");
            if (TextUtils.isEmpty(result)){
                result = "没有数据";
            }
            successBack.invoke(result);
        }catch (Exception e){
            errorBack.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void startActivityForResult(String activityName,int requestCode,Callback successCallback,Callback erroCallback){
        try {
            Activity currentActivity = getCurrentActivity();
            if ( null!= currentActivity) {
                Class aimActivity = Class.forName(activityName);
                Intent intent = new Intent(currentActivity,aimActivity);
                currentActivity.startActivityForResult(intent,requestCode);
                String result = MyConstants.myBlockingQueue.take();
                successCallback.invoke(result);
                LogUtils.e("返回数据");
            }
        } catch (Exception e) {
            erroCallback.invoke(e.getMessage());
            throw new JSApplicationIllegalArgumentException(
                    "Could not open the activity : " + e.getMessage());
        }
    }

    @ReactMethod
    public void getTime() {
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

                SimpleDateFormat formatDate = new SimpleDateFormat("yyyy年MM月dd日  HH:mm:ss");
                Date date = new Date(System.currentTimeMillis());
                String time = formatDate.format(date);

                WritableMap writableMap = new WritableNativeMap();
                writableMap.putString("key", time);
                sendTransMisson((ReactContext)mContext, "EventName", writableMap);

            }
        }).start();
    }



    /**
     * @param reactContext
     * @param eventName    事件名
     * @param params       传惨
     */
    public void sendTransMisson(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);

    }
}

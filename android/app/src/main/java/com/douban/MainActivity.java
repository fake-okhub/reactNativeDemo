package com.douban;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;

import com.apkfuns.logutils.LogUtils;

public class MainActivity extends Activity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
//    @Override
//    protected String getMainComponentName() {
//        return "ReactDemo";
//    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.layout_main);
        findViewById(R.id.button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, MyReactActivity.class);
                Bundle bundle = new Bundle();
                startActivity(intent);
            }
        });
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

//    @Override
//    protected ReactActivityDelegate createReactActivityDelegate() {
//        return new MyReactDelegate(this,getMainComponentName());
//    }
//
//    //自定义MyReactDelegate
//    class  MyReactDelegate extends ReactActivityDelegate {
//
//        public MyReactDelegate(Activity activity, @javax.annotation.Nullable String mainComponentName) {
//            super(activity, mainComponentName);
//        }
//
//        @javax.annotation.Nullable
//        @Override
//        protected Bundle getLaunchOptions() {
//            Bundle bundle = new Bundle();
//            bundle.putString("bundle","android传递的初始化参数");
//            return bundle;
//        }
//    }
}

package com.douban;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.apkfuns.logutils.LogUtils;

import butterknife.ButterKnife;

import static com.douban.MyConstants.myBlockingQueue;

/**
 * Created by joyson on 2017/8/30.
 */

public class TestActiity extends Activity implements View.OnClickListener {


    Button button;
    EditText etInput;
    TextView tvFromRn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.layout_test);
        ButterKnife.bind(this);
        button=(Button) findViewById(R.id.button);
        etInput=(EditText) findViewById(R.id.et_input);
        tvFromRn=(TextView) findViewById(R.id.tv_from_rn);
        button.setOnClickListener(this);

        Intent intent = getIntent();
        LogUtils.e("intent:"+intent.toString());
        if (myBlockingQueue.isEmpty()){
            LogUtils.e("MyConstants is empty");

        }else {
            for (String text:MyConstants.myBlockingQueue){
                LogUtils.e("MyConstants is :"+text);
            }
        }
    }

    @Override
    protected void onResume() {
        super.onResume();


    }

    @Override
    public void onClick(View view) {
        switch (view.getId()){
            case R.id.button:
                String text = etInput.getText().toString();
                Intent intent = new Intent(TestActiity.this, MyReactActivity.class);
                intent.putExtra("result", text);
                startActivity(intent);
//                Intent data = new Intent();
//                data.putExtra("text", text);
//                //设置了结果数据
//                setResult(100, data);
//                finish();
                break;

        }
    }

}
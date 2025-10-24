package com.example.tastyguide;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void openItalianPage(View view) {
        Intent intent = new Intent(this, ItalianActivity.class);
        startActivity(intent);
    }

    public void openChinesePage(View view) {
        Intent intent = new Intent(this, ChineseActivity.class);
        startActivity(intent);
    }

    public void openIndianPage(View view) {
        Intent intent = new Intent(this, IndianActivity.class);
        startActivity(intent);
    }

    public void openDessertPage(View view) {
        Intent intent = new Intent(this, DessertActivity.class);
        startActivity(intent);
    }
}

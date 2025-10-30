package com.shwetha.urlshortener.util;

import com.shwetha.urlshortener.model.Url;

import java.time.LocalDateTime;

public class TestUtility {

    public Url getUrl(){
        Url url = new Url();
        url.setOriginalUrl("https://chatgpt.com/c/6901e155-4dcc-8320-9bb0-d3992835cb9b");
        url.setCreatedAt(LocalDateTime.now());
        url.setPrivate(false);
        url.setOwnerApiKey("test-api-key");
        return url;
    }

}

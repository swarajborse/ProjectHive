package com.shwetha.urlshortener.controller;

import com.shwetha.urlshortener.model.Url;
import com.shwetha.urlshortener.repository.UrlRepository;
import com.shwetha.urlshortener.service.UrlService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/urls")
@CrossOrigin(origins = "*")
public class UrlController {

    @Autowired
    private UrlService urlService;

    @Autowired
    private UrlRepository repository;

    @GetMapping("/")
    public String Home(){
        return "Hello from SpringBoot + MongoDb!";
    }

    @PostMapping("/create")
    public ResponseEntity<?> createUrl( @RequestBody Url url){

        Optional<Url> existing = repository.findByOriginalUrl(url.getOriginalUrl());

        if(existing.isPresent()){
            return ResponseEntity
                    .ok().
                    body(Map.of("message","Short code already exists","shortcode",existing.get().getShortCode()));
        }

        Url savedUrl = urlService.saveUrl(url);
        return ResponseEntity
                .status(201)
                .body(Map.of("message","New short code created","shortcode", savedUrl.getShortCode()));
    }

    @GetMapping("/r/{shortCode}")
    public void redirectToOriginal(@PathVariable String shortCode, HttpServletResponse response) throws IOException {
        Optional<Url> found = urlService.getByShortCode(shortCode);
        if (found.isPresent()) {
            response.sendRedirect(found.get().getOriginalUrl());
        } else {
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "Short URL not found");
        }
    }


}

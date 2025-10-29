package com.shwetha.urlshortener.service;

import com.mongodb.DuplicateKeyException;
import com.shwetha.urlshortener.model.Url;
import com.shwetha.urlshortener.repository.UrlRepository;
import org.apache.commons.codec.binary.Base32;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UrlService {

    @Autowired
    private UrlRepository urlRepository;

    private static final SecureRandom random = new SecureRandom();
    private static final Base32 base32 = new Base32();

    private String generateShortCode(){

        int attempts = 0;
        while(attempts<5) {
            byte[] randomBytes = new byte[5];
            random.nextBytes(randomBytes);

            String encoded = base32.encodeToString(randomBytes).replace("=","");
            String shortCode = encoded.substring(0,6);

            boolean exists = urlRepository.findByShortCode(shortCode).isPresent();
            if (!exists) return shortCode;

            attempts++;
        }
        throw new IllegalStateException("Could not generate unique short code after 5 attempts — database may be full or index issue.");
    }

    public Url saveUrl(Url url){

        Optional<Url> existing = urlRepository.findByOriginalUrl(url.getOriginalUrl());
        if (existing.isPresent()) {
            return existing.get();
        }

        if(url.getShortCode() == null || url.getShortCode().isEmpty()){
            url.setShortCode(generateShortCode());
        }
        try {
            url.setCreatedAt(LocalDateTime.now());
            url.setExpiresAt(LocalDateTime.now().plusDays(30));
            return urlRepository.save(url);
        } catch (DuplicateKeyException e){
            url.setShortCode(generateShortCode());
            return urlRepository.save(url);
        }
    }

    public Optional<Url> getByShortCode(String shortCode){
        Optional<Url> found = urlRepository.findByShortCode(shortCode);
        if(found.isPresent()){
            Url url = found.get();
            if(url.getExpiresAt() != null && url.getExpiresAt().isBefore(LocalDateTime.now()))
                return Optional.empty();
        }
        return found;
    }
}

package com.shwetha.urlshortener.repository;

import com.shwetha.urlshortener.model.Url;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UrlRepository extends MongoRepository<Url, String> {
    Optional<Url> findByShortCode(String shortcode);
    Optional<Url> findByOriginalUrl(String originalUrl);
}

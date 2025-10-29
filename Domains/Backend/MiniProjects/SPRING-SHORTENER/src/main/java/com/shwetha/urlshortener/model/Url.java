package com.shwetha.urlshortener.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "urls")
public class Url {
    @Id
    private String id;
    private String originalUrl;
    @Indexed(unique = true)
    private String shortCode;
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;
}

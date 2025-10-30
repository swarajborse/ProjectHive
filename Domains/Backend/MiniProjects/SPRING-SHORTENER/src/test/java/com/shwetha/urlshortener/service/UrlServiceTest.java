package com.shwetha.urlshortener.service;

import com.shwetha.urlshortener.model.Url;
import com.shwetha.urlshortener.repository.UrlRepository;
import com.shwetha.urlshortener.util.TestUtility;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UrlServiceTest {
    @InjectMocks
    private UrlService service;

    private TestUtility util;

    @Mock
    private UrlRepository repository;

    @BeforeEach
    void setUp() {
        util = new TestUtility();
    }

    @Test
    void testSaveUrlGeneratesShortCode(){
    when(repository.findByShortCode(anyString())).thenReturn(Optional.empty());

        when(repository.save(any(Url.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

    Url saved = service.saveUrl(util.getUrl());
    verify(repository).save(any(Url.class));
    assertNotNull(saved.getShortCode());
    assertEquals(6,saved.getShortCode().length());
    }

    @Test
    void testSaveUrlGeneratesShortCodeWhenDuplicateException(){
        when(repository.findByShortCode(anyString())).thenReturn(Optional.of(new Url()));

        assertThrows(IllegalStateException.class,()->{
            service.saveUrl(util.getUrl());
        });
    }

}

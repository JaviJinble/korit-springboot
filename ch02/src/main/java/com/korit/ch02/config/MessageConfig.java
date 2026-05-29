package com.korit.ch02.config;

import com.korit.ch02.message.EmailSender;
import com.korit.ch02.message.SmsSender;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MessageConfig {

    @Bean
    public EmailSender emailSender() {
        return new EmailSender();
    }

    @Bean
    public SmsSender smsSender() {
        return new SmsSender();
    }
}

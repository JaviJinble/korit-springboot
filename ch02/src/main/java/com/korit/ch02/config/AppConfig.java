package com.korit.ch02.config;

import com.korit.ch02.notification.EmailSender;
import com.korit.ch02.notification.MessageSender;
import com.korit.ch02.notification.NotificationService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    public MessageSender messageSender(){
        return new EmailSender();
    }

    public NotificationService notificationService() {
        return  new NotificationService(messageSender());
    }

}

package com.korit.ch02.notification;

public class NotificationService {
    private final MessageSender messageSender;

    public NotificationService(MessageSender messageSender) {
        this.messageSender = messageSender;
    }

    public void notify(String to, String message) {
        messageSender.send(to, message);
    }
}
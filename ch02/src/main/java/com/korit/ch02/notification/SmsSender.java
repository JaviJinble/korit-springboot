package com.korit.ch02.notification;

public class SmsSender implements MessageSender {
    @Override
    public void send(String to, String message) {
        System.out.println("[SMS] " + to + " : " + message);
    }
}

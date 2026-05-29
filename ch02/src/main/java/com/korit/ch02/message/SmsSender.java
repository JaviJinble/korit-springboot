package com.korit.ch02.message;

public class SmsSender implements MessageSender{
    @Override
    public void send(String to, String message) {
        System.out.println("[SMS] " + to + " : " + message);
    }
}

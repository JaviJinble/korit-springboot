package com.korit.ch02.message;

public class EmailSender implements MessageSender {
    @Override
    public void send(String to, String message) {
        System.out.println("[EMAIL] " + to + " : " + message);
    }
}

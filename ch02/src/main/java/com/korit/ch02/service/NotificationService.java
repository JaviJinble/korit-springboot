package com.korit.ch02.service;

import com.korit.ch02.message.MessageSender;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final MessageSender emailSender;
}

package com.korit.ch02.service;

import com.korit.ch02.Repository.MemberRepository;
import com.korit.ch02.Repository.ProductRepository;
import com.korit.ch02.entity.Member;
import com.korit.ch02.entity.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class OrderService {
    private final MemberRepository memberRepository;
    private final ProductRepository productRepository;
    private final EmailService emailService;


    public void order(Long memberId, Long productId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("회원 없음"));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("상품 없음"));
        emailService.sendOrderConfirmation(member.getEmail(), product.getName());
    }
}

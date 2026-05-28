package com.korit.ch02.Repository;

import com.korit.ch02.entity.Member;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class MemberRepository {
    public Optional<Member> findById(Long memberId) {
        Member member = new Member();
        member.setId(memberId);
        member.setEmail("test@gmail.com");

        return Optional.of(member);
    }
}

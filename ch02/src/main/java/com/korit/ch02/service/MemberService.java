package com.korit.ch02.service;

import com.korit.ch02.entity.Team;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


/**
 * 공통 의존성 분리 방식
 * 문제 4. 순환 참조 찾기 & 수정
 * 1. 순환 참조 발생 위치
 * TeamService 생성하려면 -> MemberService 필요
 * MemberService 생성하려면 -> TeamService 필요
 * -> 무한 반복
 *
 * 2. Spring Boot 4에서 어떻게 되나?
 * 생성자 주입을 사용하고 있기 때문에 애플리케이션 시작 시점에서 즉시 오류 발생
 *
 * ***************************
 * APPLICATION FAILED TO START
 * ***************************
 *
 * The dependencies of some of the beans in the application context
 * form a cycle:
 *
 * teamService → memberService → teamService
 *
 * 3. 해결 방법 - 공통 의존성을 별도 서비스로 분리
 * 두 서비스가 서로를 참조하는 원인은 역할이 명확히 분리되지 않았기 때문.
 * TeamService가 멤버를 알 필요가 있고, MemberService가 팀을 알 필요가 있다면
 * -> 이 공통 관신사를 처리할 TeamMemberService를 만들어 분리한다.
 *
 * 해결 => TeamMemberQueryService를 만들어 공통 조회 로직을 다른 컴포넌트로 분리
 * */
@Service
@RequiredArgsConstructor
public class MemberService {

    private final TeamMemberQueryService teamMemberQueryService;

    public Team getTeamOfMember(Long memberId) {
        return teamMemberQueryService.findTeamByMemberId(memberId);
    }

}

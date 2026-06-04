package com.korit.ch04api.init;

import com.korit.ch04api.entity.Role;
import com.korit.ch04api.mapper.RoleMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class RoleInit implements CommandLineRunner {

    private final RoleMapper roleMapper;

    @Value("${db.init-status[0].roles}")
    private boolean initStatus;

    @Override
    public void run(String... args) throws Exception {
        if (!initStatus) {
            return;
        }

        roleMapper.insertMany(List.of(
                Role.builder().roleName("ROLE_USER").build(),
                Role.builder().roleName("ROLE_ADMIN").build()
        ));
    }
}

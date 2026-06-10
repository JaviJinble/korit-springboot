package com.korit.ch04api.controller;

import com.korit.ch04api.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/customers")
@RestController
@Tag(name = "Customer", description = "Customer 테스트 API")
public class CustomerController {

    @Operation(summary = "Customer 테스트 조회", description = "인증 보호 API 테스트용 엔드포인트입니다.")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "성공 - ApiResponse<Void> 형식으로 반환합니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "인증 오류 - JWT 토큰이 없거나 유효하지 않습니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    @GetMapping
    public ResponseEntity<ApiResponse<Void>> get() {
        return ResponseEntity.ok(ApiResponse.success());
    }
}

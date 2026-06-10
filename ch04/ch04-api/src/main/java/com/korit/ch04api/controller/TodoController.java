package com.korit.ch04api.controller;

import com.korit.ch04api.dto.ApiResponse;
import com.korit.ch04api.dto.TodoReqDto;
import com.korit.ch04api.dto.TodoRespDto;
import com.korit.ch04api.security.PrioncipalUser;
import com.korit.ch04api.service.TodoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/api/todos")
@RestController
@RequiredArgsConstructor
@Tag(name = "Todo", description = "Todo CRUD API")
public class TodoController {

    private final TodoService todoService;

    @Operation(summary = "Todo 목록 조회", description = "로그인한 사용자의 Todo 목록을 조회합니다.")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "성공 - ApiResponse<List<TodoRespDto>> 형식으로 반환합니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "인증 오류 - JWT 토큰이 없거나 유효하지 않습니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    @GetMapping
    public ResponseEntity<ApiResponse<List<TodoRespDto>>> getTodos(
            @Parameter(hidden = true) @AuthenticationPrincipal PrioncipalUser principalUser
    ) {
        Long userId = principalUser.getUser().getId();
        return ResponseEntity.ok(ApiResponse.success(todoService.getTodos(userId)));
    }

    @Operation(summary = "Todo 추가", description = "로그인한 사용자의 Todo를 생성합니다.")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "성공 - 생성된 Todo를 ApiResponse<TodoRespDto> 형식으로 반환합니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Validation 오류 - content 또는 priority 검증 실패입니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "인증 오류 - JWT 토큰이 없거나 유효하지 않습니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    @PostMapping
    public ResponseEntity<ApiResponse<TodoRespDto>> addTodo(
            @Parameter(hidden = true) @AuthenticationPrincipal PrioncipalUser principalUser,
            @Valid @RequestBody TodoReqDto reqDto
    ) {
        Long userId = principalUser.getUser().getId();
        return ResponseEntity.ok(ApiResponse.success(todoService.addTodo(userId, reqDto)));
    }

    @Operation(summary = "Todo 완료 상태 변경", description = "Todo의 완료 상태를 반전합니다.")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "성공 - ApiResponse<Void> 형식으로 반환합니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "인증 오류 - JWT 토큰이 없거나 유효하지 않습니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "실패 - Todo를 찾을 수 없거나 소유자가 아닙니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    @PatchMapping("/{todoId}/toggle")
    public ResponseEntity<ApiResponse<Void>> toggleTodoStatus(
            @Parameter(hidden = true) @AuthenticationPrincipal PrioncipalUser principalUser,
            @Parameter(description = "완료 상태를 변경할 Todo ID", example = "1") @PathVariable Long todoId
    ) {
        Long userId = principalUser.getUser().getId();
        todoService.toggleStatus(userId, todoId);
        return ResponseEntity.ok(ApiResponse.success());
    }

    @Operation(summary = "Todo 수정", description = "Todo 내용, 마감일, 우선순위를 수정합니다.")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "성공 - ApiResponse<Void> 형식으로 반환합니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Validation 오류 - 요청 값 검증 실패입니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "인증 오류 - JWT 토큰이 없거나 유효하지 않습니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "실패 - Todo를 찾을 수 없거나 소유자가 아닙니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    @PutMapping("/{todoId}")
    public ResponseEntity<ApiResponse<Void>> updateTodo(
            @Parameter(hidden = true) @AuthenticationPrincipal PrioncipalUser principalUser,
            @Parameter(description = "수정할 Todo ID", example = "1") @PathVariable Long todoId,
            @Valid @RequestBody TodoReqDto reqDto
    ) {
        Long userId = principalUser.getUser().getId();
        todoService.updateTodo(userId, todoId, reqDto);
        return ResponseEntity.ok(ApiResponse.success());
    }

    @Operation(summary = "Todo 삭제", description = "Todo를 삭제합니다.")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "성공 - ApiResponse<Void> 형식으로 반환합니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "인증 오류 - JWT 토큰이 없거나 유효하지 않습니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "실패 - Todo를 찾을 수 없거나 소유자가 아닙니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    @DeleteMapping("/{todoId}")
    public ResponseEntity<ApiResponse<Void>> deleteTodo(
            @Parameter(hidden = true) @AuthenticationPrincipal PrioncipalUser principalUser,
            @Parameter(description = "삭제할 Todo ID", example = "1") @PathVariable Long todoId
    ) {
        Long userId = principalUser.getUser().getId();
        todoService.deleteTodo(userId, todoId);
        return ResponseEntity.ok(ApiResponse.success());
    }
}

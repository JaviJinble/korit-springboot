package com.korit.ch01.controller.user;

import com.korit.ch01.controller.user.dto.UserReqCreate;
import com.korit.ch01.controller.user.dto.UserResp;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
@Tag(name = "User", description = "사용자 정보 등록/조회/수정/삭제 기능 정의")
public class UserController {

    /*
    * CRUD 만들기
    * 1. Create(POST) 생성
    * POST요청으로 받을 수 있는 데이터 형식
    *  - JSON   -   application/json
    *   POST 요청으로 받을 수 있는 대표적인 데이터 형식
        1) JSON
        - Content-Type: application/json
        - 주로 React, Axios, Fetch API에서 사용
        - 객체 데이터를 JSON 형태로 전송
    *
    *   - FORM-DATA(file데이터)     -   multipart/form-data
    *   2) FORM-DATA
        - Content-Type: multipart/form-data
        - 파일 업로드 시 사용
        - 파일 + 일반 데이터 같이 전송 가능

    * */

    /*
    * [ user 정보 추가 ]
    *   path: /api/users
    * */
    @Operation(
            summary = "사용자 정보 등록",
            description = """
                    사용자의 프로필 정보를 등록합니다.<br>
                    - username은 중복일 수 없습니다.
                    - username, password, email은 정규 표현식을 지켜야합니다.
                    - 생성즉시 password를 제외하고 사용자 고유번호를 포함한 사용자 정보를 반환합니다. 
                    """
    )
    @ApiResponses(
            {
                    @ApiResponse(responseCode = "200", description = "사용자 정보 등록 성공",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserResp.class))),
                    @ApiResponse(responseCode = "400", description = "잘못된 요청",
                            content = @Content(mediaType = "application/json", examples = {
                                    @ExampleObject(
                                            name = "필수 입력 값 누락",
                                            value = """
                                                    {
                                                        "status": 400,
                                                        "error": "Bad Request",
                                                        "message": "필수 입력 값 누락: name",
                                                        "path": "/api/users"
                                                    }
                                                    """
                                    ),
                                    @ExampleObject(
                                            name = "이미 존재하는 사용자이름 사용",
                                            value = """
                                                    {
                                                        "status": 400,
                                                        "error": "Bad Request",
                                                        "message": "이미 존재하는 사용자이름을 입력하셨습니다. username: testuser1234",
                                                        "path": "/api/users"
                                                    }
                                                    """
                                    )
                            }))
            })
    @PostMapping
    public ResponseEntity<UserResp> create(@RequestBody UserReqCreate dto) {

        return ResponseEntity.ok(new UserResp(1, "test1234", "test@gmail.com", LocalDateTime.now(), LocalDateTime.now()));
    }

    /*
     * [ user 프로필 사진 추가 ]
     *   path: /api/users
     * */
    @PostMapping(value = "/{userId}/images", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createImages(@PathVariable int userId,@RequestParam MultipartFile file) {
        return ResponseEntity.ok(null);
    }



}

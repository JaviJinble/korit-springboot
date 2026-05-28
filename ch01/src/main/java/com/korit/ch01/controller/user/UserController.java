package com.korit.ch01.controller.user;

import com.korit.ch01.controller.user.dto.UserReqList;
import com.korit.ch01.controller.user.dto.UserReqCreate;
import com.korit.ch01.controller.user.dto.UserReqUpdate;
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
import java.util.List;

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

    /**
     * 2. Read(Get) 조회
     * Get요청으로 받을 수 있는 데이터 형식
     *  - Parameter      ->      url뒤에 ?로 시작되어지는 Key, Value들을 의미
     *
     */

    /**
     * http://localhost:8080/api/users?username=test1234&email=test@gmail.com
     * http://localhost:8080/api/users?username=test1234
     * -> 검색을 하여 조회를 한다. null, 공백 인지 판별하여 구분한다.
    * @return 모든 user에 대한 다건조회
    */
    @GetMapping
    public ResponseEntity<List<UserResp>> list(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String email) {
        System.out.println(query);
        System.out.println(username);
        System.out.println(email);
        return ResponseEntity.ok(List.of());
    }

    // dto 와 Param은 명확하게 구분해야한다.
    @GetMapping("/dto")
    public ResponseEntity<List<UserResp>> listByDto(UserReqList dto) {
        System.out.println(dto.getQuery());
        System.out.println(dto.getUsername());
        System.out.println(dto.getEmail());
        return ResponseEntity.ok(List.of());
    }


    /**
     * @return 특정 userId에 대한 단건조회
     */
    @GetMapping("/{userId}")
    public ResponseEntity<UserResp> getOne(@PathVariable int userId) {
        System.out.println(userId);
        return ResponseEntity.ok(null);
    }

    /**
     * 3. Update(Put, Patch) 수정
     * Put, Patch 요청으로 받을 수 있는 데이터 형식
     *  - JSON      ->      application/json
     * @RequestBody로 JSON 데이터를 받는다.
     */

    // update => 전체 수정(null 값이 들어온 필드에 null (빈)값으로 채움)
    @PutMapping("/{userId}")
    public ResponseEntity<UserResp> update(@RequestBody UserReqUpdate dto) {
        System.out.println(dto);
        return ResponseEntity.ok(null);
    }

    // update => 부분 수정(null 값이 들어온 필드는 수정하지 않음)
    @PatchMapping("/{userId}")
    public ResponseEntity<UserResp> modify(@RequestBody UserReqUpdate dto) {
        System.out.println(dto);
        return ResponseEntity.ok(null);
    }

}

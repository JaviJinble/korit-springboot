package com.korit.ch04api.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CreateResponse {
    private String domainName;
    private List<Long> createdIds;
}

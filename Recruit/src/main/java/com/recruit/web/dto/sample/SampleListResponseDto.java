package com.recruit.web.dto.sample;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SampleListResponseDto {
    private int id;
    private String title;
    private String author;
    private String date;
}

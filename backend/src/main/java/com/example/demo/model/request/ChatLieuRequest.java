package com.example.demo.model.request;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter

public class ChatLieuRequest {

    private String maChatLieu;

    private String tenChatLieu;

    private Timestamp ngayTao;

    private Timestamp ngaySua;

    private String nguoiTao;

    private String nguoiSua;

    private Boolean daXoa;

}

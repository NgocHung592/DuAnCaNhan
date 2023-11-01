package com.example.demo.service;

import com.example.demo.entity.DiaChi;
import com.example.demo.entity.KhachHang;
import com.example.demo.model.response.KhachHangReponse;
import com.example.demo.model.request.KhachHangRequest;
import org.springframework.data.domain.Page;
import java.util.UUID;

public interface KhachHangService {
    Page<KhachHangReponse> getAll(Integer pageNo);
    DiaChi add(KhachHangRequest khachHangRequest);
    DiaChi addid(KhachHangRequest khachHangRequest , UUID id);
    Page<KhachHangReponse> getAllTrangThai(Integer pageNo, String tt);
    DiaChi update(KhachHangRequest khachHangRequest, UUID id1,UUID id2);
    Page<KhachHangReponse> getSearch(Integer pageNo,String serch);
    DiaChi detail(UUID id);

}

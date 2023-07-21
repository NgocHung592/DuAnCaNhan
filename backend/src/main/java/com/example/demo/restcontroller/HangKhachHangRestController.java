package com.example.demo.restcontroller;

import com.example.demo.entity.HangKhachHang;
import com.example.demo.service.HangKhachHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RequestMapping("/hang-khach-hang/")
@RestController
public class HangKhachHangRestController {

    @Autowired
    private HangKhachHangService hangKhachHangService;


    @GetMapping("trang-thai")
    public List<HangKhachHang> hienThiTrangThai() {
        return hangKhachHangService.getListStatus();
    }
}

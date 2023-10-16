package com.example.demo.restcontroller;

import com.example.demo.entity.HangKhachHang;
import com.example.demo.entity.VaiTro;
import com.example.demo.service.HangKhachHangService;
import com.example.demo.service.VaiTroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RequestMapping("/vai-tro/")
@RestController
public class VaiTroRestController {


    @Autowired
    private VaiTroService vaiTroService;


    @GetMapping("trang-thai")
    public List<VaiTro> hienThiTrangThai() {
        return vaiTroService.getListStatus();
    }
}


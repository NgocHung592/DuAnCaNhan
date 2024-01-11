package com.example.demo.controller;

import com.example.demo.model.response.ThongKeReponse;
import com.example.demo.service.ThongKeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/thong-ke/")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")


public class ThongKeController {

    @Autowired
    private ThongKeService thongKeService;

    @GetMapping("/hien-thi")
    public ResponseEntity getTongDoanhThu() {
        return new ResponseEntity(thongKeService.getThongKeTongHop(), HttpStatus.OK);
    }

//    @GetMapping("/hien-thi2")
//    public ResponseEntity getTongDonHang() {
//        return new ResponseEntity(thongKeService.getTongDonHang(), HttpStatus.OK);
//    }
//    @GetMapping("/hien-thi3")
//    public ResponseEntity getTongSanPham() {
//        return new ResponseEntity(thongKeService.getTongSanPham(), HttpStatus.OK);
//    }
//
//    @GetMapping("/hien-thi4")
//    public ResponseEntity getTongKhachHang() {
//        return new ResponseEntity(thongKeService.getTongKhachHang(), HttpStatus.OK);
//    }
}


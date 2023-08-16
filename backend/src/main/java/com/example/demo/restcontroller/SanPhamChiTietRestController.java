package com.example.demo.restcontroller;

import com.example.demo.model.request.SanPhamChiTietRequest;
import com.example.demo.service.SanPhamChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/san-pham-chi-tiet/")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class SanPhamChiTietRestController {
    @Autowired
    private SanPhamChiTietService sanPhamChiTietService;

    @GetMapping("hien-thi")
    public ResponseEntity getAll(@RequestParam(name = "pageNo", defaultValue = "0") String pageNo) {
        return new ResponseEntity(sanPhamChiTietService.getAll(Integer.valueOf(pageNo)), HttpStatus.OK);
    }

    @GetMapping("detail-san-pham/{id}")
    public ResponseEntity detail(
            @PathVariable("id") String id) {
        return new ResponseEntity(sanPhamChiTietService.getOne(UUID.fromString(id)), HttpStatus.OK);
    }
    @GetMapping("detail-kich-thuoc/{id}")
    public ResponseEntity detailKichThuoc(
            @PathVariable("id") String id) {
        return new ResponseEntity(sanPhamChiTietService.getList(UUID.fromString(id)), HttpStatus.OK);
    }

    @PostMapping("add")
    public ResponseEntity add(@RequestBody SanPhamChiTietRequest sanPhamChiTietRequest) {

        return new ResponseEntity(sanPhamChiTietService.add(sanPhamChiTietRequest), HttpStatus.OK);
    }

}

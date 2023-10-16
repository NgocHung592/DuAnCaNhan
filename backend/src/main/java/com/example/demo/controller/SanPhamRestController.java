package com.example.demo.restcontroller;

import com.example.demo.entity.ChatLieu;
import com.example.demo.entity.SanPham;
import com.example.demo.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/san-pham/")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class SanPhamRestController {

    @Autowired
    private SanPhamService sanPhamService;

    @GetMapping("hien-thi")
    public ResponseEntity hienThi(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
        return new ResponseEntity(sanPhamService.getAll(pageNo), HttpStatus.OK);
    }

    @GetMapping("trang-thai")
    public ResponseEntity hienThiTheoTrangThai() {
        return new ResponseEntity(sanPhamService.getAllByStatus(), HttpStatus.OK);
    }

    @GetMapping("detail/{id}")
    public ResponseEntity detail(@PathVariable("id") String id) {
        return new ResponseEntity(sanPhamService.detail(UUID.fromString(id)), HttpStatus.OK);
    }
    @GetMapping("search")
    public ResponseEntity findByName(@RequestBody SanPham sanPham) {
        return new ResponseEntity(sanPhamService.findByName(sanPham), HttpStatus.OK);
    }

    @PostMapping("add")
    public ResponseEntity add(@RequestBody SanPham sanPham) {
        return new ResponseEntity(sanPhamService.add(sanPham), HttpStatus.OK);
    }

    @PutMapping("update/{id}")
    public ResponseEntity update( SanPham sanPham, @PathVariable("id") String id) {
        return new ResponseEntity(sanPhamService.update(sanPham, UUID.fromString(id)), HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable("id") String id) {
        sanPhamService.delete(UUID.fromString(id));
    }
}


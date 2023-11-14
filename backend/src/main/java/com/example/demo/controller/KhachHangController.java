package com.example.demo.controller;

import com.example.demo.entity.DiaChi;
import com.example.demo.entity.KhachHang;
import com.example.demo.model.response.KhachHangReponse;
import com.example.demo.model.request.KhachHangRequest;
import com.example.demo.model.response.NhanVienReponse;
import com.example.demo.service.KhachHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin(origins = {"*"})
@RequestMapping("/khach-hang/")
@RestController
public class KhachHangController {
    @Autowired
    private KhachHangService khachHangService;

    @GetMapping("hien-thi")
    public Page<KhachHangReponse> getAllKhachHang(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
        return khachHangService.getAll(pageNo);

    }

    @GetMapping("trang-thai")
    public ResponseEntity getAllKhachHangByTrangThai(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
        return new ResponseEntity(khachHangService.getKhachHangByTrangThai(pageNo), HttpStatus.OK);

    }

    @PostMapping("add")
    public DiaChi post(@RequestBody KhachHangRequest khachHangRequest) {
        System.out.println(khachHangRequest);
        return khachHangService.add(khachHangRequest);
    }

    @PostMapping("addid/{id}")
    public DiaChi postid(@RequestBody KhachHangRequest khachHangRequest, @PathVariable("id") String id) {
        System.out.println(khachHangRequest);
        return khachHangService.addid(khachHangRequest, UUID.fromString(id));
    }

    @GetMapping("detail/{id}")
    public DiaChi detail(@PathVariable("id") String id) {
        return khachHangService.detail(UUID.fromString(id));
    }

    @PutMapping("update/{id1}/{id2}")
    public DiaChi update(@RequestBody KhachHangRequest khachHangRequest, @PathVariable("id1") String id1, @PathVariable("id2") String id2) {
        return khachHangService.update(khachHangRequest, UUID.fromString(id1), UUID.fromString(id2));
    }
    @GetMapping("hien-thiTT")
    public Page<KhachHangReponse> getAllTT(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo, @RequestParam(name = "search") String search ){
        return khachHangService.getAllTrangThai(pageNo,search);

    }
    @GetMapping("/search")
    public Page<KhachHangReponse> searchProductsByName(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo, @RequestParam(name = "search") String search ) {
        return khachHangService.getSearch(pageNo,search);
    }


}


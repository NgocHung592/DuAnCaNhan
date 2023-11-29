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
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin(origins = {"*"})
@RequestMapping("/khach-hang/")
@RestController
public class KhachHangController {
    @Autowired
    private KhachHangService khachHangService;

    @GetMapping("get-all")
    public ResponseEntity getAllKhachHang() {
        return new ResponseEntity(khachHangService.getAll(), HttpStatus.OK);
    }

    @GetMapping("hien-thi")
    public ResponseEntity getPage(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
        return new ResponseEntity(khachHangService.getPage(pageNo), HttpStatus.OK);
    }

    @PostMapping("add")
    public ResponseEntity add(@RequestBody KhachHangRequest khachHangRequest) throws Exception {
        return new ResponseEntity(khachHangService.add(khachHangRequest), HttpStatus.OK);
    }

    //    @PostMapping("addid/{id}")
//    public DiaChi postid(@RequestBody KhachHangRequest khachHangRequest, @PathVariable("id") String id) {
//        System.out.println(khachHangRequest);
//        return khachHangService.addid(khachHangRequest, UUID.fromString(id));
//    }
//
    @GetMapping("detail/{id}")
    public ResponseEntity detail(@PathVariable("id") String id) {
        return new ResponseEntity(khachHangService.detail(UUID.fromString(id)), HttpStatus.OK);
    }

    //
//    @PutMapping("update/{id1}/{id2}")
//    public DiaChi update(@RequestBody KhachHangRequest khachHangRequest, @PathVariable("id1") String id1, @PathVariable("id2") String id2) throws Exception {
//        khachHangRequest.setEmail(khachHangRequest.getEmail());
//        khachHangRequest.setSodienthoai(khachHangRequest.getSodienthoai());
//        return khachHangService.update(khachHangRequest, UUID.fromString(id1), UUID.fromString(id2));
//    }
//
    @GetMapping("loc")
    public ResponseEntity loc(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo, @RequestParam(name = "trangThai") String trangThai) {
        return new ResponseEntity(khachHangService.loc(pageNo, trangThai), HttpStatus.OK);

    }

    @GetMapping("search")
    public ResponseEntity search(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo, @RequestParam(name = "keyWord") String keyWord) {
        return new ResponseEntity(khachHangService.search(pageNo, keyWord), HttpStatus.OK);
    }


}


package com.example.demo.restcontroller;


import com.example.demo.entity.KhachHang;
import com.example.demo.model.request.KhachHangRequest;
import com.example.demo.repository.KhachHangRepository;
import com.example.demo.repository.HangKhachHangRepository;
import com.example.demo.service.KhachHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin("*")
@RequestMapping("/khach-hang/")
@RestController
public class KhachHangRestController {
    @Autowired
    private KhachHangService khachHangService;
    @GetMapping("hien-thi")
    public Page<KhachHang> getAll(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
        return khachHangService.getAll(pageNo);
    }

    @GetMapping("trang-thai")
    public List<KhachHang> hienThiTrangThai() {
        return khachHangService.getListStatus();
    }
    @GetMapping("detail/{id}")
    public KhachHang getOne(@PathVariable("id") String id) {
        return khachHangService.detail(UUID.fromString(id));
    }
    @PutMapping("update/{id}")
    public KhachHang put(@RequestBody KhachHangRequest khachHangRequest, @PathVariable("id") String id) {
        return khachHangService.update(khachHangRequest, UUID.fromString(id));
    }

    @PostMapping("add")
    public KhachHang post(@RequestBody KhachHangRequest taiKhoan){
        return khachHangService.add(taiKhoan);
    }
    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable("id") String id){
        khachHangService.delete(UUID.fromString(id));
    }



}

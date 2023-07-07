package com.example.demo.restcontroller;


import com.example.demo.entity.TaiKhoanKhachHang;
import com.example.demo.repository.KhachHangRepository;
import com.example.demo.repository.TaiKhoanKhachHangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin("*")
@RequestMapping("/khachhang/")
@RestController
public class KhachHangRestController {
    @Autowired
    private TaiKhoanKhachHangRepository khachHangRepository;
    @GetMapping("hienthi")
    public List<TaiKhoanKhachHang> getAll(Model model){
        return khachHangRepository.findAll();
    }


    @GetMapping("hienthi/{id}")
    public TaiKhoanKhachHang getOne(@PathVariable("id") UUID id){

        return khachHangRepository.findById(id).get();
    }
    @PutMapping("update/{id}")
    public TaiKhoanKhachHang put(@PathVariable("id") UUID id,@RequestBody TaiKhoanKhachHang taiKhoan){
        khachHangRepository.save(taiKhoan);
        return taiKhoan;
    }

    @PostMapping("add")
    public TaiKhoanKhachHang post(@RequestBody TaiKhoanKhachHang taiKhoan){
        khachHangRepository.save(taiKhoan);
        return taiKhoan;
    }
    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable("id") UUID id){
        khachHangRepository.deleteById(id);
    }



}

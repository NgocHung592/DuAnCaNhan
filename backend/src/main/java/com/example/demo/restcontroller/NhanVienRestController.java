package com.example.demo.restcontroller;

import com.example.demo.entity.TaiKhoanNhanVien;
import com.example.demo.repository.TaiKhoanNhanVienRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin("*")
@RequestMapping("/nhanvien/")
@RestController
public class NhanVienRestController {
    @Autowired
    private TaiKhoanNhanVienRepository taiKhoanNhanVienRepository;
    @GetMapping("hienthi")
    public List<TaiKhoanNhanVien> getAll(Model model){
        return taiKhoanNhanVienRepository.findAll();
    }


    @GetMapping("hienthi/{id}")
    public TaiKhoanNhanVien getOne(@PathVariable("id") UUID id){

        return taiKhoanNhanVienRepository.findById(id).get();
    }
    @PutMapping("update/{id}")
    public TaiKhoanNhanVien put(@PathVariable("id") UUID id,@RequestBody TaiKhoanNhanVien taiKhoan){
        taiKhoanNhanVienRepository.save(taiKhoan);
        return taiKhoan;
    }

    @PostMapping("add")
    public TaiKhoanNhanVien post(@RequestBody TaiKhoanNhanVien taiKhoan){
        taiKhoanNhanVienRepository.save(taiKhoan);
        return taiKhoan;
    }
    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable("id") UUID id){
        taiKhoanNhanVienRepository.deleteById(id);
    }


}

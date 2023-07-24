package com.example.demo.restcontroller;


import com.example.demo.entity.NhanVien;
import com.example.demo.model.request.KhachHangRequest;
import com.example.demo.model.request.NhanVienRequest;
import com.example.demo.service.NhanVienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/nhan-vien/")
@CrossOrigin(origins = "*", maxAge = 4800, allowCredentials = "false")
public class NhanVienRestController {

    @Autowired
    private NhanVienService nhanVienService;

    @GetMapping("hien-thi")
    public Page<NhanVien> hienThi(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
        return nhanVienService.getAll(pageNo);
    }

    @GetMapping("trang-thai")
    public List<NhanVien> hienThiTheoTrangThai() {
        return nhanVienService.getListStatus();
    }

    @GetMapping("detail/{id}")
    public NhanVien detail(@PathVariable("id") String id) {
        return nhanVienService.detail(UUID.fromString(id));
    }

    @PostMapping("add")
    public NhanVien add(@RequestBody NhanVienRequest nhanVien) {
        return nhanVienService.add(nhanVien);
    }

    @PutMapping("update/{id}")
    public NhanVien update(@RequestBody NhanVienRequest nhanVien, @PathVariable("id") String id) {
        return nhanVienService.update(nhanVien, UUID.fromString(id));
    }

    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable("id") String id) {
        nhanVienService.delete(UUID.fromString(id));
    }
}

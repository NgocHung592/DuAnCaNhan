package com.example.demo.restcontroller;

import com.example.demo.entity.ChatLieu;
import com.example.demo.entity.KieuDang;
import com.example.demo.model.request.KieuDangRequest;
import com.example.demo.service.ChatLieuService;
import com.example.demo.service.KieuDangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
@RequestMapping("/kieu-dang/")
@CrossOrigin(origins = "*",maxAge = 4800,allowCredentials = "false")
public class KieuDangRestController {

    @Autowired
    private KieuDangService kieuDangService;

    @GetMapping("hien-thi")
    public Page<KieuDang> hienThi(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
        return kieuDangService.getAll(pageNo);
    }
    @GetMapping("trang-thai")
    public List<KieuDang> hienThiTrangThai() {
        return kieuDangService.getListStatus();
    }

    @GetMapping("detail/{id}")
    public KieuDang detail(@PathVariable("id") String id) {
        return kieuDangService.detail(UUID.fromString(id));
    }

    @PostMapping("add")
    public KieuDang add(@RequestBody KieuDangRequest kieuDang) {
        return kieuDangService.add(kieuDang);
    }

    @PutMapping("update/{id}")
    public KieuDang update(@RequestBody KieuDangRequest kieuDang, @PathVariable("id") String id) {
        return kieuDangService.update(kieuDang, UUID.fromString(id));
    }

    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable("id") String id) {
        kieuDangService.delete(UUID.fromString(id));
    }
}

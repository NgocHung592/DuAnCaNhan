package com.example.demo.restcontroller;

import com.example.demo.entity.ChatLieu;
import com.example.demo.entity.MauSac;
import com.example.demo.entity.SanPham;
import com.example.demo.service.MauSacService;
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
@RequestMapping("/mau-sac/")
@CrossOrigin(origins = "*", maxAge = 4800, allowCredentials = "false")
public class MauSacRestController {

    @Autowired
    private MauSacService mauSacService;

    @GetMapping("hien-thi")
    public Page<MauSac> hienThi(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
        return mauSacService.getAll(pageNo);
    }

    @GetMapping("trang-thai")
    public List<MauSac> hienThiTheoTrangThai() {
        return mauSacService.getAllByStatus();
    }

    @GetMapping("detail/{id}")
    public MauSac detail(@PathVariable("id") String id) {
        return mauSacService.getOne(UUID.fromString(id));
    }

    @PostMapping("add")
    public MauSac add(@RequestBody MauSac mauSac) {
        return mauSacService.add(mauSac);
    }

    @PutMapping("update/{id}")
    public MauSac update(@RequestBody MauSac mauSac, @PathVariable("id") String id) {
        return mauSacService.update(mauSac, UUID.fromString(id));
    }

    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable("id") String id) {
        mauSacService.delete(UUID.fromString(id));
    }
}

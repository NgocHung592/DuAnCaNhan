package com.example.demo.restcontroller;



import com.example.demo.entity.DiaChi;
import com.example.demo.entity.TaiKhoan;
import com.example.demo.model.request.KhachHangRequest;
import com.example.demo.model.response.TaiKhoanReponse;
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
    public Page<TaiKhoanReponse> getAll(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
        return khachHangService.getAll(pageNo);
    }

    @GetMapping("trang-thai")
    public List<TaiKhoan> hienThiTrangThai() {
        return khachHangService.getListStatus();
    }
    @GetMapping("detail/{id}")
    public TaiKhoan getOne(@PathVariable("id") String id) {
        return khachHangService.detail(UUID.fromString(id));
    }
    @PutMapping("update/{id}")
    public TaiKhoan put(@RequestBody KhachHangRequest khachHangRequest, @PathVariable("id") String id) {
        return khachHangService.update(khachHangRequest, UUID.fromString(id));
    }

    @PostMapping("add")
    public DiaChi post(@RequestBody KhachHangRequest taiKhoan){
        System.out.println(taiKhoan);
        return khachHangService.add(taiKhoan);
    }
    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable("id") String id){
        khachHangService.delete(UUID.fromString(id));
    }


    @GetMapping("/searchma")
    public Page<TaiKhoan> searchProductsByName(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo, @RequestParam String ma ) {
        return khachHangService.getten(ma,pageNo);
    }
    @GetMapping("/searchsdt")
    public Page<TaiKhoan> searchProductsByNamesdt(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo,@RequestParam String sdt ) {
        return khachHangService.gettenn(sdt,pageNo);
    }
    @GetMapping("/searchten")
    public Page<TaiKhoan> searchProductsByNameten(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo,@RequestParam String ten ) {
        return khachHangService.gettennt(ten,pageNo);
    }



}

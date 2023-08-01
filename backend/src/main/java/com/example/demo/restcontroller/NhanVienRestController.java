package com.example.demo.restcontroller;



import com.example.demo.entity.TaiKhoan;
import com.example.demo.model.request.KhachHangRequest;
import com.example.demo.model.request.NhanVienRequest;
import com.example.demo.repository.NhanVienRepository;
import com.example.demo.service.NhanVienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/nhan-vien/")
@CrossOrigin(origins = "*", maxAge = 4800, allowCredentials = "false")
public class NhanVienRestController {

    @Autowired
    private NhanVienService nhanVienService;


    @GetMapping("hien-thi")
    public Page<TaiKhoan> hienThi(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
        return nhanVienService.getAll(pageNo);
    }

    @GetMapping("trang-thai")
    public Page<TaiKhoan> hienThiTrangThai(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
        return nhanVienService.getListStatus(pageNo);
    }

    @GetMapping("detail/{id}")
    public TaiKhoan detail(@PathVariable("id") String id) {
        return nhanVienService.detail(UUID.fromString(id));
    }

    @PostMapping("add")
    public TaiKhoan add(@RequestBody NhanVienRequest nhanVienRequest) {
        return nhanVienService.add(nhanVienRequest);
    }

    @PutMapping("update/{id}")
    public TaiKhoan update(@RequestBody NhanVienRequest nhanVienRequest, @PathVariable("id") String id) {
        return nhanVienService.update(nhanVienRequest, UUID.fromString(id));
    }
    @GetMapping("/search")
    public List<TaiKhoan> searchProductsByStatus(@RequestParam(value = "trangthai") Integer tt) {
        return nhanVienService.getTT(tt);
    }
    @GetMapping("/searchma")
    public Page<TaiKhoan> searchProductsByName(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo,@RequestParam String ma ) {
        return nhanVienService.getten(ma,pageNo);
    }
    @GetMapping("/searchsdt")
    public Page<TaiKhoan> searchProductsByNamesdt(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo,@RequestParam String sdt ) {
        return nhanVienService.gettenn(sdt,pageNo);
    }
    @GetMapping("/searchten")
    public Page<TaiKhoan> searchProductsByNameten(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo,@RequestParam String ten ) {
        return nhanVienService.gettennt(ten,pageNo);
    }


    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable("id") String id) {
        nhanVienService.delete(UUID.fromString(id));
    }
}

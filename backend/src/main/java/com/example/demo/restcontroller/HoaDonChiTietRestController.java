package com.example.demo.restcontroller;


import com.example.demo.entity.HoaDonChiTiet;
import com.example.demo.service.HoaDonChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/hoa-don-chi-tiet/")
public class HoaDonChiTietRestController {
    @Autowired
    private HoaDonChiTietService hoaDonChiTietService;

    @GetMapping("hien-thi")
    public Page<HoaDonChiTiet> hienThi(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
        return hoaDonChiTietService.getAll(pageNo);
    }

//    @GetMapping("detail/{id}")
//    public HoaDonChiTiet detail(@PathVariable("id") String id) {
//        return hoaDonChiTietService.detail(UUID.fromString(id));
//    }

    @PostMapping("add")
    public HoaDonChiTiet add(@RequestBody HoaDonChiTiet hoaDonChiTiet) {
        return hoaDonChiTietService.add(hoaDonChiTiet);
    }

//    @PutMapping("update/{id}")
//    public HoaDonChiTiet update(@RequestBody HoaDonChiTiet hoaDonChiTiet, @PathVariable("id") String id) {
//        return hoaDonChiTietService.update(hoaDonChiTiet, );
//    }
}

package com.example.demo.controller;

import com.example.demo.entity.HoaDon;
import com.example.demo.model.request.HoaDonOnlineRequest;
import com.example.demo.model.request.HoaDonRequest;
import com.example.demo.model.response.DonHangKhachHangReponse;
import com.example.demo.model.response.GioHangChiTietReponse;
import com.example.demo.model.response.HienThiHoaDonReponse;
import com.example.demo.model.response.HoaDonResponse;
import com.example.demo.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/hoa-don/")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class HoaDonController {
    @Autowired
    private HoaDonService hoaDonService;


    @GetMapping("hien-thi")
    public Page<HoaDonResponse> getPage(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
        return hoaDonService.getPage(pageNo);
    }

    @GetMapping("get-list")
    public ResponseEntity getList() {
        return new ResponseEntity(hoaDonService.getHoaDonCho(), HttpStatus.OK);
    }

    @GetMapping("detail/{id}")
    public HoaDon detail(@PathVariable("id") String id) {
        return hoaDonService.detail(UUID.fromString(id));
    }

    @PostMapping("add")
    public HoaDon add(@RequestBody HoaDon hoaDon) {
        return hoaDonService.add(hoaDon);
    }

    @PostMapping("addonline")
    public HoaDon addOnline(@RequestBody HoaDonOnlineRequest hoaDon) {
        return hoaDonService.addOnline(hoaDon);
    }

    @PutMapping("update/{id}")
    public HoaDon updateKhachCoSan(@RequestBody HoaDonRequest hoaDonRequest, @PathVariable("id") String id) {
        return hoaDonService.update(hoaDonRequest, UUID.fromString(id));
    }

    @GetMapping("/search")
    public Page<HoaDonResponse> search(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo, @RequestParam(name = "search") String search) {
        return hoaDonService.search(pageNo, search);
    }

    @GetMapping("/loc")
    public Page<HoaDonResponse> loc(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo, @RequestParam(name = "trangThai") String trangThai) {
        return hoaDonService.loc(pageNo, trangThai);
    }


    @GetMapping("hien-thiKh/{id}")
    public ResponseEntity<List<DonHangKhachHangReponse>> getAll(@PathVariable UUID id){
        List<DonHangKhachHangReponse> gioHangChiTietReponses=hoaDonService.getAll(id);
        return ResponseEntity.ok(gioHangChiTietReponses);

    }

    @PostMapping("hien-thi-hoa-don")
    public ResponseEntity<List<HienThiHoaDonReponse>> getHienThi(@RequestParam(name = "idKhachHang") String idKhachHang,
                                                                 @RequestParam(name = "idDonHang") String idDonHang){
        UUID khachHangId = UUID.fromString(idKhachHang);
        UUID donHangId = UUID.fromString(idDonHang);
        List<HienThiHoaDonReponse> gioHangChiTietReponses=hoaDonService.getHienThi(khachHangId,donHangId);
        return ResponseEntity.ok(gioHangChiTietReponses);

    }
    @GetMapping("searchhd")
    public ResponseEntity<List<DonHangKhachHangReponse>> getSearch(
            @RequestParam(name = "id") String id,
            @RequestParam(name = "trangThai") String trangThai
    ) {
            List<DonHangKhachHangReponse> gioHangChiTietReponses = hoaDonService.getSearch(id, trangThai);
            return ResponseEntity.ok(gioHangChiTietReponses);

    }
    @PostMapping("huy-don-hang")
    public ResponseEntity<String> updateTrangThaiDonHang(@RequestParam(name = "idKhachHang") String idKhachHang,
                                                         @RequestParam(name = "idDonHang") String idDonHang) {
        try {
            UUID khachHangId = UUID.fromString(idKhachHang);
            UUID donHangId = UUID.fromString(idDonHang);

            hoaDonService.updateTrangThaiDonHang(khachHangId, donHangId, 4); // 5 là trạng thái mặc định mới

            return ResponseEntity.ok("Cập nhật trạng thái đơn hàng thành công");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi cập nhật trạng thái đơn hàng");
        }
    }
    @PostMapping("da-xac-nhan")
    public ResponseEntity<String> updateTrangThaiDaXacNhan(@RequestParam(name = "idKhachHang") String idKhachHang,
                                                         @RequestParam(name = "idDonHang") String idDonHang) {
        try {
            UUID khachHangId = UUID.fromString(idKhachHang);
            UUID donHangId = UUID.fromString(idDonHang);

            hoaDonService.updateTrangThaiDonHang(khachHangId, donHangId, 2); // 5 là trạng thái mặc định mới

            return ResponseEntity.ok("Cập nhật trạng thái đơn hàng thành công");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi cập nhật trạng thái đơn hàng");
        }
    }
    @PostMapping("da-nhan-hang")
    public ResponseEntity<String> updateDonHangThanhCong(@RequestParam(name = "idKhachHang") String idKhachHang,
                                                         @RequestParam(name = "idDonHang") String idDonHang) {
        try {
            UUID khachHangId = UUID.fromString(idKhachHang);
            UUID donHangId = UUID.fromString(idDonHang);

            hoaDonService.updateTrangThaiDonHang(khachHangId, donHangId, 3); // 5 là trạng thái mặc định mới

            return ResponseEntity.ok("Cập nhật trạng thái đơn hàng thành công");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi cập nhật trạng thái đơn hàng");
        }
    }


}

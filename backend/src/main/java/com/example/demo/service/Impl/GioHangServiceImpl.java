package com.example.demo.service.Impl;

import com.example.demo.entity.GioHang;
import com.example.demo.entity.GioHangChiTiet;
import com.example.demo.entity.KhachHang;
import com.example.demo.entity.SanPhamChiTiet;
import com.example.demo.model.request.GioHangRequset;
import com.example.demo.model.response.GioHangChiTietReponse;
import com.example.demo.repository.*;
import com.example.demo.service.GioHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
public class GioHangServiceImpl implements GioHangService {
    @Autowired
    private GioHangRepository gioHangRepository;

    @Autowired
    private SanPhamChiTietRepository sanPhamChiTietRepository;

    @Autowired
    private GioHangChiTietRepository gioHangChiTietRepository;

    @Autowired
    private TaiKhoanRepository taiKhoanRepository;
    @Override
    @Transactional
    public void GioHang(UUID sanPhamChiTietId, UUID khachHangId, int soLuong) {
        // Lấy thông tin khách hàng từ khóa chính (ID).
        KhachHang khachHang = getKhachHangById(khachHangId);

        // Lấy thông tin sản phẩm chi tiết từ khóa chính (ID).
        SanPhamChiTiet sanPhamChiTiet = sanPhamChiTietRepository.findById(sanPhamChiTietId)
                .orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại"));

        // Kiểm tra số lượng tồn kho.
        int soLuongMoi = soLuong;
        int tonKho = sanPhamChiTiet.getSoLuong();

        if (soLuongMoi > tonKho) {
            throw new RuntimeException("Số lượng vượt quá tồn kho của sản phẩm");
        }

        // Tạo mới đối tượng GioHang.
        GioHang gioHang = GioHang.builder().ten("GioHang").khachHang(khachHang).build();

        // Tìm kiếm GioHangChiTiet bằng Id của SanPhamChiTiet.
        GioHangChiTiet gioHangChiTiet = gioHangChiTietRepository.findBySanPhamChiTiet_Id(sanPhamChiTietId);

        if (gioHangChiTiet != null) {
            // Nếu sản phẩm chi tiết đã tồn tại trong giỏ hàng chi tiết, kiểm tra số lượng mới.
            int soLuongMoiTrongGioHang = gioHangChiTiet.getSoLuong() + soLuongMoi;
            if (soLuongMoiTrongGioHang > tonKho) {
                throw new RuntimeException("Số lượng vượt quá tồn kho của sản phẩm trong giỏ hàng");
            }

            // Cập nhật số lượng trong giỏ hàng chi tiết.
            gioHangChiTiet.setSoLuong(soLuongMoiTrongGioHang);
            gioHangChiTiet.setDonGia(sanPhamChiTiet.getDonGia().multiply(BigDecimal.valueOf(soLuongMoiTrongGioHang)));
            gioHangChiTietRepository.save(gioHangChiTiet);
        } else {
            // Nếu sản phẩm chi tiết chưa tồn tại trong giỏ hàng chi tiết, tạo mới đối tượng GioHangChiTiet.
            gioHangChiTiet = new GioHangChiTiet();
            gioHangChiTiet.setSoLuong(soLuongMoi);
            gioHangChiTiet.setDonGia(sanPhamChiTiet.getDonGia());
            gioHangChiTiet.setGioHang(gioHang);
            gioHangChiTiet.setSanPhamChiTiet(sanPhamChiTiet);
            gioHangChiTietRepository.save(gioHangChiTiet);
        }

        // Liên kết đối tượng GioHang với khách hàng và lưu đối tượng GioHang.
        gioHang.setKhachHang(khachHang);
        gioHangRepository.save(gioHang);
    }



    @Override
    public void Xoa(UUID gioHangId) {
        gioHangRepository.deleteById(gioHangId);
    }

    @Override
    public KhachHang getKhachHangById(UUID id) {
        return taiKhoanRepository.findById(id).orElse(null);
    }

    @Override
    public List<GioHangChiTietReponse> getAll(UUID id) {
        return gioHangChiTietRepository.getAll(id);
    }

    @Override
    @Transactional
    public void delete(UUID id) {
        GioHang gioHang = gioHangRepository.findById(id) .orElseThrow(() -> new RuntimeException("Không tìm thấy giỏ hàng"));

        gioHangChiTietRepository.deleteByGioHang(gioHang);

        gioHangRepository.deleteById(id);

    }

    @Override
    public void update(GioHangRequset gioHangRequset) {
        UUID goiHangChiTietId = gioHangRequset.getGioHangChiTietId();
        int soLuongMoi = gioHangRequset.getSoLuong();

        GioHangChiTiet gioHangChiTiet = gioHangChiTietRepository.findById(goiHangChiTietId)
                .orElseThrow(() -> new RuntimeException("Gio hàng chi tiết không tồn tại"));

        // Lấy thông tin số lượng tồn kho từ sản phẩm chi tiết
        int tonKho = gioHangChiTiet.getSanPhamChiTiet().getSoLuong();

        // Kiểm tra xem số lượng mới có nhỏ hơn hoặc bằng tồn kho không
        if (soLuongMoi > tonKho) {
            throw new RuntimeException("Số lượng vượt quá tồn kho của sản phẩm");
        }

        // Cập nhật thông tin số lượng và đơn giá
        gioHangChiTiet.setSoLuong(soLuongMoi);
        BigDecimal donGiaBanDau = gioHangChiTiet.getSanPhamChiTiet().getDonGia();
        BigDecimal donGiaMoi = donGiaBanDau.multiply(BigDecimal.valueOf(soLuongMoi));
        gioHangChiTiet.setDonGia(donGiaMoi);

        gioHangChiTietRepository.save(gioHangChiTiet);
    }



}

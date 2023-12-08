package com.example.demo.service.Impl;

import com.example.demo.entity.ChucVu;
import com.example.demo.entity.NhanVien;
import com.example.demo.model.response.NhanVienReponse;
import com.example.demo.model.request.NhanVienRequest;
import com.example.demo.repository.ChucVuRepository;
import com.example.demo.repository.NhanVienRepository;
import com.example.demo.service.NhanVienService;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;


import java.util.Optional;
import java.util.UUID;

@Service
public class NhanVienServiceImpl implements NhanVienService {

    @Autowired
    private ChucVuRepository chucVuRepository;

    @Autowired
    private NhanVienRepository nhanVienRepository;

    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public Page<NhanVien> getAll(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return nhanVienRepository.getNhanVienAll(pageable);
    }

    @Override
    public Page<NhanVienReponse> getAllTrangThai(Integer pageNo, String tt) {
        Pageable pageable = PageRequest.of(pageNo, 100);
//        return nhanVienRepository.getNhanVienTrangThai1(pageable, tt);
        return null;
    }

    @Override
    public NhanVien login(String email) {
//        return nhanVienRepository.findByEmail(email);
        return null;
    }

    @Override
    public NhanVien add(NhanVienRequest nhanVienRequest) {
        Optional<ChucVu> chucVuOptional = chucVuRepository.findByTen(nhanVienRequest.getTenChucVu());
        if (chucVuOptional.isPresent()) {
            NhanVien nhanVien = NhanVien.builder()
                    .chucVu(chucVuRepository.findById(getId(nhanVienRequest.getTenChucVu())).get())
                    .ma(nhanVienRequest.getMa())
                    .hoTen(nhanVienRequest.getHoTen())
                    .email(nhanVienRequest.getEmail())
                    .matKhau(nhanVienRequest.getMatKhau())
                    .soDienThoai(nhanVienRequest.getSoDienThoai())
                    .gioiTinh(nhanVienRequest.getGioiTinh())
                    .ngaySinh(nhanVienRequest.getNgaySinh())
                    .anhDaiDien(nhanVienRequest.getAnhDaiDien())
                    .ngayTao(nhanVienRequest.getNgayTao())
                    .nguoiTao("Hung")
                    .diaChiCuThe(nhanVienRequest.getDiaChiCuThe())
                    .tinhThanhPho((nhanVienRequest.getTinhThanhPho()))
                    .quanHuyen(nhanVienRequest.getQuanHuyen())
                    .phuongXa(nhanVienRequest.getPhuongXa())
                    .daXoa(nhanVienRequest.getDaXoa())
                    .build();
            sendEmail(nhanVien);
            return nhanVienRepository.save(nhanVien);
        } else {
            ChucVu chucVuSave = ChucVu.builder()
                    .ma("CV001")
                    .ten(nhanVienRequest.getTenChucVu())
                    .ngayTao(nhanVienRequest.getNgayTao())
                    .nguoiTao("Hung")
                    .daXoa(nhanVienRequest.getDaXoa())
                    .build();
            ChucVu chucVu = chucVuRepository.save(chucVuSave);
            NhanVien nhanVien = NhanVien.builder()
                    .chucVu(chucVu)
                    .ma(nhanVienRequest.getMa())
                    .hoTen(nhanVienRequest.getHoTen())
                    .email(nhanVienRequest.getEmail())
                    .matKhau(nhanVienRequest.getMatKhau())
                    .soDienThoai(nhanVienRequest.getSoDienThoai())
                    .gioiTinh(nhanVienRequest.getGioiTinh())
                    .ngaySinh(nhanVienRequest.getNgaySinh())
                    .anhDaiDien(nhanVienRequest.getAnhDaiDien())
                    .ngayTao(nhanVienRequest.getNgayTao())
                    .nguoiTao("Hung")
                    .diaChiCuThe(nhanVienRequest.getDiaChiCuThe())
                    .tinhThanhPho((nhanVienRequest.getTinhThanhPho()))
                    .quanHuyen(nhanVienRequest.getQuanHuyen())
                    .phuongXa(nhanVienRequest.getPhuongXa())
                    .daXoa(nhanVienRequest.getDaXoa())
                    .build();
            sendEmail(nhanVien);
            return nhanVienRepository.save(nhanVien);
        }
    }

    private void sendEmail(NhanVien nhanVien) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(nhanVien.getEmail());
            helper.setSubject("Chào mừng bạn đến với công ty Simple");
            helper.setText("Xin chào " + nhanVien.getHoTen() + ",\n\n" +
                    "Chúc mừng bạn đã trở thành nhân viên của công ty chúng tôi.\n" +
                    "Dưới đây là một số thông tin về tài khoản của bạn:\n\n" +
                    "Mã nhân viên: " + nhanVien.getMa() + "\n" +
                    "Mật khẩu: " + nhanVien.getMatKhau() + "\n\n" +
                    "Trân trọng,\n");
            javaMailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();  // Handle exception appropriately
        }
    }


    @Override
    public NhanVien update(NhanVienRequest nhanVienRequest, UUID id) {
//        NhanVien nhanVien = NhanVien.builder().id(id)
//                .ma(nhanVienRequest.getMa())
//                .hoten(nhanVienRequest.getHoten())
//                .chucVu(chucVuRepository.findById(getId(nhanVienRequest.getChucVu())).get())
//                .ngaytao(nhanVienRequest.getNgaytao())
//                .email(nhanVienRequest.getEmail())
//                .matkhau(nhanVienRequest.getMatkhau())
//                .sodienthoai(nhanVienRequest.getSodienthoai())
//                .gioitinh(nhanVienRequest.getGioitinh())
//                .ngaysinh(nhanVienRequest.getNgaysinh())
//                .trangthai(Integer.valueOf(nhanVienRequest.getTrangthai()))
//                .anhdaidien(nhanVienRequest.getAnhdaidien())
//                .ngaysua(nhanVienRequest.getNgaysua())
//                .mota(nhanVienRequest.getMota())
//                .phuongxa(nhanVienRequest.getPhuongxa())
//                .quanhuyen(nhanVienRequest.getQuanhuyen())
//                .tinhthanhpho((nhanVienRequest.getTinhthanhpho()))
//                .build();
//        return nhanVienRepository.save(nhanVien);
        return null;

    }

    @Override
    public Page<NhanVienReponse> getSearch(Integer pageNo, String seach) {
        Pageable pageable = PageRequest.of(pageNo, 5);
//        return nhanVienRepository.searchByKeyword(pageable, seach);
        return null;
    }

    @Override
    public NhanVien detail(UUID id) {
        return nhanVienRepository.findById(id).orElse(null);
    }

    public UUID getId(String ten) {
        for (ChucVu chucVu : chucVuRepository.findAll()) {
            if (ten.equals(chucVu.getTen())) {
                return chucVu.getId();
            }
        }
        return null;


    }

}

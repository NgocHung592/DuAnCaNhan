package com.example.demo.service.Impl;

import com.example.demo.entity.DiaChi;
import com.example.demo.entity.KhachHang;
import com.example.demo.entity.NhanVien;
import com.example.demo.model.request.KhachHangRequest;
import com.example.demo.model.response.KhachHangReponse;
import com.example.demo.repository.DiaChiRepository;
import com.example.demo.repository.KhachHangRepository;
import com.example.demo.service.KhachHangService;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class KhachHangServiceImpl implements KhachHangService {

    @Autowired
    private KhachHangRepository khachHangRepository;

    @Autowired
    private DiaChiRepository diaChiRepository;

    @Autowired
    private JavaMailSender javaMailSender;


    @Override
    public List<KhachHang> getAll() {
        return khachHangRepository.findAll();
    }

    @Override
    public Page<KhachHang> getPage(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return khachHangRepository.getALl(pageable);
    }

    @Override
    public DiaChi add(KhachHangRequest khachHangRequest) throws Exception {
        Optional<KhachHang> email = khachHangRepository.findKhachHangByEmail(khachHangRequest.getEmail());
        Optional<KhachHang> sdt = khachHangRepository.findKhachHangBySoDienThoai(khachHangRequest.getSoDienThoai());
        if (email.isPresent()) {
            throw new Exception("Email is already present!");
        }
        if (sdt.isPresent()) {
            throw new Exception("So dien thoai is already present!");
        }
        KhachHang khachHangSave = KhachHang.builder()
                .ma(khachHangRequest.getMa())
                .hoTen(khachHangRequest.getHoTen())
                .email(khachHangRequest.getEmail())
                .anhDaiDien(khachHangRequest.getAnhDaiDien())
                .matKhau(khachHangRequest.getMatKhau())
                .soDienThoai(khachHangRequest.getSoDienThoai())
                .gioiTinh(khachHangRequest.getGioiTinh())
                .ngaySinh(khachHangRequest.getNgaySinh())
                .ngayTao(khachHangRequest.getNgayTao())
                .nguoiTao("Hưng")
                .daXoa(Boolean.valueOf(khachHangRequest.getDaXoa()))
                .build();
        KhachHang KhachHang = khachHangRepository.save(khachHangSave);
        sendEmail(KhachHang);
        DiaChi diaChi = DiaChi.builder()
                .khachHang(KhachHang)
                .tinhThanhPho(khachHangRequest.getTinhThanhPho())
                .quanHuyen(khachHangRequest.getQuanHuyen())
                .phuongXa(khachHangRequest.getPhuongXa())
                .ngayTao(khachHangRequest.getNgayTao())
                .nguoiTao("Hưng")
                .diaChiCuThe(khachHangRequest.getDiaChiCuThe())
                .daXoa(Boolean.valueOf(khachHangRequest.getDaXoa()))
                .build();
        return diaChiRepository.save(diaChi);
    }

//    @Override
//    public DiaChi addid(KhachHangRequest khachHangRequest, UUID id) {
//        KhachHang khachHang = KhachHang.builder().id(id).build();
//        DiaChi diaChi = DiaChi.builder().khachHang(khachHang)
//                .tinhthanhpho(khachHangRequest.getTinhthanhpho())
//                .phuongxa(khachHangRequest.getPhuongxa())
//                .quanhuyen(khachHangRequest.getQuanhuyen())
//                .mota(khachHangRequest.getMota())
//                .trangthai(Integer.valueOf(khachHangRequest.getTrangthai()))
//                .ngaytao(khachHangRequest.getNgaytao()).build();
//        return diaChiRepository.save(diaChi);
//    }


//    @Override
//    public DiaChi update(KhachHangRequest khachHangRequest, UUID id1, UUID id2) throws Exception {
//        Optional<KhachHang> emailnv = khachHangRepository.findKhachHangByEmailAndIdNot(khachHangRequest.getEmail(), id2);
//        Optional<KhachHang> sdtnv = khachHangRepository.findKhachHangBySodienthoaiAndIdNot(khachHangRequest.getSodienthoai(), id2);
//        if (emailnv.isPresent()) {
//            throw new Exception("Email is already present!");
//        }
//        if (sdtnv.isPresent()) {
//            throw new Exception("So dien thoai is already present!");
//        }
//        KhachHang khachHang = KhachHang.builder().id(id2)
//                .ma(khachHangRequest.getMa())
//                .anhdaidien(khachHangRequest.getAnhdaidien())
//                .ngaysua(khachHangRequest.getNgaysua())
//                .hoten(khachHangRequest.getHoten())
//                .email(khachHangRequest.getEmail())
//                .matkhau(khachHangRequest.getMatkhau())
//                .sodienthoai(khachHangRequest.getSodienthoai())
//                .gioitinh(khachHangRequest.getGioitinh())
//                .ngaysinh(khachHangRequest.getNgaysinh())
//                .ngaytao(khachHangRequest.getNgaytao())
//                .daXoa(Boolean.valueOf(khachHangRequest.getTrangthai())).build();
//        KhachHang KhachHangg = khachHangRepository.save(khachHang);
//        DiaChi diaChi = DiaChi.builder().id(id1).khachHang(KhachHangg)
//                .tinhthanhpho(khachHangRequest.getTinhthanhpho())
//                .phuongxa(khachHangRequest.getPhuongxa())
//                .ngaytao(khachHangRequest.getNgaytao())
//                .quanhuyen(khachHangRequest.getQuanhuyen())
//                .mota(khachHangRequest.getMota())
//                .trangthai(Integer.valueOf(khachHangRequest.getTrangthai())).build();
//        return diaChiRepository.save(diaChi);
//    }

    private void sendEmail(KhachHang khachHang) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(khachHang.getEmail());
            helper.setSubject("Chào mừng bạn đến với công ty");
            helper.setText("Xin chào " + khachHang.getHoTen() + ",\n\n" +
                    "Chúc mừng bạn đã trở thành khách hàng của cửa hàng chúng tôi.\n" +
                    "Dưới đây là một số thông tin về tài khoản của bạn:\n\n" +
                    "Mã khách hàng: " + khachHang.getMa() + "\n" +
                    "Mật khẩu: " + khachHang.getMatKhau() + "\n\n" +
                    "Trân trọng,\n");

            javaMailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public Page<KhachHang> loc(Integer pageNo, String trangThai) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return khachHangRepository.loc(pageable, trangThai);
    }

    @Override
    public Page<KhachHang> search(Integer pageNo, String keyWord) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return khachHangRepository.searchByKeyword(pageable, keyWord);
    }

    @Override
    public List<KhachHangReponse> detail(UUID id) {
        return khachHangRepository.detailKhachHang(id);
    }


}

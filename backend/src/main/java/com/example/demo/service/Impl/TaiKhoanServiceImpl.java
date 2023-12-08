package com.example.demo.service.Impl;


import com.example.demo.entity.KhachHang;
import com.example.demo.entity.NhanVien;
import com.example.demo.repository.KhachHangRepository;
import com.example.demo.repository.TaiKhoanRepository;
import com.example.demo.service.TaiKhoanService;
import jakarta.mail.internet.MimeMessage;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TaiKhoanServiceImpl implements TaiKhoanService {
    @Autowired
    private TaiKhoanRepository taiKhoanRepository;
    @Override
    public KhachHang login(String email) {
        return taiKhoanRepository.findByEmail(email);
    }
    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public Optional<KhachHang> forgetPassword(String email) {
        return taiKhoanRepository.findKhachHangByEmail(email);
    }
    public void save(KhachHang khachHang) {
        taiKhoanRepository.save(khachHang);
    }

    @Override
    public Optional<KhachHang> findByResetToken(String resetToken) {
        return taiKhoanRepository.findByResetToken(resetToken);
    }

    @Override
    public KhachHang singup(KhachHang khachHang) throws Exception {

        Optional<KhachHang> optionalKhachHang = taiKhoanRepository.findKhachHangByEmail(khachHang.getEmail());
        if (optionalKhachHang.isPresent()){
            throw new Exception("Email is already present!");
        }
            KhachHang khachHang1=taiKhoanRepository.save(khachHang);
            sendEmail(khachHang1);
        return khachHang1;
    }
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


}

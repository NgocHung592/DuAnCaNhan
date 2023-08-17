package com.example.demo.service.Impl;
import com.example.demo.entity.TaiKhoan;
import com.example.demo.entity.VaiTro;
import com.example.demo.model.request.NhanVienRequest;
import com.example.demo.repository.NhanVienRepository;
import com.example.demo.repository.VaiTroRepository;
import com.example.demo.service.NhanVienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Service
public class NhanVienServiceImpl implements NhanVienService {
    @Autowired
    private NhanVienRepository nhanVienRepository;
    @Autowired
    private VaiTroRepository vaiTroRepository;
    long currentTimestampMillis = System.currentTimeMillis();
    @Override
    public Page<TaiKhoan> getAll(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return nhanVienRepository.getAll(pageable);
    }

    @Override
    public Page<TaiKhoan> getListStatus(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return nhanVienRepository.getAllByStatus(pageable);
    }

    @Override
    public TaiKhoan add(NhanVienRequest nhanVienRequest) {
        TaiKhoan nhanVien=TaiKhoan.builder().vaiTro(vaiTroRepository.findById(getId(nhanVienRequest.getIdVaiTro())).get())
                .ma(nhanVienRequest.getMa()).hoten(nhanVienRequest.getTen())
                .email(nhanVienRequest.getEmail()).cmt(nhanVienRequest.getCmt()).matkhau(nhanVienRequest.getMatkhau()).sodienthoai(nhanVienRequest.getSodienthoai()).ngaysinh(nhanVienRequest.getNgaysinh()).ngaytao(new Timestamp(currentTimestampMillis)).trangthai(Integer.valueOf(nhanVienRequest.getTrangthai())).build();
        return nhanVienRepository.save(nhanVien);
    }
    public UUID getId(String ten){
        for (VaiTro vaiTro : vaiTroRepository.findAll()) {
            if (ten.equals(vaiTro.getTen())) {
                return vaiTro.getId();
            }
        }
        return null;


    }
    public TaiKhoan getOne(UUID id) {
        return nhanVienRepository.findById(id).orElse(null);
    }

    @Override
    public TaiKhoan update(NhanVienRequest nhanVienRequest, UUID id) {
        TaiKhoan nhanVien=TaiKhoan.builder().id(id)
                .ma(nhanVienRequest.getMa()).hoten(nhanVienRequest.getTen())
                .email(nhanVienRequest.getEmail()).ngaysinh(nhanVienRequest.getNgaysinh()).cmt(nhanVienRequest.getCmt()).matkhau(nhanVienRequest.getMatkhau()).sodienthoai(nhanVienRequest.getSodienthoai()).ngaytao(new Timestamp(currentTimestampMillis)).vaiTro(vaiTroRepository.findById(getId(nhanVienRequest.getIdVaiTro())).get()).trangthai(Integer.valueOf(nhanVienRequest.getTrangthai())).build();

        return nhanVienRepository.save(nhanVien);
    }

    @Override
    public TaiKhoan detail(UUID id) {
        return nhanVienRepository.findById(id).orElse(null);
    }

    @Override
    public List<TaiKhoan> getTT(Integer tt) {
        return nhanVienRepository.findByTrangthai(tt);
    }

    @Override
    public Page<TaiKhoan> getten(String ma, Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return nhanVienRepository.findByMaContainingIgnoreCase(pageable,ma);
    }

    @Override
    public Page<TaiKhoan> gettenn(String sdt, Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return nhanVienRepository.findBySodienthoaiContainingIgnoreCase(pageable,sdt);
    }

    @Override
    public Page<TaiKhoan> gettennt(String ten, Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return nhanVienRepository.findByTenContainingIgnoreCase(pageable,ten);
    }


    @Override
    public void delete(UUID id) {
        nhanVienRepository.deleteById(id);

    }

//    @Override
//    public Page<NhanVien> getAllbyma(String ma, Integer pageNo) {
//        Pageable pageable = PageRequest.of(pageNo, 5);
//        return nhanVienRepository.getAllbyma(ma,pageable);
//    }
}

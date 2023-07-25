package com.example.demo.service.Impl;
import com.example.demo.entity.NhanVien;
import com.example.demo.model.request.NhanVienRequest;
import com.example.demo.repository.NhanVienRepository;
import com.example.demo.repository.VaiTroRepository;
import com.example.demo.service.NhanVienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class NhanVienServiceImpl implements NhanVienService {
    @Autowired
    private NhanVienRepository nhanVienRepository;
    @Autowired
    private VaiTroRepository vaiTroRepository;
    @Override
    public Page<NhanVien> getAll(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return nhanVienRepository.getAll(pageable);
    }

    @Override
    public List<NhanVien> getListStatus() {
        return nhanVienRepository.getAllByStatus();
    }

    @Override
    public NhanVien add(NhanVienRequest nhanVienRequest) {
        NhanVien nhanVien = NhanVien.builder()
                .ma(nhanVienRequest.getMa()).hoten(nhanVienRequest.getTen())
                .email(nhanVienRequest.getEmail()).ngaysinh(nhanVienRequest.getNgaysinh()).cmt(nhanVienRequest.getCmt()).matkhau(nhanVienRequest.getMatKhau()).sodienthoai(nhanVienRequest.getSdt()).ngaytao(nhanVienRequest.getNgaytao()).vaiTro(vaiTroRepository.findById(nhanVienRequest.getIdVaiTro()).get()).trangthai(Integer.valueOf(nhanVienRequest.getTrangThai())).build();
        return nhanVienRepository.save(nhanVien);
    }
    public NhanVien getOne(UUID id) {
        return nhanVienRepository.findById(id).orElse(null);
    }

    @Override
    public NhanVien update(NhanVienRequest nhanVienRequest, UUID id) {
        NhanVien nhanVien=NhanVien.builder().id(id)
                .ma(nhanVienRequest.getMa()).hoten(nhanVienRequest.getTen())
                .email(nhanVienRequest.getEmail()).ngaysinh(nhanVienRequest.getNgaysinh()).cmt(nhanVienRequest.getCmt()).matkhau(nhanVienRequest.getMatKhau()).sodienthoai(nhanVienRequest.getSdt()).ngaytao(nhanVienRequest.getNgaytao()).vaiTro(vaiTroRepository.findById(nhanVienRequest.getIdVaiTro()).get()).trangthai(Integer.valueOf(nhanVienRequest.getTrangThai())).build();

        return nhanVienRepository.save(nhanVien);
    }

    @Override
    public NhanVien detail(UUID id) {
        return nhanVienRepository.findById(id).orElse(null);
    }

    @Override
    public void delete(UUID id) {
        nhanVienRepository.deleteById(id);

    }
}

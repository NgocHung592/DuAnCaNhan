package com.example.demo.service.Impl;

import com.example.demo.entity.ChatLieu;
import com.example.demo.entity.CoAo;
import com.example.demo.repository.CoAoRepository;
import com.example.demo.service.CoAoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CoAoServiceImpl implements CoAoService {

    @Autowired
    private CoAoRepository coAoRepository;

    long currentTimestampMillis = System.currentTimeMillis();

    @Override
    public Page<CoAo> getAll(Integer pageNo) {
        Pageable pageable= PageRequest.of(pageNo,10);
        return coAoRepository.getAll(pageable);
    }

    @Override
    public List<CoAo> getAllByStatus() {
        return coAoRepository.getAllByStatus();
    }

    @Override
    public CoAo add(CoAo coAo) {
        if(coAo.getMa().isBlank() || coAo.getTen().isBlank() ){
            return null;
        }
        CoAo coAoSave= CoAo.builder()
                .ma(coAo.getMa())
                .ten(coAo.getTen())
                .ngayTao(new Timestamp(currentTimestampMillis))
                .nguoiTao(null)
                .daXoa(coAo.getDaXoa())
                .build();
        return coAoRepository.save(coAoSave);
    }

    @Override
    public CoAo update(CoAo coAo, UUID id) {
        if(coAo.getMa().isBlank() || coAo.getTen().isBlank() ){
            return null;
        }
        CoAo coAoUpdate= CoAo.builder()
                .id(id)
                .ma(coAo.getMa())
                .ten(coAo.getTen())
                .ngayTao(new Timestamp(currentTimestampMillis))
                .nguoiTao(null)
                .daXoa(coAo.getDaXoa())
                .build();
        return coAoRepository.save(coAoUpdate);
    }

    @Override
    public Optional<CoAo> detail(UUID id) {
        return coAoRepository.findById(id);
    }

    @Override
    public void delete(UUID id) {
        coAoRepository.deleteById(id);
    }
}

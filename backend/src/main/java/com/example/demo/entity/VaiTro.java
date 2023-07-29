package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Table(name = "vai_tro")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class VaiTro {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @Column(name = "ma")
    private String ma;

    @Column(name = "ten")
    private String ten;

    @Column(name = "trang_thai")
    private Integer trangThai;
}

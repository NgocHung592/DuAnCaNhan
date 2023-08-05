Create database DU_AN_WEBSITE_BAN_HANG_QUAN_AO
drop database DU_AN_WEBSITE_BAN_HANG_QUAN_AO
USE DU_AN_WEBSITE_BAN_HANG_QUAN_AO
Go
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

Create table [danh_muc]
(
	id UNIQUEIDENTIFIER 
		DEFAULT NEWID() PRIMARY KEY,
	ma varchar(20) ,
	ten nvarchar(50) not null,
	ngay_tao datetime,
	ngay_sua datetime,
	nguoi_tao nvarchar(50),
	nguoi_sua  nvarchar(50),
	da_xoa bit
)
 
 Create table [mau_sac](
	id UNIQUEIDENTIFIER 
		DEFAULT NEWID() PRIMARY KEY,
	ma varchar(20) ,
	ten nvarchar(50) not null,
	ngay_tao datetime,
	ngay_sua datetime,
	nguoi_tao nvarchar(50),
	nguoi_sua  nvarchar(50),
	da_xoa bit
 )

 Create table [kich_thuoc](
	id UNIQUEIDENTIFIER 
		DEFAULT NEWID() PRIMARY KEY,
	ma varchar(20) ,
	ten nvarchar(50) not null,
	ngay_tao datetime,
	ngay_sua datetime,
	nguoi_tao nvarchar(50),
	nguoi_sua  nvarchar(50),
	da_xoa bit
 )

 Create table [chat_lieu](
	id UNIQUEIDENTIFIER 
		DEFAULT NEWID() PRIMARY KEY,
	ma varchar(20) ,
	ten nvarchar(50) not null,
	ngay_tao datetime,
	ngay_sua datetime,
	nguoi_tao nvarchar(50),
	nguoi_sua  nvarchar(50),
	da_xoa bit
 )

 Create table [phong_cach](
	id UNIQUEIDENTIFIER 
		DEFAULT NEWID() PRIMARY KEY,
	ma varchar(20) ,
	ten nvarchar(50) not null,
	ngay_tao datetime,
	ngay_sua datetime,
	nguoi_tao nvarchar(50),
	nguoi_sua  nvarchar(50),
	da_xoa bit
 )

 Create table [kieu_dang](
	id UNIQUEIDENTIFIER 
		DEFAULT NEWID() PRIMARY KEY,
	ma varchar(20) ,
	ten nvarchar(50) not null,
	ngay_tao datetime,
	ngay_sua datetime,
	nguoi_tao nvarchar(50),
	nguoi_sua  nvarchar(50),
	da_xoa bit,
	danh_muc_id UNIQUEIDENTIFIER REFERENCES danh_muc(id)
 )

  Create table [hoa_tiet](
	id UNIQUEIDENTIFIER 
		DEFAULT NEWID() PRIMARY KEY,
	ma varchar(20) ,
	ten nvarchar(50) not null,
	ngay_tao datetime,
	ngay_sua datetime,
	nguoi_tao nvarchar(50),
	nguoi_sua  nvarchar(50),
	da_xoa bit
 )

  Create table [san_pham](
	id UNIQUEIDENTIFIER 
		DEFAULT NEWID() PRIMARY KEY,
	ma varchar(20) ,
	ten nvarchar(50) not null,
	mo_ta nvarchar(50),
	ngay_tao datetime,
	ngay_sua datetime,
	nguoi_tao nvarchar(50),
	nguoi_sua  nvarchar(50),
	da_xoa bit
 )
   Create table [tay_ao](
	id UNIQUEIDENTIFIER 
		DEFAULT NEWID() PRIMARY KEY,
	ma varchar(20) ,
	ten nvarchar(50) not null,
	mo_ta nvarchar(50),
	ngay_tao datetime,
	ngay_sua datetime,
	nguoi_tao nvarchar(50),
	nguoi_sua  nvarchar(50),
	da_xoa bit
 )  
 Create table [co_ao](
	id UNIQUEIDENTIFIER 
		DEFAULT NEWID() PRIMARY KEY,
	ma varchar(20) ,
	ten nvarchar(50) not null,
	mo_ta nvarchar(50),
	ngay_tao datetime,
	ngay_sua datetime,
	nguoi_tao nvarchar(50),
	nguoi_sua  nvarchar(50),
	da_xoa bit
 )
  
  Create table [san_pham_chi_tiet](
	id UNIQUEIDENTIFIER 
		DEFAULT NEWID() PRIMARY KEY,
	gia decimal(20,0),
	ngay_tao datetime,
	ngay_sua datetime,
	nguoi_tao nvarchar(50),
	nguoi_sua  nvarchar(50),
	da_xoa bit,
	san_pham_id UNIQUEIDENTIFIER REFERENCES san_pham(id),
	mau_sac_id UNIQUEIDENTIFIER REFERENCES mau_sac(id),
	chat_lieu_id UNIQUEIDENTIFIER REFERENCES chat_lieu(id),
	hoa_tiet_id UNIQUEIDENTIFIER REFERENCES hoa_tiet(id),
	phong_cach_id UNIQUEIDENTIFIER REFERENCES phong_cach(id),
	tay_ao_id UNIQUEIDENTIFIER REFERENCES tay_ao(id),
	co_ao_id UNIQUEIDENTIFIER REFERENCES co_ao(id),

 )
 Create table [kich_thuoc_chi_tiet](
	id UNIQUEIDENTIFIER 
		DEFAULT NEWID() PRIMARY KEY,
	so_luong int, 
	ngay_tao datetime,
	ngay_sua datetime,
	nguoi_tao nvarchar(50),
	nguoi_sua  nvarchar(50),
	da_xoa bit,
	chi_tiet_san_pham_id UNIQUEIDENTIFIER REFERENCES san_pham_chi_tiet(id),
	kich_thuoc_id UNIQUEIDENTIFIER REFERENCES kich_thuoc(id),
 )
  Create table [hinh_anh](
	id UNIQUEIDENTIFIER 
		DEFAULT NEWID() PRIMARY KEY,
	ma varchar(20) ,
	ten nvarchar(50) not null,
	anh_noi_bat varchar(max),
	duong_dan varchar(max),
	ngay_tao datetime,
	ngay_sua datetime,
	nguoi_tao nvarchar(50),
	nguoi_sua  nvarchar(50),
	da_xoa bit,
	chi_tiet_san_pham_id UNIQUEIDENTIFIER REFERENCES san_pham_chi_tiet(id)
 )
 
 Create table [khuyen_mai](
	id UNIQUEIDENTIFIER 
		DEFAULT NEWID() PRIMARY KEY,
	ma varchar(20),
	ten nvarchar(50),
	hinh_thuc_giam varchar(50),
	gia_tri_giam decimal(20,0),
	gia_tri_giam_toi_thieu decimal(20,0),
	gia_tri_giam_toi_da decimal(20,0),
	ngay_bat_dau datetime,
	ngay_ket_thuc datetime,
	trang_thai int,
	ngay_tao datetime,
	ngay_sua datetime,
	nguoi_tao nvarchar(50),
	nguoi_sua  nvarchar(50),
	da_xoa bit
 )

 Create table [khuyen_mai_chi_tiet](
 id UNIQUEIDENTIFIER 
		DEFAULT NEWID() PRIMARY KEY,
	tong_tien_sau_khi_giam decimal(20,0),
	ngay_bat_dau_ap_dung datetime,
	ngay_het_ap_dung datetime,
	trang_thai int,
	khuyen_mai_id UNIQUEIDENTIFIER REFERENCES khuyen_mai(id),
	san_pham_chi_tiet_id UNIQUEIDENTIFIER REFERENCES san_pham_chi_tiet(id),
 )

 Create table [vai_tro](
	id UNIQUEIDENTIFIER 
		DEFAULT NEWID() PRIMARY KEY,
	ma varchar(20) not null,
	ten nvarchar(50) not null,
	trang_thai int,
	ngay_tao datetime,
	ngay_sua datetime,
	nguoi_tao nvarchar(50),
	nguoi_sua  nvarchar(50),
	da_xoa bit
 )

 Create table [hang_khach_hang](
	id UNIQUEIDENTIFIER 
		DEFAULT NEWID() PRIMARY KEY,
	ma varchar(20),
	ten nvarchar(50),
	so_hoa_don_toi_thieu int,
	so_tien_toi_thieu decimal(20,0),
	mo_ta nvarchar(50),
	trang_thai int,
	ngay_tao datetime,
	ngay_sua datetime,
	nguoi_tao nvarchar(50),
	nguoi_sua  nvarchar(50),
	da_xoa bit
 )

 Create table [tai_khoan](
	id UNIQUEIDENTIFIER 
		DEFAULT NEWID() PRIMARY KEY,
	ma varchar(20) not null,
	ho_ten nvarchar(70) not null,
	so_dien_thoai varchar(15),
	email varchar(30),
	gioi_tinh bit,
	ngay_sinh date,
	anh_dai_dien varchar(max),
	mat_khau varchar(20),
    so_can_cuoc varchar(20),
	ghi_chu nvarchar(max),
	trang_thai int,
    ngay_tao datetime,
    ngay_sua datetime,
    nguoi_tao nvarchar(50),
    nguoi_sua  nvarchar(50),
	hang_khach_hang UNIQUEIDENTIFIER REFERENCES hang_khach_hang(id),
	vai_tro_id UNIQUEIDENTIFIER REFERENCES vai_tro(id)

 )

 Create table [gio_hang](
	id UNIQUEIDENTIFIER 
		DEFAULT NEWID() PRIMARY KEY,
	ma varchar(20),
	ten nvarchar(50),
	ngay_cap_nhap datetime,
	ghi_chu nvarchar(max),
	tai_khoan_id UNIQUEIDENTIFIER REFERENCES tai_khoan(id)
 )
 
 Create table [gio_hang_chi_tiet](
	id UNIQUEIDENTIFIER 
		DEFAULT NEWID() PRIMARY KEY,
	so_luong int,
	ghi_chu nvarchar(50),
	san_pham_chi_tiet_id UNIQUEIDENTIFIER REFERENCES san_pham_chi_tiet(id),
	gio_hang_id UNIQUEIDENTIFIER REFERENCES gio_hang(id)
 )

 Create table[danh_sach_yeu_thich](
	id UNIQUEIDENTIFIER 
		DEFAULT NEWID() PRIMARY KEY,
	ma varchar(20),
	ten nvarchar(50),
	ngay_tao date,
	ngay_cap_nhap datetime,
	ghi_chu nvarchar(max),
	tai_khoan_id UNIQUEIDENTIFIER REFERENCES tai_khoan(id)
 )

 Create table [yeu_thich_chi_tiet](
	id UNIQUEIDENTIFIER 
		DEFAULT NEWID() PRIMARY KEY,
	ghi_chu nvarchar(50),
	trang_thai int,
	san_pham_chi_tiet_id UNIQUEIDENTIFIER REFERENCES san_pham_chi_tiet(id),
	danh_sach_yeu_thich_id UNIQUEIDENTIFIER REFERENCES danh_sach_yeu_thich(id)
 )

 Create table [hoa_don](
	id UNIQUEIDENTIFIER 
		DEFAULT NEWID() PRIMARY KEY,
	ma varchar(20),
	ngay_tao datetime,
	ngay_dat_hang datetime,
	ngay_thanh_toan datetime,
	ngay_ship datetime,
	ngay_mong_muon_nhan datetime,
	ngay_co_the_nhan datetime,
	ngay_nhan_duoc_hang datetime,
	ten_khach_hang nvarchar(70),
	dia_chi_khach_hang nvarchar(max),
	so_dien_thoai_khach_hang varchar(15),
	phi_ship decimal(20,0),
	phu_phi decimal(20,0),
	phi_hoan_tra decimal(20,0),
	trang_thai int,
	tong_tien decimal(20,0),
	ngay_sua datetime,
	nguoi_tao nvarchar(50),
	nguoi_sua  nvarchar(50),
	da_xoa bit
 )

 Create table [hoa_don_chi_tiet](
	id UNIQUEIDENTIFIER 
		DEFAULT NEWID() PRIMARY KEY,
	so_luong int,
	don_gia decimal(20,0),
	thanh_tien decimal(20,0),
	san_pham_chi_tiet_id UNIQUEIDENTIFIER REFERENCES san_pham_chi_tiet(id),
	hoa_don_id UNIQUEIDENTIFIER REFERENCES hoa_don(id)
 )

 Create table [lich_su_hoa_don](
	id UNIQUEIDENTIFIER 
		DEFAULT NEWID() PRIMARY KEY,
	ngay_cap_nhap datetime,
	mo_ta nvarchar(50),
	loai_hoa_don nvarchar(50),
	trang_thai int,
	hoa_don_id UNIQUEIDENTIFIER REFERENCES hoa_don(id),
	tai_khoan_id UNIQUEIDENTIFIER REFERENCES tai_khoan(id)
 )

 Create table [hinh_thuc_thanh_toan](
	id UNIQUEIDENTIFIER 
		DEFAULT NEWID() PRIMARY KEY,
	ngay_tao datetime,
	mo_ta nvarchar(50),
	loai_hoa_don nvarchar(50),
	trang_thai int,
	ghi_chu nvarchar(50),
	hoa_don_id UNIQUEIDENTIFIER REFERENCES hoa_don(id),
	tai_khoan_id UNIQUEIDENTIFIER REFERENCES tai_khoan(id)
 )

 Create table [dia_chi](
	id UNIQUEIDENTIFIER 
		DEFAULT NEWID() PRIMARY KEY,
	ten nvarchar(max),
	dia_chi_mac_dinh nvarchar(max),
	mo_ta nvarchar(70),
	tinh_thanh_pho nvarchar(20),
	quan_huyen nvarchar(20),
	phuong_xa nvarchar(20),
	tai_khoan_id UNIQUEIDENTIFIER REFERENCES tai_khoan(id)
 )

 Create table [dat_lai_hang](
	id UNIQUEIDENTIFIER 
		DEFAULT NEWID() PRIMARY KEY,
	ma varchar(20),
	thoi_gian_dat_lai datetime,
	trang_thai int
 )

 Create table [lich_su_thay_doi](
	tai_khoan_id UNIQUEIDENTIFIER REFERENCES tai_khoan(id),
	dat_lai_hang_id UNIQUEIDENTIFIER REFERENCES dat_lai_hang(id),
	mo_ta nvarchar(max),
	thoi_gian_cap_nhap datetime
 )


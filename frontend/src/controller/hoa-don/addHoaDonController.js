window.addHoaDonController = function ($http, $scope, $routeParams, $location) {
  $scope.listHoaDon = [];
  $scope.sizeAndQuantitys = [];
  $scope.listKichThuoc = [];
  $scope.totalPages = [];
  $scope.totalPagesHDCT = [];
  $scope.listMaGiamGia = [];
  $scope.listSanPhamChiTiet = [];
  $scope.listHoaDonChiTiet = [];
  $scope.listKhachHang = [];
  $scope.cityOptions = [];
  $scope.districtOptions = [];
  $scope.wardOptions = [];
  $scope.visiblePages = [];
  $scope.detailDiaChi = [];
  $scope.districts = [];
  $scope.wards = [];
  $scope.chonKhachHang = false;
  $scope.diaChiMacDinh = false;
  $scope.show = false;
  $scope.addSanPham = false;
  $scope.showDropDownVoucher = false;
  $scope.showDropDownThanhPho = false;
  $scope.showDropDownPhuongXa = false;
  $scope.showDropDownQuanHuyen = false;
  $scope.tongTien = 0;
  $scope.giamGia = 0;
  $scope.tienHang = 0;
  $scope.phiVanChuyen = 0;
  $scope.currentPage = 0;
  $scope.currentPageHDCT = 0;
  $scope.maxVisiblePages = 3;
  $scope.searchHinhThucThanhToan = null;
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  $scope.customIndex = 0;
  $scope.detailKhachHang = {
    id: "",
    hinhAnh: "",
    tenKhachHang: "",
    soDienThoai: "",
    email: "",
    gioiTinh: "",
  };
  $scope.formHoaDonChiTiet = {
    idHoaDon: "",
    idSanPhamChiTiet: "",
    soLuong: 1,
    donGia: "",
    thanhTien: "",
  };
  $scope.formDiaChi = {
    tinhThanhPho: "",
    quanHuyen: "",
    phuongXa: "",
  };
  $scope.formHoaDon = {
    soNha: "",
    tenThanhPho: "",
    tenQuanHuyen: "",
    tenPhuongXa: "",
  };
  $scope.hoaDonThanhToan = {
    idKhachHang: "",
    tenKhachHang: "Khách lẻ",
    soDienThoaiKhachHang: "",
    diaChiKhachHang: "",
    diaChiCuThe: "",
    tinhThanhPho: "",
    quanHuyen: "",
    phuongXa: "",
    tongTien: "",
    ngayThanhToan: new Date(),
    trangThai: 1,
  };
  $scope.successProgress = function () {
    let elem = document.getElementById("success");
    let width = 100;
    let id = setInterval(frame, 10);

    function frame() {
      if (width <= 0) {
        clearInterval(id);
      } else {
        width--;
        elem.style.width = width + "%";
      }
    }
  };
  $scope.errorProgress = function () {
    let elem = document.getElementById("error");
    let width = 100;
    let id = setInterval(frame, 10);

    function frame() {
      if (width <= 0) {
        clearInterval(id);
      } else {
        width--;
        elem.style.width = width + "%";
      }
    }
  };
  function showError(message) {
    $scope.errorProgress();
    $scope.message = message;
    toastBootstrap.show();
    $scope.showError = true;
  }
  function showSuccess(message) {
    $scope.successProgress();
    $scope.message = message;
    toastBootstrap.show();
    $scope.showError = false;
  }

  $scope.selectTab = function (tab, id, ma) {
    $scope.formHoaDonChiTiet.idHoaDon = id;
    $scope.maHoaDon = ma;
    $scope.selectedTab = tab;
    $scope.addSanPham = true;
    $scope.getHoaDonChiTiet();
  };

  $scope.isSelectedTab = function (tab) {
    return tab === $scope.selectedTab;
  };

  $scope.getListHoaDon = function () {
    $http.get(hoaDonAPI + "/get-list").then(function (response) {
      $scope.listHoaDon = response.data;
    });
  };
  $scope.getListHoaDon();
  $scope.getMaGiamGia = function () {
    $http.get(magiamgiaAPI + "/trang-thai").then(function (response) {
      $scope.listMaGiamGia = response?.data.content;
      $scope.listMaGiamGia.forEach((maGiamGia) => {
        $http
          .get(
            maGiamGiaChiTietAPI +
              "/hien-thi/" +
              maGiamGia.id +
              "?pageNo=" +
              $scope.currentPage
          )
          .then(function (response) {
            if (response.status == 200) {
              $scope.listMaGiamGiaChiTiet = response?.data.content;
              maGiamGia.soLuong =
                maGiamGia.soLuong - $scope.listMaGiamGiaChiTiet.length;
            }
          });
      });
    });
  };
  $scope.getMaGiamGia();
  $scope.addHoaDon = function (event) {
    event.preventDefault();
    $scope.randomHoaDon = "HD" + Math.floor(Math.random() * 10000) + 1;
    $scope.formHoaDon = {
      ma: $scope.randomHoaDon,
      ngayTao: new Date(),
      trangThai: 0,
    };
    if ($scope.listHoaDon.length < 5) {
      $http.post(hoaDonAPI + "/add", $scope.formHoaDon).then(function () {
        $scope.getListHoaDon();
      });
      showSuccess("Tạo hóa đơn thành công");
    } else {
      showError("Chỉ tạo tối đa 5 hóa đơn");
    }
  };
  $scope.getSanPhamChiTiet = function () {
    $http
      .get(sanPhamChiTietAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listSanPhamChiTiet = response?.data.content;
        $scope.customIndex = $scope.currentPage * response.data.size;
        $scope.totalPages = new Array(response.data.totalPages);
        $scope.visiblePages = getVisiblePages();
      });
  };
  $scope.getSanPhamChiTiet();
  $scope.changePage = function (index) {
    if (index >= 0) {
      $scope.currentPage = index;
      $scope.getSanPhamChiTiet();
    }
  };
  $scope.changePageHDCT = function (index) {
    if ($scope.currentPage < $scope.totalPages.length - 1) {
      $scope.currentPageHDCT = index;
      $scope.getHoaDonChiTiet();
    }
  };

  $scope.nextPage = function () {
    let length = $scope.totalPages.length;
    if ($scope.currentPage < length - 1) {
      $scope.currentPage++;
      $scope.getSanPhamChiTiet();
    }
  };
  $scope.nextPageHDCT = function () {
    let length = $scope.totalPages.length;
    if ($scope.currentPageHDCT < length - 1) {
      $scope.currentPageHDCT++;
      $scope.getHoaDonChiTiet();
    }
  };

  $scope.previousPage = function () {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
      $scope.getSanPhamChiTiet();
    }
  };
  $scope.previousPageHDCT = function () {
    if ($scope.currentPageHDCT > 0) {
      $scope.currentPageHDCT--;
      $scope.getHoaDonChiTiet();
    }
  };

  $scope.getHoaDonChiTiet = function () {
    $http
      .get(
        hoaDonChiTietAPI +
          "/hien-thi/" +
          $scope.maHoaDon +
          "?pageNo=" +
          $scope.currentPageHDCT
      )
      .then(function (response) {
        $scope.listHoaDonChiTiet = response?.data.content;
        $scope.customIndex = $scope.currentPageHDCT * response.data.size;

        $scope.totalPagesHDCT = new Array(response.data.totalPages);
        $scope.visiblePages = getVisiblePages();
        $scope.tienHang = $scope.calculateTotal();
        $scope.tongTien = $scope.calculateTotal();
      });
  };
  function detailChiTietSanPham(idSanPhamChiTiet) {
    return $http
      .get(sanPhamChiTietAPI + "/detail/" + idSanPhamChiTiet)
      .then(function (response) {
        return response?.data;
      })
      .catch(function (error) {
        console.error("Error fetching product details:", error);
        throw error; // Chuyển tiếp lỗi để xử lý ở nơi gọi
      });
  }
  $scope.addSanPhamChiTiet = function (idSanPhamChiTiet, index) {
    var matchingItem = $scope.listHoaDonChiTiet.find(
      (item) => item.idSanPhamChiTiet === idSanPhamChiTiet
    );
    $scope.formHoaDonChiTiet = {
      idHoaDon: $scope.formHoaDonChiTiet.idHoaDon,
      idSanPhamChiTiet: idSanPhamChiTiet,
      donGia: $scope.listSanPhamChiTiet[index].donGia,
      thanhTien: $scope.listSanPhamChiTiet[index].donGia,
      soLuong: 1,
    };
    detailChiTietSanPham(idSanPhamChiTiet).then(function (
      detailSanPhamChiTiet
    ) {
      if (matchingItem) {
        matchingItem.soLuong += 1;
        if (matchingItem.soLuong <= detailSanPhamChiTiet.soLuong) {
          $scope.hoaDonUpdate = {
            soLuong: matchingItem.soLuong,
            thanhTien: matchingItem.soLuong * detailSanPhamChiTiet.donGia,
          };
          $http
            .put(
              hoaDonChiTietAPI + "/update/" + matchingItem.idHoaDonChiTiet,
              $scope.hoaDonUpdate
            )
            .then(function () {
              $scope.getHoaDonChiTiet();
              $scope.tienHang = $scope.calculateTotal();
              $scope.tongTien = $scope.calculateTotal();
              showSuccess("Cập nhật thành công");
            });
        } else {
          showError(
            "Chỉ còn " +
              detailSanPhamChiTiet.soLuong +
              " sản phẩm trong cửa hàng"
          );
        }
      } else {
        $http
          .post(hoaDonChiTietAPI + "/add", $scope.formHoaDonChiTiet)
          .then(function () {
            $scope.getHoaDonChiTiet();
            $scope.tienHang = $scope.calculateTotal();
            $scope.tongTien = $scope.calculateTotal();
            showSuccess("Thêm sản phẩm mới thành công");
          });
      }
    });
  };

  $scope.calculateTotal = function () {
    return $scope.listHoaDonChiTiet
      .filter((item) => item.maHoaDon === $scope.maHoaDon)
      .reduce((total, item) => total + item.thanhTien, 0);
  };

  $scope.changeSoLuong = function (idSanPhamChiTiet) {
    var matchingItem = $scope.listHoaDonChiTiet.find(
      (item) => item.idSanPhamChiTiet === idSanPhamChiTiet
    );
    detailChiTietSanPham(idSanPhamChiTiet).then(function (
      detailSanPhamChiTiet
    ) {
      if (matchingItem.soLuong === null || matchingItem.soLuong === undefined) {
        showError("Số lượng không được nhỏ hơn 0");
      } else if (matchingItem.soLuong <= detailSanPhamChiTiet.soLuong) {
        $scope.hoaDonUpdate = {
          soLuong: matchingItem.soLuong,
          thanhTien: matchingItem.soLuong * matchingItem.donGia,
        };

        $http
          .put(
            hoaDonChiTietAPI + "/update/" + matchingItem.idHoaDonChiTiet,
            $scope.hoaDonUpdate
          )
          .then(function () {
            $scope.getHoaDonChiTiet();
            $scope.tienHang = $scope.calculateTotal();
            $scope.tongTien = $scope.calculateTotal();
            showSuccess("Cập nhật thành công");
          });
      } else {
        showError(
          "Chỉ còn " + detailSanPhamChiTiet.soLuong + " sản phẩm trong cửa hàng"
        );
      }
    });
  };
  $scope.xoaSanPhamGioHang = function (id) {
    $http.delete(hoaDonChiTietAPI + "/delete/" + id).then(function () {
      $scope.getHoaDonChiTiet();
    });
  };
  function getVisiblePages() {
    var totalPages = $scope.totalPages.length;

    var range = $scope.maxVisiblePages; // Số trang tối đa để hiển thị
    var curPage = $scope.currentPage;

    var numberTruncateLeft = curPage - Math.floor(range / 2);
    var numberTruncateRight = curPage + Math.floor(range / 2);

    // Tạo danh sách trang hiển thị
    var visiblePages = [];

    for (var pos = 1; pos <= totalPages; pos++) {
      var active = pos - 1 === curPage ? "active" : "";

      if (totalPages >= 2 * range - 1) {
        if (pos >= numberTruncateLeft && pos <= numberTruncateRight) {
          visiblePages.push({
            page: pos,
            active: active,
          });
        }
      } else {
        visiblePages.push({
          page: pos,
          active: active,
        });
      }
    }
    return visiblePages;
  }
  $scope.giaoHang = function () {
    $scope.show = !$scope.show;
  };
  $scope.getCity = function () {
    const api = api_giaoHang + "?depth=1";
    axios.get(api).then((response) => {
      $scope.cityOptions = response.data;
    });
  };
  $scope.toggleAPI = function (event, type) {
    if (type === "ThanhPho") {
      $scope.showDropDownThanhPho = !$scope.showDropDownThanhPho;
      $scope.showDropDownPhuongXa = false;
      $scope.showDropDownQuanHuyen = false;
    } else if (type === "QuanHuyen") {
      $scope.showDropDownQuanHuyen = !$scope.showDropDownQuanHuyen;
      $scope.showDropDownPhuongXa = false;
      $scope.showDropDownThanhPho = false;
    } else if (type === "PhuongXa") {
      $scope.showDropDownPhuongXa = !$scope.showDropDownPhuongXa;
      $scope.showDropDownQuanHuyen = false;
      $scope.showDropDownThanhPho = false;
    }
    event.stopPropagation();
  };
  $scope.selectOptionThanhPho = function (option) {
    $scope.hoaDonThanhToan.tinhThanhPho = option;
    let selectedCityCode = "";
    $scope.cityOptions.find((city) => {
      if (city.name === option) {
        selectedCityCode = city.code;
      }
    });
    if (selectedCityCode) {
      const api = api_giaoHang + "p/" + selectedCityCode + "?depth=2";
      axios.get(api).then(function (response) {
        $scope.districtOptions = response?.data.districts;
        console.log($scope.districtOptions);
      });
    }
    $scope.hoaDonThanhToan.quanHuyen = null;
    $scope.hoaDonThanhToan.phuongXa = null;

    $scope.showDropDownThanhPho = false;
    $scope.showDropDownQuanHuyen = false;
  };
  $scope.selectOptionQuanHuyen = function (option) {
    $scope.hoaDonThanhToan.quanHuyen = option;
    let selectedDistrictCode = "";
    $scope.districtOptions.find((district) => {
      if (district.name === option) {
        selectedDistrictCode = district.code;
      }
    });
    console.log(selectedDistrictCode);
    if (selectedDistrictCode) {
      const api = api_giaoHang + "d/" + selectedDistrictCode + "?depth=2";
      axios.get(api).then(function (response) {
        $scope.wardOptions = response?.data.wards;
      });
    }
    $scope.hoaDonThanhToan.phuongXa = null;
    $scope.showDropDownQuanHuyen = false;
    $scope.showDropDownPhuongXa = false;
  };
  $scope.selectOptionPhuongXa = async function (option) {
    $scope.hoaDonThanhToan.phuongXa = option;
    $scope.showDropDownPhuongXa = false;
    var headers = {
      "Content-Type": "application/json",
      token: "6b9dba70-8881-11ee-af43-6ead57e9219a",
      shop_id: "4714252",
    };

    var config = {
      headers: headers,
    };
    $http
      .get(APIDistrict, config)
      .then(function (response) {
        $scope.districts = response.data.data;
        console.log($scope.districts);
        var foundDistrict = $scope.districts.find(function (district) {
          return district.DistrictName === $scope.hoaDonThanhToan.quanHuyen;
        });

        if (foundDistrict) {
          var district_id = foundDistrict.DistrictID;

          $http
            .get(APIWard + "?district_id=" + district_id, config)
            .then(function (response) {
              $scope.wards = response.data.data;

              var foundWard = $scope.wards.find(function (ward) {
                return ward.WardName === $scope.hoaDonThanhToan.phuongXa;
              });

              if (foundWard) {
                var wardCode = foundWard.WardCode;

                var requestData = {
                  service_type_id: 2,
                  to_district_id: district_id,
                  to_ward_code: wardCode,
                  height: 20,
                  length: 30,
                  weight: 3000,
                  width: 40,
                };

                $http
                  .post(APIPhiVanChuyen, requestData, config)
                  .then(function (response) {
                    console.log(response.data);
                    $scope.phiVanChuyen = response.data.data.total;
                    $scope.tongTien =
                      $scope.tienHang + $scope.phiVanChuyen - $scope.giamGia;
                  });
              }
            });
        }
      })
      .catch(function (error) {
        console.error("An error occurred:", error);
      });
  };

  $scope.toggleVoucher = function (event) {
    $scope.showDropDownVoucher = !$scope.showDropDownVoucher;

    event.stopPropagation();
  };
  $scope.selectedVoucher = function (index, option) {
    $scope.maGiamGiaId = option.id;
    if ($scope.formHoaDonChiTiet.idHoaDon === "") {
      showError("Hãy chọn 1 hóa đơn để áp dụng mã giảm giá");
    } else if ($scope.tienHang < option.giaTriDonToiThieu) {
      showError("Chưa đủ giá trị đơn tối thiểu");
    } else {
      if (option.hinhThucGiam === 1) {
        $scope.giamGia = $scope.tienHang * (option.giaTriGiam / 100);
        $scope.tongTien =
          $scope.tienHang + $scope.phiVanChuyen - $scope.giamGia;
      } else {
        $scope.giamGia = option.giaTriGiam;
        $scope.tongTien =
          $scope.tienHang + $scope.phiVanChuyen - option.giaTriGiam;
      }
    }

    $scope.showDropDownVoucher = false;
  };
  document.addEventListener("click", function (event) {
    var dropdownContainer = document.querySelector(".dropdown-container");

    if (!dropdownContainer.contains(event.target)) {
      $scope.$apply(function () {
        $scope.showDropDownVoucher = false;
        $scope.showDropDownThanhPho = false;
        $scope.showDropDownQuanHuyen = false;
        $scope.showDropDownPhuongXa = false;
      });
    }
  });
  $scope.getCity();

  $scope.thanhToan = function () {
    $scope.hoaDonThanhToan.tongTien = $scope.tongTien;
    let diaChiKhachHang =
      $scope.hoaDonThanhToan.diaChiCuThe +
      ", " +
      $scope.hoaDonThanhToan.phuongXa +
      ", " +
      $scope.hoaDonThanhToan.quanHuyen +
      ", " +
      $scope.hoaDonThanhToan.tinhThanhPho;
    if ($scope.formHoaDonChiTiet.idHoaDon === "") {
      showError("Chọn 1 hóa đơn để thanh toán");
    } else {
      if ($scope.hoaDonThanhToan.idKhachHang === "" && $scope.show == false) {
        $scope.hoaDonThanhToan.trangThai = 3;
        //update hoa don
        $http
          .put(
            hoaDonAPI + "/update/" + $scope.formHoaDonChiTiet.idHoaDon,
            $scope.hoaDonThanhToan
          )
          .then(function () {
            $scope.getListHoaDon();
          })
          //update so luong san pham
          .then(function () {
            return $http.put(
              sanPhamChiTietAPI + "/update-so-luong",
              $scope.listHoaDonChiTiet
            );
          })
          //add ma giam gia
          .then(function () {
            if ($scope.maGiamGiaId === undefined) {
              return;
            } else {
              $scope.addMaGiamGia = {
                tongTien: $scope.tienHang,
                tongTienSauKhiGiam: $scope.tongTien,
                hoaDonId: $scope.formHoaDonChiTiet.idHoaDon,
                maGiamGiaId: $scope.maGiamGiaId,
              };
              return $http.post(
                maGiamGiaChiTietAPI + "/add",
                $scope.addMaGiamGia
              );
            }
          })

          //add hinh thuc thanh toan
          .then(function () {
            $scope.addHinhThucThanhToan = {
              tenHinhThuc: $scope.searchHinhThucThanhToan,
              hoaDonId: $scope.formHoaDonChiTiet.idHoaDon,
            };
            return $http.post(
              hinhThucThanhToanAPI + "/add",
              $scope.addHinhThucThanhToan
            );
          });
        $location.path("/hoa-don/hien-thi");
      } else if (
        $scope.hoaDonThanhToan.idKhachHang === "" &&
        $scope.show == true
      ) {
        $scope.hoaDonThanhToan.diaChiKhachHang = diaChiKhachHang;
        $http
          .put(
            hoaDonAPI + "/update/" + $scope.formHoaDonChiTiet.idHoaDon,
            $scope.hoaDonThanhToan
          )
          .then(function () {
            $scope.getListHoaDon();
          })
          .then(function () {
            return $http.put(
              sanPhamChiTietAPI + "/update-so-luong",
              $scope.listHoaDonChiTiet
            );
          });
        $location.path("/hoa-don/hien-thi");
      } else {
        $scope.hoaDonThanhToan.diaChiKhachHang = diaChiKhachHang;
        $http
          .put(
            hoaDonAPI + "/update/" + $scope.formHoaDonChiTiet.idHoaDon,
            $scope.hoaDonThanhToan
          )
          .then(function () {
            $scope.getListHoaDon();
          })
          .then(function () {
            return $http.put(
              sanPhamChiTietAPI + "/update-so-luong",
              $scope.listHoaDonChiTiet
            );
          });
        $location.path("/hoa-don/hien-thi");
      }
    }
  };
  $scope.getKhachHangByTrangThai = function (e) {
    e.preventDefault();
    $http
      .get(khachHangAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listKhachHang = response?.data.content;
      });
  };
  function detailKhachHang(idKhachHang) {
    return $http
      .get(khachHangAPI + "/detail/" + idKhachHang)
      .then(function (response) {
        return response?.data;
      });
  }
  function detailDiaChi(idKhachHang) {
    return $http
      .get(diaChiAPI + "/detail/" + idKhachHang)
      .then(function (response) {
        return response?.data;
      });
  }
  $scope.addKhachHang = function (e, idKhachHang) {
    e.preventDefault();
    $scope.chonKhachHang = true;
    let diaChiMacDinh = "";
    detailKhachHang(idKhachHang).then(function (detailKhachHang) {
      $scope.hoaDonThanhToan.idKhachHang = detailKhachHang.id;
      $scope.hoaDonThanhToan.tenKhachHang = detailKhachHang.hoTen;
      $scope.hoaDonThanhToan.soDienThoaiKhachHang = detailKhachHang.soDienThoai;
    });
    detailDiaChi(idKhachHang).then(function (detailDiaChi) {
      if (detailDiaChi) {
        diaChiMacDinh = detailDiaChi.find((diaChi) => {
          return diaChi.diaChiMacDinh === true;
        });
      }
      $scope.hoaDonThanhToan.diaChiCuThe = diaChiMacDinh.diaChiCuThe;
      $scope.hoaDonThanhToan.tinhThanhPho = diaChiMacDinh.tinhThanhPho;
      $scope.hoaDonThanhToan.quanHuyen = diaChiMacDinh.quanHuyen;
      $scope.hoaDonThanhToan.phuongXa = diaChiMacDinh.phuongXa;
      $scope.hoaDonThanhToan.diaChiKhachHang =
        $scope.hoaDonThanhToan.diaChiCuThe +
        ", " +
        $scope.hoaDonThanhToan.phuongXa +
        ", " +
        $scope.hoaDonThanhToan.quanHuyen +
        ", " +
        $scope.hoaDonThanhToan.tinhThanhPho;
    });
  };
  $scope.hinhThucThanhToan = function (hinhThuc) {
    $scope.searchHinhThucThanhToan = hinhThuc;
  };
};

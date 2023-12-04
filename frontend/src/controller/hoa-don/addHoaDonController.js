window.addHoaDonController = function ($http, $scope, $routeParams, $location) {
  $scope.listHoaDon = [];
  $scope.sizeAndQuantitys = [];
  $scope.listKichThuoc = [];
  $scope.filterKichThuoc = "";
  $scope.currentPage = 0;
  $scope.currentPageHDCT = 0;
  $scope.maxVisiblePages = 3;
  $scope.totalPages = [];
  $scope.totalPagesHDCT = [];
  $scope.listMaGiamGia = [];
  $scope.listSanPhamChiTiet = [];
  $scope.listHoaDonChiTiet = [];
  $scope.listKhachHang = [];
  $scope.cityOptions = [];
  $scope.districtOptions = [];
  $scope.wardOptions = [];
  $scope.khachHangDefault = true;
  $scope.chonKhachHang = false;
  $scope.diaChiMoi = true;
  $scope.diaChiMacDinh = false;
  $scope.show = false;
  $scope.showDropDownVoucher = false;
  $scope.tongTien = "";
  $scope.giamGia = "";
  $scope.showError = "";
  $scope.visiblePages = [];
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
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
    tenKhachHang: "",
    soDienThoaiKhachHang: "",
    diaChiKhachHang: "",
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
        $scope.totalPagesHDCT = new Array(response.data.totalPages);
        $scope.visiblePages = getVisiblePages();
      });
    $http
      .get(hoaDonChiTietAPI + "/tinh-tong/" + $scope.formHoaDonChiTiet.idHoaDon)
      .then(function (response) {
        $scope.listHoaDonChiTiet2 = response?.data;
        $scope.tongTien = $scope.listHoaDonChiTiet2
          .filter((item) => item.hoaDon.ma === $scope.maHoaDon)
          .reduce((total, item) => total + item.thanhTien, 0);
      });
  };
  $scope.addSanPhamChiTiet = function (idSanPhamChiTiet, index) {
    // Gán giá trị cho $scope.formHoaDonChiTiet
    $scope.formHoaDonChiTiet = {
      idHoaDon: $scope.formHoaDonChiTiet.idHoaDon,
      idSanPhamChiTiet: idSanPhamChiTiet,
      donGia: $scope.listSanPhamChiTiet[index].donGia,
      thanhTien: $scope.listSanPhamChiTiet[index].donGia,
      soLuong: 1,
    };

    // Tìm sản phẩm chi tiết trong danh sách hóa đơn
    var matchingItem = $scope.listHoaDonChiTiet.find(
      (item) => item.idSanPhamChiTiet === idSanPhamChiTiet
    );
    if (matchingItem) {
      // Cập nhật số lượng sản phẩm chi tiết trong hóa đơn
      $http
        .get(
          sanPhamChiTietAPI +
            "/detail/" +
            $scope.formHoaDonChiTiet.idSanPhamChiTiet
        )
        .then(function (response) {
          $scope.detailSanPhamChiTiet = response.data;
          matchingItem.soLuong += 1;
          if (matchingItem.soLuong <= $scope.detailSanPhamChiTiet.soLuong) {
            // Cập nhật thông tin sản phẩm chi tiết trong hóa đơn
            $scope.hoaDonUpdate = {
              soLuong: matchingItem.soLuong,
              thanhTien:
                $scope.formHoaDonChiTiet.soLuong *
                $scope.formHoaDonChiTiet.donGia,
            };
            $http
              .put(
                hoaDonChiTietAPI + "/update/" + matchingItem.idHoaDonChiTiet,
                $scope.hoaDonUpdate
              )
              .then(function () {
                $scope.getHoaDonChiTiet();
                $scope.tongTien = $scope.calculateTotal();
                showSuccess("Cập nhật thành công");
              });
          } else {
            showError(
              "Chỉ còn " +
                $scope.detailSanPhamChiTiet.soLuong +
                " sản phẩm trong cửa hàng"
            );
          }
        });
    } else {
      $http
        .post(hoaDonChiTietAPI + "/add", $scope.formHoaDonChiTiet)
        .then(function () {
          $scope.getHoaDonChiTiet();
          $scope.tongTien = $scope.calculateTotal();
          showSuccess("Thêm sản phẩm mới thành công");
        });
    }
  };

  // Tính tổng tiền của hóa đơn
  $scope.calculateTotal = function () {
    return $scope.listHoaDonChiTiet
      .filter((item) => item.maHoaDon === $scope.maHoaDon)
      .reduce((total, item) => total + item.thanhTien, 0);
  };

  $scope.changeSoLuong = function (index, idHoaDonChiTiet, idSanPhamChiTiet) {
    $http
      .get(sanPhamChiTietAPI + "/detail/" + idSanPhamChiTiet)
      .then(function (response) {
        $scope.detailSanPhamChiTiet = response.data;
        let item = $scope.listHoaDonChiTiet[index];
        if (item.soLuong == null) {
          showError("Số lượng không được nhỏ hơn 0");
          return;
        } else if (item.soLuong <= $scope.detailSanPhamChiTiet.soLuong) {
          item.soLuong = $scope.listHoaDonChiTiet[index].soLuong;
          item.thanhTien = item.soLuong * item.donGia;

          $scope.hoaDonUpdate = {
            soLuong: item.soLuong,
            thanhTien: item.thanhTien,
          };
          $http
            .put(
              hoaDonChiTietAPI + "/update/" + idHoaDonChiTiet,
              $scope.hoaDonUpdate
            )
            .then(function () {});
          $scope.tongTien = $scope.listHoaDonChiTiet
            .filter((item) => item.maHoaDon === $scope.maHoaDon)
            .reduce((total, item) => total + item.thanhTien, 0);
          showSuccess("Cập nhật thành công");
        } else {
          showError(
            "Chỉ còn " +
              $scope.detailSanPhamChiTiet.soLuong +
              " sản phẩm trong cửa hàng"
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
  $scope.toggleAPI = function (event) {
    // Mở hoặc đóng dropdown tương ứng
    $scope.showDropDownVoucher = !$scope.showDropDownVoucher;

    event.stopPropagation();
  };
  $scope.getCity();

  $scope.onCityChange = () => {
    const selectedCityCode = $scope.formDiaChi.tinhThanhPho;
    if (selectedCityCode) {
      const api = api_giaoHang + "p/" + selectedCityCode + "?depth=2";
      axios.get(api).then(function (response) {
        $scope.districtOptions = response.data.districts;

        printResult();
      });
    }
    $scope.formDiaChi.quanHuyen = null; // Đặt lại quận/huyện khi tỉnh/thành phố thay đổi.
    $scope.formDiaChi.phuongXa = null;
    $scope.districtOptions = [];
    $scope.wardOptions = [];
  };
  $scope.onDistrictChange = () => {
    const selectedDistrictCode = $scope.formDiaChi.quanHuyen;
    if (selectedDistrictCode) {
      const api = api_giaoHang + "d/" + selectedDistrictCode + "?depth=2";
      axios.get(api).then(function (response) {
        $scope.wardOptions = response.data.wards;
        printResult();
      });
    }
    $scope.formDiaChi.phuongXa = null;
    $scope.wardOptions = [];
  };
  $scope.onWardChange = () => {
    printResult();
  };
  var printResult = () => {
    if (
      $scope.formDiaChi.quanHuyen &&
      $scope.formDiaChi.tinhThanhPho &&
      $scope.formDiaChi.phuongXa
    ) {
      $scope.formHoaDon.tenThanhPho = $scope.cityOptions.find(
        (option) => option.code == $scope.formDiaChi.tinhThanhPho
      ).name;

      $scope.formHoaDon.tenQuanHuyen = $scope.districtOptions.find(
        (option) => option.code == $scope.formDiaChi.quanHuyen
      ).name;
      $scope.formHoaDon.tenPhuongXa = $scope.wardOptions.find(
        (option) => option.code == $scope.formDiaChi.phuongXa
      ).name;
    }
  };

  $scope.thanhToan = function () {
    var elem = document.getElementById("myBar");
    var width = 0;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
    // const axiosConfig = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     token: "6b9dba70-8881-11ee-af43-6ead57e9219a", // Thay YOUR_TOKEN_HERE bằng token thực tế của bạn
    //   },
    // };

    // const apiKey = "6b9dba70-8881-11ee-af43-6ead57e9219a"; // Thay YOUR_API_KEY bằng API Key của bạn
    // const apiUrl =
    //   "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee";
    // const dichVuChuyen =
    //   "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services";

    // const requestData = {
    //   token: apiKey,
    //   height: 10, // Thông số kích thước của gói hàng
    //   length: 20,
    //   width: 15,
    //   weight: 2, // Trọng lượng của gói hàng
    //   service_type_id: 1, // Mã dịch vụ
    //   from_district: "Quận 1", // Quận/Huyện người gửi
    //   to_district: "Quận 10", // Quận/Huyện người nhận
    // };
    // const getDichVu = {
    //   shop_id: 4714252,
    //   from_district: 1542,
    //   to_district: 1442,
    // };
    // axios
    //   .post(dichVuChuyen, getDichVu, axiosConfig)
    //   .then((response) => {
    //     console.log(response.data);
    //     // Xử lý dữ liệu phí vận chuyển ở đây
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    // $http.get(dichVuChuyen, $scope.a).then(function (response) {
    //   console.log(response.data);
    // });

    let tenKhachHangMacDinh = document.getElementById("tenKhachHang").value;
    $scope.hoaDonThanhToan.tongTien = $scope.listHoaDonChiTiet
      .filter((item) => item.maHoaDon === $scope.maHoaDon)
      .reduce((total, item) => total + item.thanhTien, 0);
    if ($scope.hoaDonThanhToan.idKhachHang == "") {
      $scope.hoaDonThanhToan.tenKhachHang = tenKhachHangMacDinh;
      if ($scope.formHoaDonChiTiet.idHoaDon == "") {
        showError("Chọn 1 hóa đơn để thanh toán");
      } else {
        $http
          .put(
            hoaDonAPI + "/update-khach-le/" + $scope.formHoaDonChiTiet.idHoaDon,
            $scope.hoaDonThanhToan
          )
          .then(function () {
            $scope.getListHoaDon();
          });
        $http
          .put(sanPhamChiTietAPI + "/update-so-luong", $scope.listHoaDonChiTiet)
          .then(function () {
            // $location.path("/hoa-don/hien-thi");
          });
      }
    } else {
      $scope.hoaDonThanhToan.tenKhachHang;
      $scope.hoaDonThanhToan.diaChiKhachHang =
        $scope.formHoaDon.soNha +
        ", " +
        $scope.formHoaDon.tenPhuongXa +
        ", " +
        $scope.formHoaDon.tenQuanHuyen +
        ", " +
        $scope.formHoaDon.tenThanhPho;
      $scope.hoaDonThanhToan.tenKhachHang;
      $http
        .put(
          hoaDonAPI +
            "/update-khach-co-san/" +
            $scope.formHoaDonChiTiet.idHoaDon,
          $scope.hoaDonThanhToan
        )
        .then(function () {
          $scope.getListHoaDon();
        });
      $http
        .put(sanPhamChiTietAPI + "/update-so-luong", $scope.listHoaDonChiTiet)
        .then(function () {
          // $location.path("/hoa-don/hien-thi");
        });
    }
  };
  $scope.getKhachHangByTrangThai = function (e) {
    e.preventDefault();
    $http
      .get(khachHangAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listKhachHang = response.data;
        console.log($scope.listKhachHang);
      });
  };
  $scope.addKhachHang = function (e, id) {
    $scope.khachHangDefault = false;
    $scope.chonKhachHang = true;
    $scope.diaChiMoi = false;
    $scope.diaChiMacDinh = true;
    e.preventDefault();

    $http.get(khachHangAPI + "/detail/" + id).then(function (response) {
      $scope.detailKhachHang = response.data;
      $scope.hoaDonThanhToan.tenKhachHang =
        $scope.detailKhachHang.khachHang.hoten;
      $scope.hoaDonThanhToan.soDienThoaiKhachHang =
        $scope.detailKhachHang.khachHang.sodienthoai;
      $scope.diaChiMacDinh =
        $scope.detailKhachHang.mota +
        " - " +
        $scope.detailKhachHang.phuongxa +
        " - " +
        $scope.detailKhachHang.quanhuyen +
        " - " +
        $scope.detailKhachHang.tinhthanhpho;
    });
    if ($scope.chonKhachHang == true && $scope.show == false) {
      $scope.tenKhachHang = "";
      $scope.diaChiKhachHang = "";
      $scope.hoaDonThanhToan.idKhachHang = id;
      $scope.soDienThoaiKhachHang = "";
      $scope.hoaDonThanhToan.tongTien = $scope.listHoaDonChiTiet
        .filter((item) => item.maHoaDon === $scope.maHoaDon)
        .reduce((total, item) => total + item.thanhTien, 0);
      console.log($scope.hoaDonThanhToan);
    }
  };
  $scope.$watch("searchKeyword", function (newVal, oldVal) {
    if (newVal !== oldVal) {
      $http
        .get(khachHangAPI + "/search?search=" + $scope.searchKeyword)
        .then(function (response) {
          $scope.listKhachHang = response.data;
        });
    }
  });
  $scope.addDiaChi = function () {
    $scope.diaChiMoi = true;
    $scope.diaChiMacDinh = false;
  };
};

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

  $scope.listSanPhamChiTiet = [];
  $scope.listHoaDonChiTiet = [];
  $scope.listKhachHang = [];
  $scope.cityOptions = [];
  $scope.districtOptions = [];
  $scope.wardOptions = [];
  $scope.filter;
  $scope.khachHangDefault = true;
  $scope.chonKhachHang = false;
  $scope.diaChiMoi = true;
  $scope.diaChiMacDinh = false;
  $scope.show = false;

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

  $scope.getListHoaDon = function () {
    $http.get(hoaDonAPI + "/get-list").then(function (response) {
      $scope.listHoaDon = response.data;
    });
  };
  $scope.getListHoaDon();

  $scope.addHoaDon = function (event) {
    event.preventDefault();
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
      $scope.message = "Tạo thành công";
      return true;
    } else {
      $scope.message = "Chỉ được tạo tối đa 5 hóa đơn chờ";
      return false;
    }
  };
  $scope.getSanPhamChiTiet = function () {
    $http
      .get(sanPhamChiTietAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listSanPhamChiTiet = response.data;
        $scope.totalPages = new Array(response.data.totalPages);
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
    if ($scope.currentPageHDCT <= length - 1) {
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
  $scope.getIdHoaDon = function (idHoaDon, maHoaDon) {
    $scope.formHoaDonChiTiet.idHoaDon = idHoaDon;
    $scope.maHoaDon = maHoaDon;
    $scope.getHoaDonChiTiet();
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
        $scope.listHoaDonChiTiet = response.data.content;
        $scope.totalPagesHDCT = new Array(response.data.totalPages);
      });
    $http
      .get(hoaDonChiTietAPI + "/tinh-tong/" + $scope.formHoaDonChiTiet.idHoaDon)
      .then(function (response) {
        $scope.listHoaDonChiTiet2 = response.data;
        console.log($scope.listHoaDonChiTiet2);
        $scope.tongTien = $scope.listHoaDonChiTiet2
          .filter((item) => item.hoaDon.ma === $scope.maHoaDon)
          .reduce((total, item) => total + item.thanhTien, 0);
      });
  };
  $scope.addSanPhamChiTiet = function (idSanPhamChiTiet, index) {
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
    const toastTrigger = document.getElementById("liveToastBtn");
    const toastLiveExample = document.getElementById("liveToast");
    if (toastTrigger) {
      const toastBootstrap =
        bootstrap.Toast.getOrCreateInstance(toastLiveExample);
      toastBootstrap.show();
    }
    $scope.formHoaDonChiTiet.idSanPhamChiTiet = idSanPhamChiTiet;
    $scope.formHoaDonChiTiet.donGia =
      $scope.listSanPhamChiTiet.content[index].donGia;
    $scope.formHoaDonChiTiet.thanhTien = $scope.formHoaDonChiTiet.donGia;
    console.log(idSanPhamChiTiet);
    // Kiểm tra xem có phần tử nào trong listHoaDonChiTiet khớp với idSanPhamChiTiet hay không
    var matchingItem = $scope.listHoaDonChiTiet.find(
      (hoaDonChiTiet) => hoaDonChiTiet.idSanPhamChiTiet === idSanPhamChiTiet
    );
    if (matchingItem) {
      if (toastTrigger) {
        const toastBootstrap =
          bootstrap.Toast.getOrCreateInstance(toastLiveExample);
        toastBootstrap.show();
      }
      // Nếu có khớp, tăng soLuong lên 1
      $http
        .get(
          sanPhamChiTietAPI +
            "/detail/" +
            $scope.formHoaDonChiTiet.idSanPhamChiTiet
        )
        .then(function (response) {
          $scope.detailSanPhamChiTiet = response.data;
          $scope.formHoaDonChiTiet.soLuong += 1;
          if (
            $scope.formHoaDonChiTiet.soLuong <=
            $scope.detailSanPhamChiTiet.soLuong
          ) {
            // Cập nhật hoaDonChiTiet
            $scope.hoaDonUpdate = {
              soLuong: $scope.formHoaDonChiTiet.soLuong,
              thanhTien:
                $scope.formHoaDonChiTiet.soLuong *
                $scope.formHoaDonChiTiet.donGia,
            };
            console.log($scope.hoaDonUpdate);
            $http
              .put(
                hoaDonChiTietAPI + "/update/" + matchingItem.idHoaDonChiTiet,
                $scope.hoaDonUpdate
              )
              .then(function () {
                $scope.getHoaDonChiTiet();
              });
            $scope.tongTien = $scope.listHoaDonChiTiet
              .filter((item) => item.maHoaDon === $scope.maHoaDon)
              .reduce((total, item) => total + item.thanhTien, 0);
            $scope.message = "Cập nhật thành công ";
            return;
          } else {
            // Hiển thị thông báo khi số lượng vượt quá giới hạn
            if (toastTrigger) {
              const toastBootstrap =
                bootstrap.Toast.getOrCreateInstance(toastLiveExample);
              toastBootstrap.show();
            }
            $scope.message =
              "Chỉ còn " +
              $scope.detailSanPhamChiTiet.soLuong +
              " sản phẩm trong cửa hàng";
            return;
          }
        });
    } else {
      $scope.formHoaDonChiTiet.soLuong = 1; // Đặt số lượng là 1 cho sản phẩm mới
      $http
        .post(hoaDonChiTietAPI + "/add", $scope.formHoaDonChiTiet)
        .then(function () {
          $scope.getHoaDonChiTiet();
          $scope.tongTien = $scope.listHoaDonChiTiet
            .filter((item) => item.maHoaDon === $scope.maHoaDon)
            .reduce((total, item) => total + item.thanhTien, 0);
          $scope.message = "Thêm sản phẩm mới thành công";
        });
    }
  };
  $scope.changeSoLuong = function (index, idHoaDonChiTiet, idSanPhamChiTiet) {
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
    const toastTrigger = document.getElementById("liveToastBtn");
    const toastLiveExample = document.getElementById("liveToast");

    $http
      .get(sanPhamChiTietAPI + "/detail/" + idSanPhamChiTiet)
      .then(function (response) {
        $scope.detailSanPhamChiTiet = response.data;
        let item = $scope.listHoaDonChiTiet[index];
        if (item.soLuong == null) {
          return;
        } else if (item.soLuong <= $scope.detailSanPhamChiTiet.soLuong) {
          if (toastTrigger) {
            const toastBootstrap =
              bootstrap.Toast.getOrCreateInstance(toastLiveExample);
            toastBootstrap.show();
          }
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
          $scope.message = "Cập nhật thành công ";
          return;
        } else {
          if (toastTrigger) {
            const toastBootstrap =
              bootstrap.Toast.getOrCreateInstance(toastLiveExample);
            toastBootstrap.show();
          }
          $scope.message =
            "Chỉ còn " +
            $scope.detailSanPhamChiTiet.soLuong +
            " sản phẩm trong cửa hàng";
          return;
        }
      });
  };
  $scope.xoaSanPhamGioHang = function (id) {
    $http.delete(hoaDonChiTietAPI + "/delete/" + id).then(function () {
      $scope.getHoaDonChiTiet();
    });
  };

  $scope.giaoHang = function () {
    $scope.show = !$scope.show;
  };
  $scope.getCity = function () {
    const api = api_giaoHang + "?depth=1";
    axios.get(api).then((response) => {
      $scope.cityOptions = response.data;
    });
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
        if (toastTrigger) {
          const toastBootstrap =
            bootstrap.Toast.getOrCreateInstance(toastLiveExample);
          toastBootstrap.show();
        }
        $scope.message = "Chọn 1 hóa đơn để thanh toán";
        return;
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
  const toastTrigger = document.getElementById("liveToastBtn");
  const toastLiveExample = document.getElementById("liveToast");
  if (toastTrigger) {
    const toastBootstrap =
      bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastTrigger.addEventListener("click", () => {
      toastBootstrap.show();
    });
  }
};

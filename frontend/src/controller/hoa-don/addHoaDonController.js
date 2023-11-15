window.addHoaDonController = function ($http, $scope, $routeParams) {
  $scope.listHoaDon = [];
  $scope.sizeAndQuantitys = [];
  $scope.listKichThuoc = [];
  $scope.filterKichThuoc = "";
  $scope.currentPage = 0;
  $scope.totalPages = [];
  $scope.listSanPhamChiTiet = [];
  $scope.listHoaDonChiTiet = [];
  $scope.listKhachHang = [];
  $scope.cityOptions = [];
  $scope.districtOptions = [];
  $scope.wardOptions = [];
  $scope.filter;

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
    tenKhachHang: "",
    diaChiKhachHang: "",
    tongTien: "",
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
      $scope.getChatLieu();
    }
  };

  $scope.nextPage = function () {
    let length = $scope.totalPages.length;
    if ($scope.currentPage < length - 1) {
      $scope.currentPage++;
      $scope.getChatLieu();
    }
  };

  $scope.previousPage = function () {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
      $scope.getChatLieu();
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
          $scope.currentPage
      )
      .then(function (response) {
        $scope.listHoaDonChiTiet = response.data.content;
        $scope.tongTien = $scope.listHoaDonChiTiet
          .filter((item) => item.maHoaDon === $scope.maHoaDon)
          .reduce((total, item) => total + item.thanhTien, 0);
      });
  };
  $scope.addSanPhamChiTiet = function (idSanPhamChiTiet, index) {
    $scope.formHoaDonChiTiet.idSanPhamChiTiet = idSanPhamChiTiet;
    $scope.formHoaDonChiTiet.donGia =
      $scope.listSanPhamChiTiet.content[index].donGia;
    $scope.formHoaDonChiTiet.thanhTien = $scope.formHoaDonChiTiet.donGia;
    $http
      .post(hoaDonChiTietAPI + "/add", $scope.formHoaDonChiTiet)
      .then(function () {
        $scope.getHoaDonChiTiet();
      });
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
  $scope.khachHangDefault = true;
  $scope.show = false;
  $scope.addKhachHang = function () {
    $scope.khachHangDefault = false;
    $scope.chonKhachHang = true;
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
    let tenKhachHangMacDinh = document.getElementById("tenKhachHang").value;
    if ($scope.hoaDonThanhToan.tenKhachHang === "") {
      $scope.hoaDonThanhToan.tenKhachHang = tenKhachHangMacDinh;
      $scope.hoaDonThanhToan.diaChi = "";
    } else {
      $scope.hoaDonThanhToan.diaChiKhachHang =
        $scope.formHoaDon.soNha +
        ", " +
        $scope.formHoaDon.tenPhuongXa +
        ", " +
        $scope.formHoaDon.tenQuanHuyen +
        ", " +
        $scope.formHoaDon.tenThanhPho;
      $scope.hoaDonThanhToan.tenKhachHang;
    }
    $scope.hoaDonThanhToan.tenKhachHang;
    $scope.hoaDonThanhToan.tongTien = $scope.listHoaDonChiTiet
      .filter((item) => item.maHoaDon === $scope.maHoaDon)
      .reduce((total, item) => total + item.thanhTien, 0);
    $http
      .put(
        hoaDonAPI + "/update/" + $scope.formHoaDonChiTiet.idHoaDon,
        $scope.hoaDonThanhToan
      )
      .then(function () {
        $scope.getListHoaDon();
      });
  };
  $scope.getKhachHangByTrangThai = function () {
    $http
      .get(khachHangAPI + "/trang-thai?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listKhachHang = response.data.content;
        console.log($scope.listKhachHang);
      });
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

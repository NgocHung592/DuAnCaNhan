window.addHoaDonController = function ($http, $scope, $routeParams) {
  $scope.listHoaDon = [];
  $scope.sizeAndQuantitys = [];
  $scope.listKichThuoc = [];
  $scope.filterKichThuoc = "";
  $scope.currentPage = 0;
  $scope.totalPages = [];
  $scope.listSanPhamChiTiet = [];
  $scope.filter;
  $scope.formHoaDonChiTiet = {
    idHoaDon: "",
    idSanPhamChiTiet: "",
    soLuong: 1,
    donGia: "",
    thanhTien: "",
  };
  $scope.getList = function () {
    $http.get(hoaDonAPI + "/get-list").then(function (response) {
      $scope.listHoaDon = response.data;
      console.log($scope.listHoaDon);
    });
  };
  $scope.getList();

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
        $scope.getList();
      });
      $scope.message = "Tạo thành công";
      return true;
    } else {
      $scope.message = "Chỉ được tạo tối đa 5 hóa đơn chờ";
      return false;
    }
  };
  $scope.xoaHoaDon = function (event, index) {
    event.preventDefault();
    $http.delete(hoaDonAPI + "/delete/" + index).then(function () {
      $scope.getList();
    });
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
  // $scope.detailSanPhamChiTiet = function (index) {
  //   $http
  //     .get(sanPhamChiTietAPI + "/detail-san-pham/" + index)
  //     .then(function (response) {
  //       $scope.productDetail = response.data;
  //       console.log($scope.productDetail);
  //     });
  //   $http
  //     .get(sanPhamChiTietAPI + "/detail-kich-thuoc/" + index)
  //     .then(function (response) {
  //       $scope.sizeAndQuantitys = response.data;
  //       console.log($scope.sizeAndQuantitys);
  //     });
  // };

  $scope.getIdHoaDon = function (idHoaDon, maHoaDon) {
    $scope.formHoaDonChiTiet.idHoaDon = idHoaDon;
    $scope.filter = maHoaDon;
    $scope.tongTien = $scope.listHoaDonChiTiet
      .filter((item) => item.maHoaDon === $scope.filter)
      .reduce((total, item) => total + item.thanhTien, 0);
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
  $scope.getHoaDonChiTiet = function () {
    $http
      .get(hoaDonChiTietAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listHoaDonChiTiet = response.data.content;
        console.log($scope.listHoaDonChiTiet);
      });
  };
  $scope.changeSoLuong = function (index) {
    var item = $scope.listHoaDonChiTiet[index];
    item.thanhTien = item.soLuong * item.donGia;
    $scope.listHoaDonChiTiet[index].soLuong = item.soLuong;
    $scope.hoaDonUpdate = {
      soLuong: item.soLuong,
      thanhTien: item.thanhTien,
    };
    $http.post();
    $scope.tongTien = $scope.listHoaDonChiTiet
      .filter((item) => item.maHoaDon === $scope.filter)
      .reduce((total, item) => total + item.thanhTien, 0);
  };
  $scope.xoaSanPhamGioHang = function (id) {
    $http.delete(hoaDonChiTietAPI + "/delete/" + id).then(function () {
      $scope.getHoaDonChiTiet();
    });
  };
  $scope.getHoaDonChiTiet();
  $scope.selectedSize = function (selectedSize) {
    $scope.filterKichThuoc = selectedSize;
    console.log($scope.filterKichThuoc);
  };
  $scope.khachHangDefault = true;
  $scope.addKhachHang = function () {
    $scope.khachHangDefault = false;
    $scope.chonKhachHang = true;
  };

  $scope.changePage = function (index) {
    $scope.currentPage = index;
    $scope.getSanPhamChiTiet();
  };
  $scope.nextPage = function () {
    let length = $scope.totalPages.length;
    if ($scope.currentPage < length - 1) {
      $scope.currentPage++;
      $scope.getSanPhamChiTiet();
    }
  };
  $scope.previousPage = function () {
    if ($scope.currentPage >= 0) {
      $scope.currentPage--;
      $scope.getSanPhamChiTiet();
    }
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

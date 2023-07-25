window.addSanPhamChiTietController = function ($http, $scope) {
  $scope.listSanPhamChiTiet = [];
  $scope.listDanhMucTrangThai = [];
  $scope.listChatLieuTrangThai = [];
  $scope.listSanPhamTrangThai = [];
  $scope.listHoaTietTrangThai = [];
  $scope.listPhongCachTrangThai = [];
  $scope.listMauSacTrangThai = [];
  $scope.listKichThuocTrangThai = [];
  $scope.listHoaTietTrangThai = [];
  $scope.listHoaTietTrangThai = [];
  $scope.listKieuDangTrangThai = [];
  $scope.currentPage = 0;
  $scope.totalPages = [];

  $scope.products = [];

  $scope.prductDetails = [];

  $scope.product = {
    tenSanPham: "",
    tenDanhMuc: "",
    tenMauSac: "",
    tenPhongCach: "",
    tenChatLieu: "",
    tenHoaTiet: "",
    gia: Number,
    daXoa: false,
  };

  $scope.sizes = [];
  $scope.size = {
    tenKichThuoc: "",
  };
  $scope.addSize = function () {
    var newSize = angular.copy($scope.size);
    $scope.sizes.push(newSize);
    console.log($scope.sizes);
  };

  $scope.generateSanPham = function () {
    $scope.products.push($scope.product);
    $scope.products.forEach((product) => {
      $scope.sizes.forEach((size) => {
        $scope.prductDetail = {
          tenSanPham: product.tenSanPham,
          tenDanhMuc: product.tenDanhMuc,
          tenMauSac: product.tenMauSac,
          tenPhongCach: product.tenPhongCach,
          tenChatLieu: product.tenChatLieu,
          tenHoaTiet: product.tenHoaTiet,
          tenKichThuoc: size.tenKichThuoc,
          gia: product.gia,
          soLuong: product.soLuong,
          daXoa: false,
        };
        $scope.prductDetails.push($scope.prductDetail);
        console.log($scope.prductDetails);
      });
    });
  };

  $scope.saveProduct = function (event) {
    event.preventDefault();
    $http
      .post(sanPhamChiTietAPI + "/add", $scope.prductDetails)
      .then(function (response) {
        alert("Them thanh cong");
      });
  };

  $http.get(chatLieuAPI + "/trang-thai").then(function (response) {
    $scope.listChatLieuTrangThai = response.data;
  });

  $http.get(danhMucAPI + "/trang-thai").then(function (response) {
    $scope.listDanhMucTrangThai = response.data;
  });

  $http.get(sanPhamAPI + "/trang-thai").then(function (response) {
    $scope.listSanPhamTrangThai = response.data;
  });

  $http.get(kieuDangAPI + "/trang-thai").then(function (response) {
    $scope.listKieuDangTrangThai = response.data;
  });

  $http.get(hoaTietAPI + "/trang-thai").then(function (response) {
    $scope.listHoaTietTrangThai = response.data;
  });

  $http.get(phongCachAPI + "/trang-thai").then(function (response) {
    $scope.listPhongCachTrangThai = response.data;
  });

  $http.get(mauSacAPI + "/trang-thai").then(function (response) {
    $scope.listMauSacTrangThai = response.data;
  });

  $http.get(kichThuocAPI + "/trang-thai").then(function (response) {
    $scope.listKichThuocTrangThai = response.data;
  });
};

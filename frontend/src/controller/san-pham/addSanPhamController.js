window.addSanPhamController = function ($http, $scope) {
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
  $scope.totalPages = [];
  $scope.products = [];
  $scope.prductDetails = [];
  $scope.sizes = [];
  $scope.colors = [];
  $scope.sizeAndColors = [];

  $scope.currentPage = 0;
  $scope.product = {
    tenSanPham: "",
    tenDanhMuc: "",
    tenPhongCach: "",
    tenChatLieu: "",
    tenHoaTiet: "",
    gia: "",
    soLuong: "",
    daXoa: false,
  };
  $scope.size = {
    tenKichThuoc: "",
  };
  $scope.color = {
    tenMauSac: "",
  };

  $scope.randoom = "SP" + Math.floor(Math.random() * 10000) + 1;
  $scope.show = Boolean;
  $scope.detailProduct = {
    id: "",
    ma: $scope.randoom,
    ten: "",
    moTa: "",
    daXoa: false,
  };

  $scope.addSize = function () {
    var newSize = angular.copy($scope.size);
    $scope.sizes.push(newSize);
    console.log($scope.sizes);
  };
  $scope.addColor = function () {
    var newColor = angular.copy($scope.color);
    $scope.colors.push(newColor);
    console.log($scope.colors);
  };

  $scope.generateSanPham = function () {
    var newProduct = angular.copy($scope.product);
    $scope.products.push(newProduct);
    $scope.colors.forEach((color) => {
      $scope.sizes.forEach((size) => {
        $scope.sizeAndColor = {
          tenKichThuoc: size.tenKichThuoc,
          tenMauSac: color.tenMauSac,
        };
        $scope.sizeAndColors.push($scope.sizeAndColor);
      });
    });
    $scope.products.forEach((product) => {
      $scope.sizeAndColors.forEach((sizeAndColor) => {
        $scope.detailProduct = {
          tenSanPham: product.tenSanPham,
          tenDanhMuc: product.tenDanhMuc,
          tenPhongCach: product.tenPhongCach,
          tenChatLieu: product.tenChatLieu,
          tenHoaTiet: product.tenHoaTiet,
          tenKichThuoc: sizeAndColor.tenKichThuoc,
          tenMauSac: sizeAndColor.tenMauSac,
          gia: product.gia,
          soLuong: product.soLuong,
          daXoa: false,
        };
        $scope.prductDetails.push($scope.detailProduct);
        console.log($scope.prductDetails);
      });
    });
  };

  $scope.saveProduct = function (event) {
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
    if ($scope.product.gia != "") {
      $http
        .post(sanPhamChiTietAPI + "/add", $scope.prductDetails)
        .then(function () {
          $scope.message = "Thêm thành công";
          $scope.show = true;
          return true;
        });
    } else {
      $scope.message = "Thêm thất bại";
      $scope.show = false;
      return false;
    }
  };
  //load thuoc tinh theo trang thai kich hoat
  $scope.getChatLieuTrangThai = function () {
    $http.get(chatLieuAPI + "/trang-thai").then(function (response) {
      $scope.listChatLieuTrangThai = response.data;
    });
  };
  $scope.getChatLieuTrangThai();

  $scope.getDanhMucTrangThai = function () {
    $http.get(danhMucAPI + "/trang-thai").then(function (response) {
      $scope.listDanhMucTrangThai = response.data;
    });
  };
  $scope.getDanhMucTrangThai();

  $scope.getSanPhamTrangThai = function (response) {
    $http.get(sanPhamAPI + "/trang-thai").then(function (response) {
      $scope.listSanPhamTrangThai = response.data;
    });
  };
  $scope.getSanPhamTrangThai();

  $scope.getHoaTietTrangThai = function () {
    $http.get(hoaTietAPI + "/trang-thai").then(function (response) {
      $scope.listHoaTietTrangThai = response.data;
    });
  };
  $scope.getHoaTietTrangThai();

  $scope.getPhongCachTrangThai = function () {
    $http.get(phongCachAPI + "/trang-thai").then(function (response) {
      $scope.listPhongCachTrangThai = response.data;
    });
  };
  $scope.getPhongCachTrangThai();

  $scope.getKichThuocTrangThai = function () {
    $http.get(kichThuocAPI + "/trang-thai").then(function (response) {
      $scope.listKichThuocTrangThai = response.data;
    });
  };
  $scope.getKichThuocTrangThai();

  $scope.getMauSacTrangThai = function () {
    $http.get(mauSacAPI + "/trang-thai").then(function (response) {
      $scope.listMauSacTrangThai = response.data;
    });
  };
  $scope.getMauSacTrangThai();
  //add nhanh thuoc tinh
  $scope.addSanPham = function () {
    $http.post(sanPhamAPI + "/add", $scope.detailProduct).then(function () {
      $scope.getSanPhamTrangThai();
    });
  };
  $scope.addHoaTiet = function () {
    $http.post(sanPhamAPI + "/add", $scope.detailProduct).then(function () {
      $scope.getSanPhamTrangThai();
    });
  };

  $scope.addPhongCach = function () {
    $http.post(sanPhamAPI + "/add", $scope.detailProduct).then(function () {
      $scope.getSanPhamTrangThai();
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

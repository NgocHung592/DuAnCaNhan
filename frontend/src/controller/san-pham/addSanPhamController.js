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
  $scope.listKieuDangTrangThai = [];
  $scope.listCoAoTrangThai = [];
  $scope.listTayAoTrangThai = [];

  $scope.totalPages = [];
  $scope.products = [];
  $scope.prductDetails = [];
  $scope.sizeAndQuantitys = [];
  $scope.show = Boolean;
  $scope.currentPage = 0;
  $scope.randoomSanPham = "SP" + Math.floor(Math.random() * 10000) + 1;

  $scope.product = {
    maSanPham: $scope.randoomSanPham,
    tenSanPham: "",
    idPhongCach: "",
    idChatLieu: "",
    idHoaTiet: "",
    idCoAo: "",
    idTayAo: "",
    idMauSac: "",
    gia: "",
    daXoa: false,
  };
  $scope.sizeAndQuantity = {
    tenKichThuoc: "",
    soLuong: "",
    daXoa: false,
  };

  $scope.addSizeAndQuantity = function () {
    let newSizeAndQuantity = angular.copy($scope.sizeAndQuantity);
    $scope.sizeAndQuantitys.push(newSizeAndQuantity);
    console.log($scope.sizeAndQuantitys);
  };

  $scope.saveProduct = function (event) {
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
    if ($scope.product.gia != "") {
      $http.post(sanPhamChiTietAPI + "/add", $scope.product).then(function () {
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

  $scope.getCoAoTrangThai = function () {
    $http.get(coAoAPI + "/trang-thai").then(function (response) {
      $scope.listCoAoTrangThai = response.data;
    });
  };
  $scope.getCoAoTrangThai();

  $scope.getTayAoTrangThai = function () {
    $http.get(tayAoAPI + "/trang-thai").then(function (response) {
      $scope.listTayAoTrangThai = response.data;
    });
  };
  $scope.getTayAoTrangThai();
  //add nhanh thuoc tinh
  $scope.randoom = "CL" + Math.floor(Math.random() * 10000) + 1;

  $scope.formChatLieu = {
    ma: $scope.randoom,
    ten: "",
    daXoa: false,
  };
  $scope.addChatLieu = function () {
    $http.post(chatLieuAPI + "/add", $scope.formChatLieu).then(function () {
      $scope.getChatLieuTrangThai();
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

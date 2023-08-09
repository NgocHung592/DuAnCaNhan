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
  $scope.colors = [];
  $scope.sizeAndColors = [];

  $scope.show = Boolean;
  $scope.currentPage = 0;
  $scope.randoomSanPham = "SP" + Math.floor(Math.random() * 10000) + 1;
  $scope.soLuong = "";

  $scope.product = {
    maSanPham: $scope.randoomSanPham,
    tenSanPham: "",
    moTa: "",
    idPhongCach: "",
    idChatLieu: "",
    kichThuocChiTiets: [],
    idHoaTiet: "",
    idCoAo: "",
    idTayAo: "",
    idMauSac: "",
    daXoa: false,
  };
  $scope.sizeAndQuantity = {
    tenKichThuoc: "",
    soLuong: "",
    gia: "",
    daXoa: false,
  };
  $scope.color = {
    tenMauSac: "",
  };
  $scope.sizeAndColor = {
    tenKichThuoc: "",
    tenMauSac: "",
    soLuong: "",
    gia: "",
    daXoa: "",
  };

  $scope.addKichThuoc = function (index) {
    $scope.listKichThuocTrangThai[index].checked =
      !$scope.listKichThuocTrangThai[index].checked;
    if ($scope.listKichThuocTrangThai[index].checked) {
      $scope.sizeAndQuantity = {
        tenKichThuoc: $scope.listKichThuocTrangThai[index].ten,
        soLuong: 0,
        gia: 0,
        daXoa: false,
      };
      let newSizeAndQuantity = angular.copy($scope.sizeAndQuantity);
      $scope.sizeAndQuantitys.push(newSizeAndQuantity);
    } else {
      $scope.sizeAndQuantitys.splice(index, 1);
    }
  };
  $scope.addMauSac = function (index) {
    $scope.listMauSacTrangThai[index].checked =
      !$scope.listMauSacTrangThai[index].checked;
    if ($scope.listMauSacTrangThai[index].checked) {
      $scope.color = {
        tenMauSac: $scope.listMauSacTrangThai[index].ten,
      };
      let newColor = angular.copy($scope.color);
      $scope.colors.push(newColor);
    } else {
      $scope.colors.splice(index, 1);
    }
  };

  $scope.addSizeAndColor = function () {
    let index = -1;

    $scope.sizeAndQuantitys.forEach((size) => {
      $scope.colors.forEach((color) => {
        $scope.sizeAndColor = {
          tenKichThuoc: size.tenKichThuoc,
          tenMauSac: color.tenMauSac,
          soLuong: size.soLuong,
          gia: size.gia,
          daXoa: size.daXoa,
        };
        let newSizeAndColor = angular.copy($scope.sizeAndColor);
        // if ($scope.sizeAndColors.filter((item) => item !== newSizeAndColor)) {
        //   $scope.sizeAndColors.push(newSizeAndColor);
        // } else {
        //   $scope.sizeAndColors.splice(index, 1);
        // }
        $scope.sizeAndColors.forEach(function (sizeAndColor, i) {
          if (sizeAndColor.tenKichThuoc == newSizeAndColor.tenKichThuoc) {
            index = i;
          }
        });
        if (index !== -1) {
        } else {
          $scope.sizeAndColors.push(newSizeAndColor);
        }
      });
    });
  };

  $scope.removeSize = function (index) {
    if (index !== -1) {
      $scope.sizeAndColors.splice(index, 1);
    }
  };

  $scope.changeSoLuong = function (index) {
    $scope.sizeAndColors[index].soLuong = $scope.sizeAndColors[index].soLuong;
  };
  $scope.changeGia = function (index) {
    $scope.sizeAndColors[index].gia = $scope.sizeAndColors[index].gia;
    console.log($scope.sizeAndColors);
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
    $scope.productDetail = {
      maSanPham: $scope.product.maSanPham,
      tenSanPham: $scope.product.tenSanPham,
      moTa: $scope.product.moTa,
      idPhongCach: $scope.product.idPhongCach,
      idChatLieu: $scope.product.idChatLieu,
      kichThuocChiTiets: $scope.sizeAndQuantitys,
      idHoaTiet: $scope.product.idHoaTiet,
      idCoAo: $scope.product.idCoAo,
      idTayAo: $scope.product.idTayAo,
      idMauSac: $scope.product.idMauSac,
      gia: $scope.product.gia,
      daXoa: $scope.product.daXoa,
    };
    if ($scope.product.gia != "") {
      $http
        .post(sanPhamChiTietAPI + "/add", $scope.productDetail)
        .then(function () {
          console.log($scope.productDetail);
          $scope.message = "Thêm thành công";
          $scope.show = true;
          return true;
        });
      $http
        .post(sanPhamChiTietAPI + "/add", $scope.sizeAndQuantitys)
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
  $scope.randoom = "PC" + Math.floor(Math.random() * 10000) + 1;

  $scope.formPhongCach = {
    ma: $scope.randoom,
    ten: "",
    daXoa: false,
  };

  $scope.addPhongCach = function () {
    $http.post(phongCachAPI + "/add", $scope.formPhongCach).then(function () {
      $scope.getPhongCachTrangThai();
    });
  };
  $scope.formHoaTiet = {
    ma: $scope.randoom,
    ten: "",
    daXoa: false,
  };

  $scope.addHoaTiet = function () {
    $http.post(hoaTietAPI + "/add", $scope.formHoaTiet).then(function () {
      $scope.getHoaTietTrangThai();
    });
  };
  $scope.formCoAo = {
    ma: $scope.randoom,
    ten: "",
    daXoa: false,
  };

  $scope.addCoAo = function () {
    $http.post(coAoAPI + "/add", $scope.formCoAo).then(function () {
      $scope.getCoAoTrangThai();
    });
  };
  $scope.formTayAo = {
    ma: $scope.randoom,
    ten: "",
    daXoa: false,
  };

  $scope.addTayAo = function () {
    $http.post(tayAoAPI + "/add", $scope.formTayAo).then(function () {
      $scope.getTayAoTrangThai();
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

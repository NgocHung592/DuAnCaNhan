window.addSanPhamController = function ($http, $scope) {
  $scope.totalPages = [];
  $scope.products = [];
  $scope.productDetails = [];
  $scope.sizeAndQuantitys = [];
  $scope.colors = [];
  $scope.sizeAndColors = [];

  $scope.currentPage = 0;
  $scope.randoomSanPham = "SP" + Math.floor(Math.random() * 10000) + 1;

  $scope.product = {
    maSanPham: $scope.randoomSanPham,
    tenSanPham: "",
    moTa: "",
    idPhongCach: "",
    idChatLieu: "",
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
    urlImage: "",
  };
  $scope.color = {
    tenMauSac: "",
  };

  $scope.addKichThuoc = function (index) {
    $scope.listKichThuocTrangThai[index].checked =
      !$scope.listKichThuocTrangThai[index].checked;
    if ($scope.listKichThuocTrangThai[index].checked) {
      $scope.sizeAndQuantity = {
        tenKichThuoc: $scope.listKichThuocTrangThai[index].ten,
        soLuong: 10,
        gia: 100000,
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
    $scope.sizeAndQuantitys.forEach((size) => {
      $scope.colors.forEach((color) => {
        $scope.sizeAndColor = {
          tenKichThuoc: size.tenKichThuoc,
          tenMauSac: color.tenMauSac,
          soLuong: size.soLuong,
          gia: size.gia,
        };
        let newSizeAndColor = angular.copy($scope.sizeAndColor);
        let exists = false;
        for (let i = 0; i < $scope.sizeAndColors.length; i++) {
          let existingItem = $scope.sizeAndColors[i];

          if (angular.equals(existingItem, newSizeAndColor)) {
            exists = true;
            break;
          }
        }

        if (exists) {
          // console.log(newSizeAndColor);
        } else {
          $scope.sizeAndColors.push(newSizeAndColor);
        }
        $scope.groupedProducts = {};

        $scope.sizeAndColors.forEach((product) => {
          if (!$scope.groupedProducts[product.tenMauSac]) {
            $scope.groupedProducts[product.tenMauSac] = [];
          }
          $scope.groupedProducts[product.tenMauSac].push(product);
        });
      });
    });
    console.log($scope.groupedProducts);
  };

  $scope.removeSize = function (index) {
    if (index !== -1) {
      // $scope.groupedProducts.remove(index, 1);
    }
  };

  $scope.saveProduct = function (event) {
    event.preventDefault();
    let productImages = document.getElementById("product-image");
    for (const file of productImages.files) {
      $scope.sizeAndColors.forEach((sizeAndColor) => {
        const newProductDetail = {
          maSanPham: $scope.product.maSanPham,
          tenSanPham: $scope.product.tenSanPham,
          moTa: $scope.product.moTa,
          idPhongCach: $scope.product.idPhongCach,
          idChatLieu: $scope.product.idChatLieu,
          idHoaTiet: $scope.product.idHoaTiet,
          idCoAo: $scope.product.idCoAo,
          idTayAo: $scope.product.idTayAo,
          tenKichThuoc: sizeAndColor.tenKichThuoc,
          tenMauSac: sizeAndColor.tenMauSac,
          soLuong: sizeAndColor.soLuong,
          giaBan: sizeAndColor.gia,
          urlImage: file.name, // Set the image name based on the selected file
          daXoa: $scope.product.daXoa,
        };

        let exists = false;
        for (let i = 0; i < $scope.productDetails.length; i++) {
          const existingItem = $scope.productDetails[i];

          if (angular.equals(existingItem, newProductDetail)) {
            exists = true;
            break;
          }
        }

        if (exists) {
          // Handle the case where the product detail already exists.
        } else {
          $scope.productDetails.push(newProductDetail);
        }
      });
    }

    console.log($scope.productDetails);

    $http
      .post(sanPhamChiTietAPI + "/add", $scope.productDetails)
      .then(function () {});
  };

  //load thuoc tinh theo trang thai kich hoat
  $scope.getChatLieuTrangThai = function () {
    $http.get(chatLieuAPI + "/trang-thai").then(function (response) {
      $scope.listChatLieuTrangThai = response.data;
    });
  };
  $scope.getChatLieuTrangThai();

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

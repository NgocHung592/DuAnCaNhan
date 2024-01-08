window.addSanPhamChiTietController = function (
  $http,
  $scope,
  $location,
  $rootScope
) {
  $scope.totalPages = [];
  $scope.products = [];
  $scope.productDetails = [];
  $scope.sizeAndQuantitys = [];
  $scope.colors = [];
  $scope.sizeAndColors = [];
  $scope.newSizeAndColors = [];
  $scope.selectedFiles = [];
  $scope.selectedMauSac = [];
  $scope.selectedKichThuoc = [];

  $scope.currentPage = 0;
  $scope.randoomSanPham = "SP" + Math.floor(Math.random() * 10000) + 1;
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
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
  $scope.getChatLieu = function (chatLieu) {
    $scope.product.idChatLieu = chatLieu.id;
    $scope.selectedChatLieu = chatLieu.ten;
  };
  $scope.getPhongCach = function (phongCach) {
    $scope.product.idPhongCach = phongCach.id;
    $scope.selectedPhongCach = phongCach.ten;
  };
  $scope.getHoaTiet = function (hoaTiet) {
    $scope.product.idHoaTiet = hoaTiet.id;
    $scope.selectedHoaTiet = hoaTiet.ten;
  };
  $scope.getCoAo = function (coAo) {
    $scope.product.idCoAo = coAo.id;
    $scope.selectedCoAo = coAo.ten;
  };
  $scope.getTayAo = function (tayAo) {
    $scope.product.idTayAo = tayAo.id;
    $scope.selectedTayAo = tayAo.ten;
  };
  $scope.getMauSac = function (tayAo) {
    $scope.product.idTayAo = tayAo.id;
    $scope.selectedTayAo = tayAo.ten;
  };
  $scope.displaySelectedMauSac = function (selectedMauSac) {
    if (selectedMauSac && selectedMauSac.length > 0) {
      return selectedMauSac.join(", ");
    } else {
      return "Chọn màu sắc";
    }
  };
  $scope.displaySelectedKichThuoc = function (selectedKichThuoc) {
    if (selectedKichThuoc && selectedKichThuoc.length > 0) {
      return selectedKichThuoc.join(", ");
    } else {
      return "Chọn kích thước";
    }
  };

  $scope.selectFile = function (tenMauSac, index) {
    var productImageInput = document.getElementById("product-image");

    // Tạo một hàm để giữ tham chiếu đến handleImageChange
    var handleImageChangeCallback = function (event) {
      $scope.handleImageChange(event, tenMauSac, index);
    };

    // Thêm người nghe sự kiện
    productImageInput.addEventListener("change", handleImageChangeCallback);

    // Gỡ bỏ người nghe sự kiện sau khi sự kiện đã xảy ra
    productImageInput.addEventListener(
      "change",
      function removeEventListenerCallback() {
        productImageInput.removeEventListener(
          "change",
          handleImageChangeCallback
        );
        productImageInput.removeEventListener(
          "change",
          removeEventListenerCallback
        );
      }
    );

    // Kích hoạt sự kiện click
    productImageInput.click();
  };

  $scope.handleImageChange = function (event, tenMauSac, index) {
    var file = event.target.files[0];

    if (file) {
      if (
        $scope.groupedProducts[tenMauSac] &&
        $scope.groupedProducts[tenMauSac].length > index
      ) {
        var products = $scope.groupedProducts[tenMauSac];
        console.log(products);
        products.forEach((product) => {
          var newProduct = angular.copy(product);
          newProduct.urlImage = file.name;
          $scope.newSizeAndColors.push(newProduct);
        });
        console.log($scope.newSizeAndColors);
      }
    }
  };

  $scope.addKichThuoc = function (index) {
    $scope.listKichThuocTrangThai[index].checked =
      !$scope.listKichThuocTrangThai[index].checked;

    const size = $scope.listKichThuocTrangThai[index].ten;

    const newSizeAndQuantity = {
      tenKichThuoc: size,
      soLuong: 10,
      gia: 100000,
      daXoa: false,
    };

    if ($scope.listKichThuocTrangThai[index].checked) {
      $scope.sizeAndQuantitys.push(angular.copy(newSizeAndQuantity));
      $scope.selectedKichThuoc.push(size);
    } else {
      const indexOfItemToRemove = $scope.sizeAndQuantitys.findIndex(
        (item) => item.tenKichThuoc === size
      );
      if (indexOfItemToRemove !== -1) {
        $scope.sizeAndQuantitys.splice(indexOfItemToRemove, 1);
        $scope.selectedKichThuoc.splice(indexOfItemToRemove, 1);

        $scope.sizeAndColors = $scope.sizeAndColors.filter(
          (item) => item.tenKichThuoc !== size
        );
      }
    }

    $scope.sizeAndQuantitys.forEach((size) => {
      $scope.colors.forEach((color) => {
        const newSizeAndColor = {
          tenKichThuoc: size.tenKichThuoc,
          tenMauSac: color.tenMauSac,
          maMau: color.maMau,
          soLuong: size.soLuong,
          gia: size.gia,
          urlImage: null,
        };

        const exists = $scope.sizeAndColors.some((existingItem) =>
          angular.equals(existingItem, newSizeAndColor)
        );
        if (!exists) {
          $scope.sizeAndColors.push(angular.copy(newSizeAndColor));
        }
      });
    });

    $scope.groupedProducts = $scope.sizeAndColors.reduce((acc, product) => {
      acc[product.tenMauSac] = acc[product.tenMauSac] || [];
      acc[product.tenMauSac].push(product);
      return acc;
    }, {});
    console.log($scope.groupedProducts);
  };
  $scope.addMauSac = function (index) {
    $scope.listMauSacTrangThai[index].checked =
      !$scope.listMauSacTrangThai[index].checked;

    const color = $scope.listMauSacTrangThai[index];
    const colorObject = {
      tenMauSac: color.ten,
      maMau: color.ma,
    };

    if ($scope.listMauSacTrangThai[index].checked) {
      $scope.colors.push(angular.copy(colorObject));
      $scope.selectedMauSac.push(color.ten);
    } else {
      // Xóa màu khỏi $scope.colors
      const indexOfItemToRemove = $scope.colors.findIndex(
        (item) => item.tenMauSac === color
      );
      if (indexOfItemToRemove !== -1) {
        $scope.colors.splice(indexOfItemToRemove, 1);
        $scope.selectedMauSac.splice(indexOfItemToRemove, 1);

        // Xóa sản phẩm liên quan từ $scope.sizeAndColors
        $scope.sizeAndColors = $scope.sizeAndColors.filter(
          (item) => item.tenMauSac !== color
        );

        // Xóa sản phẩm liên quan từ $scope.groupedProducts
        Object.keys($scope.groupedProducts).forEach((key) => {
          $scope.groupedProducts[key] = $scope.groupedProducts[key].filter(
            (item) => item.tenMauSac !== color
          );
        });
      }
    }
    // Cập nhật $scope.sizeAndColors dựa trên trạng thái hiện tại
    $scope.sizeAndQuantitys.forEach((size) => {
      $scope.colors.forEach((color) => {
        const newSizeAndColor = {
          tenKichThuoc: size.tenKichThuoc,
          tenMauSac: color.tenMauSac,
          maMau: color.maMau,
          soLuong: size.soLuong,
          gia: size.gia,
          urlImage: null,
        };

        const exists = $scope.sizeAndColors.some((existingItem) =>
          angular.equals(existingItem, newSizeAndColor)
        );

        if (!exists) {
          $scope.sizeAndColors.push(angular.copy(newSizeAndColor));
        }
      });
    });

    // Cập nhật $scope.groupedProducts dựa trên trạng thái hiện tại
    $scope.groupedProducts = $scope.sizeAndColors.reduce((acc, product) => {
      acc[product.tenMauSac] = acc[product.tenMauSac] || [];
      acc[product.tenMauSac].push(product);
      return acc;
    }, {});
  };

  $scope.renderMota = function () {
    if ($scope.product.tenSanPham) {
      $http
        .get(sanPhamAPI + "/find/" + $scope.product.tenSanPham)
        .then(function (response) {
          if (response?.data?.moTa) {
            $scope.product.moTa = response.data.moTa;
          } else {
            return;
          }
        });
    } else {
      $scope.product.moTa = null;
    }
  };
  $scope.addSizeAndColor = function () {};
  $scope.removeSize = function (tenMauSac, index) {
    if (
      $scope.groupedProducts[tenMauSac] &&
      $scope.groupedProducts[tenMauSac].length > index
    ) {
      $scope.groupedProducts[tenMauSac].splice(index, 1);
    }

    if ($scope.groupedProducts[tenMauSac].length <= 0) {
      $scope.sizeAndColors.length = 0;
    }
  };
  $scope.addSanPhamChiTiet = function (event) {
    event.preventDefault();
    $scope.newSizeAndColors.forEach((sizeAndColor) => {
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
        donGia: sizeAndColor.gia,
        urlImage: sizeAndColor.urlImage,
        ngayTao: new Date(),
        daXoa: $scope.product.daXoa,
      };
      $scope.productDetails.push(newProductDetail);
    });
    console.log($scope.productDetails);
    if ($scope.product.tenSanPham == "") {
      toastBootstrap.show();
      $scope.message = "Tên sản phẩm không được trống";
      $scope.errorProgress();
      $scope.showError = false;
      return;
    } else if ($scope.product.moTa == "") {
      toastBootstrap.show();
      $scope.message = "Mô tả không được trống";
      $scope.errorProgress();
      $scope.showError = false;
      return;
    } else if ($scope.product.idChatLieu == "") {
      toastBootstrap.show();
      $scope.message = "Hãy chọn chất liệu";
      $scope.errorProgress();
      $scope.showError = false;
      return;
    } else if ($scope.product.idPhongCach == "") {
      toastBootstrap.show();
      $scope.message = "Hãy chọn phong cách";
      $scope.errorProgress();
      $scope.showError = false;
      return;
    } else if ($scope.product.idHoaTiet == "") {
      toastBootstrap.show();
      $scope.message = "Hãy chọn họa tiết";
      $scope.errorProgress();
      $scope.showError = false;
      return;
    } else if ($scope.product.idCoAo == "") {
      toastBootstrap.show();
      $scope.message = "Hãy chọn cổ áo";
      $scope.errorProgress();
      $scope.showError = false;
      return;
    } else if ($scope.product.idTayAo == "") {
      toastBootstrap.show();
      $scope.message = "Hãy chọn tay áo";
      $scope.errorProgress();
      $scope.showError = false;
      return;
    } else if ($scope.sizeAndColors.length === 0) {
      toastBootstrap.show();
      $scope.message = "Hãy chọn kích thước và màu sắc";
      $scope.errorProgress();
      $scope.showError = false;
      return;
    } else if ($scope.newSizeAndColors.length === 0) {
      toastBootstrap.show();
      $scope.message = "Hãy chọn ảnh";
      $scope.errorProgress();
      $scope.showError = false;
      return;
    } else {
      $http
        .post(sanPhamChiTietAPI + "/add", $scope.productDetails)
        .then(function () {
          $rootScope.message = "Thêm thành công";
          $rootScope.showError = true;
          $location.path("/san-pham/hien-thi");
        });
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
  $scope.randoomCL = "CL" + Math.floor(Math.random() * 10000) + 1;

  $scope.formChatLieu = {
    ma: $scope.randoomCL,
    ten: "",
    ngayTao: new Date(),
    daXoa: false,
  };
  $scope.addChatLieu = function () {
    if ($scope.formChatLieu.ten === "") {
      toastBootstrap.show();
      $scope.message = "Tên chất liệu không được trống";
      $scope.errorProgress();
      $scope.showError = false;
    } else {
      $http.post(chatLieuAPI + "/add", $scope.formChatLieu).then(function () {
        $scope.formChatLieu = null;
        $scope.getChatLieuTrangThai();
      });
    }
  };

  $scope.randoomPC = "PC" + Math.floor(Math.random() * 10000) + 1;

  $scope.formPhongCach = {
    ma: $scope.randoomPC,
    ten: "",
    ngayTao: new Date(),
    daXoa: false,
  };
  $scope.addPhongCach = function () {
    if ($scope.formPhongCach.ten === "") {
      toastBootstrap.show();
      $scope.message = "Tên phong cách không được trống";
      $scope.errorProgress();
      $scope.showError = false;
    } else {
      $http.post(phongCachAPI + "/add", $scope.formPhongCach).then(function () {
        $scope.getPhongCachTrangThai();
        $scope.formPhongCach = null;
      });
    }
  };
  $scope.randoomHT = "HT" + Math.floor(Math.random() * 10000) + 1;

  $scope.formHoaTiet = {
    ma: $scope.randoomHT,
    ten: "",
    ngayTao: new Date(),
    daXoa: false,
  };
  $scope.addHoaTiet = function () {
    if ($scope.formHoaTiet.ten === "") {
      toastBootstrap.show();
      $scope.message = "Tên họa tiết không được trống";
      $scope.errorProgress();
      $scope.showError = false;
    } else {
      $http.post(hoaTietAPI + "/add", $scope.formHoaTiet).then(function () {
        $scope.getHoaTietTrangThai();
        $scope.formHoaTiet = null;
      });
    }
  };
  $scope.randoomCA = "CA" + Math.floor(Math.random() * 10000) + 1;

  $scope.formCoAo = {
    ma: $scope.randoomCA,
    ten: "",
    ngayTao: new Date(),
    daXoa: false,
  };
  $scope.addCoAo = function () {
    if ($scope.formCoAo.ten === "") {
      toastBootstrap.show();
      $scope.message = "Tên cổ áo không được trống";
      $scope.errorProgress();
      $scope.showError = false;
    } else {
      $http.post(coAoAPI + "/add", $scope.formCoAo).then(function () {
        $scope.getCoAoTrangThai();
        $scope.formCoAo = null;
      });
    }
  };
  $scope.randoomTA = "TA" + Math.floor(Math.random() * 10000) + 1;

  $scope.formTayAo = {
    ma: $scope.randoomTA,
    ten: "",
    ngayTao: new Date(),
    daXoa: false,
  };
  $scope.addTayAo = function () {
    if ($scope.formTayAo.ten === "") {
      toastBootstrap.show();
      $scope.message = "Tên tay áo không được trống";
      $scope.errorProgress();
      $scope.showError = false;
    } else {
      $http.post(tayAoAPI + "/add", $scope.formTayAo).then(function () {
        $scope.getTayAoTrangThai();
        $scope.formTayAo = null;
      });
    }
  };
  $scope.randoomKT = "KT" + Math.floor(Math.random() * 10000) + 1;

  $scope.formKichThuoc = {
    ma: $scope.randoomKT,
    ten: "",
    ngayTao: new Date(),
    daXoa: false,
  };
  $scope.addNewKichThuoc = function () {
    if ($scope.formKichThuoc.ten === "") {
      toastBootstrap.show();
      $scope.message = "Tên kích thước không được trống";
      $scope.errorProgress();
      $scope.showError = false;
    } else {
      $http.post(kichThuocAPI + "/add", $scope.formKichThuoc).then(function () {
        $scope.getKichThuocTrangThai();
        $scope.formKichThuoc = null;
      });
    }
  };
  $scope.formMauSac = {
    ma: "",
    ten: "",
    ngayTao: new Date(),
    daXoa: false,
  };
  $scope.addNewMauSac = function () {
    let colorStr = document.getElementById("color").value;
    let color = colorStr.slice(1, 7);
    if ($scope.formMauSac.ma === "") {
      toastBootstrap.show();
      $scope.message = "Mã màu không được trống";
      $scope.errorProgress();
      $scope.showError = false;
    } else {
      $http.get(api_url + "/id?hex=" + color).then(function (response) {
        $scope.formMauSac.ten = response.data.name.value;
        $http.post(mauSacAPI + "/add", $scope.formMauSac).then(function () {
          $scope.getMauSacTrangThai();
          $scope.formMauSac = null;
        });
      });
    }
  };
};

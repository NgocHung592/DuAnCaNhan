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
  $scope.sizes = [];
  $scope.sizeAndColors = [];
  $scope.newSizeAndColors = [];
  $scope.selectedFiles = [];
  $scope.selectedMauSac = [];
  $scope.selectedKichThuoc = [];
  $scope.groupedProducts = {};
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
      const indexOfItemToRemove = $scope.colors.findIndex(
        (item) => item.tenMauSac === color
      );
      console.log(indexOfItemToRemove);
      if (indexOfItemToRemove === -1) {
        $scope.colors.splice(indexOfItemToRemove, 1);
        $scope.selectedMauSac.splice(indexOfItemToRemove, 1);

        $scope.sizeAndColors = $scope.sizeAndColors.filter(
          (item) => item.tenMauSac !== color
        );

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
  function showError(message) {
    $scope.errorProgress();
    $scope.message = message;
    toastBootstrap.show();
    $scope.showError = false;
  }
  function showSuccess(message) {
    $scope.successProgress();
    $scope.message = message;
    toastBootstrap.show();
    $scope.showError = true;
  }
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

  //add chất liệu
  $scope.formChatLieu = {
    ten: "",
  };
  $scope.addChatLieu = function () {
    let isDuplicate = false;
    $scope.randoomCL = "CL" + Math.floor(Math.random() * 10000) + 1;
    $scope.chatLieuSave = {
      ma: $scope.randoomCL,
      ten: $scope.formChatLieu.ten,
      ngayTao: new Date(),
      daXoa: false,
    };
    if ($scope.formChatLieu.ten === "") {
      showError("Tên chất liệu không được trống");
    } else {
      $http.get(chatLieuAPI + "/get-all").then(function (response) {
        $scope.listChatLieu = response?.data;
        $scope.listChatLieu.forEach((chatLieu) => {
          if (chatLieu.ten === $scope.formChatLieu.ten) {
            isDuplicate = true;
            showError("Tên chất liệu không được trùng");
          }
        });
        if (!isDuplicate) {
          $http
            .post(chatLieuAPI + "/add", $scope.chatLieuSave)
            .then(function () {
              $scope.formChatLieu = null;
              showSuccess("Thêm chất liệu mới thành công");
              $scope.getChatLieuTrangThai();
            });
        }
      });
    }
  };

  // add phong cách
  $scope.formPhongCach = {
    ten: "",
  };
  $scope.addPhongCach = function () {
    let isDuplicate = false;
    $scope.randoomPC = "PC" + Math.floor(Math.random() * 10000) + 1;
    $scope.phongCachSave = {
      ma: $scope.randoomPC,
      ten: $scope.formPhongCach.ten,
      ngayTao: new Date(),
      daXoa: false,
    };
    if ($scope.formPhongCach.ten === "") {
      showError("Tên phong cách không được trống");
    } else {
      $http.get(phongCachAPI + "/get-all").then(function (response) {
        $scope.listPhongCach = response?.data;
        $scope.listPhongCach.forEach((phongCach) => {
          if (phongCach.ten === $scope.formPhongCach.ten) {
            isDuplicate = true;
            showError("Tên phong cách không được trùng");
          }
        });
        if (!isDuplicate) {
          $http
            .post(phongCachAPI + "/add", $scope.phongCachSave)
            .then(function () {
              $scope.getPhongCachTrangThai();
              $scope.formPhongCach = null;
              showSuccess("Thêm phong cách mới thành công");
            });
        }
      });
    }
  };
  // add họa tiết
  $scope.formHoaTiet = {
    ten: "",
  };
  $scope.addHoaTiet = function () {
    let isDuplicate = false;
    $scope.randoomHT = "HT" + Math.floor(Math.random() * 10000) + 1;
    $scope.hoaTietSave = {
      ma: $scope.randoomHT,
      ten: $scope.formHoaTiet.ten,
      ngayTao: new Date(),
      daXoa: false,
    };
    if ($scope.formHoaTiet.ten === "") {
      showError("Tên họa tiết không được trống");
    } else {
      $http.get(hoaTietAPI + "/get-all").then(function (response) {
        $scope.listHoaTiet = response?.data;
        $scope.listHoaTiet.forEach((hoaTiet) => {
          if (hoaTiet.ten === $scope.formHoaTiet.ten) {
            isDuplicate = true;
            showError("Tên họa tiết không được trùng");
          }
        });
        if (!isDuplicate) {
          $http.post(hoaTietAPI + "/add", $scope.hoaTietSave).then(function () {
            $scope.getHoaTietTrangThai();
            $scope.formHoaTiet = null;
            showSuccess("Thêm họa tiết mới thành công");
          });
        }
      });
    }
  };

  $scope.formCoAo = {
    ten: "",
  };
  $scope.addCoAo = function () {
    let isDuplicate = false;
    $scope.random = "CA" + Math.floor(Math.random() * 10000) + 1;
    $scope.coAoSave = {
      ma: $scope.random,
      ten: $scope.formCoAo.ten,
      ngayTao: new Date(),
      daXoa: false,
    };
    if ($scope.formCoAo.ten === "") {
      showError("Tên cổ áo không được trống");
    } else {
      $http.get(coAoAPI + "/get-all").then(function (response) {
        $scope.listCoAo = response?.data;
        $scope.listCoAo.forEach((coAo) => {
          if (coAo.ten === $scope.formCoAo.ten) {
            isDuplicate = true;
            showError("Tên cổ áo không được trùng");
          }
        });
        if (!isDuplicate) {
          $http.post(coAoAPI + "/add", $scope.formCoAo).then(function () {
            $http.post(coAoAPI + "/add", $scope.coAoSave).then(function () {
              $scope.getCoAoTrangThai();
              $scope.formCoAo = null;
              showSuccess("Thêm cổ áo mới thành công");
            });
          });
        }
      });
    }
  };

  $scope.formTayAo = {
    ten: "",
  };
  $scope.addTayAo = function () {
    let isDuplicate = false;
    $scope.randoomTA = "TA" + Math.floor(Math.random() * 10000) + 1;

    $scope.tayAoSave = {
      ma: $scope.randoomTA,
      ten: $scope.formTayAo.ten,
      ngayTao: new Date(),
      daXoa: false,
    };
    if ($scope.formTayAo.ten === "") {
      showError("Tên tay áo không được trống");
    } else {
      $http.get(tayAoAPI + "/get-all").then(function (response) {
        $scope.listTayAo = response?.data;
        $scope.listTayAo.forEach((tayAo) => {
          if (tayAo.ten === $scope.formTayAo.ten) {
            showError("Tên tay áo không được trùng");
            isDuplicate = true;
          }
        });
        if (!isDuplicate) {
          $http.post(tayAoAPI + "/add", $scope.tayAoSave).then(function () {
            $scope.getTayAoTrangThai();
            $scope.formTayAo = null;
            showSuccess("Thêm tay áo mới thành công");
          });
        }
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
    $scope.randoomKT = "KT" + Math.floor(Math.random() * 10000) + 1;
    let isDuplicate = false;
    $scope.kichThuocSave = {
      ma: $scope.randoomKT,
      ten: $scope.formKichThuoc.ten,
      ngayTao: new Date(),
      daXoa: false,
    };
    if ($scope.formKichThuoc.ten === "") {
      showError("Tên kích thước không được trống");
    } else {
      $http.get(kichThuocAPI + "/get-all").then(function (reponse) {
        $scope.listKichThuoc = reponse?.data;
        $scope.listKichThuoc.forEach((kichThuoc) => {
          if (kichThuoc.ten === $scope.formKichThuoc.ten) {
            isDuplicate = true;
            showError("Tên kích thước không được trùng");
          }
        });
        if (!isDuplicate) {
          $http
            .post(kichThuocAPI + "/add", $scope.kichThuocSave)
            .then(function () {
              $scope.selectedKichThuoc = null;
              $scope.getKichThuocTrangThai();
              $scope.formKichThuoc = null;
              $scope.groupedProducts = null;
              showSuccess("Thêm kích thước mới thành công");
            });
        }
      });
    }
  };
  $scope.formMauSac = {
    ma: "",
    ten: "",
    ngayTao: new Date(),
    daXoa: false,
  };
  function callColorApi(color) {
    return $http.get(api_url + "/id?hex=" + color).then(function (response) {
      return response.data.name.value;
    });
  }
  $scope.addNewMauSac = function () {
    let colorStr = document.getElementById("color").value;
    let color = colorStr.slice(1, 7);
    if ($scope.formMauSac.ma === "") {
      showError("Mã màu sắc không được trống");
    }
    callColorApi(color).then(function (tenMauSac) {
      $scope.formMauSac.ten = tenMauSac;
      $http.get(mauSacAPI + "/get-all").then(function (response) {
        $scope.listMauSac = response?.data;
        let isDuplicate = $scope.listMauSac.some(
          (mauSac) => mauSac.ten === tenMauSac
        );
        if (isDuplicate) {
          showError("Mã màu không được trùng");
        } else {
          $http.post(mauSacAPI + "/add", $scope.formMauSac).then(function () {
            $scope.selectedMauSac = null;
            $scope.getMauSacTrangThai();
            $scope.formMauSac = null;
            $scope.groupedProducts = null;
            showSuccess("Thêm màu sắc mới thành công");
          });
        }
      });
    });
  };
};

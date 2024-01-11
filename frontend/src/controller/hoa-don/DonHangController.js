window.DonHangController = function (
  $http,
  $scope,
  $routeParams,
  $httpParamSerializerJQLike,
  $timeout,
  $window
) {
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  $scope.listHoaDon = [];
  $scope.listLichSuHoaDon = [];
  $scope.sizes = [];
  $scope.colors = [];
  $scope.currentPage = 0;
  $scope.totalPages = [];
  $scope.visiblePages = [];
  $scope.maxVisiblePages = 3;
  $scope.totalPages = [];
  $scope.listSanPhamChiTiet = [];
  $scope.listHoaDonChiTiet = [];
  $scope.totalPagesHDCT = [];
  $scope.currentPageHDCT = 0;
  $scope.customIndexHDCT = 0;
  $scope.customIndex = 0;
  $scope.tienHang = 0;
  $scope.detailHoaDon = {
    id: "",
    ma: "",
    tenKhachHang: "",
    ngayDatHang: "",
    loaiHoaDon: "",
    trangThai: Number,
  };
  $scope.formHoaDonChiTiet = {
    idHoaDon: "",
    idSanPhamChiTiet: "",
    soLuong: 1,
    donGia: "",
    thanhTien: "",
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
  function showError(message) {
    $scope.errorProgress();
    $scope.message = message;
    toastBootstrap.show();
    $scope.showError = true;
  }
  function showSuccess(message) {
    $scope.successProgress();
    $scope.message = message;
    toastBootstrap.show();
    $scope.showError = false;
  }
  $scope.getVisiblePages = function () {
    var totalPages = $scope.totalPages.length;

    var range = $scope.maxVisiblePages;
    var curPage = $scope.currentPage;

    var numberTruncateLeft = curPage - Math.floor(range / 2);
    var numberTruncateRight = curPage + Math.floor(range / 2);

    var visiblePages = [];

    for (var pos = 1; pos <= totalPages; pos++) {
      var active = pos - 1 === curPage ? "active" : "";

      if (totalPages >= 2 * range - 1) {
        if (pos >= numberTruncateLeft && pos <= numberTruncateRight) {
          visiblePages.push({
            page: pos,
            active: active,
          });
        }
      } else {
        visiblePages.push({
          page: pos,
          active: active,
        });
      }
    }
    return visiblePages;
  };
  $scope.getData = function () {
    $http.get(hoaDonAPI + "/hien-thi").then(function (response) {
      $scope.listHoaDon = response?.data.content;
      $scope.customIndex = $scope.currentPage * response.data.size;
      $scope.totalPages = new Array(response.data.totalPages);
      $scope.visiblePages = $scope.getVisiblePages();
    });
  };
  //detai hoa don
  $scope.getData();
  $http.get(hoaDonAPI + "/detail/" + $routeParams.id).then(function (response) {
    if (response.status == 200) {
      $scope.detailHoaDon = response.data;
      $scope.vai = $scope.detailHoaDon.khachHang.id;
      console.log($scope.vai);
    }
  });
  $scope.getHoaDonChiTiet = function () {
    $http
      .get(
        hoaDonChiTietAPI +
          "/detail/" +
          $routeParams.id +
          "?pageNo=" +
          $scope.currentPageHDCT
      )
      .then(function (response) {
        $scope.listHoaDonChiTiet = response?.data.content;
        console.log($scope.listHoaDonChiTiet);
        $scope.customIndexHDCT = $scope.currentPageHDCT * response.data.size;
        $scope.totalPagesHDCT = new Array(response.data.totalPages);
        $scope.visiblePages = $scope.getVisiblePages();
        $scope.tienHang = $scope.calculateTotal();
        $scope.tongTien = $scope.calculateTotal();
      });
  };
  $scope.getHoaDonChiTiet();
  //update hoa don
  $scope.changePage = function (index) {
    if (index >= 0 && index < $scope.totalPages.length) {
      $scope.currentPage = index;
      if ($scope.selectOption !== undefined) {
        $scope.loc();
        return;
      }
      if ($scope.searchKeyword !== undefined) {
        $scope.search();
        return;
      }
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
    if ($scope.currentPageHDCT < length - 1) {
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
  $scope.getSanPhamChiTiet = function () {
    $http
      .get(sanPhamChiTietAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listSanPhamChiTiet = response?.data.content;
        console.log($scope.listSanPhamChiTiet);
        $scope.customIndex = $scope.currentPage * response.data.size;
        $scope.totalPages = new Array(response.data.totalPages);
        $scope.visiblePages = $scope.getVisiblePages();
      });
  };
  $scope.getSanPhamChiTiet();
  $scope.addSanPhamChiTiet = function (idSanPhamChiTiet, index) {
    var matchingItem = $scope.listHoaDonChiTiet.find(
      (item) => item.idSanPhamChiTiet === idSanPhamChiTiet
    );
    $scope.formHoaDonChiTiet = {
      idHoaDon: $routeParams.id,
      idSanPhamChiTiet: idSanPhamChiTiet,
      donGia: $scope.listSanPhamChiTiet[index].donGia,
      thanhTien: $scope.listSanPhamChiTiet[index].donGia,
      soLuong: 1,
    };
    console.log($scope.formHoaDonChiTiet);
    detailChiTietSanPham(idSanPhamChiTiet).then(function (
      detailSanPhamChiTiet
    ) {
      if (matchingItem) {
        matchingItem.soLuong += 1;
        if (matchingItem.soLuong <= detailSanPhamChiTiet.soLuong) {
          $scope.hoaDonUpdate = {
            soLuong: matchingItem.soLuong,
            thanhTien: matchingItem.soLuong * detailSanPhamChiTiet.donGia,
          };
          $http
            .put(
              hoaDonChiTietAPI + "/update/" + matchingItem.idHoaDonChiTiet,
              $scope.hoaDonUpdate
            )
            .then(function () {
              $scope.getHoaDonChiTiet();
              $scope.tienHang = $scope.calculateTotal();
              $scope.tongTien = $scope.calculateTotal();
              showSuccess("Cập nhật thành công");
            });
        } else {
          showError(
            "Chỉ còn " +
              detailSanPhamChiTiet.soLuong +
              " sản phẩm trong cửa hàng"
          );
        }
      } else {
        $http
          .post(hoaDonChiTietAPI + "/add", $scope.formHoaDonChiTiet)
          .then(function () {
            $scope.getHoaDonChiTiet();
            $scope.tienHang = $scope.calculateTotal();
            $scope.tongTien = $scope.calculateTotal();
            showSuccess("Thêm sản phẩm mới thành công");
          });
      }
    });
  };
  $scope.calculateTotal = function () {
    return $scope.listHoaDonChiTiet
      .filter((item) => item.maHoaDon === $scope.detailHoaDon.ma)
      .reduce((total, item) => total + item.thanhTien, 0);
  };
  $scope.changeSoLuong = function (idSanPhamChiTiet) {
    var matchingItem = $scope.listHoaDonChiTiet.find(
      (item) => item.idSanPhamChiTiet === idSanPhamChiTiet
    );
    detailChiTietSanPham(idSanPhamChiTiet).then(function (
      detailSanPhamChiTiet
    ) {
      if (matchingItem.soLuong === null || matchingItem.soLuong === undefined) {
        showError("Số lượng không được nhỏ hơn 0");
      } else if (matchingItem.soLuong <= detailSanPhamChiTiet.soLuong) {
        $scope.hoaDonUpdate = {
          soLuong: matchingItem.soLuong,
          thanhTien: matchingItem.soLuong * matchingItem.donGia,
        };

        $http
          .put(
            hoaDonChiTietAPI + "/update/" + matchingItem.idHoaDonChiTiet,
            $scope.hoaDonUpdate
          )
          .then(function () {
            $scope.getHoaDonChiTiet();
            $scope.tienHang = $scope.calculateTotal();
            $scope.tongTien = $scope.calculateTotal();
            showSuccess("Cập nhật thành công");
          });
      } else {
        showError(
          "Chỉ còn " + detailSanPhamChiTiet.soLuong + " sản phẩm trong cửa hàng"
        );
      }
    });
  };
  $scope.xoaSanPhamGioHang = function (id) {
    $http.delete(hoaDonChiTietAPI + "/delete/" + id).then(function () {
      showError("Xóa thành công ");
      $scope.getHoaDonChiTiet();
    });
  };
  function detailChiTietSanPham(idSanPhamChiTiet) {
    return $http
      .get(sanPhamChiTietAPI + "/detail/" + idSanPhamChiTiet)
      .then(function (response) {
        return response?.data;
      })
      .catch(function (error) {
        console.error("Error fetching product details:", error);
        throw error; // Chuyển tiếp lỗi để xử lý ở nơi gọi
      });
  }
  $scope.getMauSac = function () {
    $http.get(mauSacAPI + "/get-all").then(function (response) {
      $scope.listMauSac = response?.data;
    });
  };

  $scope.getMauSac();
  $scope.getKichThuoc = function () {
    $http.get(kichThuocAPI + "/get-all").then(function (response) {
      $scope.listKichThuoc = response?.data;
    });
  };

  $scope.getKichThuoc();
  function callSearchAPI() {
    var params = {
      pageNo: $scope.currentPage,
      key: $scope.searchKeyword,
    };

    if ($scope.colors) {
      params.mauSacIds = $scope.colors;
    }

    if ($scope.sizes) {
      params.kichThuocIds = $scope.sizes;
    }
    console.log(params);
    $http
      .get(sanPhamChiTietAPI + "/search", { params: params })
      .then(function (response) {
        $scope.listSanPhamChiTiet = response?.data.content;
        console.log($scope.listSanPhamChiTiet);
        $scope.customIndex = $scope.currentPage * response.data.size;
        $scope.totalPages = new Array(response.data.totalPages);
        $scope.visiblePages = $scope.getVisiblePages();
      });
  }

  $scope.search = function () {
    callSearchAPI();
  };
  $scope.locSanPhamTheoKichThuoc = function (index) {
    $scope.listKichThuoc[index].checked = !$scope.listKichThuoc[index].checked;
    const size = $scope.listKichThuoc[index];

    if ($scope.listKichThuoc[index].checked) {
      $scope.sizes.push(angular.copy(size.id));
    } else {
      const indexOfItemToRemove = $scope.sizes.findIndex(
        (item) => item.id === size.id
      );
      if (indexOfItemToRemove === -1) {
        $scope.sizes.splice(indexOfItemToRemove, 1);
      }
    }
    callSearchAPI();
  };
  $scope.locSanPhamTheoMau = function (index) {
    $scope.listMauSac[index].checked = !$scope.listMauSac[index].checked;
    const color = $scope.listMauSac[index];

    if ($scope.listMauSac[index].checked) {
      $scope.colors.push(angular.copy(color.id));
    } else {
      const indexOfItemToRemove = $scope.colors.findIndex(
        (item) => item.id === color.id
      );
      if (indexOfItemToRemove === -1) {
        $scope.colors.splice(indexOfItemToRemove, 1);
      }
    }
    callSearchAPI();
  };
  $scope.update = function (id) {
    $http
      .put(hoaDonAPI + "/update/" + id, $scope.formHoaDon)
      .then(function (response) {
        $http.get(hoaDonAPI + "/hien-thi").then(function (response) {
          $scope.listHoaDon = response.data;

          alert(response.data);
        });
      });
  };
  $scope.daXacNhan = function (detailHoaDon) {
    $scope.hoaDonId = $routeParams.id;

    console.log("Id hoadon", $scope.hoaDonId);
    console.log("Id hoadon", $scope.vai);

    var data = $httpParamSerializerJQLike({
      idKhachHang: $scope.vai,
      idDonHang: $scope.hoaDonId,
    });

    var config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    };

    $http
      .post(hoaDonAPI + "/da-xac-nhan", data, config)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function () {
        $timeout(function () {
          $window.location.reload();
        }, 0);
      });
  };
  $scope.xacNhanDonHang = function (detailHoaDon) {
    $scope.hoaDonId = $routeParams.id;

    console.log("Id hoadon", $scope.hoaDonId);
    console.log("Id hoadon", $scope.vai);

    var data = $httpParamSerializerJQLike({
      idKhachHang: $scope.vai,
      idDonHang: $scope.hoaDonId,
    });

    var config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    };

    $http
      .post(hoaDonAPI + "/xac-nhan-don-hang", data, config)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function () {
        $timeout(function () {
          $window.location.reload();
        }, 0);
      });
  };
};

window.hienThiHoaDonController = function (
  $http,
  $scope,
  $location,
  $rootScope
) {
  $scope.listHoaDon = [];
  $scope.listLichSuHoaDon = [];
  $scope.filteredHoaDonList = [];
  $scope.currentPage = 0;
  $scope.totalPages = [];
  $scope.visiblePages = [];
  $scope.maxVisiblePages = 3;

  $scope.getData = function () {
    $http
      .get(hoaDonAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listHoaDon = response?.data.content;
        console.log($scope.listHoaDon);
        $scope.customIndex = $scope.currentPage * response.data.size;
        $scope.totalPages = new Array(response.data.totalPages);
        $scope.currentPage = Math.min(
          $scope.currentPage,
          response.data.totalPages
        );

        $scope.visiblePages = $scope.getVisiblePages();
      });
  };
  $scope.getData();
  $scope.selectTab = function (tab) {
    $scope.selectedTab = tab;
    $scope.filterDataByTab(tab);
  };

  $scope.filterDataByTab = function (tab) {
    if (tab === null) {
      $http
        .get(hoaDonAPI + "/hien-thi?pageNo=" + $scope.currentPage)
        .then(function (response) {
          $scope.listHoaDon = response?.data.content;
          $scope.customIndex = $scope.currentPage * response.data.size;
          $scope.totalPages = new Array(response.data.totalPages);
          $scope.visiblePages = $scope.getVisiblePages();
        });
    } else {
      $http
        .get(
          hoaDonAPI + "/loc?pageNo=" + $scope.currentPage + "&trangThai=" + tab
        )
        .then(function (response) {
          $scope.listHoaDon = response?.data.content;
          $scope.customIndex = $scope.currentPage * response.data.size;
          $scope.totalPages = new Array(response.data.totalPages);
          $scope.visiblePages = $scope.getVisiblePages();
        });
    }
  };
  $scope.isSelectedTab = function (tab) {
    return tab === $scope.selectedTab;
  };
  $scope.selectTab(null);

  $scope.detail = function (id) {
    $http.get(hoaDonAPI + "/detail/" + id).then(function (response) {
      if (response.status == 200) {
        $scope.formHoaDon = response.data;
      }
    });
  };
  $scope.changePage = function (index) {
    if (index >= 0) {
      $scope.currentPage = index;
      $scope.getData();
    }
  };

  $scope.nextPage = function () {
    let length = $scope.totalPages.length;
    if ($scope.currentPage < length - 1) {
      $scope.currentPage++;
      $scope.getData();
    }
  };

  $scope.previousPage = function () {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
      $scope.getData();
    }
  };

  // $scope.add = function () {
  //   $http.post(hoaDonAPI + "/add", $scope.formHoaDon).then(function (response) {
  //     $http.get(hoaDonAPI + "/hien-thi").then(function (response) {
  //       $scope.listHoaDon = response.data;
  //     });
  //   });
  // };

  $scope.update = function (id) {
    $http
      .put(hoaDonAPI + "/update/" + id, $scope.formHoaDon)
      .then(function (response) {
        $http.get(hoaDonAPI + "/hien-thi").then(function (response) {
          $scope.listHoaDon = response.data;
        });
      });
  };
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

  $scope.getDonHangKhachHang = function () {
    $scope.mergeDuplicateOrders = function (donHangList) {
      var mergedOrders = {}; // Đối tượng để gộp các đơn hàng
      var allOrders = []; // Mảng để hiển thị tất cả các đơn hàng

      for (var i = 0; i < donHangList.length; i++) {
        var donHang = donHangList[i];

        if (mergedOrders[donHang.hoaDonId]) {
          // Nếu đơn hàng đã tồn tại, cập nhật trạng thái và tổng tiền
          mergedOrders[donHang.hoaDonId].trangThai = donHang.trangThai; // Gộp trangThai
          mergedOrders[donHang.hoaDonId].tongTien = donHang.tongTien; // Gộp tổng tiền
          // Gộp sản phẩm vào danh sách sản phẩm của đơn hàng đã gộp
          mergedOrders[donHang.hoaDonId].products.push(donHang);
        } else {
          // Nếu đơn hàng chưa tồn tại, tạo một bản sao và thêm vào đối tượng đã gộp
          mergedOrders[donHang.hoaDonId] = {
            hoaDonId: donHang.hoaDonId,
            trangThai: donHang.trangThai,
            tongTien: donHang.tongTien,
            products: [donHang], // Tạo một mảng chứa sản phẩm của đơn hàng mới
          };
        }

        // Thêm đơn hàng vào mảng hiển thị tất cả các đơn hàng
        allOrders.push(donHang);
      }

      // Chuyển đối tượng gộp thành một mảng để hiển thị trong HTML
      $scope.donHangListMerged = Object.values(mergedOrders);
      $scope.allOrders = allOrders;
    };

    // Gọi hàm gộp khi nhận được dữ liệu đơn hàng
    if (!$rootScope.idKhachHang) {
      console.error("idKhachHang is not set in $rootScope.");
      return;
    }

    $scope.idKhachHang = $rootScope.idKhachHang;
    console.log("id khach hang:", $rootScope.idKhachHang);
    $http
      .get(hoaDonAPI + "/hien-thiKh/" + $scope.idKhachHang)
      .then(function (response) {
        $scope.donHangList = response.data;
        $scope.mergeDuplicateOrders(response.data);
      })
      .catch(function (error) {
        console.error("", error);
      });
    $scope.statusMapping = {
      0: "Đơn hàng đang chờ xác nhận",
      1: "Đơn hàng đã xác nhận thành công",
      2: "Đơn hàng đang giao hàng",
      3: "Đơn hàng đã giao thành công",
      4: "Đơn hàng giao không thành công",
      5: "Đơn hàng đã hủy",
      // Thêm các ánh xạ khác nếu cần
    };

    $scope.getStatusColor = function (trangThai) {
      if (trangThai == 0) {
        return "color-cho-xac-nhan";
      } else if (trangThai == 1) {
        return "color-da-xac-nhan";
      } else if (trangThai == 2) {
        return "color-dang-giao-hang";
      } else if (trangThai == 3) {
        return "color-da-giao-thanh-cong";
      } else if (trangThai == 4) {
        return "color-giao-khong-thanh-cong";
      } else if (trangThai == 5) {
        return "color-da-huy";
      } else {
        return ""; // Nếu không phù hợp với bất kỳ trạng thái nào khác
      }
    };
  };
};

window.hienThiNhanVienController = function ($http, $scope) {
  $scope.list_nv = [];
  $scope.searchKeyword = "";
  $scope.selectedOption = "";
  $scope.currentPage = 0;
  $scope.totalPages = [];
  $scope.getNhanVien = function () {
    $http
      .get(nhanVienAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.list_nv = response.data;
        $scope.totalPages = new Array(response.data.totalPages);
      });
  };
  $scope.getNhanVien();
  $scope.changePage = function (index) {
    if (index >= 0) {
      $scope.currentPage = index;
      $scope.getNhanVien();
    }
  };
  $scope.nextPage = function (index) {
    $scope.currentPage = index++;
  };

  $scope.previousPage = function () {
    if ($scope.currentPage > 1) {
      $scope.currentPage--;
    }
  };
  $scope.$watch("searchKeyword", function (newVal, oldVal) {
    if (newVal !== oldVal) {
      $http
        .get(nhanVienAPI + "/search?search=" + $scope.searchKeyword)
        .then(function (response) {
          $scope.list_nv = response.data;
          console.log("thanh cong", response.data);
        });
    }
  });
  $scope.searchTT = function () {
    $http
      .get(nhanVienAPI + "/hien-thiTT?search=" + $scope.selectedOption)
      .then(function (response) {
        $scope.list_nv = response.data;
      });
  };

  // $scope.getNhanVienTT1 = function () {
  //   $http
  //     .get(nhanVienAPI + "/hien-thiT?pageNo=" + $scope.currentPage)
  //     .then(function (response) {
  //       $scope.list_nv = response.data;
  //       $scope.totalPages = new Array(response.data.totalPages);
  //     });
  // };
  // $scope.getNhanVienTT1();
  // $scope.changePage = function (index) {
  //   if (index >= 0) {
  //     $scope.currentPage = index;
  //     $scope.getNhanVienTT1();
  //   }
  // };
  // $scope.nextPage = function (index) {
  //   $scope.currentPage = index++;
  // };

  // $scope.previousPage = function () {
  //   if ($scope.currentPage > 1) {
  //     $scope.currentPage--;
  //   }
  // };
  // $scope.getNhanVienTT2 = function () {
  //   $http
  //     .get(nhanVienAPI + "/hien-thiTT?pageNo=" + $scope.currentPage)
  //     .then(function (response) {
  //       $scope.list_nv = response.data;
  //       $scope.totalPages = new Array(response.data.totalPages);
  //     });
  // };
  // $scope.getNhanVienTT2();
  // $scope.changePage = function (index) {
  //   if (index >= 0) {
  //     $scope.currentPage = index;
  //     $scope.getNhanVienTT2();
  //   }
  // };
  // $scope.nextPage = function (index) {
  //   $scope.currentPage = index++;
  // };

  // $scope.previousPage = function () {
  //   if ($scope.currentPage > 1) {
  //     $scope.currentPage--;
  //   }
  // };

  // $scope.columns = [
  //   { name: "ID   ", id: "id", checked: false },
  //   { name: "Mã nhân viên   ", ma: "ma", checked: false },
  //   { name: "Họ và tên   ", hoTen: "hoTen", checked: true },
  //   { name: "Email   ", email: "email", checked: true },
  //   { name: "Số điện thoại   ", soDienThoai: "soDienThoai", checked: false },
  //   { name: "Ngày sinh   ", ngaySinh: "ngaySinh", checked: true },
  //   { name: "Giới tính   ", gioiTinh: "gioiTinh", checked: true },
  //   { name: "Mật khẩu   ", matKhau: "matKhau", checked: false },

  //   {
  //     name: "Địa chỉ",
  //     moTa: "moTa",
  //     phuongXa: "phuongXa",
  //     quanHuyen: "quanHuyen",
  //     tinhThanhPho: "tinhThanhPho",
  //     checked: true,
  //   },
  //   { name: "Chức vụ   ", chucVu: "chucVu", checked: false },
  //   { name: "Ngày tạo", ngayTao: "ngayTao", checked: false },

  //   {
  //     name: "Trạng Thái",
  //     trangThai: "trangThai",
  //     checked: true,
  //   },
  // ];

  // $scope.getNhanVien = function () {
  //   $http
  //     .get(nhanVienAPI + "/hien-thi?pageNo=" + $scope.currentPage)
  //     .then(function (response) {
  //       $scope.list_nv = response.data;
  //       $scope.totalPages = new Array(response.data.totalPages);
  //     });
  // };
  // $scope.getNhanVien();
  // $scope.showCheckboxes = false;

  // $scope.toggleCheckboxDisplay = function () {
  //   $scope.showCheckboxes = !$scope.showCheckboxes;
  // };
};

window.hienThiKhachHangController = function ($http, $scope) {
  $scope.maFilter;
  $scope.sdtFilter;
  $scope.tenFilter;

  $scope.searchmaa = function () {
    $http
      .get(khachHangAPI + "/searchma?ma=" + $scope.maFilter)
      .then(function (response) {
        $scope.list_kh = response.data;
      });
  };
  $scope.searchsdt = function () {
    $http
      .get(khachHangAPI + "/searchsdt?sdt=" + $scope.sdtFilter)
      .then(function (response) {
        $scope.list_kh = response.data;
      });
  };
  $scope.searchten = function () {
    $http
      .get(khachHangAPI + "/searchten?ten=" + $scope.tenFilter)
      .then(function (response) {
        $scope.list_kh = response.data;
      });
  };

  $scope.list_kh = [];
  $scope.currentPage = 0;
  $scope.totalPages = [];
  $scope.getKhachHang = function () {
    $http
      .get(khachHangAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.list_kh = response.data;
        $scope.totalPages = new Array(response.data.totalPages);
      });
  };
  $scope.getKhachHang();
  $scope.changePage = function (index) {
    if (index >= 0) {
      $scope.currentPage = index;
      $scope.getKhachHang();
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
  $scope.delete = function (id) {
    $http.delete(khachHangAPI + "/delete/" + id).then(function () {
      $scope.getKhachHang();
    });
  };

  $scope.columns = [
    { name: "Mã khách hàng   ", ma: "ma", checked: false },
    { name: "Họ và tên   ", hoTen: "hoTen", checked: true },
    { name: "Email   ", email: "email", checked: true },
    { name: "Số điện thoại   ", soDienThoai: "soDienThoai", checked: false },
    { name: "Ngày sinh   ", ngaySinh: "ngaySinh", checked: true },
    { name: "Vai trò   ", tenVaiTro: "tenVaiTro", checked: true },

    {
      name: "Địa chỉ",
      moTa: "moTa",
      phuongXa: "phuongXa",
      quanHuyen: "quanHuyen",
      tinhThanhPho: "tinhThanhPho",
      checked: true,
    },
    { name: "Hạng khách hàng   ", tenHang: "tenHang", checked: false },
    { name: "Ngày tạo", ngayTao: "ngayTao", checked: true },

    {
      name: "Trạng Thái",
      trangThai: "trangThai",
      checked: true,
    },
  ];

  $scope.getKhachHang = function () {
    $http
      .get(khachHangAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.list_kh = response.data;
        $scope.totalPages = new Array(response.data.totalPages);
      });
  };
  $scope.getKhachHang();
  $scope.showCheckboxes = false;

  $scope.toggleCheckboxDisplay = function () {
    $scope.showCheckboxes = !$scope.showCheckboxes;
  };
};

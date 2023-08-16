window.hienThiDiaChiController = function ($http, $scope) {
  $scope.list_dc = [];
  $scope.currentPage = 0;
  $scope.totalPages = [];
  $scope.getDiaChi = function () {
    $http
      .get(diaChiAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.list_dc = response.data;
        $scope.totalPages = new Array(response.data.totalPages);
      });
  };
  $scope.getDiaChi();
  $scope.changePage = function (index) {
    if (index >= 0) {
      $scope.currentPage = index;
      $scope.getDiaChi();
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
    $http.delete(diaChiAPI + "/delete/" + id).then(function () {
      $scope.getDiaChi();
    });
  };
  $scope.columns = [
    { name: "Mã khách hàng   ", field: "taiKhoan.ma", checked: true },
    { name: "Họ và tên   ", field: "taiKhoan.hoten", checked: true },
    { name: "Email   ", field: "taiKhoan.email", checked: true },
    { name: "Hạng   ", field: "taiKhoan.hangKhachHang.ten", checked: true },

    {
      name: "Địa chỉ",
      mota: "mota",
      phuongxa: "phuongxa",
      quanhuyen: "quanhuyen",
      tinhthanhpho: "tinhthanhpho",
      checked: true,
    },
  ];

  $scope.getDiaChi = function () {
    $http
      .get(diaChiAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.list_dc = response.data;
        $scope.totalPages = new Array(response.data.totalPages);
      });
  };
  $scope.getDiaChi();
  $scope.showCheckboxes = false;

  $scope.toggleCheckboxDisplay = function () {
    $scope.showCheckboxes = !$scope.showCheckboxes;
  };
};

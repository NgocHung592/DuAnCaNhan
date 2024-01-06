window.thanhToanController = function (
  $http,
  $scope,
  $routeParams,
  $route,
  $filter,
  $window,
  $rootScope
) {
  // $scope.dataFromGioHang = "Dữ liệu từ GioHangController";

  if (!$rootScope.idKhachHang) {
    console.error("idKhachHang is not set in $rootScope.");
    return;
  }

  $scope.idKhachHang = $rootScope.idKhachHang;
  console.log("id khach hang:", $scope.ten);
  $http
    .get(gioHangAPI + "/hien-thi/" + $scope.idKhachHang)
    .then(function (response) {
      $scope.gioHangList = response.data;
      console.log("response.data", response.data);
      $scope.dataFromGioHang = $scope.gioHangList.length;
      $rootScope.$emit("dataFromGioHang", $scope.gioHangList.length);
      $rootScope.soLuongGioHangList = $scope.gioHangList.length;
      console.log("so luong gio hang:", $rootScope.soLuongGioHangList);

      // Tính tổng giá trị từ đơn giá
      $scope.tongGiaTri = 0;
      angular.forEach($scope.gioHangList, function (item) {
        // Chuyển đổi donGia sang kiểu số
        var donGia = parseFloat(item.donGia);

        // Kiểm tra xem có phải là số không
        if (!isNaN(donGia)) {
          item.donGia = $filter("number")(donGia, 0);
          // Tính toán tổng giá trị từ đơn giá
          $scope.tongGiaTri += donGia;

          // In ra console log để kiểm tra từng bước tính toán
          console.log("donGia:", donGia);
          console.log("Partial tongGiaTri:", $scope.tongGiaTri);
        } else {
          console.error("Invalid donGia:", item);
        }
      });

      // In ra console log để kiểm tra giá trị cuối cùng của tongGiaTri
      console.log("Final tongGiaTri:", $scope.tongGiaTri);
    })
    .catch(function (error) {
      console.error("Error fetching gio hang:", error);
    });
};

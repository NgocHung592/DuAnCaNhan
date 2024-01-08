window.thanhToanController = function (
  $http,
  $scope,
  $routeParams,
  $route,
  $filter,
  $window,
  $rootScope,
  $location
) {
  $scope.hoaDonThanhToan = {
    idKhachHang: "",
    tenKhachHang: "Khách lẻ",
    soDienThoaiKhachHang: "",
    diaChiKhachHang: "",
    diaChiCuThe: "",
    tinhThanhPho: "",
    quanHuyen: "",
    phuongXa: "",
    tongTien: "",
    ngayThanhToan: new Date(),
    trangThai: 1,
  };
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
  $scope.listHoaDon = [];
  $scope.formHoaDonChiTiet = {};
  //thanh toan
  $scope.addHoaDon = function (event) {
    $scope.randomHoaDon = "HD" + Math.floor(Math.random() * 10000) + 1;
    $scope.formHoaDon = {
      ma: $scope.randomHoaDon,
      ngayTao: new Date(),
      trangThai: 0,
      idKhachHang: $scope.idKhachHang,
      tenKhachHang: $scope.ten,
      soDienThoaiKhachHang: $scope.sdt,
      diaChiKhachHang: "",
      ngayThanhToan: new Date(),
      tongTien: $scope.tongGiaTri,
    };
    console.log($scope.formHoaDon);
    $http.post(hoaDonAPI + "/addonline", $scope.formHoaDon).then(function () {
      $scope.getListHoaDon();
    });
  };

  $scope.getListHoaDon = function () {
    $http.get(hoaDonAPI + "/get-list").then(function (response) {
      $scope.listHoaDon = response.data;
      for (var i = 0; i < $scope.gioHangList.length; i++) {
        $scope.formHoaDonChiTiet = {
          idHoaDon: $scope.listHoaDon[0].id,
          idSanPhamChiTiet: $scope.gioHangList[i].idSanPhamChiTiet,
          donGia: parseInt($scope.gioHangList[i].donGiaSp),
          thanhTien: parseInt($scope.gioHangList[i].donGia.replace(",", "")),
          soLuong: $scope.gioHangList[i].soLuong,
        };
        $http
          .put(
            sanPhamChiTietAPI +
              "/updatesl/" +
              $scope.gioHangList[i].idSanPhamChiTiet,
            $scope.gioHangList[i].soLuong
          )
          .then(function () {
            console.log("Xóa so luong thanh cong");
          });
        console.log($scope.gioHangList[i].idGioHang);
        $http
          .delete(gioHangAPI + "/delete/" + $scope.gioHangList[i].idGioHang)
          .then(function (response) {
            console.log("Xóa gio hang thành công:", response.data);
            //$route.reload();
          });
        //console.log($scope.formHoaDonChiTiet);
        $http
          .post(hoaDonChiTietAPI + "/add", $scope.formHoaDonChiTiet)
          .then(function () {
            console.log("success");
            //$route.path("don-hang");
          });
      }
      setTimeout(function () {
        $location.path("/don-hang");
      }, $scope.gioHangList.length * 3);
    });
  };
};

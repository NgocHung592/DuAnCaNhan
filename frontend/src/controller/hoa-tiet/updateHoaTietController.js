window.updateHoaTietController = function (
  $http,
  $scope,
  $routeParams,
  $location,
  $rootScope
) {
  $scope.formHoaTiet = {
    id: "",
    ma: "",
    ten: "",
    daXoa: Boolean,
  };
  $scope.listHoaTiet = [];
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  $http
    .get(hoaTietAPI + "/detail/" + $routeParams.id)
    .then(function (response) {
      if (response.status == 200) {
        $scope.formHoaTiet = response?.data;
      }
    });
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
  $scope.update = function (idHoaTiet) {
    // Khởi tạo danh sách mới
    let isDuplicate = false;
    $scope.newListHoaTiet = [];

    // Kiểm tra nếu 'ten' trống
    if ($scope.formHoaTiet.ten === "") {
      $scope.message = "Tên họa tiết không được trống";
      toastBootstrap.show();
      $scope.errorProgress();
    } else {
      // Lấy danh sách hóa tiết
      $http.get(hoaTietAPI + "/get-all").then(function (response) {
        $scope.listHoaTiet = response?.data;

        // Lấy chi tiết hóa tiết
        $http
          .get(hoaTietAPI + "/detail/" + $routeParams.id)
          .then(function (responseDetail) {
            if (responseDetail.status === 200) {
              $scope.detailHoaTiet = responseDetail?.data;

              // Tạo danh sách mới với các hóa tiết khác 'ten' với hóa tiết đang cập nhật
              $scope.newListHoaTiet = $scope.listHoaTiet.filter(
                (hoaTiet) => hoaTiet.ten !== $scope.detailHoaTiet.ten
              );
              console.log($scope.newListHoaTiet);
              // Kiểm tra trùng lặp
              $scope.newListHoaTiet.forEach((hoaTiet) => {
                if (hoaTiet.ten === $scope.formHoaTiet.ten) {
                  isDuplicate = true;
                }
              });
              if (!isDuplicate) {
                $scope.updateHoaTiet = {
                  ten: $scope.formHoaTiet.ten,
                  ngaySua: new Date(),
                  daXoa: $scope.formHoaTiet.daXoa,
                };

                $http
                  .put(
                    hoaTietAPI + "/update/" + idHoaTiet,
                    $scope.updateHoaTiet
                  )
                  .then(function () {
                    $rootScope.message = "Cập nhật thành công";
                    $location.path("/hoa-tiet/hien-thi");
                  });
              } else {
                // Nếu có trùng lặp, thông báo và xử lý lỗi
                $scope.message = "Tên họa tiết không được trùng";
                toastBootstrap.show();
                $scope.errorProgress();
              }
            }
          });
      });
    }
  };
};

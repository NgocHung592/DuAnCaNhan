window.MaGiamGiaController = function ($http, $scope, $location) {
  $scope.listMaGiamGia = [];
  $scope.currentPage = 0;
  $scope.totalPages = [];
  $scope.visiblePages = [];
  $scope.timeRemaining = "";
  $scope.timeRemainingArray = [];
  $scope.maxVisiblePages = 3; // Số trang tối đa để hiển thị
  $scope.intervalId = "";
  function scheduledTask() {
    $http
      .get(magiamgiaAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listMaGiamGia = response?.data.content;
        console.log($scope.listMaGiamGia);
        $scope.totalPages = new Array(response.data.totalPages);
        $scope.visiblePages = $scope.getVisiblePages();
      });
  }
  $scope.intervalId = setInterval(scheduledTask, 1000);

  $scope.getVisiblePages = function () {
    var totalPages = $scope.totalPages.length;

    var range = $scope.maxVisiblePages; // Số trang tối đa để hiển thị
    var curPage = $scope.currentPage;

    var numberTruncateLeft = curPage - Math.floor(range / 2);
    var numberTruncateRight = curPage + Math.floor(range / 2);

    // Tạo danh sách trang hiển thị
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
  $scope.getMa = function () {
    $scope.intervalId = setInterval(scheduledTask, 1000);
  };
  $scope.loc = function () {
    setTimeout(() => {
      clearInterval($scope.intervalId);
      console.log("Scheduled task stopped.");
    });
    $http
      .get(
        magiamgiaAPI +
          "/loc?pageNo=" +
          $scope.currentPage +
          "&trangThai=" +
          $scope.selectOption
      )
      .then(function (response) {
        $scope.listMaGiamGia = response?.data.content;
        $scope.totalPages = new Array(response.data.totalPages);
        $scope.visiblePages = $scope.getVisiblePages();
      });
  };
  $scope.$watch("searchKeyword", function (newVal, oldVal) {
    if (newVal !== oldVal) {
      $http
        .get(
          magiamgiaAPI +
            "/search?pageNo=" +
            $scope.currentPage +
            "&keyWord=" +
            $scope.searchKeyword
        )
        .then(function (response) {
          $scope.listMaGiamGia = response.data.content;
        });
    }
  });
  $scope.changePage = function (index) {
    if (index >= 0 && index < $scope.totalPages.length) {
      $scope.currentPage = index;
      $scope.getMa();
    }
  };

  $scope.nextPage = function () {
    if ($scope.currentPage < $scope.totalPages.length - 1) {
      $scope.currentPage++;
      $scope.getMa();
    }
  };

  $scope.previousPage = function () {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
      $scope.getMa();
    }
  };
};

window.hienThiSanPhamController = function (
  $http,
  $scope,
  $rootScope,
  $timeout
) {
  $scope.currentPage = 0;
  $scope.listSanPham = [];
  $scope.totalPages = [];
  $scope.selectOption = "";
  $scope.visiblePages = [];
  $scope.maxVisiblePages = 3;

  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);

  $scope.message = $rootScope.message;
  console.log($scope.message);
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
  $scope.getSanPham = function () {
    if ($scope.message != undefined) {
      $scope.successProgress();
      toastBootstrap.show();
    }
    $http
      .get(sanPhamAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listSanPham = response?.data.content;
        $scope.totalPages = new Array(response.data.totalPages);
        $scope.visiblePages = $scope.getVisiblePages();
      });
  };
  $scope.getSanPham();
  $timeout(function () {
    $scope.message = undefined;
  }, 1000);

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
  $scope.loc = function () {
    $http
      .get(
        sanPhamAPI +
          "/loc?pageNo=" +
          $scope.currentPage +
          "&loc=" +
          $scope.selectOption
      )
      .then(function (response) {
        $scope.listSanPham = response?.data.content;
      });
  };
  $scope.$watch("searchKeyword", function (newVal, oldVal) {
    if (newVal !== oldVal) {
      $http
        .get(
          sanPhamAPI +
            "/search?pageNo=" +
            $scope.currentPage +
            "&keyword=" +
            $scope.searchKeyword
        )
        .then(function (response) {
          $scope.listSanPham = response?.data.content;
        });
    }
  });
  $scope.changePage = function (index) {
    $scope.showError = false;
    if (index >= 0 && index < $scope.totalPages.length) {
      $scope.currentPage = index;
      $scope.getSanPham();
    }
  };

  $scope.nextPage = function () {
    if ($scope.currentPage < $scope.totalPages.length - 1) {
      $scope.currentPage++;
      $scope.getSanPham();
    }
  };

  $scope.previousPage = function () {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
      $scope.getSanPham();
    }
  };
};

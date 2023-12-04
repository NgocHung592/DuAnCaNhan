window.hienThiKichThuocController = function (
  $http,
  $scope,
  $rootScope,
  $timeout
) {
  $scope.listKichThuoc = [];
  $scope.totalPages = [];
  $scope.currentPage = 0;
  $scope.maxVisiblePages = 3;
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  $scope.message = $rootScope.message;
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
  $scope.getKichThuoc = function () {
    if ($scope.message !== undefined) {
      toastBootstrap.show();
      $scope.successProgress();
    }
    $http
      .get(kichThuocAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listKichThuoc = response?.data.content;
        $scope.totalPages = new Array(response.data.totalPages);
        $scope.visiblePages = $scope.getVisiblePages();
      });
  };

  $scope.getKichThuoc();
  if ($scope.message !== undefined) {
    $timeout(function () {
      $rootScope.message = undefined;
    }, 1000);
  }
  $scope.changePage = function (index) {
    if (index >= 0) {
      $scope.currentPage = index;
      $scope.getKichThuoc();
    }
  };
  $scope.nextPage = function () {
    let length = $scope.totalPages.length;
    if ($scope.currentPage < length - 1) {
      $scope.currentPage++;
      $scope.getKichThuoc();
    }
  };

  $scope.previousPage = function () {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
      $scope.getKichThuoc();
    }
  };
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
};

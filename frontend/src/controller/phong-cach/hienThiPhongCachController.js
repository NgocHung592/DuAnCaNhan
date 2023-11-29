window.hienThiPhongCachController = function (
  $http,
  $scope,
  $rootScope,
  $timeout
) {
  $scope.totalPages = [];
  $scope.visiblePages = [];
  $scope.currentPage = 0;
  $scope.maxVisiblePages = 3;
  $scope.listPhongCach = [];

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
  $scope.getPhongCach = function () {
    if ($scope.message !== undefined) {
      toastBootstrap.show();
      $scope.successProgress();
    }
    $http
      .get(phongCachAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listPhongCach = response?.data.content;
        $scope.totalPages = new Array(response.data.totalPages);
        $scope.visiblePages = $scope.getVisiblePages();
      });
  };
  $scope.getPhongCach();
  if ($scope.message !== undefined) {
    $timeout(function () {
      $rootScope.message = undefined;
    }, 1000);
  }
  $scope.changePage = function (index) {
    if (index >= 0) {
      $scope.currentPage = index;
      $scope.getPhongCach();
    }
  };
  $scope.nextPage = function () {
    let length = $scope.totalPages.length;
    if ($scope.currentPage < length - 1) {
      $scope.currentPage++;
      $scope.getPhongCach();
    }
  };

  $scope.previousPage = function () {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
      $scope.getPhongCach();
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

window.MaGiamGiaController = function ($http, $scope, $location) {
  $scope.listMaGiamGia = [];
  $scope.currentPage = 0;
  $scope.totalPages = [];
  $scope.visiblePages = [];
  $scope.timeRemaining = "";
  $scope.timeRemainingArray = [];
  $scope.maxVisiblePages = 3; // Số trang tối đa để hiển thị

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

  setInterval(scheduledTask, 1000);

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
    // console.log(visiblePages)
    return visiblePages;
  };

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

  // $scope.searching = function (event) {
  //   event.preventDefault();
  //   $scope.searchDat = { search: "", type: "", select: "" };
  //   $scope.searchDat.search = document.getElementById("searchtxt").value;
  //   $scope.searchDat.select = document.getElementById("searchsel").value;
  //   let arr = document.getElementsByName("searchtype");
  //   for (let i = 0; i < arr.length; i++) {
  //     if (arr.item(i).checked) {
  //       $scope.searchDat.type = arr.item(i).value;
  //       break;
  //     }
  //   }
  // };
  $scope.loc = function () {
    $http
      .get(
        magiamgiaAPI +
          "/loc?pageNo=" +
          $scope.currentPage +
          "&trangThai=" +
          $scope.selectOption
      )
      .then(function (response) {
        $scope.listMaGiamGia = response.data;
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
          $scope.listMaGiamGia = response.data;
        });
    }
  });
};

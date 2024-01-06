window.hienThiHoaDonController = function ($http, $scope, $location) {
  $scope.listHoaDon = [];
  $scope.listLichSuHoaDon = [];
  $scope.filteredHoaDonList = [];
  $scope.currentPage = 0;
  $scope.totalPages = [];
  $scope.visiblePages = [];
  $scope.maxVisiblePages = 3;

  $scope.getData = function () {
    $http
      .get(hoaDonAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.listHoaDon = response?.data.content;
        console.log($scope.listHoaDon);
        $scope.customIndex = $scope.currentPage * response.data.size;
        $scope.totalPages = new Array(response.data.totalPages);
        $scope.currentPage = Math.min(
          $scope.currentPage,
          response.data.totalPages
        );

        $scope.visiblePages = $scope.getVisiblePages();
      });
  };
  $scope.getData();
  $scope.selectTab = function (tab) {
    $scope.selectedTab = tab;
    $scope.filterDataByTab(tab);
  };

  $scope.filterDataByTab = function (tab) {
    if (tab === null) {
      $http
        .get(hoaDonAPI + "/hien-thi?pageNo=" + $scope.currentPage)
        .then(function (response) {
          $scope.listHoaDon = response?.data.content;
          $scope.customIndex = $scope.currentPage * response.data.size;
          $scope.totalPages = new Array(response.data.totalPages);
          $scope.visiblePages = $scope.getVisiblePages();
        });
    } else {
      $http
        .get(
          hoaDonAPI + "/loc?pageNo=" + $scope.currentPage + "&trangThai=" + tab
        )
        .then(function (response) {
          $scope.listHoaDon = response?.data.content;
          $scope.customIndex = $scope.currentPage * response.data.size;
          $scope.totalPages = new Array(response.data.totalPages);
          $scope.visiblePages = $scope.getVisiblePages();
        });
    }
  };
  $scope.isSelectedTab = function (tab) {
    return tab === $scope.selectedTab;
  };
  $scope.selectTab(null);

  $scope.detail = function (id) {
    $http.get(hoaDonAPI + "/detail/" + id).then(function (response) {
      if (response.status == 200) {
        $scope.formHoaDon = response.data;
      }
    });
  };
  $scope.changePage = function (index) {
    if (index >= 0) {
      $scope.currentPage = index;
      $scope.getData();
    }
  };

  $scope.nextPage = function () {
    let length = $scope.totalPages.length;
    if ($scope.currentPage < length - 1) {
      $scope.currentPage++;
      $scope.getData();
    }
  };

  $scope.previousPage = function () {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
      $scope.getData();
    }
  };

  // $scope.add = function () {
  //   $http.post(hoaDonAPI + "/add", $scope.formHoaDon).then(function (response) {
  //     $http.get(hoaDonAPI + "/hien-thi").then(function (response) {
  //       $scope.listHoaDon = response.data;
  //     });
  //   });
  // };

  $scope.update = function (id) {
    $http
      .put(hoaDonAPI + "/update/" + id, $scope.formHoaDon)
      .then(function (response) {
        $http.get(hoaDonAPI + "/hien-thi").then(function (response) {
          $scope.listHoaDon = response.data;
        });
      });
  };
  $scope.getVisiblePages = function () {
    var totalPages = $scope.totalPages.length;

    var range = $scope.maxVisiblePages;
    var curPage = $scope.currentPage;

    var numberTruncateLeft = curPage - Math.floor(range / 2);
    var numberTruncateRight = curPage + Math.floor(range / 2);

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

window.hienThiKhachHangController = function (
  $http,
  $scope,
  $location,
  $rootScope,
  $timeout
) {
  $scope.list_kh = [];
  $scope.totalPages = [];
  $scope.searchKeyword = "";
  $scope.selectedOption = "";
  $scope.currentPage = 0;
  $scope.maxVisiblePages = 3;
  $scope.message = $rootScope.message;
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
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
  $scope.getKhachHang = function () {
    if ($scope.message !== undefined) {
      $scope.successProgress();
      toastBootstrap.show();
    }
    $http
      .get(khachHangAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.list_kh = response?.data.content;
        console.log($scope.list_kh);
        $scope.totalPages = new Array(response.data.totalPages);
        $scope.visiblePages = getVisiblePages();
      });
  };
  $scope.getKhachHang();
  if ($scope.message !== undefined) {
    $timeout(function () {
      $rootScope.message = undefined;
    }, 1000);
  }
  function getVisiblePages() {
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
  }

  $scope.changePage = function (index) {
    if ($scope.selectedOption === false || $scope.selectedOption === true) {
      $scope.currentPage = index;
      $scope.loc();
    } else if (
      $scope.searchKeyword !== undefined &&
      $scope.searchKeyword !== null &&
      $scope.searchKeyword !== ""
    ) {
      $scope.currentPage = index;
      $scope.search();
    } else {
      $scope.currentPage = index;
      $scope.getKhachHang();
    }
  };

  $scope.nextPage = function () {
    if ($scope.currentPage < $scope.totalPages.length - 1) {
      if ($scope.selectedOption === false || $scope.selectedOption === true) {
        $scope.currentPage++;
        $scope.loc();
      } else if (
        $scope.searchKeyword !== undefined &&
        $scope.searchKeyword !== null &&
        $scope.searchKeyword !== ""
      ) {
        $scope.currentPage++;
        $scope.search();
      } else {
        $scope.currentPage++;
        $scope.getKhachHang();
      }
    }
  };

  $scope.previousPage = function () {
    if ($scope.currentPage > 0) {
      if ($scope.selectedOption === false || $scope.selectedOption === true) {
        $scope.currentPage--;
        $scope.loc();
      } else if (
        $scope.searchKeyword !== undefined &&
        $scope.searchKeyword !== null &&
        $scope.searchKeyword !== ""
      ) {
        $scope.currentPage--;
        $scope.search();
      } else {
        $scope.currentPage--;
        $scope.getKhachHang();
      }
    }
  };
  $scope.search = function () {
    $http
      .get(
        khachHangAPI +
          "/search?pageNo=" +
          $scope.currentPage +
          "&keyWord=" +
          $scope.searchKeyword
      )
      .then(function (response) {
        $scope.list_kh = response?.data.content;
        $scope.totalPages = new Array(response.data.totalPages);
        $scope.visiblePages = getVisiblePages();
      });
  };
  $scope.loc = function () {
    $http
      .get(
        khachHangAPI +
          "/loc?pageNo=" +
          $scope.currentPage +
          "&trangThai=" +
          $scope.selectedOption
      )
      .then(function (response) {
        $scope.list_kh = response?.data.content;
        $scope.totalPages = new Array(response.data.totalPages);
        $scope.visiblePages = getVisiblePages();
      });
  };

  $scope.import = function (files) {
    var reader = new FileReader();
    reader.onload = async () => {
      var workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(reader.result);
      const worksheet = workbook.getWorksheet("Sheet1");
      var date = new Date();
      worksheet.eachRow((row, index) => {
        if (index > 1) {
          let nhanvien = {
            ma: row.getCell(1).value,
            hoten: row.getCell(2).value,
            gioitinh: true && row.getCell(3).value,
            email: row.getCell(5).value,
            ngaysinh: row.getCell(6).value,
            sodienthoai: row.getCell(7).value,
            matkhau: "123",
            ngaytao: date,
            tinhthanhpho: row.getCell(8).value,
            quanhuyen: row.getCell(9).value,
            phuongxa: row.getCell(10).value,
            mota: row.getCell(11).value,
            trangthai: row.getCell(12).value,
          };
          $http.post(khachHangAPI + "/add", nhanvien).then(function () {
            $location.path("/nhan-vien/hien-thi");
          });
        }
      });
    };
    reader.readAsArrayBuffer(files[0]);
  };
  $scope.exportToExcel = function () {
    // Lấy dữ liệu từ bảng (sử dụng jQuery, hoặc nguyên bản AngularJS)
    var tableData = [];
    $("table tr").each(function (rowIndex, row) {
      var rowData = [];
      $(row)
        .find("td")
        .each(function (colIndex, cell) {
          rowData.push(angular.element(cell).text());
        });
      tableData.push(rowData);
    });

    // Tạo tệp Excel sử dụng SheetJS
    var ws = XLSX.utils.aoa_to_sheet(tableData);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Danh sách");

    // Lưu tệp Excel
    XLSX.writeFile(wb, "danh-sach.xlsx");
  };
};

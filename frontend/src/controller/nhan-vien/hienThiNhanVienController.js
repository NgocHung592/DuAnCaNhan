window.hienThiNhanVienController = function ($http, $scope) {
  $scope.list_nv = [];
  $scope.searchKeyword = "";
  $scope.selectedOption = "";
  $scope.currentPage = 0;
  $scope.totalPages = [];
  $scope.getNhanVien = function () {
    $http
      .get(nhanVienAPI + "/hien-thi?pageNo=" + $scope.currentPage)
      .then(function (response) {
        $scope.list_nv = response.data;
        $scope.totalPages = new Array(response.data.totalPages);
      });
  };
  $scope.getNhanVien();
  $scope.changePage = function (index) {
    if (index >= 0) {
      $scope.currentPage = index;
      $scope.getNhanVien();
    }
  };
  $scope.nextPage = function (index) {
    $scope.currentPage = index++;
  };

  $scope.previousPage = function () {
    if ($scope.currentPage > 1) {
      $scope.currentPage--;
    }
  };
  $scope.$watch("searchKeyword", function (newVal, oldVal) {
    if (newVal !== oldVal) {
      $http
        .get(nhanVienAPI + "/search?search=" + $scope.searchKeyword)
        .then(function (response) {
          $scope.list_nv = response.data;
          console.log("thanh cong", response.data);
        });
    }
  });
  $scope.searchTT = function () {
    $http
      .get(nhanVienAPI + "/hien-thiTT?search=" + $scope.selectedOption)
      .then(function (response) {
        $scope.list_nv = response.data;
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
            ten: row.getCell(2).value,
            gioitinh: true && row.getCell(3).value,
            idVaiTro: row.getCell(4).value,
            email: row.getCell(5).value,
            ngaysinh: row.getCell(6).value,
            sodienthoai: row.getCell(7).value,
            matkhau: "123",
            ngaytao: date,
            tinhThanhPho: row.getCell(8).value,
            quanHuyen: row.getCell(9).value,
            phuongXa: row.getCell(10).value,
            mota: row.getCell(11).value,
            trangthai: row.getCell(12).value,
          };
          $http.post(nhanVienAPI + "/add", nhanvien).then(function () {
            alert("Thêm thành công");
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

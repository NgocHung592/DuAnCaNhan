window.addNhanVienController = function ($http, $scope, $rootScope) {
  $scope.show = Boolean;
  const toastTrigger = document.getElementById("liveToastBtn");
  const toastLiveExample = document.getElementById("liveToast");
  if (toastTrigger) {
    const toastBootstrap =
      bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastTrigger.addEventListener("click", () => {
      toastBootstrap.show();
    });
  }
  $scope.randoom = "NV" + Math.floor(Math.random() * 10000) + 1;
  var date = new Date();
  $scope.list_NhanVien = [];
  $scope.form_nv = {
    ma: $scope.randoom,
    ten: "",
    email: "",
    gioitinh: "",
    ngaysinh: "",
    sodienthoai: "",
    matkhau: "123",
    tinhThanhPho: "",
    quanHuyen: "",
    phuongXa: "",
    ngaytao: date,
    mota: "",
    idVaiTro: "Nhân viên",
    trangthai: 1,
  };
  $scope.addNhanVien = function () {
    console.log($scope.form_nv);
    var elem = document.getElementById("myBar");
    var width = 0;
    var id = setInterval(frame, 15);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
    if (
      $scope.form_nv.ten != "" &&
      $scope.form_nv.email != "" &&
      $scope.form_nv.sodienthoai != "" &&
      $scope.form_nv.tinhThanhPho != "" &&
      $scope.form_nv.quanHuyen != "" &&
      $scope.form_nv.phuongXa != "" &&
      $scope.form_nv.mota != ""
    ) {
      $http.post(nhanVienAPI + "/add", $scope.form_nv).then(function () {
        $scope.message = "Thêm thành công";
        console.log(from_nv);
        $scope.show = true;
        return true;
      });
    } else {
      $scope.message = "Thêm thất bại";
      $scope.show = false;
      return false;
    }
  };
  $scope.show = Boolean;

  if (toastTrigger) {
    const toastBootstrap =
      bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastTrigger.addEventListener("click", () => {
      toastBootstrap.show();
    });
  }
  const host = "https://provinces.open-api.vn/api/";
  var callAPI = (api) => {
    return axios.get(api).then((response) => {
      renderData(response.data, "city");
    });
  };
  callAPI("https://provinces.open-api.vn/api/?depth=1");
  var callApiDistrict = (api) => {
    return axios.get(api).then((response) => {
      renderData(response.data.districts, "district");
    });
  };
  var callApiWard = (api) => {
    return axios.get(api).then((response) => {
      renderData(response.data.wards, "ward");
    });
  };

  var renderData = (array, select) => {
    let row = ' <option disable value="">Chọn</option>';
    array.forEach((element) => {
      row += `<option data-id="${element.code}" value="${element.name}">${element.name}</option>`;
    });
    document.querySelector("#" + select).innerHTML = row;
  };

  $("#city").change(() => {
    callApiDistrict(
      host + "p/" + $("#city").find(":selected").data("id") + "?depth=2"
    );
    printResult();
  });
  $("#district").change(() => {
    callApiWard(
      host + "d/" + $("#district").find(":selected").data("id") + "?depth=2"
    );
    printResult();
  });
  $("#ward").change(() => {
    printResult();
  });

  var printResult = () => {
    if (
      $("#district").find(":selected").data("id") != "" &&
      $("#city").find(":selected").data("id") != "" &&
      $("#ward").find(":selected").data("id") != ""
    ) {
      $scope.form_nv.tinhThanhPho = $("#city option:selected").text();
      $scope.form_nv.quanHuyen = $("#district option:selected").text();
      $scope.form_nv.phuongXa = $("#ward option:selected").text();
    }
  };

  $scope.add = function () {
    var elem = document.getElementById("myBar");
    var width = 0;
    var id = setInterval(frame, 15);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  };
  $scope.import = function (files) {
    var reader = new FileReader();
    reader.onload = async () => {
      var workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(reader.result);
      const worksheet = workbook.getWorksheet("Sheet1");
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
};

window.addKhachHangController = function ($http, $scope, $rootScope) {
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
  $scope.randoom = "KH" + Math.floor(Math.random() * 10000) + 1;
  var date = new Date();
  $scope.list_KhachHang = [];
  $scope.form_kh = {
    ma: $scope.randoom,
    hoten: "",
    email: "",
    gioitinh: "",
    ngaysinh: "",
    anhdaidien: "",
    sodienthoai: "",
    matkhau: "123",
    tinhthanhpho: "",
    quanhuyen: "",
    phuongxa: "",
    ngaytao: date,
    mota: "",
    trangthai: 1,
  };
  $scope.addKhachHang = function () {
    const hinhanh = document.getElementById("product-image");
    console.log(hinhanh);
    for (const image of hinhanh.files) {
      $scope.form_kh.anhdaidien = image.name;
    }
    console.log($scope.form_kh);
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
      $scope.form_kh.hoten != "" &&
      $scope.form_kh.email != "" &&
      $scope.form_kh.sodienthoai != "" &&
      $scope.form_kh.tinhthanhpho != "" &&
      $scope.form_kh.quanhuyen != "" &&
      $scope.form_kh.phuongxa != "" &&
      $scope.form_kh.mota != ""
    ) {
      $http.post(khachHangAPI + "/add", $scope.form_kh).then(function () {
        $scope.message = "Thêm thành công";

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
      $scope.form_kh.tinhthanhpho = $("#city option:selected").text();
      $scope.form_kh.quanhuyen = $("#district option:selected").text();
      $scope.form_kh.phuongxa = $("#ward option:selected").text();
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
};

window.addNhanVienController = function ($http, $scope, $rootScope, $location) {
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
  $scope.form_nv = {
    ma: $scope.randoom,
    hoten: "",
    email: "",
    gioitinh: "",
    ngaysinh: "",
    sodienthoai: "",
    anhdaidien: "",
    matkhau: "123",
    tinhthanhpho: "",
    quanhuyen: "",
    phuongxa: "",
    ngaytao: date,
    mota: "",
    chucVu: "Nhân viên",
    trangthai: 1,
  };
  $scope.addNhanVien = function () {
    const hinhanh = document.getElementById("product-image");
    console.log(hinhanh);
    for (const image of hinhanh.files) {
      $scope.form_nv.anhdaidien = image.name;
    }
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
      ($scope.form_nv.hoten === "",
      $scope.form_nv.email === "",
      $scope.form_nv.sodienthoai === "",
      $scope.form_nv.tinhthanhpho === "",
      $scope.form_nv.quanhuyen === "",
      $scope.form_nv.phuongxa === "",
      $scope.form_nv.mota === "")
    ) {
      $scope.message = "Thêm thất bại";
      $scope.show = false;
      return false;
    } else {
      $http.post(nhanVienAPI + "/add", $scope.form_nv).then(function () {
        $scope.message = "Thêm thành công";
        $scope.show = true;
        return true;
      });
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
    let row = ' <option disable value="">Mời chọn</option>';
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
      $scope.form_nv.tinhthanhpho = $("#city option:selected").text();
      $scope.form_nv.quanhuyen = $("#district option:selected").text();
      $scope.form_nv.phuongxa = $("#ward option:selected").text();
    }
  };
};

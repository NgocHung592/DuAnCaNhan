window.addKhachHangController = function (
  $http,
  $scope,
  $rootScope,
  $location
) {
  $scope.randoom = "KH" + Math.floor(Math.random() * 10000) + 1;
  $scope.matkhau = generateRandomPassword();
  function generateRandomPassword() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$!%*?&";
    let password = "";

    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }

    return password;
  }
  $scope.form_kh = {
    ma: $scope.randoom,
    hoTen: "",
    email: "",
    gioiTinh: "",
    ngaySinh: "",
    anhDaiDien: "",
    soDienThoai: "",
    matKhau: $scope.matkhau,
    tinhThanhPho: "",
    quanHuyen: "",
    phuongXa: "",
    ngayTao: new Date(),
    diaChiCuThe: "",
    daXoa: false,
  };
  $scope.addKhachHang = function (event) {
    event.preventDefault();
    const hinhanh = document.getElementById("product-image");
    for (const image of hinhanh.files) {
      $scope.form_kh.anhDaiDien = image.name;
    }
    console.log($scope.form_kh);
    let check = true;
    // $scope.showTen = true;
    // $scope.showEmail = true;
    // $scope.showSdt = true;
    // $scope.showMota = true;
    // $scope.showT = true;
    // $scope.showP = true;
    // $scope.showQ = true;
    // let hoten = $scope.form_kh.hoten;
    // let email = $scope.form_kh.email;
    // let mota = $scope.form_kh.mota;
    // let tinhThanhPho = $scope.form_kh.tinhThanhPhone;
    // let phuongXa = $scope.form_kh.phuongXa;
    // let quanHuyen = $scope.form_kh.quanHuyen;

    // let sodienthoai = $scope.form_kh.sodienthoai;
    // const onlyLetters =
    //   /^[a-zA-Z\s?áàảãạâấầẩẫậăắằẳẵặéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵY\s]*$/;

    // const emailRegex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    // const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    // const vietnamPhoneRegex =
    //   /^(?:\+84|0)(3[2-9]|5[689]|7[06-9]|8[1-9]|9\d)\d{7}$/;

    // if (
    //   hoten.length == 0 ||
    //   hoten.length > 100 ||
    //   specialChars.test(hoten) ||
    //   !onlyLetters.test(hoten)
    // ) {
    //   $scope.showTen = false;

    //   check = false;
    // }
    // if (!emailRegex.test(email)) {
    //   console.log(email);
    //   $scope.showEmail = false;

    //   check = false;
    // }
    // if (
    //   sodienthoai.length == 0 ||
    //   specialChars.test(sodienthoai) ||
    //   !vietnamPhoneRegex.test(sodienthoai)
    // ) {
    //   $scope.showSdt = false;

    //   check = false;
    // }
    // if (mota.length == 0 || mota.length > 51 || specialChars.test(mota)) {
    //   $scope.showMota = false;

    //   check = false;
    // }
    // if (tinhThanhPho == "") {
    //   $scope.showT = false;

    //   check = false;
    // }
    // if (quanHuyen == "") {
    //   $scope.showQ = false;

    //   check = false;
    // }
    // if (phuongXa == "") {
    //   $scope.showP = false;

    //   check = false;
    // }
    if (check) {
      $http.post(khachHangAPI + "/add", $scope.form_kh).then(function () {
        $location.path("/khach-hang/hien-thi");
      });
      // .catch(function (errorResponse) {
      //   if (errorResponse && errorResponse.preventDefault) {
      //     errorResponse.preventDefault();
      //   }
      //   alert("Email hoặc số điện thoại đã tồn tại");
      //   $scope.show = true;
      // });
    }
    // else {
    //   event.preventDefault();
    // }
  };

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
      $scope.form_kh.tinhThanhPho = $("#city option:selected").text();
      $scope.form_kh.quanHuyen = $("#district option:selected").text();
      $scope.form_kh.phuongXa = $("#ward option:selected").text();
    }
  };
};

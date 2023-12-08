window.dangkyController = function ($http, $scope, $rootScope, $location) {
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
    matKhau: $scope.matkhau,
    ngayTao: new Date(),
    daXoa: false,
  };
  $scope.singup = function (event) {
    $http
      .post(taiKhoanAPI + "/singup", $scope.form_kh)
      .then(function () {
        alert("Vui lòng kiểm tra email để đăng nhập ");
        $location.path("/login");
      })
      .catch(function (errorResponse) {
        if (errorResponse && errorResponse.preventDefault) {
          errorResponse.preventDefault();
        }
        alert("Email đã tồn tại");
        $scope.show = true;
      });
  };
};

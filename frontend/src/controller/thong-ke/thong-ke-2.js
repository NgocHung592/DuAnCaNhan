window.hienThiThongKeController = function ($http, $scope, $routeParams) {
    $scope.listThongKe = [];
    $scope.chartLabels = [];
    $scope.chartData = [];
  
    $scope.getData = function (startDate, endDate) {
      var url = thongKeAPI + "/hien-thi";
  
      if (startDate && endDate) {
        url += `?startDate=${startDate}&endDate=${endDate}`;
      }
  
      $http
        .get(url)
        .then(function (response) {
          $scope.listThongKe = response.data;
          $scope.chartLabels = $scope.listThongKe.map(function (item) {
            return moment()
              .day(item.ngay-5)
              .month(item.thang - 1)
              .year(item.nam)
              .format("DD/MM/YYYY");
          });
  
          var ctx = document.getElementById("myChart").getContext("2d");
          var myChart = new Chart(ctx, {
            type: "bar",
            data: {
              labels: $scope.chartLabels,
              datasets: [
                {
                  label: "Doanh thu (VND)",
                  data: $scope.listThongKe.map(function (item) {
                    return item.tongDoanhThu;
                  }),
                  backgroundColor: "rgba(75, 192, 192, 0.2)",
                  borderColor: "rgba(75, 192, 192, 1)",
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        })
        .catch(function (error) {
          console.error("Error fetching data:", error);
        });
    };
  
    // Example: You can set the start date and end date as needed
    var startDate = "2023-01-01";
    var endDate = "2024-12-31";
  
    $scope.getData(startDate, endDate);
  };
  
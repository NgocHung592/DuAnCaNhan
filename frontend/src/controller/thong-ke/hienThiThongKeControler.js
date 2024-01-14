window.hienThiThongKeController = function ($http, $scope, $routeParams) {
  $scope.listThongKe = [];
  //   $scope.chartData = [
  //     { date: "2023-01-01", value: 10 },
  //     { date: "2023-01-02", value: 20 },
  //     { date: "2023-01-03", value: 15 },
  //   ];

  //   $scope.chartLabels = $scope.chartData.map(function (item) {
  //     return moment(item.date).format("DD/MM/YYYY");
  //   });
  //   $scope.chartData = [
  //     { hour: 0, value: 10 },
  //     { hour: 1, value: 20 },
  //     { hour: 2, value: 15 },
  //     // ... thêm dữ liệu cho các giờ khác
  //   ];

  //   // Chuyển đổi định dạng giờ thành label mong muốn (giờ:phút)
  //   $scope.chartLabels = $scope.chartData.map(function (item) {
  //     return (item.hour < 10 ? "0" : "") + item.hour + ":00";
  //   });
  $scope.chartData = [
    { month: 1, value: 100000 },
    { month: 2, value: 20 },
    { month: 3, value: 15 },
    // ... thêm dữ liệu cho các tháng khác
  ];
  console.log($scope.chartData);
  console.log($scope.listThongKe);

  // Chuyển đổi định dạng tháng thành label mong muốn (tháng/năm)
  var data = [5, 35, 20, 10, 0];

  // Tạo mảng màu sắc tương ứng
  var colors = ["red", "blue", "green", "orange", "purple"];

  // Lấy thẻ canvas và context
  var ctx = document.getElementById("myPieChart").getContext("2d");

  // Tạo biểu đồ tròn
  var myPieChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"],
      datasets: [
        {
          data: data,
          backgroundColor: colors,
        },
      ],
    },
    options: {
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            var dataset = data.datasets[tooltipItem.datasetIndex];
            var total = dataset.data.reduce(function (
              previousValue,
              currentValue,
              currentIndex,
              array
            ) {
              return previousValue + currentValue;
            });
            var currentValue = dataset.data[tooltipItem.index];
            var percentage = Math.floor((currentValue / total) * 100 + 0.5);
            return percentage + "%";
          },
        },
      },
      legend: {
        display: false,
      },
    },
  });

  // Tạo chú thích
  var legend = document.getElementById("chartLegend");
  var legendHTML = "";

  for (var i = 0; i < myPieChart.data.labels.length; i++) {
    legendHTML +=
      '<div class="list-group-item" style="background-color:' +
      colors[i] +
      ';">';
    legendHTML +=
      "<strong>" +
      myPieChart.data.labels[i] +
      "</strong>: " +
      data[i] +
      "%</div>";
  }

  legend.innerHTML = legendHTML;
  $scope.getData = function () {
    $http
      .get(thongKeAPI + "/hien-thi")
      .then(function (response) {
        $scope.listThongKe = response.data;
        console.log($scope.listThongKe);
        $scope.chartLabels = $scope.listThongKe.map(function (item) {
          return moment()
            .month(item.thang - 1)
            .year(item.nam)
            .format("MM/YYYY");
        });
        var ctx = document.getElementById("myChart").getContext("2d");
        var myChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: $scope.chartLabels,
            datasets: [
              {
                label: "Doanh thu",
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

  $scope.getData();
};

function buildGauge(wfreq) {
    var level = parseFloat(wfreq) * 20;
    var gData = [
      {
          domain: { x: [0, 1], y: [0, 1]},
          value: wfreq,
          title: { text: "Belly Button Wash Frequency" },
          type: "indicator",
          mode: "gauge",
          gauge: {
            axis: { range: [null, 9] },
            bar: {color: "purple"},
            steps: [
              { range: [0, 1], color: "rgb(250, 250, 110)" },
              { range: [1, 2], color: "rgb(181, 232, 119)" },
              { range: [2, 3], color: "rgb(119, 209, 131)" },
              { range: [3, 4], color: "rgb(63, 183, 141)" },
              { range: [4, 5], color: "rgb(0, 156, 143)" },
              { range: [5, 6], color: "rgb(0, 127, 134)" },
              { range: [6, 7], color: "rgb(28, 99, 115)" },
              { range: [7, 8], color: "rgb(37, 85, 102)" },
              { range: [8, 9], color: "rgb(42, 72, 88)" }
            ],
             threshold: {
                line: { color: "black", width: 5 },
                thickness: .70,
                value: wfreq
            }
          }
        }
      ];
      console.log("gData")
      console.log(gData)
      
      var gauge_layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
      var GAUGE = document.getElementById("gauge");
      Plotly.newPlot(GAUGE, gData, gauge_layout);
    }
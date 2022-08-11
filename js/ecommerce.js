$(function(){
    
    const commentary_desc_box = $('.table_style > tbody').find('tr');
    commentary_desc_box.on('click', function(e){
        e.preventDefault();

        if(!$(this).hasClass('on')) {
            $(this).addClass('on').siblings().removeClass('on');
        }else {
            $(this).removeClass('on');
        }
    })

    const getOrCreateTooltip = (chart) => {
        let tooltipEl = chart.canvas.parentNode.querySelector('.tooltipEl');
        
        if (!tooltipEl) {
            tooltipEl = document.createElement('div');
            tooltipEl.classList.add('tooltipEl');
            tooltipEl.style.background = 'rgba(255, 255, 255, 1.0)';
            tooltipEl.style.boxShadow = '0px 0px 5px #0000001A';
            tooltipEl.style.borderRadius = '22px';
            tooltipEl.style.padding = '14px 23px '
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.transition = 'all .1s ease';
          
            const table = document.createElement('div');
          
            tooltipEl.appendChild(table);
            chart.canvas.parentNode.appendChild(tooltipEl);
        }
        
        return tooltipEl;
    };

    let externalTooltipHandler = (context) => {
        const {chart, tooltip} = context;
        const tooltipEl = getOrCreateTooltip(chart);
        
        if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = 0;
            
            return;
        }
      
        const bodyLines = tooltip.body.map(b => b.lines);


        const tableBody = document.createElement('div');
        tableBody.style.display = 'flex';
        tableBody.style.flexDirection = 'column';
        tableBody.style.gap = '6px';

        bodyLines.forEach((body, i) => {
            
            const td = document.createElement('p');

            td.style.fontSize = '18px';
            td.style.lineHeight = '24px';
            td.style.letterSpacing = '-0.25px';
    
            const text = document.createTextNode(body);
    
            td.appendChild(text);
            tableBody.appendChild(td);
        });
        
        const tableRoot = tooltipEl.querySelector('div');
        
        while (tableRoot.firstChild) {
            tableRoot.firstChild.remove();
        }
        
        tableRoot.appendChild(tableBody);
      
        const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;
      
        tooltipEl.style.opacity = 1;
        tooltipEl.style.left = positionX + tooltip.caretX + 'px';
        tooltipEl.style.top = positionY - 120 + tooltip.caretY + 'px';
        tooltipEl.style.color = "#505050";
      
    };

    let getOrCreateLegendList = (chart, id) => {
        const legendContainer = document.getElementById(id);
        let listContainer = legendContainer.querySelector('ul');
        
        if (!listContainer) {
            listContainer = document.createElement('ul');
            legendContainer.appendChild(listContainer);
        }
      
        return listContainer;
    };
    const external_tooltip_handler_flow_chart = (context) => {
        
        const {chart, tooltip} = context;
        const flowline_tooltip = document.querySelector('.flowline_tooltip');
        const my_labels_data = document.querySelector('.first_data');
        const standard_label_data = document.querySelector('.seceond_data');
        
        if(chart.tooltip.dataPoints[0].dataIndex === 0){
            
            my_labels_data.innerText = "Drop off 0명"
            standard_label_data.innerText = "Drop off 0명"
        } else {
            my_labels_data.innerText = `Drop off ${flow_y1_data.y1_number[chart.tooltip.dataPoints[0].dataIndex - 1] - flow_y1_data.y1_number[chart.tooltip.dataPoints[0].dataIndex]}명`
            standard_label_data.innerText = `Drop off ${flow_y2_data.y2_number[chart.tooltip.dataPoints[0].dataIndex - 1] - flow_y2_data.y2_number[chart.tooltip.dataPoints[0].dataIndex]}명`
        }
  
        if (tooltip.opacity === 0) {
          flowline_tooltip.style.opacity = 0;
          return;
        }
      
        const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;
      
        flowline_tooltip.style.opacity = 1;
        flowline_tooltip.style.left = positionX + tooltip.caretX - 10 +'px';
        flowline_tooltip.style.top = positionY - 120 + tooltip.caretY + 30 + 'px';
        flowline_tooltip.style.color = "#505050";
        flowline_tooltip.style.pointerEvents = 'none';
      
    };
      
    const htmlLegendPlugin = {
        id: 'htmlLegend',
        afterUpdate(chart, args, options) {
            const ul = getOrCreateLegendList(chart, options.containerID);
            
            while (ul.firstChild) {
                ul.firstChild.remove();
            }
      
            const items = chart.options.plugins.legend.labels.generateLabels(chart);
            
            items.forEach(item => {
                const li = document.createElement('li');

                li.style.alignItems = 'center';
                li.style.cursor = 'pointer';
                li.style.display = 'flex';
                li.style.padding = '15px 27px';
                li.style.border = '1px solid #e8e8e8';
                li.style.borderRadius = '15px'
                li.style.backgroundColor = item.hidden ? '#F7F7F7' : ' #FFF'

                $('li').filter(':first-child').find('span').addClass('border_color');
        

         
                
                
                li.onclick = () => {
                    const {type} = chart.config;
                    
                    if (type === 'pie' || type === 'doughnut') {
                        chart.toggleDataVisibility(item.index);
                    } else {
                        chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
                    }

                    chart.update();
                };
      
                const boxSpan = document.createElement('span');

                boxSpan.style.background = item.hidden ? '#9A9A9A' : item.fillStyle;
                boxSpan.style.borderColor = item.hidden ? '#9A9A9A' : item.strokeStyle;
                boxSpan.style.borderWidth = '2px';
                boxSpan.style.borderRadius = '7px'
                boxSpan.style.display = 'inline-block';
                boxSpan.style.height = '24px';
                boxSpan.style.marginRight = '10px';
                boxSpan.style.width = '24px';
      
                const textContainer = document.createElement('p');

                textContainer.style.color = '#505050';
                textContainer.style.fontSize = '16px';
                textContainer.style.lineHeight = '24px';
      
                const text = document.createTextNode(item.text);

                textContainer.appendChild(text);
      
                li.appendChild(boxSpan);
                li.appendChild(textContainer);
                ul.appendChild(li);
            });
        }
    };

    const new_comer_num = [200,230,70,150,160,150,200];
    const revisitor_num = new_comer_num.map(item => item - 50);
    const total_visitor = revisitor_num.map((item, index) => item + new_comer_num[index]);
    const sales_count = [300, 500, 200, 250, 150,300,200];
    const sales_total = [400, 200, 300, 1000, 200, 200, 100];
    const repurchase_rate = [100, 200, 300, 400, 500, 300, 100];
    const product_purchase_num = [300, 500, 200, 250, 150, 100, 200];
    const purchase_conversion_rate = [60, 20, 10, 5, 10, 3, 2];
    const labels = ['07/24', '07/25', '07.26', '07/27', '07/28', '07/29', '07/30'];
    let selected_graph;

    const sales_trend_dropdown_box = document.querySelector('.sales_trend_dropdown_box');
    const sales_trend_dropdown_menu = document.querySelector('.sales_trend_dropdown_menu');
    const show_total_visitor_btn = document.querySelector('.show_total_visitor');

    const close_modal = (e) => {
        if(e.target.nodeName !== "A"){
            sales_trend_dropdown_box.classList.remove("show");
            show_total_visitor_btn.classList.remove('on');
        }
    }

    window.addEventListener('click', close_modal);

    show_total_visitor_btn.addEventListener('click', () => {
        sales_trend_dropdown_box.classList.toggle("show");
        show_total_visitor_btn.classList.add('on');
    });

    sales_trend_dropdown_menu.addEventListener("click",  (e) => {
        console.log('e.target = ', e.target);
        selected_graph = e.target.innerText;
        show_total_visitor_btn.innerHTML  = `<span class="btn_color border"></span>${selected_graph}`;
        
        console.log("selected_graph = ", selected_graph);
        if(selected_graph === "구매 수"){
            data.datasets[1].data = sales_count;
            data.datasets[1].label = "구매 수";
            sales_trend_chart.update();

        }else if (selected_graph === "매출액"){
            data.datasets[1].data = sales_total;
            data.datasets[1].label = "매출액";
            sales_trend_chart.update();

        }else if (selected_graph === "재 구매율"){
            data.datasets[1].data = repurchase_rate;
            data.datasets[1].label = "재 구매율";
            sales_trend_chart.update();

        }else if (selected_graph === "구매 상품 수"){
            data.datasets[1].data = product_purchase_num;
            data.datasets[1].label = "구매 상품 수";
            sales_trend_chart.update();

        }else {
            data.datasets[1].data = purchase_conversion_rate;
            data.datasets[1].label = "구매 전환율";
            sales_trend_chart.update();
        }

        sales_trend_dropdown_box.classList.remove("show");
    });

    const show_new_comer = (e) => {
        sales_trend_chart.show(0);
        sales_trend_chart.hide(1);
        sales_trend_chart.hide(2);
        sales_trend_chart.update();
    }

    const show_total_visitor = (e) => {
        sales_trend_chart.show(2);
        sales_trend_chart.hide(1);
        sales_trend_chart.hide(0);
        sales_trend_chart.update();
    }

    const data = {
        labels: labels,
        datasets: [
            {
                label: '신규 방문자 수',
                data: new_comer_num,
                backgroundColor: '#FFF0CC',
                borderWidth: 2,
                borderRadius: 20,
                borderColor: '#FFF0CC',
                order: 2,
                barPercentage: 0.3,
            },
            {
                label: '매출액',
                data: sales_total,
                type: 'line',
                tension: 0.1,
                order: 0,
                backgroundColor: "white",
                borderColor: '#FFB300',
                borderWidth: 2,
                pointRadius: 6,
            }
        ]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            animation: {
            duration: 0
        },
        layout: {
            padding: {
                left: 50,
                right: 50
            }
        },
            scales: {
                    x: { 
                        stacked: true,
                        grid : {
                            display: false,
                            drawBorder: false,
                        },
                    }, 
                    y: { 
                        beginAtZero: true,
                        grid : {
                            lineWidth: 0.5,
                            drawBorder: false,
                        },
                        ticks: {
                             stepSize: 100,
                            //  steps: 5, 
                        }
                    }
                },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
              displayColors: false,
              mode: 'index',
              position: 'average',
              external: externalTooltipHandler
            }
          },
        },
      };

    sales_trend_chart = new Chart(
        document.querySelector('.sales_trend_canvas'),
        config
    );


    const dual_profit = [15, 20, 60, 94, 100];
    const dual_purchases = [20, 50, 40, 34, 60];
    const dual_line_data = ['07/24', '07/25', '07.26', '07/27', '07/28'];
    
    const dual_line_chart = {
        labels: dual_line_data,
        datasets: [
            {
                label: "수익",
                data: dual_profit,
                fill: false,
                backgroundColor: "#FFB300",
                borderColor: "#FFB300",
                pointBackgroundColor: "#FDB309", // 수정
                pointRadius: 5,
                tension: 0.4
            },
            {
                label: "구매수",
                fill: false,
                borderColor: "#00AF91",
                backgroundColor: "#00AF91",
                pointBackgroundColor: "#00AF91", //수정
                pointRadius: 5,
                data: dual_purchases,
                tension: 0.4
            }
        ]
    };


    const dual_data = {
        type: 'line',
        data: dual_line_chart,
        options: {
            animation: {
            duration: 0
        },
        bezierCurve: true,
        interaction: {
            intersect: false,
            mode: 'index',
        },
        scales: {
            x: {
                beginAtZero: true,
                grid : {
                    display: false, // grid 속성 추가
                },
                ticks: {
                    font: {
                        size: 16,
                    },
                    color: '#707070',
                },
            },
            y: {
                beginAtZero: true,
                grid : {
                    lineWidth: 0.5,
                    drawBorder: false,
                },
                ticks: {

                    min: 0,
                    stepSize : 25,
                    font: {
                        size: 16,
                    },
                    color: '#707070',
                    padding: 20
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            htmlLegend: {
                containerID: 'dual_container',
            },
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
                displayColors: false,
                mode: 'index',
                position: 'average',
                external: externalTooltipHandler
            }
        },
    },plugins: [htmlLegendPlugin]};

    myChart = new Chart(
        document.getElementById('dual_chart'),
        dual_data
    );

    const flow_x_data = [2000,1600,123,50];
    const flow_y1_data = {
        y1_percent: [100,60,15,0],
        y1_number: [2000,1600,453,123],
    };
  
    const flow_y2_data = {
        y2_percent: [100,40,10,0],
        y2_number: [2000,1200,353,100],
    };
  
    const flowline_my_labels = document.querySelectorAll('.first_labels');
    const flowline_standard_labels = document.querySelectorAll('.seceond_labels');
  
    flowline_my_labels.forEach((item, index) => item.innerText = `${flow_y1_data.y1_number[index]}명`);
    flowline_standard_labels.forEach((item, index) => item.innerText = `${flow_y2_data.y2_number[index]}명`);
  
    const flowChart_x_axis = flow_x_data.map(item => `${item}명`);
    
    const flowChart_data = {
        labels: flowChart_x_axis,
        datasets: [
            {
            label: "나의 사이트",
              type: 'line',
              data: flow_y1_data.y1_percent,
              pointLabelFontSize : 4,
              borderWidth: 2,
              fill: 'false',
              lineTension: 0,
              borderColor: "#FFB300",
              backgroundColor: "rgba(255, 179, 0, 0.2)",
              pointBackgroundColor: '#FFB300',
              borderWidth: 2,
              pointRadius: 6,
              pointHitRadius: 10,
              spanGaps: false,
              fill: true,
              order: 1
            },
            {
                label: "업계 표준",
                type: 'line',
                data: flow_y2_data.y2_percent,
                pointLabelFontSize : 4,
                borderWidth: 2,
                fill: 'false',
                lineTension: 0,
                borderColor: "#6200FF",
                backgroundColor: "rgba(98, 0, 255, 0.15)",
                pointBackgroundColor: '#6200FF',
                borderWidth: 2,
                pointRadius: 6,
                pointHitRadius: 10,
                spanGaps: false,
                fill: true,
                order: 0
              },
        ]
    };
      
    const flowChart_config = {
        type: 'bar',
        data: flowChart_data,
        options: {
          legend: {
            display: false,
            labels: {
                fontColor: "blue",
                fontSize: 100,
                boxWidth: 40,
                boxHeight: 50,
                color: "black"
            }
        },
            scales: {
                    x: { 
                        display: false,
                        stacked: true,
                        grid : {
                            drawBorder: false,
                        }
                    }, 
                    y: { 
                        beginAtZero: true,
                        grid : {
                            lineWidth: 0.5,
                            drawBorder: false
                        },
                        ticks: {
                          min: 0,
                          callback: function(value) {
                            return value + "%"
                        },
                          stepSize : 25,
                          font: {
                            size: 18
                        },
                        padding: 20
                    }
                    }
                },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            htmlLegend: {
                containerID: 'dual_flow_container',
            },
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
              displayColors: false,
              mode: 'index',
              position: 'average',
              external: external_tooltip_handler_flow_chart
            }
          },
        },plugins: [htmlLegendPlugin]};
    
    floawChart = new Chart(
        document.getElementById('flowline_chart'),
        flowChart_config
    );

    const radar_01 = [15, 20, 60, 94, 100];
    const radar_02 = [20, 50, 40, 34, 60];
    const radar_data = ['카테고리1', '카테고리2', '카테고리3', '카테고리4', '카테고리5',];
    
    const radar_chart = {
        labels: radar_data,
        datasets: [
            {
                label: "수익",
                data: radar_01,
                fill: true,
                backgroundColor: 'rgba(255, 179, 0, 0.3)',
                borderColor: 'rgb(255, 179, 0)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)',
                borderWidth: 1,
                pointRadius: 0
            },
            {
                label: "거래수",
                data: radar_02,
                fill: true,
                backgroundColor: 'rgba(98, 0, 255, 0.2)',
                borderColor: 'rgb(98, 0, 255)',
                pointBackgroundColor: 'rgb(54, 162, 235)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(54, 162, 235)',
                borderWidth: 1,
                pointRadius: 0
            }
        ]
    };


    const radar_chart_data = {
        type: 'radar',
        data: radar_chart,
        options: {
            animation: {
            duration: 0
        },
        bezierCurve: true,
        interaction: {
            intersect: false,
            mode: 'index',
        },
        scales: {
            r: {
                suggestedMin: 0,
                suggestedMax: 100,
                stepSize: 10,
                grid : {
                    color: '#EDEDED',
                },
                ticks: {
                    beginAtZero: true,
                    color: 'white',
                    showLabelBackdrop: false,
                    stepSize: 30
                },
                angleLines: {
                    color: '#EDEDED'
                },
                pointLabels: {
                    color: 'black',
                    font: {
                        size: 20
                    }
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            htmlLegend: {
                containerID: 'radar_contaienr',
            },
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
                displayColors: false,
                mode: 'index',
                position: 'average',
                external: externalTooltipHandler
            }
        },
    },plugins: [htmlLegendPlugin]};

    myChart = new Chart(
        document.getElementById('radar_chart'),
        radar_chart_data
    );

});

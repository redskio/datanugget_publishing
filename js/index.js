$(function() {
    
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
        
        if(chart.tooltip.dataPoints[0].dataIndex === 0){
            my_labels_data.innerText = "Drop off 0명"
        } else {
            my_labels_data.innerText = `Drop off ${flow_y1_data.y1_number[chart.tooltip.dataPoints[0].dataIndex - 1] - flow_y1_data.y1_number[chart.tooltip.dataPoints[0].dataIndex]}명`
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

    const new_visit = [200,230,70,150,160,150,200];
    const re_visit = new_visit.map(item => item - 50);
    const total_visit = re_visit.map(item => item + 10);
    const visit_data = ['07/24', '07/25', '07.26', '07/27', '07/28'];
    
    const visit_chart = {
        labels: visit_data,
        datasets: [
            {
                label: '신규 방문자 수',
                data: new_visit,
                backgroundColor: '#FFF0CC',
                borderWidth: 2,
                borderRadius: 20,
                borderColor: '#FFF0CC',
                order: 2,
                barPercentage: 0.3,
            },
            {
                label: '재방문자 수',
                data: re_visit,
                backgroundColor:'#FFB300',
                borderWidth: 1,
                borderColor: '#FFB300',
                borderRadius: 20,
                order: 1,
                barPercentage: 0.3,
            },
            {
                label: '구매 수',
                data: total_visit,
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
        data: visit_chart,
        options: {
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
                        ticks: {
                            font: {
                                size: 18
                            },
                            color: '#707070'
                        }
                    }, 
                    y: { 
                        beginAtZero: true,
                        grid : {
                            lineWidth: 0.5,
                            drawBorder: false,
                        },
                        ticks: {
                            font: {
                                size: 18
                            },
                            color: '#707070'
                        }
                    }
                },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            htmlLegend: {
                // ID of the container to put the legend in
                containerID: 'visit_container',
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
        document.getElementById('visitstatus'),
        config
    );

    const best_num = [200,230,70,150,160,150,200];
    const best_total = best_num.map(item => item - 50);
    const best_data = ['페이지이름', '페이지이름', '페이지이름', '페이지이름', '페이지이름'];
    
    const best_chart = {
        labels: best_data,
        datasets: [
            {
                label: '페이지 뷰 수',
                data: best_num,
                backgroundColor: '#FFF0CC',
                borderWidth: 2,
                borderRadius: 20,
                borderColor: '#FFF0CC',
                order: 2,
                barPercentage: 0.3,
            },
            {
                label: '총 이벤트 수',
                data: best_total,
                backgroundColor:'#FFB300',
                borderWidth: 1,
                borderColor: '#FFB300',
                borderRadius: 20,
                order: 1,
                barPercentage: 0.3,
            }
        ]
    };

    const bestpage_data = {
        type: 'bar',
        data: best_chart,
        options: {
            scales: {
                x: { 
                    stacked: true,
                    grid : {
                        display: false,
                    },
                    ticks: {
                        font: {
                            size: 16
                        },
                        color: '#707070'
                    }
                }, 
                y: { 
                    beginAtZero: true,
                    grid : {
                        lineWidth: 0.5,
                        drawBorder: false,
                    },
                    ticks: {
                        font: {
                            size: 16
                        },
                        color: '#707070'
                    }
                }
            },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            htmlLegend: {
                // ID of the container to put the legend in
                containerID: 'best_container',
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
    },
    plugins: [htmlLegendPlugin]};

    myChart = new Chart(
        document.getElementById('bestChart'),
        bestpage_data
    );

    const worst_num = [200,230,70,150,160,150,200];
    const worst_total = worst_num.map(item => item - 50);
    const worst_data = ['페이지이름', '페이지이름', '페이지이름', '페이지이름', '페이지이름'];
    
    const worst_chart = {
        labels: worst_data,
        datasets: [
            {
                label: '참여율',
                data: worst_num,
                backgroundColor: '#EBEBEB',
                borderWidth: 2,
                borderRadius: 20,
                borderColor: '#EBEBEB',
                order: 2,
                barPercentage: 0.3,
            },
            {
                label: '참여 시간',
                data: worst_total,
                backgroundColor:'#505050',
                borderWidth: 1,
                borderColor: '#505050',
                borderRadius: 20,
                order: 1,
                barPercentage: 0.3,
            }
        ]
    };

    const worstpage_data = {
        type: 'bar',
        data: worst_chart,
        options: {
            scales: {
                x: { 
                    stacked: true,
                    grid : {
                        display: false,
                    },
                    ticks: {
                        font: {
                            size: 16
                        },
                        color: '#707070'
                    }
                }, 
                y: { 
                    beginAtZero: true,
                    grid : {
                        lineWidth: 0.5,
                        drawBorder: false,
                    },
                    ticks: {
                        font: {
                            size: 16
                        },
                        color: '#707070'
                    }
                }
            },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            htmlLegend: {
                containerID: 'worst_container',
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
    }, 
    plugins: [htmlLegendPlugin]};
    
    myChart = new Chart(
        document.getElementById('worstChart'),
        worstpage_data
    );

    const flow_x_data = [2000,1600,453,123];
    const flow_y1_data = {
        y1_percent: [100, (flow_x_data[1] / flow_x_data[0]) * 100, (flow_x_data[2] / flow_x_data[0]) * 100, (flow_x_data[3] / flow_x_data[0]) * 100],
        y1_number: [2000,1600,453,123],
    };
    const flowline_my_labels = document.querySelectorAll('.first_labels');
    flowline_my_labels.forEach((item, index) => item.innerText = `${flow_y1_data.y1_number[index]}명`);
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
    }};
    
    myChart = new Chart(
        document.getElementById('flowline_chart'),
        flowChart_config
    );

const canvas = document.querySelector('#flow')
    const flowline_percent_boxes = document.querySelectorAll('.flowline_percent_box > div');
    const percent_title_standard = (document.getElementById('flowline_chart').height) / 2;
    
    flowline_percent_boxes[0].innerText = Math.round(flow_y1_data.y1_percent[0]) + "%";
    flowline_percent_boxes[1].innerText = Math.round(flow_y1_data.y1_percent[1]) + "%";
    flowline_percent_boxes[2].innerText = Math.round(flow_y1_data.y1_percent[2]) + "%";
    flowline_percent_boxes[3].innerText = Math.round(flow_y1_data.y1_percent[3]) + "%";
    flowline_percent_boxes[0].style.bottom = percent_title_standard * flow_y1_data.y1_percent[0] / 100 + 40 + "px";
    flowline_percent_boxes[1].style.bottom = percent_title_standard * flow_y1_data.y1_percent[1] / 100 + 40 + "px";
    flowline_percent_boxes[2].style.bottom = percent_title_standard * flow_y1_data.y1_percent[2] / 100 + 40 + "px";
    flowline_percent_boxes[3].style.bottom = percent_title_standard * flow_y1_data.y1_percent[3] / 100 + 40 + "px";
    // flowline_tooltip.style.top = positionY - 120 + tooltip.caretY + 30 + 'px';
})
//
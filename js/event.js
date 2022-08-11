document.addEventListener('DOMContentLoaded', function(){
    let dataset = {
        data1: 
        [
            { label: 'Facebook', count: 10, rate: '10%' }, 
            { label: 'Twitter', count: 20, rate: '20%' },
            { label: 'Tumblr', count: 30, rate: '30%' },
            { label: 'Instagram', count: 40, rate: '40%' }
        ],
        data2: 
        [
            { label: 'Facebook', count: 10, rate: '10%' }, 
            { label: 'Twitter', count: 20, rate: '20%' },
            { label: 'Tumblr', count: 30, rate: '30%' },
            { label: 'Instagram', count: 40, rate: '40%' }
        ],
        data3: 
        [
            { label: 'Facebook', count: 10, rate: '10%' }, 
            { label: 'Twitter', count: 20, rate: '20%' },
            { label: 'Tumblr', count: 30, rate: '30%' },
            { label: 'Instagram', count: 40, rate: '40%' }
        ],
        data4: 
        [
            { label: 'Facebook', count: 10, rate: '10%' }, 
            { label: 'Twitter', count: 20, rate: '20%' },
            { label: 'Tumblr', count: 30, rate: '30%' },
            { label: 'Instagram', count: 40, rate: '40%' }
        ],
    };
    
    dataset.data1 = dataset.data1.sort((a, b) => b.count - a.count);
    dataset.data2 = dataset.data2.sort((a, b) => b.count - a.count);
    dataset.data3 = dataset.data3.sort((a, b) => b.count - a.count);
    dataset.data4 = dataset.data4.sort((a, b) => b.count - a.count);

    const width = 360;
    const height = 360;
    const radius = Math.min(width, height) / 2;
    const donutWidth = 40;
    
    const color = d3
                .scaleOrdinal()
                .range(['#FFB300', '#FFECBE', '#00AF91', '#6200FF']); // 색상 수정

    const num_of_donuts = 4;
    const svgs = [];
    
    for(let i = 0; i < num_of_donuts; i++){
        svgs[i] = d3
                .select(`#circle_0${i}`)
                .append('svg')
                .attr('class', 'scroll_svg')
                .attr("viewBox", `0 0 ${width} ${height}`)
                .style('position', 'relative')
                .append('g')
                .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');
    }
    
    const arc = d3
                .arc()
                .innerRadius(radius - donutWidth)
                .outerRadius(radius);
    
    const pie = d3
                .pie()
                .value((d) => { return d.count; })
                .sort(null);
    
    const paths = [];
    let k = 0;

    for (var key in dataset) {
        paths[k] = svgs[k]
                    .selectAll('path')
                    .data(pie(dataset[key]))
                    .enter()
                    .append('path')
                    .attr('d', arc)
                    .attr('fill', function(d, i) { 
                        return color(d.data.label);
                    })

    k++;
    }

    const tooltip_handlers = [];

    for(let i = 0; i < num_of_donuts ; i++){
        tooltip_handlers[i] = (e) => {
            tooltips_div[i].style('display', 'block');
            tooltips_div[i].style('top', `${d3.pointer(e, e.target.parentNode.parentNode.parentNode)[1] - 150}px`);
            tooltips_div[i].style('left', `${d3.pointer(e, e.target.parentNode.parentNode.parentNode)[0] + 50}px`);
        }
    }

    for(let i = 0; i < num_of_donuts ; i++){
        paths[i]
            .on('mouseover', tooltip_handlers[i])
            .on('mousemove', tooltip_handlers[i])
            .on('mouseout', (d) => {
                tooltips_div[i].style('display', 'none');
            });
    }
    
    const tooltips_div = [];

    for(let i =0 ; i < num_of_donuts ; i++){
        tooltips_div[i] = d3
                        .select(`#circle_0${i}`)
                        .append('div')                 
                        .attr('class', 'tooltip_container');     

        const tooltip_tit = tooltips_div[i]
            .append('div')            
            .attr('class', 'scroll_tooltip_title')
        
        tooltip_tit
            .append('span')       
            .attr('class', 'tooltip_tit')
            .text('분류')

        tooltip_tit
            .append('span')       
            .attr('class', 'tooltip_tit')
            .text('방문자 수')

        tooltip_tit
            .append('span')       
            .attr('class', 'tooltip_tit')
            .text('비율')
    }

    let a = 0;
    
    for (let key in dataset) {
        for (let i = 0; i < 4; i++) {
            const tooltip_desc = tooltips_div[a]
                .data(dataset[key])
                .append('div')            
                .attr('class', 'visitor_row') 
    
            tooltip_desc
                .append('span')            
                .attr('class', 'btn_color')
                .style('background-color', color.range()[i]);
    
            tooltip_desc
                .append('span')            
                .attr('class', 'scroll_visitor_num') 
    
            tooltip_desc
                .append('span')            
                .attr('class', 'scroll_visitor_rate') 
        }

    a++;
    }
    
    let b = 0;

    for (let key in dataset) {
        for(let k = 0; k < num_of_donuts; k++){
            d3
            .select(`#circle_0${k}`)
            .selectAll('.scroll_visitor_num')
            .data(dataset[key])
            .text((d) => {
                return d.count+'명';
            })
            .enter();
        
            d3
            .select(`#circle_0${k}`)
            .selectAll('.scroll_visitor_rate')
            .data(dataset[key])
            .text((d) => {
                return d.rate;
            })
            .enter()
        }
            d3
            .select(`#circle_0${b}`)
            .append('span')
            .style('width', `${width/2}px`)
            .attr('class', 'scroll_page_title')
            .attr("transform", "translate(-50%, -50%)")
            .text("페이지 이름");

    b++;
    }

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

                boxSpan.style.background = item.hidden ? '#9A9A9A' : item.fillStyle
                boxSpan.style.borderColor = item.strokeStyle;
                boxSpan.style.border = '1px solid transparent';
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
                    }
                }, 
                y: { 
                    beginAtZero: true,
                    grid : {
                        lineWidth: 0.5,
                        drawBorder: false,
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
                    }
                }, 
                y: { 
                    beginAtZero: true,
                    grid : {
                        lineWidth: 0.5,
                        drawBorder: false,
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
    
    worstChart = new Chart(
        document.getElementById('worstChart'),
        worstpage_data
    );
})


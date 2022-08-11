$(function() {

    const tabActive = $('.profile_table > a');

    tabActive.on('click', function(e){
        e.preventDefault();

        const Titie = $(this).attr('href');
        
        $(Titie).addClass('active').siblings().removeClass('active');
        $(this).addClass('on').siblings().removeClass('on');

    })
    tabActive.eq(0).trigger('click');
    
    const hitmapactive = $('.heatmap_table .heatmap_show');
    
    hitmapactive.on('click', function(e){
            e.preventDefault();

            $(this).addClass('active').siblings().removeClass('active');

    })
    
    let dataset = {
        data1:
        [
            { label: 'Facebook', count: 50, rate: '50%' }, 
            { label: 'Twitter', count: 50, rate: '50%' },
        ],
        data2:
        [
            { label: 'Facebook', count: 70, rate: '50%' }, 
            { label: 'Twitter', count: 30, rate: '50%' },
        ],
        data3:
        [
            { label: 'Facebook', count: 100, rate: '50%' }, 
            { label: 'Twitter', count: 1000, rate: '50%' },
        ],
    };
    
    // dataset.data1 = dataset.data1.sort((a, b) => b.count - a.count);
    // dataset.data2 = dataset.data2.sort((a, b) => b.count - a.count);
    // dataset.data3 = dataset.data3.sort((a, b) => b.count - a.count);
    
    const width = 360;
    const height = 360;
    const radius = Math.min(width, height) / 2;
    const donutWidth = 30;
    
    const color = d3
                .scaleOrdinal()
                .range(['#FFB300', '#EDEDED']);
    
    const num_of_donuts = 3;
    const svgs = [];
    const profile_img_width = 250;
    const profile_img_height = 250;
    
    for(let i = 0; i < num_of_donuts; i++){
        svgs[i] = d3
                .select(`#circle_0${i}`)
                .append('svg')
                .attr('class', 'scroll_svg')
                .attr("viewBox", `0 0 ${width} ${height}`)
                .append('g')
                .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')')
                
                d3
                .select(`#circle_0${i} > .scroll_svg`)
                .append("image")
                .attr('x', (width / 2) - (profile_img_width / 2))
                .attr('y', (height / 2) - (profile_img_height / 2))
                .attr('width', profile_img_width)
                .attr('height', profile_img_height)
                .attr("xlink:href", "../images/man_profile.png");
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

const bubble_container_width = 564;
const bubble_container_height = 332;
const bubble_radius = 55;
const bubble_size_ratio = 1 / 10;

const svgcontainer = d3
    .select("#bubble_chart")
    .append("svg")
    .attr("viewBox", `0 0 ${bubble_container_width} ${bubble_container_height}`)
    .append("g")
    .attr('class','buuble_container')


colors = ["#fff0cc","#dfccff","#ccefe9","#E6E6E6", "#E6E6E6", "#E6E6E6", "#E6E6E6"]
fontfill = ["#FFB300","#6200FF","#00AF91","#6F6F6F", "#6F6F6F", "#6F6F6F", "#6F6F6F"]

const bubble_coord = [
    {
        circle_info: {
            x: bubble_container_width * (4 / 9),
            y: bubble_container_height / 2,
            r: bubble_radius * bubble_size_ratio * 15,
            text: "기초 화장품",
            percent: "56%",
            class_name: 'bubble1',
            color: colors[0],
            fill: fontfill[0]
            }
    },
    {
        circle_info: {
            x: bubble_container_width * (7 / 9),
            y: bubble_container_height * (2 / 9),
            r: bubble_radius * bubble_size_ratio * 13,
            text: "파운데이션",
            percent: "34%",
            class_name: 'bubble2',
            color: colors[1],
            fill: fontfill[1]
        }
    },
    {
        circle_info: {
            x: bubble_container_width * (1 / 5),
            y: bubble_container_height * (2 / 3),
            r: bubble_radius * bubble_size_ratio * 10,
            text: "수부지",
            percent: "25%",
            class_name: 'bubble3',
            color: colors[2],
            fill: fontfill[2]
        }
    },
    {
        circle_info: {
            x: bubble_container_width * (1 / 7),
            y: bubble_container_height * (1 / 4),
            r: bubble_radius * bubble_size_ratio * 9,
            text: "피부타입",
            percent: "25%",
            class_name: 'bubble4',
            color: colors[3],
            fill: fontfill[3]
        }
    },
    {
        circle_info: {
            x: bubble_container_width * (5 / 7),
            y: bubble_container_height * (3 / 4),
            r: bubble_radius * bubble_size_ratio * 8,
            text: "스킨",
            percent: "12%",
            class_name: 'bubble5',
            color: colors[4],
            fill: fontfill[4]
        }
    },
    {
        circle_info: {
            x: bubble_container_width * (6 / 7),
            y: bubble_container_height * (2 / 3),
            r: bubble_radius * bubble_size_ratio * 7,
            text: "로션",
            percent: "6%",
            class_name: 'bubble6',
            color: colors[5],
            fill: fontfill[5]
        }
    },
    {
        circle_info: {
            x: bubble_container_width * (5 / 9),
            y: bubble_container_height * (1 / 6),
            r: bubble_radius * bubble_size_ratio * 5,
            text: "에센스",
            percent: "3%",
            class_name: 'bubble7',
            color: colors[6],
            fill: fontfill[6]
        }
    },
]

let center_circle;
let center_text;
let center_percent;

const center_target_coord = {
    x:bubble_container_width / 2,
    y:bubble_container_width / 2
};

const switch_circle = (e, d) => {
    
    //target group
    const target_circle = d3.select(`.${e.target.parentNode.className.baseVal} > circle`);
    const target_text = d3.select(`.${e.target.parentNode.className.baseVal} > text`);
    const target_percent = d3.select(`.${e.target.parentNode.className.baseVal} > .bubble_percent`);

    const target_circle_info = {
        cx: target_circle.attr('cx'),
        cy: target_circle.attr('cy'),
    }
    
    const target_text_info = {
        dx: target_text.attr('dx'),
        dy: target_text.attr('dy'),
    }

    const target_percent_info = {
        dx: target_percent.attr('dx'),
        dy: target_percent.attr('dy'),
    }

    const center_circle_info = {
        cx: center_circle.attr('cx'),
        cy: center_circle.attr('cy'),
    }

    const center_text_info = {
        dx: center_text.attr('dx'),
        dy: center_text.attr('dy'),
    }

    const center_percent_info = {
        dx: center_percent.attr('dx'),
        dy: center_percent.attr('dy'),
    }

    center_circle
        .transition()
        .attr('cx', target_circle_info.cx)
        .attr('cy', target_circle_info.cy)
          .duration(750)

    center_text
        .transition()
        .attr('dx', target_text_info.dx)
        .attr('dy', target_text_info.dy)
        .duration(750)

    center_percent
        .transition()
        .attr('dx', target_percent_info.dx)
        .attr('dy', target_percent_info.dy)
        .duration(750)

    target_circle
        .transition()
        .attr('cx', center_circle_info.cx)
        .attr('cy', center_circle_info.cy)
          .duration(750);

    target_text
        .transition()
        .attr('dx', center_text_info.dx)
        .attr('dy', center_text_info.dy)
        .duration(750);

    target_percent
        .transition()
        .attr('dx', center_percent_info.dx)
        .attr('dy', center_percent_info.dy)
        .duration(750);
    
    center_circle = target_circle;
    center_text = target_text;
    center_percent = target_percent;
}

const elem = svgcontainer.selectAll("g")
    .data(bubble_coord);

const elemEnter = elem.enter()
    .append("g")
    .attr("class",function(d){ return d.circle_info.class_name;})

const circle = elemEnter.append("circle")
    .attr("cx",function(d){ return d.circle_info.x;})
    .attr("cy",function(d){ return d.circle_info.y;})
    .attr("r",function(d){ return d.circle_info.r;})
    .style("fill",function(d){ return d.circle_info.color;})
    .attr('class', 'circle');
    

const circle_text = elemEnter
    .append("text")
    .attr('class', 'bubble_text')
    .attr("dx",function(d){ return d.circle_info.x;})
    .attr("dy",function(d){ return d.circle_info.y;})
    .style('font-size', '1px')
    .style('text-anchor', 'middle')
    .style('alignment-baseline', 'alphabetical')
    .style('fill', function(d){return d.circle_info.fill})
    .style("font-size", function(d) { return Math.min(1 * d.circle_info.r, (2 * d.circle_info.r - 10) / 5) + "px"; })
    .text(function(d){ return d.circle_info.text;})

    elemEnter
        .append("text")
        .attr('class', 'bubble_percent')
        .attr("dx",function(d){ return d.circle_info.x;})
        .attr("dy",function(d){ return d.circle_info.y + 10;})
        .style('text-anchor', 'middle')
        .style('alignment-baseline', 'hanging')
        .style('fill', function(d){return d.circle_info.fill})
        .style("font-size", function(d) { return Math.min(1 * d.circle_info.r, (2 * d.circle_info.r - 10) / 8) + "px"; })
        .text(function(d){ return d.circle_info.percent;})

elemEnter.on('click', switch_circle);

center_circle = d3.select('.bubble1 > circle');
center_text = d3.select('.bubble1 > text');
center_percent = d3.select('.bubble1 .bubble_percent');
})
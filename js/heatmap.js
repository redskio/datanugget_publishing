document.addEventListener('DOMContentLoaded', function(){
    const today = new Date();
    const month = 8;
    const date = 1;
    
    const data = {
        row: ['row1','row2','row3','row4','row5','row6','row7'],
        row_title: ['0주째', '1주째', '2주째', '3주째', '4주째'],
        percent: [100, 5, 4, 3, 2],
        column_title: ['', '모든 사용자', '05.01 - 05.07', '05.08 - 05.14', '05.15 - 05.21', '05.22 - 05.28', '05.29 - 05.31',],
        period1_data: {
            user_num: [50,12,10,4,6],
            period_category: [
                `${month}.${date} - ${month}.${date + 6}`,
                `${month}.${date + 7} - ${month}.${date + 13}`,
                `${month}.${date + 14} - ${month}.${date + 20}`,
                `${month}.${date + 21} - ${month}.${date + 27}`,
                `${month}.${date + 28} - ${month}.${date + 30}`,
                ]},
    
        period2_data: {
            user_num: [40,12,5,4],
            period_category: [
                `${month}.${date + 7} - ${month}.${date + 13}`,
                `${month}.${date + 14} - ${month}.${date + 20}`,
                `${month}.${date + 21} - ${month}.${date + 27}`,
                `${month}.${date + 28} - ${month}.${date + 30}`,
                ]},
        period3_data: {
            user_num: [60,12,2],
            period_category: [
                `${month}.${date + 14} - ${month}.${date + 20}`,
                `${month}.${date + 21} - ${month}.${date + 27}`,
                `${month}.${date + 28} - ${month}.${date + 30}`,
                ]},
        period4_data: {
            user_num: [60,3],
            period_category: [
                `${month}.${date + 21} - ${month}.${date + 27}`,
                `${month}.${date + 28} - ${month}.${date + 30}`,
                ]},
        period5_data: {
            user_num: [40],
            period_category: [
                `${month}.${date + 28} - ${month}.${date + 30}`,
                ]   
    },
    };

    const handle_mouseover = (e, d) => {   
        const index = parseInt(e.target.dataset.id);
        const period_data = d.period_category[index];
        const user_rate = Math.round((d.user_num[index] / d.user_num[0]) * 100) + "%";
        const user_num = d.user_num[index];

        let pointer_y;
        if(e.target.nodeName === 'SPAN'){
            pointer_y = d3.pointer(e, e.target.parentNode.parentNode.parentNode.parentNode)[1]
        }else{
            pointer_y = d3.pointer(e, e.target.parentNode.parentNode.parentNode)[1]
        }
        heatmap_tooltip
        .style("opacity", 1)
        .html(`${period_data}<br>사용자 유지율:${user_rate}<br>사용자 수:${user_num}명`)
        .style("left", d3.pointer(e, e.target.parentNode.parentNode.parentNode)[0] + 700 + "px")
        .style("top", pointer_y  + "px")
    
    }
    
    const handle_mousemove = (e, d) => {
        const index = parseInt(e.target.dataset.id);
        const period_data = d.period_category[index];
        const user_rate = Math.round((d.user_num[index] / d.user_num[0]) * 100) + "%";
        const user_num = d.user_num[index];
    
        let pointer_y;
        if(e.target.nodeName === 'SPAN'){
            pointer_y = d3.pointer(e, e.target.parentNode.parentNode.parentNode.parentNode)[1]
        }else{
            pointer_y = d3.pointer(e, e.target.parentNode.parentNode.parentNode)[1]
        }
        heatmap_tooltip
        .style("opacity", 1)
        .html(`${period_data}<br>사용자 유지율:${user_rate}<br>사용자 수:${user_num}명`)
        .style("left", d3.pointer(e, e.target.parentNode.parentNode.parentNode)[0] + 700 + "px")
        .style("top", pointer_y  + "px")
    }
    
    const handle_mouseout = (e) => {
        console.log("mouse out");
        heatmap_tooltip
          .style("opacity", 0)
    }
    
    const rows_div = d3.select('#heatmap_graph').selectAll('div')
        .data(data.row)
        .enter()
        .append('div')
        .attr('class', 'heatmap_container d-flex align-items-center')
    
    const column_titles = rows_div.append('div')
        .data(data.column_title)
        .attr('class', 'column_title')
        .text(function(d) { return  d });
    
    const rows = rows_div.append('div')
        .data(data.row)
        .attr('class', function(d) { return  d })
        
    const row1 = d3.select('.row1').selectAll('div')
        .data(data.row_title)
        .enter()
        .append('div')
        .attr('class', 'cell')
        .text(function(d){
            return d;
        })
    
    const row2 = d3.select('.row2').selectAll('div')
        .data(data.percent)
        .enter()
        .append('div')
        .attr('class', 'cell')
        .text(function(d){
            return d;
        })
    
    const row3 = d3.select('.row3').selectAll('div')
        .data([data.period1_data])
        .enter()
        
        for(let i = 0; i < data.period1_data.user_num.length; i++){
            const temp_row = row3.append('div')
            .attr('class', 'cell week1 flow_box')
            .attr('data-id', i)
            .on('mouseover', handle_mouseover)
            .on('mousemove', handle_mousemove)
            .on('mouseout', handle_mouseout); 
            temp_row.append('span')
            .attr('class', 'cell_title cell_info')
            .text('재방문률')
            .attr('data-id', i)
            temp_row.append('span')
            .attr('class', 'cell_data cell_info')
            .text(function(d){
                return (Math.round((d.user_num[i] / d.user_num[0]) * 100) + "%");
            })
            .attr('data-id', i)
        }
    
    const row4 = d3.select('.row4').selectAll('div')
        .data([data.period2_data])
        .enter()
        
        for(let i = 0; i < data.period2_data.user_num.length; i++){
            const temp_row = row4.append('div')
            .attr('class', 'cell week2 flow_box')
            .attr('data-id', i)
            .on('mouseover', handle_mouseover)
            .on('mousemove', handle_mousemove)
            .on('mouseout', handle_mouseout); 
            temp_row.append('span')
            .attr('class', 'cell_title cell_info')
            .text('재방문률')
            .attr('data-id', i)
            temp_row.append('span')
            .attr('class', 'cell_data cell_info')
            .text(function(d){
                return (Math.round((d.user_num[i] / d.user_num[0]) * 100) + "%");
            })
            .attr('data-id', i)
        }
    
    const row5 = d3.select('.row5').selectAll('div')
        .data([data.period3_data])
        .enter()
        
        for(let i = 0; i < data.period3_data.user_num.length; i++){
            const temp_row = row5.append('div')
            .attr('class', 'cell week3 flow_box')
            .attr('data-id', i)
            .on('mouseover', handle_mouseover)
            .on('mousemove', handle_mousemove)
            .on('mouseout', handle_mouseout); 
            temp_row.append('span')
            .attr('class', 'cell_title cell_info')
            .text('재방문률')
            .attr('data-id', i)
            temp_row.append('span')
            .attr('class', 'cell_data cell_info')
            .text(function(d){
                return (Math.round((d.user_num[i] / d.user_num[0]) * 100) + "%");
            })
            .attr('data-id', i)
        }
    
    const row6 = d3.select('.row6').selectAll('div')
        .data([data.period4_data])
        .enter()
        
        for(let i = 0; i < data.period4_data.user_num.length; i++){
            const temp_row = row6.append('div')
            .attr('class', 'cell week4 flow_box')
            .attr('data-id', i)
            .on('mouseover', handle_mouseover)
            .on('mousemove', handle_mousemove)
            .on('mouseout', handle_mouseout); 
            temp_row.append('span')
            .attr('class', 'cell_title cell_info')
            .text('재방문률')
            .attr('data-id', i)
            temp_row.append('span')
            .attr('class', 'cell_data cell_info')
            .text(function(d){
                return (Math.round((d.user_num[i] / d.user_num[0]) * 100) + "%");
            })
            .attr('data-id', i)
        }
    
    const row7 = d3.select('.row7').selectAll('div')
        .data([data.period5_data])
        .enter()
        
        for(let i = 0; i < data.period5_data.user_num.length; i++){
            const temp_row = row7.append('div')
            .attr('class', 'cell week5 flow_box')
            .attr('data-id', i)
            .on('mouseover', handle_mouseover)
            .on('mousemove', handle_mousemove)
            .on('mouseout', handle_mouseout); 
            temp_row.append('span')
            .attr('class', 'cell_title cell_info')
            .text('재방문률')
            .attr('data-id', i)
            temp_row.append('span')
            .attr('class', 'cell_data cell_info')
            .text(function(d){
                return (Math.round((d.user_num[i] / d.user_num[0]) * 100) + "%");
            })
            .attr('data-id', i)
        }
    
    
    const heatmap_tooltip = d3.select("#heatmap_graph")
        .append("div")
        .attr("class", "heatmap_tooltip")
        .text("tooltip")
        .style("opacity", 0)

    const week1_elems = document.querySelectorAll('.week1');
    const week2_elems = document.querySelectorAll('.week2');
    const week3_elems = document.querySelectorAll('.week3');
    const week4_elems = document.querySelectorAll('.week4');
    const week5_elems = document.querySelectorAll('.week5');
    
    const set_cell_color = (elems) => {
        elems.forEach((item) => {
            let value = parseInt(item.lastChild.textContent.replace('%', ''));
            if(value <= 100 && value > 20){
                item.style.backgroundColor = "#505050";
            }else if(value <= 20 && value > 10){
                item.style.backgroundColor = "#757575";
            }else if(value <= 10 && value > 5){
                item.style.backgroundColor = "#999999";
            }else if(value <= 5 && value > 3){
                item.style.backgroundColor = "#D3D3D3";
            }else{
                item.style.backgroundColor = "#EDEDED";
            }
        });
    }
    
    set_cell_color(week1_elems);
    set_cell_color(week2_elems);
    set_cell_color(week3_elems);
    set_cell_color(week4_elems);
    set_cell_color(week5_elems);

    const revisit_average_btn = document.querySelector('.revisit_average')
    const hightest_turnover_period_btn = document.querySelector('.hightest_turnover_period')
    const maintain_distribution_btn = document.querySelector('.maintain_distribution')

    let position = {
        row: -1,
        index: -1
    }

    const reset_step1 = () => {
        week1_elems.forEach((item, id) => 
        {
            item.classList.remove('cell_selected')
            item.firstChild.style.display = 'none';
            item.lastChild.style.display = 'none';
    });
        document.querySelectorAll('.column_title')[2].classList.remove('title_selected');
    }

    // reset_step2 전체 수정
    const reset_step2 = () => {
        if(position.row !== -1){
            const selected_elem = document.querySelectorAll(`.week${position.row + 1}`);
            selected_elem.forEach((item, id) => {
                item.classList.remove('cell_selected2');
                item.firstChild.style.display = 'none';
                item.lastChild.style.display = 'none';
            })
        }
    }

    const reset_step3 = () => {
        for(let i = 0; i < num_of_period; i++){
            const selected_elem = document.querySelectorAll(`.week${i+1}`)[num_of_period - (i+1)];
            selected_elem.firstChild.textContent = '재방문률';
            selected_elem.classList.remove('cell_selected3');
            selected_elem.firstChild.style.display = 'none';
            selected_elem.lastChild.style.display = 'none';
            
        }
    }

    const reset_button_border = () => {
        if(revisit_average_btn.classList.contains('revisit_btn_clicked')){
            revisit_average_btn.classList.remove('revisit_btn_clicked');
        }
        
        if(hightest_turnover_period_btn.classList.contains('highest_revisit_btn_clicked')){
            hightest_turnover_period_btn.classList.remove('highest_revisit_btn_clicked');
        }
        if(maintain_distribution_btn.classList.contains('user_distribution_clicked')){
            maintain_distribution_btn.classList.remove('user_distribution_clicked');
        }
    }

    const revisit_average = (e) => {

        reset_step2();
        reset_step3();
        reset_button_border();

        revisit_average_btn.classList.add('revisit_btn_clicked');
        week1_elems.forEach((item, id) => 
        {
            item.classList.add('cell_selected')
            if(id === 0){
                item.firstChild.style.display = 'none';
                item.firstChild.style.display = 'none';
                item.lastChild.style.display = 'none';
            }else{
                item.firstChild.style.display = 'block';
                item.firstChild.style.display = 'block';
                item.lastChild.style.display = 'block';
            }
    });
        document.querySelectorAll('.column_title')[2].classList.add('title_selected');
    }

    const num_of_period = 5
    

    const hightest_turnover_period = (e) => {

        reset_step1();
        reset_step3();
        reset_button_border(); //수정


        hightest_turnover_period_btn.classList.add('highest_revisit_btn_clicked'); // 수정

        let max_average = -1;
        for(let i = 0; i < num_of_period - 1; i++){
            const week_elems_percent_datas = document.querySelectorAll(`.week${i+1} :nth-child(2)`);
            let temp = 0;
            week_elems_percent_datas.forEach((item, id) => {
                if(id === 0){
                    return;
                }
                let value = parseInt(item.lastChild.textContent.replace('%', ''));
                
                temp += value
                if(id === (week_elems_percent_datas.length -1)){
                    if(max_average < (temp / week_elems_percent_datas.length)){
                        max_average = (temp / week_elems_percent_datas.length);
                        position.row = i;
                    }
                    temp = 0;
                }
            })
        }

        const selected_elem = document.querySelectorAll(`.week${position.row + 1}`);
        selected_elem.forEach((item, id) => {
            item.classList.add('cell_selected2');
        })
        

        
    }

    const maintain_distribution = (e) => {
        
        reset_step1();
        reset_step2();
        reset_button_border(); //수정

        maintain_distribution_btn.classList.add('user_distribution_clicked'); 

        for(let i = 0; i < num_of_period; i++){
            const selected_elem = document.querySelectorAll(`.week${i+1}`)[num_of_period - (i+1)];
            selected_elem.classList.add('cell_selected3');
            selected_elem.firstChild.textContent = data.period1_data.period_category[4];
            selected_elem.firstChild.style.display = 'inline'; 
            selected_elem.firstChild.style.color = 'white'; 
            selected_elem.lastChild.style.display = 'none'; 
            
        }
    }


    revisit_average_btn.addEventListener('click', revisit_average)
    hightest_turnover_period_btn.addEventListener('click', hightest_turnover_period)
    maintain_distribution_btn.addEventListener('click', maintain_distribution)
})
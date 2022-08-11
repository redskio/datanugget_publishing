$(function() {
    const root = document.querySelector(':root');
    root.style.setProperty('--step0_box1_percent', '0.5');

    const canvases = [document.getElementById('canvas1'), document.getElementById('canvas2'), document.getElementById('canvas3'), document.getElementById('canvas4')];
    const canvas_drawes = [canvases[0].getContext('2d'), canvases[1].getContext('2d'), canvases[2].getContext('2d'), canvases[3].getContext('2d')];

    let canvas_width = window.getComputedStyle(canvases[0]).width;
    let canvas_height = window.getComputedStyle(canvases[0]).height;
        canvas_width= parseInt(canvas_width, 10); //pixcel 단위 없앰
        canvas_height= parseInt(canvas_height, 10);

    let s2_clicked_box_index;
    let s3_clicked_box_index;
    let s4_clicked_box_index;
    let canvas3_selected_lines_index = [];
    let canvas4_selected_lines_index = [];
    
    const clicked_box_elem = [];
    const isClicked = [false, false];

    const style = getComputedStyle(document.body);
    let step3_box_visibility = style.getPropertyValue('--visibility');

    const handle_s0_boxes_click = (e, step_num) => {

        // reset step 0 ~ 1 isClicked
        isClicked[0] = false;
        isClicked[1] = false;

        // check step 0 clicked
        isClicked[0] = true;

        if(!isClicked[0]){
            alert("이전 step을 먼저 클릭 하셔야 합니다.")
            return;
        }
        // reset all past selected lines
        canvas_drawes[0].clearRect(0, 0, canvas1.width, canvas1.height);
        canvas_drawes[1].clearRect(0, 0, canvas1.width, canvas1.height);
        canvas_drawes[2].clearRect(0, 0, canvas1.width, canvas1.height);
        canvas_drawes[3].clearRect(0, 0, canvas1.width, canvas1.height);
        
        // reset elem's yellow color and border and step notice
        if(clicked_box_elem[0]){
            clicked_box_elem[0].classList.remove("clicked_node");
            clicked_box_elem[0].firstChild.style.visibility = 'hidden';
        }

        if(clicked_box_elem[1]){
            clicked_box_elem[1].classList.remove("clicked_node");
            clicked_box_elem[1].firstChild.style.visibility = 'hidden';
            clicked_box_elem[1].lastChild.style.visibility = 'hidden';
        }

        if(clicked_box_elem[2]){
            clicked_box_elem[2].classList.remove("clicked_node");
            clicked_box_elem[2].firstChild.style.visibility = 'hidden';
            clicked_box_elem[2].lastChild.style.visibility = 'hidden';
        }

        if(clicked_box_elem[3]){
            clicked_box_elem[3].classList.remove("clicked_node");
            clicked_box_elem[3].firstChild.style.visibility = 'hidden';
            clicked_box_elem[3].lastChild.style.visibility = 'hidden';
        }

        if(clicked_box_elem[4]){
            clicked_box_elem[4].classList.remove("clicked_node");
            clicked_box_elem[4].firstChild.style.visibility = 'hidden';
            clicked_box_elem[4].lastChild.style.visibility = 'hidden';
        }
        
        // reset step 3,4 past selected node transparent
        const step3_sibling_nodes = document.querySelectorAll(`.step3_boxes > div`);
        step3_sibling_nodes.forEach((item) => item.style.visibility = 'hidden');
        const step4_sibling_nodes = document.querySelectorAll(`.step4_boxes > div`);
        step4_sibling_nodes.forEach((item) => item.style.visibility = 'hidden');

        canvas_drawes[0] = canvas1.getContext('2d');
        
        const index = parseInt(e.target.dataset.index);

        // color elem's yellow 
        clicked_box_elem[0] = document.querySelector(`.step0_boxes [data-index="${index}"]`)
        clicked_box_elem[0].classList.add("clicked_node");
        
        // make canvas 2 default curve
        for(let i = 0 ; i < 5 ; i++){
            draw_canvas2_line(i, 0, false);
        }

        // color target node's border and background color
        clicked_box_elem[0].firstChild.style.visibility = 'visible'

        draw_canvas1_line(index, 0, true);
       
        for(let i = 0 ; i < 5 ; i++){
            if(i === index){
                continue;
            }
            draw_canvas1_line(i, 0, false);
        }
    }

    const handle_s1_box_click = (e, step_num) => {

        isClicked[1] = true;

        if(!isClicked[0]){
            alert("step 0 을 먼저 클릭 하셔야 합니다.")
            return;
        }

        // reset all past selected lines
        canvas_drawes[1].clearRect(0, 0, canvas1.width, canvas1.height);
        canvas_drawes[2].clearRect(0, 0, canvas1.width, canvas1.height);
        canvas_drawes[3].clearRect(0, 0, canvas1.width, canvas1.height);

        // reset elem's yellow color and border and step notice
        if(clicked_box_elem[1]){
            clicked_box_elem[1].classList.remove("clicked_node");
            clicked_box_elem[1].firstChild.style.visibility = 'hidden';
            clicked_box_elem[1].lastChild.style.visibility = 'hidden';
        }

        if(clicked_box_elem[2]){
            clicked_box_elem[2].classList.remove("clicked_node");
            clicked_box_elem[2].firstChild.style.visibility = 'hidden';
            clicked_box_elem[2].lastChild.style.visibility = 'hidden';
        }

        if(clicked_box_elem[3]){
            clicked_box_elem[3].classList.remove("clicked_node");
            clicked_box_elem[3].firstChild.style.visibility = 'hidden';
            clicked_box_elem[3].lastChild.style.visibility = 'hidden';
        }

        if(clicked_box_elem[4]){
            clicked_box_elem[4].classList.remove("clicked_node");
            clicked_box_elem[4].firstChild.style.visibility = 'hidden';
            clicked_box_elem[4].lastChild.style.visibility = 'hidden';
        }

        // draw default lines
        for(let i = 0 ; i < 5 ; i++){  
            draw_canvas2_line(i, 0, false);
        }

        const index = parseInt(e.target.dataset.index);

        // color elem's yellow 
        clicked_box_elem[1] = document.querySelector(`.step1_boxes [data-index="${index}"]`)
        clicked_box_elem[1].classList.add("clicked_node");

        // step 1의 가운데 센터박스가 클릭될 때만 border 적용
        if(index !== 2){
            return;
        }

        // make step 3,4 previous selected node transparent
        const step3_sibling_nodes = document.querySelectorAll(`.step3_boxes > div`);
        step3_sibling_nodes.forEach((item) => item.style.visibility = 'hidden');
        const step4_sibling_nodes = document.querySelectorAll(`.step4_boxes > div`);
        step4_sibling_nodes.forEach((item) => item.style.visibility = 'hidden');

        // color target node's border
        clicked_box_elem[1].firstChild.style.visibility = 'visible'

        // show step notice
        clicked_box_elem[1].lastChild.style.visibility = "visible";
        
    }

    const handle_s2_boxes_click = (e, step_num) => {

        // reset step 0 ~ 2 isClicked

        if(!isClicked[1]){
            alert("step 1 을 먼저 클릭 하셔야 합니다.")
            return;
        }

        // reset all past selected lines
        canvas_drawes[1].clearRect(0, 0, canvas1.width, canvas1.height);
        canvas_drawes[2].clearRect(0, 0, canvas1.width, canvas1.height);
        canvas_drawes[3].clearRect(0, 0, canvas1.width, canvas1.height);
        
        // reset selected line index;
        canvas3_selected_lines_index = [];
        canvas4_selected_lines_index = [];

        // reset elem's yellow color and border and step notice
        if(clicked_box_elem[2]){
            clicked_box_elem[2].classList.remove("clicked_node");
            clicked_box_elem[2].firstChild.style.visibility = 'hidden';
            clicked_box_elem[2].lastChild.style.visibility = 'hidden';
        }

        if(clicked_box_elem[3]){
            clicked_box_elem[3].classList.remove("clicked_node");
            clicked_box_elem[3].firstChild.style.visibility = 'hidden';
            clicked_box_elem[3].lastChild.style.visibility = 'hidden';
        }

        if(clicked_box_elem[4]){
            clicked_box_elem[4].classList.remove("clicked_node");
            clicked_box_elem[4].firstChild.style.visibility = 'hidden';
            clicked_box_elem[4].lastChild.style.visibility = 'hidden';
        }

         // reset step4 past selected node transparent
        const step4_sibling_nodes = document.querySelectorAll(`.step4_boxes > div`);
        step4_sibling_nodes.forEach((item) => item.style.visibility = 'hidden');

        canvas_drawes[1] = canvas2.getContext('2d');
        
        const index = parseInt(e.target.dataset.index);
        s2_clicked_box_index = index;

        // color elem's yellow 
        clicked_box_elem[2] = document.querySelector(`.step2_boxes [data-index="${index}"]`)
        clicked_box_elem[2].classList.add("clicked_node");
        
        // color target node's border
        clicked_box_elem[2].firstChild.style.visibility = 'visible'

        // show step notice
        clicked_box_elem[2].lastChild.style.visibility = "visible";
        
        // draw color lines
        draw_canvas2_line(index, 0, true);
        
        // draw default lines
        for(let i = 0 ; i < 5 ; i++){
            if(i === index){
                continue;
            }
            draw_canvas2_line(i, 0, false);
        }

        // show 3 boxes after click step2's certain box

        const step3_sibling_nodes = document.querySelectorAll(`.step${step_num + 1}_boxes > div`);
        step3_sibling_nodes.forEach((item) => item.style.visibility = 'hidden');

        if (index === 0) {
            step3_sibling_nodes[index].style.visibility = 'visible'
            step3_sibling_nodes[index + 1].style.visibility = 'visible'
            step3_sibling_nodes[index + 2].style.visibility = 'visible'

            // (start_index, end_index, selected)
            draw_canvas3_line(index, index, false);
            draw_canvas3_line(index + 1, index, false);
            draw_canvas3_line(index + 2, index, false);

            canvas3_selected_lines_index.push(index);
            canvas3_selected_lines_index.push(index + 1);
            canvas3_selected_lines_index.push(index + 2);


        }else if (index === 1 || index === 2 || index === 3) {
            step3_sibling_nodes[index - 1].style.visibility = 'visible'
            step3_sibling_nodes[index].style.visibility = 'visible'
            step3_sibling_nodes[index + 1].style.visibility = 'visible'

            // (start_index, end_index, selected)
            draw_canvas3_line(index - 1, index, false);
            draw_canvas3_line(index, index, false);
            draw_canvas3_line(index + 1, index, false);

            canvas3_selected_lines_index.push(index - 1);
            canvas3_selected_lines_index.push(index);
            canvas3_selected_lines_index.push(index + 1);


        }else {
            step3_sibling_nodes[index - 2].style.visibility = 'visible'
            step3_sibling_nodes[index - 1].style.visibility = 'visible'
            step3_sibling_nodes[index].style.visibility = 'visible'

            // (start_index, end_index, selected)
            draw_canvas3_line(index - 2, index, false);
            draw_canvas3_line(index - 1, index, false);
            draw_canvas3_line(index, index, false);

            canvas3_selected_lines_index.push(index - 2);
            canvas3_selected_lines_index.push(index - 1);
            canvas3_selected_lines_index.push(index);
        }
    }

    const handle_s3_boxes_click = (e, step_num) => {
        
        // reset all past selected lines
        canvas_drawes[2].clearRect(0, 0, canvas1.width, canvas1.height);
        canvas_drawes[3].clearRect(0, 0, canvas1.width, canvas1.height);

        // reset elem's yellow color and border and step notice
        if(clicked_box_elem[3]){
            clicked_box_elem[3].classList.remove("clicked_node");
            clicked_box_elem[3].firstChild.style.visibility = 'hidden';
            clicked_box_elem[3].lastChild.style.visibility = 'hidden';
        }

        if(clicked_box_elem[4]){
            clicked_box_elem[4].classList.remove("clicked_node");
            clicked_box_elem[4].firstChild.style.visibility = 'hidden';
            clicked_box_elem[4].lastChild.style.visibility = 'hidden';
        }

        canvas_drawes[2] = canvas3.getContext('2d');

        const index = parseInt(e.target.dataset.index);
        s3_clicked_box_index = index;

        // reset selected line index;
        canvas4_selected_lines_index = [];

        // reset all past selected border
        const s3_border_siblings_node = document.querySelectorAll(`.step3_boxes .step3_border`);
        const s4_border_siblings_node = document.querySelectorAll(`.step4_boxes .step4_border`);
        s3_border_siblings_node.forEach((item) => item.style.visibility = 'hidden');
        s4_border_siblings_node.forEach((item) => item.style.visibility = 'hidden');
        
        // color elem's yellow 
        clicked_box_elem[3] = document.querySelector(`.step3_boxes [data-index="${index}"]`)
        clicked_box_elem[3].classList.add("clicked_node");
        
        // color target node's border
        clicked_box_elem[3].firstChild.style.visibility = 'visible'

        // show step notice
        clicked_box_elem[3].lastChild.style.visibility = "visible";

        // draw hightlighted lines
        draw_canvas3_line(index, s2_clicked_box_index, true);

        for(let i = 0 ; i < canvas3_selected_lines_index.length ; i++){
            if(index === canvas3_selected_lines_index[i]){
                continue;
            }
            draw_canvas3_line(canvas3_selected_lines_index[i], s2_clicked_box_index, false);
        }
        // show 3 boxes after click step2's certain box

        const step4_sibling_nodes = document.querySelectorAll(`.step4_boxes > div`);
        step4_sibling_nodes.forEach((item) => item.style.visibility = 'hidden');

        if (index === 0) {
            step4_sibling_nodes[index].style.visibility = 'visible'
            step4_sibling_nodes[index + 1].style.visibility = 'visible'
            step4_sibling_nodes[index + 2].style.visibility = 'visible'

            // (start_index, end_index, selected)
            draw_canvas4_line(index, index, false);
            draw_canvas4_line(index + 1, index, false);
            draw_canvas4_line(index + 2, index, false);

            canvas4_selected_lines_index.push(index);
            canvas4_selected_lines_index.push(index + 1);
            canvas4_selected_lines_index.push(index + 2);

        } else if (index === 1 || index === 2 || index === 3) {
            step4_sibling_nodes[index - 1].style.visibility = 'visible'
            step4_sibling_nodes[index].style.visibility = 'visible'
            step4_sibling_nodes[index + 1].style.visibility = 'visible'

            // (start_index, end_index, selected)
            draw_canvas4_line(index - 1, index, false);
            draw_canvas4_line(index, index, false);
            draw_canvas4_line(index + 1, index, false);

            canvas4_selected_lines_index.push(index - 1);
            canvas4_selected_lines_index.push(index);
            canvas4_selected_lines_index.push(index + 1);

        } else {
            step4_sibling_nodes[index - 2].style.visibility = 'visible'
            step4_sibling_nodes[index - 1].style.visibility = 'visible'
            step4_sibling_nodes[index].style.visibility = 'visible'

            // (start_index, end_index, selected)
            draw_canvas4_line(index - 2, index, false);
            draw_canvas4_line(index - 1, index, false);
            draw_canvas4_line(index, index, false);

            canvas4_selected_lines_index.push(index - 2);
            canvas4_selected_lines_index.push(index - 1);
            canvas4_selected_lines_index.push(index);
        }
    }

    const handle_s4_boxes_click = (e, step_num) => {
        
        // reset all past selected lines
        canvas_drawes[3].clearRect(0, 0, canvas1.width, canvas1.height); 

        // reset elem's yellow color and border and step notice
        if(clicked_box_elem[4]){
            clicked_box_elem[4].classList.remove("clicked_node");
            clicked_box_elem[4].firstChild.style.visibility = 'hidden';
            clicked_box_elem[4].lastChild.style.visibility = 'hidden';
        }

        canvas_drawes[3] = canvas4.getContext('2d');
        
        const index = parseInt(e.target.dataset.index);
        s4_clicked_box_index = index;

         // color elem's yellow 
        clicked_box_elem[4] = document.querySelector(`.step4_boxes [data-index="${index}"]`)
        clicked_box_elem[4].classList.add("clicked_node");
        
        // color target node's border
        clicked_box_elem[4].firstChild.style.visibility = 'visible'

        // show step notice
        clicked_box_elem[4].lastChild.style.visibility = "visible";
        
        // draw hightlighted lines
        draw_canvas4_line(index, s3_clicked_box_index, true);
        
        for(let i = 0 ; i < canvas4_selected_lines_index.length ; i++){
            if(index === canvas4_selected_lines_index[i]){
                continue;
            }
            draw_canvas4_line(canvas4_selected_lines_index[i], s3_clicked_box_index, false);
        }
    }

        //  ---------------- step 0 boxes ---------------------------------

        const step0_data = [
        {
            parant_class_name: "percent_s0_box1", 
            data_index: 0,  
            first_child_class_name:"percent_box_title", 
            title_text: "직접유입", 
            second_child_class_name: "percent_box_value", 
            value_text: "300", 
            third_child_class_name:"percent_box_value2", 
            percent_text: "28%"
        },{
            parant_class_name: "percent_s0_box2", 
            data_index: 1, 
            first_child_class_name:"percent_box_title", 
            title_text: "직접유입", 
            second_child_class_name: "percent_box_value", 
            value_text: "300", 
            third_child_class_name:"percent_box_value2", 
            percent_text: "28%"
        },{
            parant_class_name: "percent_s0_box3", 
            data_index: 2, 
            first_child_class_name:"percent_box_title", 
            title_text: "직접유입", 
            second_child_class_name: "percent_box_value", 
            value_text: "300", 
            third_child_class_name:"percent_box_value2", 
            percent_text: "28%"
        },{
            parant_class_name: "percent_s0_box4", 
            data_index: 3, 
            first_child_class_name:"percent_box_title", 
            title_text: "직접유입", 
            second_child_class_name: "percent_box_value", 
            value_text: "300", 
            third_child_class_name:"percent_box_value2", 
            percent_text: "28%"
        },{
            parant_class_name: "percent_s0_box5", 
            data_index: 4, 
            first_child_class_name:"percent_box_title", 
            title_text: "직접유입", 
            second_child_class_name: "percent_box_value", 
            value_text: "300", 
            third_child_class_name:"percent_box_value2", 
            percent_text: "28%"
        },
    ]

    const step0_num = 0;
    const s0_boxes = d3.select(".step0_boxes")          
                    .selectAll()            
                    .data(step0_data)           
                    .enter()                 
                    .append("div")
                    .attr('class', function(d) { return d.parant_class_name; })
                    .attr('data-index', function(d) { return d.data_index; })            
                    .on('click', (event) => handle_s0_boxes_click(event, step0_num))
                    s0_boxes.append("div")
                    .attr('class', 'step0_border')
                    .attr('data-index', function(d) { return d.data_index; })
                    .on('click', (event) => handle_s0_boxes_click(event, step0_num))
                    s0_boxes.append('p')
                    .attr('class', function(d) { return d.first_child_class_name; })
                    .attr('data-index', function(d) { return d.data_index; })
                    .text(function(d) { return d.title_text; })
                    s0_boxes.append('p')
                    .attr('class', function(d) { return d.second_child_class_name; })
                    .attr('data-index', function(d) { return d.data_index; })
                    .text(function(d) { return d.value_text; })
                    s0_boxes.append('span')
                    .attr('class', function(d) { return d.third_child_class_name; })
                    .attr('data-index', function(d) { return d.data_index; })
                    .text(function(d) { return d.percent_text; });

//  ---------------- step 1 boxes ---------------------------------

const step1_data = [
        {
            parant_class_name: "percent_s1_hidden_box", 
            data_index: 0,  
            first_child_class_name:"percent_box_title", 
            title_text: "직접유입", 
        },{
            parant_class_name: "percent_s1_hidden_box", 
            data_index: 1, 
            first_child_class_name:"percent_box_title", 
            title_text: "직접유입", 
        },{
            parant_class_name: "percent_s1_center_box", 
            data_index: 2, 
            first_child_class_name:"percent_box_title", 
            title_text: "직접유입", 
        },{
            parant_class_name: "percent_s1_box unclickable", 
            data_index: 3, 
            first_child_class_name:"percent_box_title", 
            title_text: "직접유입", 
        },{
            parant_class_name: "percent_s1_box unclickable", 
            data_index: 4, 
            first_child_class_name:"percent_box_title", 
            title_text: "직접유입", 
        },
    ]

    const step1_num = 1;
    const s1_boxes = d3.select(".step1_boxes")          
                    .selectAll()            
                    .data(step1_data)           
                    .enter()                 
                    .append("div")
                    .attr('class', function(d) { return d.parant_class_name; })
                    .attr('data-index', function(d) { return d.data_index; })            
                    .on('click', (event) => handle_s1_box_click(event, step1_num))
                    s1_boxes.append("div")
                    .attr('class', 'step1_border')
                    .attr('data-index', function(d) { return d.data_index; })
                    .on('click', (event) => handle_s1_box_click(event, step1_num))
                    s1_boxes.append('p')
                    .attr('class', function(d) { return d.first_child_class_name; })
                    .attr('data-index', function(d) { return d.data_index; })
                    .text(function(d) { return d.title_text; })
                    s1_boxes.append('span')
                    .attr('class', 'step1_notice')
                    .text("step 1")


//  ---------------- step 2 boxes ---------------------------------

// 마지막 값은 이탈유저로써 클래스 이름에 left_user 넣어주셔야 합니다~!

const step2_data = [
        {
            parant_class_name: "percent_s2_box1", 
            data_index: 0,  
            first_child_class_name:"percent_box_title", 
            title_text: "직접유입", 
            second_child_class_name: "percent_box_value", 
            value_text: "300", 
            third_child_class_name:"percent_box_value2", 
            percent_text: "28%"
        },{
            parant_class_name: "percent_s2_box2", 
            data_index: 1, 
            first_child_class_name:"percent_box_title", 
            title_text: "직접유입", 
            second_child_class_name: "percent_box_value", 
            value_text: "300", 
            third_child_class_name:"percent_box_value2", 
            percent_text: "28%"
        },{
            parant_class_name: "percent_s2_box3", 
            data_index: 2, 
            first_child_class_name:"percent_box_title", 
            title_text: "직접유입", 
            second_child_class_name: "percent_box_value", 
            value_text: "300", 
            third_child_class_name:"percent_box_value2", 
            percent_text: "28%"
        },{
            parant_class_name: "percent_s2_box4", 
            data_index: 3, 
            first_child_class_name:"percent_box_title", 
            title_text: "직접유입", 
            second_child_class_name: "percent_box_value", 
            value_text: "300", 
            third_child_class_name:"percent_box_value2", 
            percent_text: "28%"
        },{
            parant_class_name: "percent_s2_box5 left_user", 
            data_index: 4, 
            first_child_class_name:"percent_box_title", 
            title_text: "이탈유저", 
            second_child_class_name: "percent_box_value", 
            value_text: "300", 
            third_child_class_name:"percent_box_value2", 
            percent_text: "28%"
        },
    ]

    const step2_num = 2;
    const s2_boxes = d3.select(".step2_boxes")          
                    .selectAll()            
                    .data(step2_data)           
                    .enter()                 
                    .append("div")
                    .attr('class', function(d) { return d.parant_class_name; })
                    .attr('data-index', function(d) { return d.data_index; })            
                    .on('click', (event) => handle_s2_boxes_click(event, step2_num))
                    s2_boxes.append("div")
                    .attr('class', 'step2_border')
                    .attr('data-index', function(d) { return d.data_index; })
                    .on('click', (event) => handle_s2_boxes_click(event, step2_num))
                    s2_boxes.append('p')
                    .attr('class', function(d) { return d.first_child_class_name; })
                    .attr('data-index', function(d) { return d.data_index; })
                    .text(function(d) { return d.title_text; })
                    s2_boxes.append('p')
                    .attr('class', function(d) { return d.second_child_class_name; })
                    .attr('data-index', function(d) { return d.data_index; })
                    .text(function(d) { return d.value_text; })
                    s2_boxes.append('span')
                    .attr('class', function(d) { return d.third_child_class_name; })
                    .attr('data-index', function(d) { return d.data_index; })
                    .text(function(d) { return d.percent_text; })
                    s2_boxes.append('span')
                    .attr('class', 'step2_notice')
                    .text("step 2");


//  ---------------- step 3 boxes ---------------------------------
// 마지막 값은 이탈유저로써 클래스 이름에 left_user 넣어주셔야 합니다~!


const step3_data = [
        {
            parant_class_name: "percent_s3_box1", 
            data_index: 0,  
            first_child_class_name:"percent_box_title", 
            title_text: "직접유입", 
            third_child_class_name:"percent_box_value3", 
            percent_text: "28%"
        },{
            parant_class_name: "percent_s3_box2", 
            data_index: 1, 
            first_child_class_name:"percent_box_title", 
            title_text: "직접유입", 
            third_child_class_name:"percent_box_value3", 
            percent_text: "28%"
        },{
            parant_class_name: "percent_s3_box3", 
            data_index: 2, 
            first_child_class_name:"percent_box_title", 
            title_text: "직접유입", 
            third_child_class_name:"percent_box_value3", 
            percent_text: "28%"
        },{
            parant_class_name: "percent_s3_box4", 
            data_index: 3, 
            first_child_class_name:"percent_box_title", 
            title_text: "직접유입", 
            third_child_class_name:"percent_box_value3", 
            percent_text: "28%"
        },{
            parant_class_name: "percent_s3_box5 left_user", 
            data_index: 4, 
            first_child_class_name:"percent_box_title", 
            title_text: "이탈유저 ", 
            third_child_class_name:"percent_box_value3", 
            percent_text: "28%"
        },
    ]

    const step3_num = 3;
    const s3_boxes = d3.select(".step3_boxes")          
                    .selectAll()            
                    .data(step3_data)           
                    .enter()                 
                    .append("div")
                    .attr('class', function(d) { return d.parant_class_name; })
                    .attr('data-index', function(d) { return d.data_index; })            
                    .on('click', (event) => handle_s3_boxes_click(event, step3_num))
                    s3_boxes.append("div")
                    .attr('class', 'step3_border')
                    .attr('data-index', function(d) { return d.data_index; })
                    .on('click', (event) => handle_s3_boxes_click(event, step3_num))
                    s3_boxes.append('p')
                    .attr('class', function(d) { return d.first_child_class_name; })
                    .attr('data-index', function(d) { return d.data_index; })
                    .text(function(d) { return d.title_text; })
                    s3_boxes.append('span')
                    .attr('class', function(d) { return d.third_child_class_name; })
                    .attr('data-index', function(d) { return d.data_index; })
                    .text(function(d) { return d.percent_text; })
                    s3_boxes.append('span')
                    .attr('class', 'step3_notice')
                    .text("step 3");

//  ---------------- step 4 boxes ---------------------------------
// 마지막 값은 이탈유저로써 클래스 이름에 left_user 넣어주셔야 합니다~!


const step4_data = [
        {
            parant_class_name: "percent_s4_box1", 
            data_index: 0,  
            first_child_class_name:"percent_box_title", 
            title_text: "직접유입", 
            third_child_class_name:"percent_box_value3", 
            percent_text: "28%"
        },{
            parant_class_name: "percent_s4_box2", 
            data_index: 1, 
            first_child_class_name:"percent_box_title", 
            title_text: "직접유입", 
            third_child_class_name:"percent_box_value3", 
            percent_text: "28%"
        },{
            parant_class_name: "percent_s4_box3", 
            data_index: 2, 
            first_child_class_name:"percent_box_title", 
            title_text: "직접유입", 
            third_child_class_name:"percent_box_value3", 
            percent_text: "28%"
        },{
            parant_class_name: "percent_s4_box4", 
            data_index: 3, 
            first_child_class_name:"percent_box_title", 
            title_text: "직접유입", 
            third_child_class_name:"percent_box_value3", 
            percent_text: "28%"
        },{
            parant_class_name: "percent_s4_box5 left_user", 
            data_index: 4, 
            first_child_class_name:"percent_box_title", 
            title_text: "이탈유저", 
            third_child_class_name:"percent_box_value3", 
            percent_text: "28%"
        },
    ]

    const step4_num = 4;
    const s4_boxes = d3.select(".step4_boxes")          
                    .selectAll()            
                    .data(step4_data)           
                    .enter()                 
                    .append("div")
                    .attr('class', function(d) { return d.parant_class_name; })
                    .attr('data-index', function(d) { return d.data_index; })            
                    .on('click', (event) => handle_s4_boxes_click(event, step4_num))
                    s4_boxes.append("div")
                    .attr('class', 'step4_border')
                    .attr('data-index', function(d) { return d.data_index; })
                    .on('click', (event) => handle_s4_boxes_click(event, step4_num))
                    s4_boxes.append('p')
                    .attr('class', function(d) { return d.first_child_class_name; })
                    .attr('data-index', function(d) { return d.data_index; })
                    .text(function(d) { return d.title_text; })
                    s4_boxes.append('span')
                    .attr('class', function(d) { return d.third_child_class_name; })
                    .attr('data-index', function(d) { return d.data_index; })
                    .text(function(d) { return d.percent_text; });
                    s4_boxes.append('span')
                    .attr('class', 'step4_notice')
                    .text("step 4");

        

// step 0 curve lines 
        
        const step0_box = document.querySelector('.percent_s0_box1');
        const step2_box = document.querySelector('.percent_s2_box1');
        const step3_box = document.querySelector('.percent_s3_box1');
        const step4_box = document.querySelector('.percent_s4_box1');

        const percent_s0_box1 = document.querySelector('.percent_s0_box1');
        const percent_s0_box2 = document.querySelector('.percent_s0_box2');
        const percent_s0_box3 = document.querySelector('.percent_s0_box3');
        const percent_s0_box4 = document.querySelector('.percent_s0_box4');
        const percent_s0_box5 = document.querySelector('.percent_s0_box5');

        const percent_s1_center_box = document.querySelector('.percent_s1_center_box');

        const percent_s2_box1 = document.querySelector('.percent_s2_box1');
        const percent_s2_box2 = document.querySelector('.percent_s2_box2');
        const percent_s2_box3 = document.querySelector('.percent_s2_box3');
        const percent_s2_box4 = document.querySelector('.percent_s2_box4');
        const percent_s2_box5 = document.querySelector('.percent_s2_box5');

        const percent_s3_box1 = document.querySelector('.percent_s3_box1');
        const percent_s3_box2 = document.querySelector('.percent_s3_box2');
        const percent_s3_box3 = document.querySelector('.percent_s3_box3');
        const percent_s3_box4 = document.querySelector('.percent_s3_box4');
        const percent_s3_box5 = document.querySelector('.percent_s3_box5');

        const percent_s4_box1 = document.querySelector('.percent_s4_box1');
        const percent_s4_box2 = document.querySelector('.percent_s4_box2');
        const percent_s4_box3 = document.querySelector('.percent_s4_box3');
        const percent_s4_box4 = document.querySelector('.percent_s4_box4');
        const percent_s4_box5 = document.querySelector('.percent_s4_box5');

        const step0_box_width = step0_box.getBoundingClientRect().width;
        const step2_box_width = step2_box.getBoundingClientRect().width;
        const step3_box_width = step3_box.getBoundingClientRect().width;
        const step4_box_width = step4_box.getBoundingClientRect().width;

        const step0_boxes_coor_x = [
            {"step0_box1_x": percent_s0_box1.getBoundingClientRect().x},
            {"step0_box2_x": percent_s0_box2.getBoundingClientRect().x},
            {"step0_box3_x": percent_s0_box3.getBoundingClientRect().x},
            {"step0_box4_x": percent_s0_box4.getBoundingClientRect().x},
            {"step0_box5_x": percent_s0_box5.getBoundingClientRect().x}
        ];
        
        const step1_center_box_width = percent_s1_center_box.getBoundingClientRect().width;
        const step1_center_box_coor_x = percent_s1_center_box.getBoundingClientRect().x;

        const step2_boxes_coor_x = [
            {"step2_box1_x": percent_s2_box1.getBoundingClientRect().x},
            {"step2_box2_x": percent_s2_box2.getBoundingClientRect().x},
            {"step2_box3_x": percent_s2_box3.getBoundingClientRect().x},
            {"step2_box4_x": percent_s2_box4.getBoundingClientRect().x},
            {"step2_box5_x": percent_s2_box5.getBoundingClientRect().x}
        ];

        const step3_boxes_coor_x = [
            {"step3_box1_x": percent_s3_box1.getBoundingClientRect().x},
            {"step3_box2_x": percent_s3_box2.getBoundingClientRect().x},
            {"step3_box3_x": percent_s3_box3.getBoundingClientRect().x},
            {"step3_box4_x": percent_s3_box4.getBoundingClientRect().x},
            {"step3_box5_x": percent_s3_box5.getBoundingClientRect().x}
        ];

        const step4_boxes_coor_x = [
            {"step4_box1_x": percent_s4_box1.getBoundingClientRect().x},
            {"step4_box2_x": percent_s4_box2.getBoundingClientRect().x},
            {"step4_box3_x": percent_s4_box3.getBoundingClientRect().x},
            {"step4_box4_x": percent_s4_box4.getBoundingClientRect().x},
            {"step4_box5_x": percent_s4_box5.getBoundingClientRect().x}
        ];

            const step0_canvas_downside_coord_x_y = [
                { box_x: step0_boxes_coor_x[0].step0_box1_x + step0_box_width / 2, box_y: 0 }, 
                { box_x: step0_boxes_coor_x[1].step0_box2_x + step0_box_width / 2, box_y: 0 }, 
                { box_x: step0_boxes_coor_x[2].step0_box3_x + step0_box_width / 2, box_y: 0 }, 
                { box_x: step0_boxes_coor_x[3].step0_box4_x + step0_box_width / 2, box_y: 0 }, 
                { box_x: step0_boxes_coor_x[4].step0_box5_x + step0_box_width / 2, box_y: 0 }, 
            ];

            const step1_canvas_upperside_coord_x_y = [
                { box_x: step1_center_box_coor_x + step1_center_box_width / 2, box_y: canvas_height }, 
            ]

            const step1_canvas_downside_coord_x_y = [
                { box_x: step1_center_box_coor_x + step1_center_box_width / 2, box_y: 0 }, 
            ]

            const step2_canvas_upperside_coord_x_y = [
                { box_x: step2_boxes_coor_x[0].step2_box1_x + step2_box_width / 2, box_y: canvas_height }, 
                { box_x: step2_boxes_coor_x[1].step2_box2_x + step2_box_width / 2, box_y: canvas_height }, 
                { box_x: step2_boxes_coor_x[2].step2_box3_x + step2_box_width / 2, box_y: canvas_height }, 
                { box_x: step2_boxes_coor_x[3].step2_box4_x + step2_box_width / 2, box_y: canvas_height }, 
                { box_x: step2_boxes_coor_x[4].step2_box5_x + step2_box_width / 2, box_y: canvas_height }, 
            ];

            const step2_canvas_downside_coord_x_y = [
                { box_x: step2_boxes_coor_x[0].step2_box1_x + step2_box_width / 2, box_y: 0 }, 
                { box_x: step2_boxes_coor_x[1].step2_box2_x + step2_box_width / 2, box_y: 0 }, 
                { box_x: step2_boxes_coor_x[2].step2_box3_x + step2_box_width / 2, box_y: 0 }, 
                { box_x: step2_boxes_coor_x[3].step2_box4_x + step2_box_width / 2, box_y: 0 }, 
                { box_x: step2_boxes_coor_x[4].step2_box5_x + step2_box_width / 2, box_y: 0 }, 
            ];

            const step3_canvas_upperside_coord_x_y = [
                { box_x: step3_boxes_coor_x[0].step3_box1_x + step3_box_width / 2, box_y: canvas_height }, 
                { box_x: step3_boxes_coor_x[1].step3_box2_x + step3_box_width / 2, box_y: canvas_height }, 
                { box_x: step3_boxes_coor_x[2].step3_box3_x + step3_box_width / 2, box_y: canvas_height }, 
                { box_x: step3_boxes_coor_x[3].step3_box4_x + step3_box_width / 2, box_y: canvas_height }, 
                { box_x: step3_boxes_coor_x[4].step3_box5_x + step3_box_width / 2, box_y: canvas_height }, 
            ];

            const step3_canvas_downside_coord_x_y = [
                { box_x: step3_boxes_coor_x[0].step3_box1_x + step3_box_width / 2, box_y: 0 }, 
                { box_x: step3_boxes_coor_x[1].step3_box2_x + step3_box_width / 2, box_y: 0 }, 
                { box_x: step3_boxes_coor_x[2].step3_box3_x + step3_box_width / 2, box_y: 0 }, 
                { box_x: step3_boxes_coor_x[3].step3_box4_x + step3_box_width / 2, box_y: 0 }, 
                { box_x: step3_boxes_coor_x[4].step3_box5_x + step3_box_width / 2, box_y: 0 }, 
            ];

            const step4_canvas_upperside_coord_x_y = [
                { box_x: step4_boxes_coor_x[0].step4_box1_x + step4_box_width / 2, box_y: canvas_height }, 
                { box_x: step4_boxes_coor_x[1].step4_box2_x + step4_box_width / 2, box_y: canvas_height }, 
                { box_x: step4_boxes_coor_x[2].step4_box3_x + step4_box_width / 2, box_y: canvas_height }, 
                { box_x: step4_boxes_coor_x[3].step4_box4_x + step4_box_width / 2, box_y: canvas_height }, 
                { box_x: step4_boxes_coor_x[4].step4_box5_x + step4_box_width / 2, box_y: canvas_height }, 
            ];



    // 실제로 그려지는 위치의 캔버스 생성

        const draw_canvas1_line = (start_index, end_index = 0, selected) => {
            canvas_drawes[0].beginPath();

            if(selected){
                canvas_drawes[0].strokeStyle = '#FFB300';
                canvas_drawes[0].setLineDash([0]);
            } else {
                canvas_drawes[0].strokeStyle = '#C1C1C1';
                canvas_drawes[0].setLineDash([4]);
            }

    
            canvas_drawes[0].moveTo(step0_canvas_downside_coord_x_y[start_index].box_x, step0_canvas_downside_coord_x_y[start_index].box_y);
            //bezierCurveTo(조절점1x, 조절점1y, 조절점2x, 조절점2y, 선의 끝점x, 선의 끝점y)
            canvas_drawes[0].bezierCurveTo(
                            step0_canvas_downside_coord_x_y[start_index].box_x, step2_canvas_upperside_coord_x_y[start_index].box_y / 2, 
                            step1_canvas_upperside_coord_x_y[end_index].box_x, step2_canvas_upperside_coord_x_y[start_index].box_y / 2, 
                            step1_canvas_upperside_coord_x_y[end_index].box_x, step1_canvas_upperside_coord_x_y[end_index].box_y
                            );
            canvas_drawes[0].lineWidth = 1;
            canvas_drawes[0].stroke();
        }

        const draw_canvas2_line = (start_index, end_index = 0, selected) => {
            canvas_drawes[1].beginPath();

            if(selected){
                canvas_drawes[1].strokeStyle = '#FFB300';
                canvas_drawes[1].setLineDash([0]);
            } else {
                canvas_drawes[1].strokeStyle = '#C1C1C1';
                canvas_drawes[1].setLineDash([4]);
            }

    
            canvas_drawes[1].moveTo(step2_canvas_upperside_coord_x_y[start_index].box_x, step2_canvas_upperside_coord_x_y[start_index].box_y);
            //bezierCurveTo(조절점1x, 조절점1y, 조절점2x, 조절점2y, 선의 끝점x, 선의 끝점y)
            canvas_drawes[1].bezierCurveTo(
                            step2_canvas_upperside_coord_x_y[start_index].box_x, step2_canvas_upperside_coord_x_y[start_index].box_y / 2, 
                            step1_canvas_downside_coord_x_y[end_index].box_x, step2_canvas_upperside_coord_x_y[start_index].box_y / 2, 
                            step1_canvas_downside_coord_x_y[end_index].box_x, step1_canvas_downside_coord_x_y[end_index].box_y
                            );
            canvas_drawes[1].lineWidth = 1;
            canvas_drawes[1].stroke();
        }


        const draw_canvas3_line = (start_index, end_index, selected) => {
            canvas_drawes[2].beginPath();

            if(selected){
                canvas_drawes[2].strokeStyle = '#FFB300';
                canvas_drawes[2].setLineDash([0]);
            } else {
                canvas_drawes[2].strokeStyle = '#C1C1C1';
                canvas_drawes[2].setLineDash([4]);
            }
    
            canvas_drawes[2].moveTo(step3_canvas_upperside_coord_x_y[start_index].box_x, step3_canvas_upperside_coord_x_y[start_index].box_y);
            //bezierCurveTo(조절점1x, 조절점1y, 조절점2x, 조절점2y, 선의 끝점x, 선의 끝점y)
            canvas_drawes[2].bezierCurveTo(
                            step3_canvas_upperside_coord_x_y[start_index].box_x, step3_canvas_upperside_coord_x_y[start_index].box_y / 2, 
                            step2_canvas_downside_coord_x_y[end_index].box_x, step3_canvas_upperside_coord_x_y[start_index].box_y / 2, 
                            step2_canvas_downside_coord_x_y[end_index].box_x, step2_canvas_downside_coord_x_y[end_index].box_y
                            );
            canvas_drawes[2].lineWidth = 1;
            canvas_drawes[2].stroke();
        }

        const draw_canvas4_line = (start_index, end_index, selected) => {
            canvas_drawes[3].beginPath();

            if(selected){
                canvas_drawes[3].strokeStyle = '#FFB300';
                canvas_drawes[3].setLineDash([0]);
            } else {
                canvas_drawes[3].strokeStyle = '#C1C1C1';
                canvas_drawes[3].setLineDash([4]);
            }
    
            canvas_drawes[3].moveTo(step4_canvas_upperside_coord_x_y[start_index].box_x, step4_canvas_upperside_coord_x_y[start_index].box_y);
            //bezierCurveTo(조절점1x, 조절점1y, 조절점2x, 조절점2y, 선의 끝점x, 선의 끝점y)
            canvas_drawes[3].bezierCurveTo(
                            step4_canvas_upperside_coord_x_y[start_index].box_x, step4_canvas_upperside_coord_x_y[start_index].box_y / 2, 
                            step3_canvas_downside_coord_x_y[end_index].box_x, step4_canvas_upperside_coord_x_y[start_index].box_y / 2, 
                            step3_canvas_downside_coord_x_y[end_index].box_x, step3_canvas_downside_coord_x_y[end_index].box_y
                            );
            canvas_drawes[3].lineWidth = 1;
            canvas_drawes[3].stroke();
        }

        const num_step0_boxes = 5;
        const num_step2_boxes = 5;

        for(let i = 0; i < num_step0_boxes; i ++){
            draw_canvas1_line(i, 0, false);
            draw_canvas2_line(i, 0, false);
        }
})
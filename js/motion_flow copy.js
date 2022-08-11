$(function(){
    const root = document.querySelector(':root');
    root.style.setProperty('--step0_box1_percent', '0.50');
    // root.style.setProperty('--step0_box2_percent', '0.60');
    const c1_container = document.querySelector(".canvas1_container");
    const c2_container = document.querySelector(".canvas2_container");
    const c3_container = document.querySelector(".canvas3_container");
    const c4_container = document.querySelector(".canvas4_container");

    let canvas_width = document.querySelector(".step0_boxes").getBoundingClientRect().width;
    let canvas_height = document.querySelector(".step0_boxes").getBoundingClientRect().height;
    c1_container.innerHTML += `<canvas id="canvas1" width="${canvas_width}" height="${canvas_height}"></canvas>`
    c2_container.innerHTML += `<canvas id="canvas2" width="${canvas_width}" height="${canvas_height}"></canvas>`
    c3_container.innerHTML += `<canvas id="canvas3" width="${canvas_width}" height="${canvas_height}"></canvas>`
    c4_container.innerHTML += `<canvas id="canvas4" width="${canvas_width}" height="${canvas_height}"></canvas>`

    const canvases = [document.getElementById('canvas1'), document.getElementById('canvas2'), document.getElementById('canvas3'), document.getElementById('canvas4')];
    const canvas_drawes = [canvases[0].getContext('2d'), canvases[1].getContext('2d'), canvases[2].getContext('2d'), canvases[3].getContext('2d')];
 
    let s2_clicked_box_index;
    let s3_clicked_box_index;
    let s4_clicked_box_index;
    let canvas3_selected_lines_index = [];
    let canvas4_selected_lines_index = [];
    
    const clicked_box_elem = [];
    const isClicked = [false, false];

    const style = getComputedStyle(document.body);
    let step3_box_visibility = style.getPropertyValue('--visibility');


    // flow_data = {};
const make_random_value = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        
        return Math.floor(Math.random() * (max - min)) + min; 
      }

  const make_dump_data = (domain) => {
    // flow_data.${domain}.domain_name = `www.${domain}`
    const temp1 = [make_random_value(1,1000), make_random_value(1,1000), make_random_value(1,1000), make_random_value(1,1000), make_random_value(1,1000)];
    const temp2 = [make_random_value(1,1000), make_random_value(1,1000), make_random_value(1,1000), make_random_value(1,1000), make_random_value(1,1000)];
    const temp3 = [make_random_value(1,1000), make_random_value(1,1000), make_random_value(1,1000), make_random_value(1,1000), make_random_value(1,1000)];
    const temp4 = make_random_value(1,1000);
    

    return {[domain] : 
        { 
            domain : `www.${domain}.com`,
            direct_inflow: { 
                step2_page1:{
                    step3_page: {
                        step4_page: {
                            step4_selected_page_name: `상세페이지${temp1[0]}`,
                            step4_selected_page_value: `${temp1[0]}`,
                            etc: temp1[1],
                            left_user: temp1[2]
                        },
                        step3_selected_page_name: `상세페이지${temp2[0]}`,
                        step3_selected_page_value: temp1[0] + (temp1[1] + temp1[2]),
                        etc: temp2[1],
                        left_user: temp2[2]
                    },
                    step2_selected_page_name: `상세페이지${temp3[0]}`,
                    step2_selected_page_value: (temp1[0] + temp1[1] + temp1[2]) + temp2[1] + temp2[2],
                    etc: temp3[1],
                    left_user: temp3[2]
                },
                step2_page2:{
                    step3_page: {
                        step4_page: {
                            step4_selected_page_name: `상세페이지${temp1[0]}`,
                            step4_selected_page_value: `${temp1[0]}`,
                            etc: temp1[1],
                            left_user: temp1[2]
                        },
                        step3_selected_page_name: `상세페이지${temp2[0]}`,
                        step3_selected_page_value: temp1[0] + (temp1[1] + temp1[2]),
                        etc: temp2[1],
                        left_user: temp2[2]
                    },
                    step2_selected_page_name: `상세페이지${temp3[0]}`,
                    step2_selected_page_value: (temp1[0] + temp1[1] + temp1[2]) + temp2[1] + temp2[2],
                    etc: temp3[1],
                    left_user: temp3[2]
                },
                step2_page3:{
                    step3_page: {
                        step4_page: {
                            step4_selected_page_name: `상세페이지${temp1[0]}`,
                            step4_selected_page_value: `${temp1[0]}`,
                            etc: temp1[1],
                            left_user: temp1[2]
                        },
                        step3_selected_page_name: `상세페이지${temp2[0]}`,
                        step3_selected_page_value: temp1[0] + (temp1[1] + temp1[2]),
                        etc: temp2[1],
                        left_user: temp2[2]
                    },
                    step2_selected_page_name: `상세페이지${temp3[0]}`,
                    step2_selected_page_value: (temp1[0] + temp1[1] + temp1[2]) + temp2[1] + temp2[2],
                    etc: temp3[1],
                    left_user: temp3[2]
                },
                step2_page4:{
                    step3_page: {
                        step4_page: {
                            step4_selected_page_name: `상세페이지${temp1[0]}`,
                            step4_selected_page_value: `${temp1[0]}`,
                            etc: temp1[1],
                            left_user: temp1[2]
                        },
                        step3_selected_page_name: `상세페이지${temp2[0]}`,
                        step3_selected_page_value: temp1[0] + (temp1[1] + temp1[2]),
                        etc: temp2[1],
                        left_user: temp2[2]
                    },
                    step2_selected_page_name: `상세페이지${temp3[0]}`,
                    step2_selected_page_value: (temp1[0] + temp1[1] + temp1[2]) + temp2[1] + temp2[2],
                    etc: temp3[1],
                    left_user: temp3[2]
                },
                step2_page5:{
                    step2_selected_page_name: "이탈유저",
                    left_user: temp4
                },
                direct_inflow_value: (((temp1[0] + temp1[1] + temp1[2]) + temp2[1] + temp2[2]) * 4) + temp4
            },
            NAVER: { 
                step2_page1:{
                    step3_page: {
                        step4_page: {
                            step4_selected_page_name: `상세페이지${temp1[0]}`,
                            step4_selected_page_value: `${temp1[0]}`,
                            etc: temp1[1],
                            left_user: temp1[2]
                        },
                        step3_selected_page_name: `상세페이지${temp2[0]}`,
                        step3_selected_page_value: temp1[0] + (temp1[1] + temp1[2]),
                        etc: temp2[1],
                        left_user: temp2[2]
                    },
                    step2_selected_page_name: `상세페이지${temp3[0]}`,
                    step2_selected_page_value: (temp1[0] + temp1[1] + temp1[2]) + temp2[1] + temp2[2],
                    etc: temp3[1],
                    left_user: temp3[2]
                },
                step2_page2:{
                    step3_page: {
                        step4_page: {
                            step4_selected_page_name: `상세페이지${temp1[0]}`,
                            step4_selected_page_value: `${temp1[0]}`,
                            etc: temp1[1],
                            left_user: temp1[2]
                        },
                        step3_selected_page_name: `상세페이지${temp2[0]}`,
                        step3_selected_page_value: temp1[0] + (temp1[1] + temp1[2]),
                        etc: temp2[1],
                        left_user: temp2[2]
                    },
                    step2_selected_page_name: `상세페이지${temp3[0]}`,
                    step2_selected_page_value: (temp1[0] + temp1[1] + temp1[2]) + temp2[1] + temp2[2],
                    etc: temp3[1],
                    left_user: temp3[2]
                },
                step2_page3:{
                    step3_page: {
                        step4_page: {
                            step4_selected_page_name: `상세페이지${temp1[0]}`,
                            step4_selected_page_value: `${temp1[0]}`,
                            etc: temp1[1],
                            left_user: temp1[2]
                        },
                        step3_selected_page_name: `상세페이지${temp2[0]}`,
                        step3_selected_page_value: temp1[0] + (temp1[1] + temp1[2]),
                        etc: temp2[1],
                        left_user: temp2[2]
                    },
                    step2_selected_page_name: `상세페이지${temp3[0]}`,
                    step2_selected_page_value: (temp1[0] + temp1[1] + temp1[2]) + temp2[1] + temp2[2],
                    etc: temp3[1],
                    left_user: temp3[2]
                },
                step2_page4:{
                    step3_page: {
                        step4_page: {
                            step4_selected_page_name: `상세페이지${temp1[0]}`,
                            step4_selected_page_value: `${temp1[0]}`,
                            etc: temp1[1],
                            left_user: temp1[2]
                        },
                        step3_selected_page_name: `상세페이지${temp2[0]}`,
                        step3_selected_page_value: temp1[0] + (temp1[1] + temp1[2]),
                        etc: temp2[1],
                        left_user: temp2[2]
                    },
                    step2_selected_page_name: `상세페이지${temp3[0]}`,
                    step2_selected_page_value: (temp1[0] + temp1[1] + temp1[2]) + temp2[1] + temp2[2],
                    etc: temp3[1],
                    left_user: temp3[2]
                },
                step2_page5:{
                    step2_selected_page_name: "이탈유저",
                    left_user: temp4
                },
                NAVER_inflow: (((temp1[0] + temp1[1] + temp1[2]) + temp2[1] + temp2[2]) * 4) + temp4
            },
            FACEBOOK: { 
                step2_page1:{
                    step3_page: {
                        step4_page: {
                            step4_selected_page_name: `상세페이지${temp1[0]}`,
                            step4_selected_page_value: `${temp1[0]}`,
                            etc: temp1[1],
                            left_user: temp1[2]
                        },
                        step3_selected_page_name: `상세페이지${temp2[0]}`,
                        step3_selected_page_value: temp1[0] + (temp1[1] + temp1[2]),
                        etc: temp2[1],
                        left_user: temp2[2]
                    },
                    step2_selected_page_name: `상세페이지${temp3[0]}`,
                    step2_selected_page_value: (temp1[0] + temp1[1] + temp1[2]) + temp2[1] + temp2[2],
                    etc: temp3[1],
                    left_user: temp3[2]
                },
                step2_page2:{
                    step3_page: {
                        step4_page: {
                            step4_selected_page_name: `상세페이지${temp1[0]}`,
                            step4_selected_page_value: `${temp1[0]}`,
                            etc: temp1[1],
                            left_user: temp1[2]
                        },
                        step3_selected_page_name: `상세페이지${temp2[0]}`,
                        step3_selected_page_value: temp1[0] + (temp1[1] + temp1[2]),
                        etc: temp2[1],
                        left_user: temp2[2]
                    },
                    step2_selected_page_name: `상세페이지${temp3[0]}`,
                    step2_selected_page_value: (temp1[0] + temp1[1] + temp1[2]) + temp2[1] + temp2[2],
                    etc: temp3[1],
                    left_user: temp3[2]
                },
                step2_page3:{
                    step3_page: {
                        step4_page: {
                            step4_selected_page_name: `상세페이지${temp1[0]}`,
                            step4_selected_page_value: `${temp1[0]}`,
                            etc: temp1[1],
                            left_user: temp1[2]
                        },
                        step3_selected_page_name: `상세페이지${temp2[0]}`,
                        step3_selected_page_value: temp1[0] + (temp1[1] + temp1[2]),
                        etc: temp2[1],
                        left_user: temp2[2]
                    },
                    step2_selected_page_name: `상세페이지${temp3[0]}`,
                    step2_selected_page_value: (temp1[0] + temp1[1] + temp1[2]) + temp2[1] + temp2[2],
                    etc: temp3[1],
                    left_user: temp3[2]
                },
                step2_page4:{
                    step3_page: {
                        step4_page: {
                            step4_selected_page_name: `상세페이지${temp1[0]}`,
                            step4_selected_page_value: `${temp1[0]}`,
                            etc: temp1[1],
                            left_user: temp1[2]
                        },
                        step3_selected_page_name: `상세페이지${temp2[0]}`,
                        step3_selected_page_value: temp1[0] + (temp1[1] + temp1[2]),
                        etc: temp2[1],
                        left_user: temp2[2]
                    },
                    step2_selected_page_name: `상세페이지${temp3[0]}`,
                    step2_selected_page_value: (temp1[0] + temp1[1] + temp1[2]) + temp2[1] + temp2[2],
                    etc: temp3[1],
                    left_user: temp3[2]
                },
                step2_page5:{
                    step2_selected_page_name: "이탈유저",
                    left_user: temp4
                },
                FACEBOOK_inflow: (((temp1[0] + temp1[1] + temp1[2]) + temp2[1] + temp2[2]) * 4) + temp4
            },
            INSTAGRAM: { 
                step2_page1:{
                    step3_page: {
                        step4_page: {
                            step4_selected_page_name: `상세페이지${temp1[0]}`,
                            step4_selected_page_value: `${temp1[0]}`,
                            etc: temp1[1],
                            left_user: temp1[2]
                        },
                        step3_selected_page_name: `상세페이지${temp2[0]}`,
                        step3_selected_page_value: temp1[0] + (temp1[1] + temp1[2]),
                        etc: temp2[1],
                        left_user: temp2[2]
                    },
                    step2_selected_page_name: `상세페이지${temp3[0]}`,
                    step2_selected_page_value: (temp1[0] + temp1[1] + temp1[2]) + temp2[1] + temp2[2],
                    etc: temp3[1],
                    left_user: temp3[2]
                },
                step2_page2:{
                    step3_page: {
                        step4_page: {
                            step4_selected_page_name: `상세페이지${temp1[0]}`,
                            step4_selected_page_value: `${temp1[0]}`,
                            etc: temp1[1],
                            left_user: temp1[2]
                        },
                        step3_selected_page_name: `상세페이지${temp2[0]}`,
                        step3_selected_page_value: temp1[0] + (temp1[1] + temp1[2]),
                        etc: temp2[1],
                        left_user: temp2[2]
                    },
                    step2_selected_page_name: `상세페이지${temp3[0]}`,
                    step2_selected_page_value: (temp1[0] + temp1[1] + temp1[2]) + temp2[1] + temp2[2],
                    etc: temp3[1],
                    left_user: temp3[2]
                },
                step2_page3:{
                    step3_page: {
                        step4_page: {
                            step4_selected_page_name: `상세페이지${temp1[0]}`,
                            step4_selected_page_value: `${temp1[0]}`,
                            etc: temp1[1],
                            left_user: temp1[2]
                        },
                        step3_selected_page_name: `상세페이지${temp2[0]}`,
                        step3_selected_page_value: temp1[0] + (temp1[1] + temp1[2]),
                        etc: temp2[1],
                        left_user: temp2[2]
                    },
                    step2_selected_page_name: `상세페이지${temp3[0]}`,
                    step2_selected_page_value: (temp1[0] + temp1[1] + temp1[2]) + temp2[1] + temp2[2],
                    etc: temp3[1],
                    left_user: temp3[2]
                },
                step2_page4:{
                    step3_page: {
                        step4_page: {
                            step4_selected_page_name: `상세페이지${temp1[0]}`,
                            step4_selected_page_value: `${temp1[0]}`,
                            etc: temp1[1],
                            left_user: temp1[2]
                        },
                        step3_selected_page_name: `상세페이지${temp2[0]}`,
                        step3_selected_page_value: temp1[0] + (temp1[1] + temp1[2]),
                        etc: temp2[1],
                        left_user: temp2[2]
                    },
                    step2_selected_page_name: `상세페이지${temp3[0]}`,
                    step2_selected_page_value: (temp1[0] + temp1[1] + temp1[2]) + temp2[1] + temp2[2],
                    etc: temp3[1],
                    left_user: temp3[2]
                },
                step2_page5:{
                    step2_selected_page_name: "이탈유저",
                    left_user: temp4
                },
                INSTAGRAM_inflow: (((temp1[0] + temp1[1] + temp1[2]) + temp2[1] + temp2[2]) * 4) + temp4
            },
            ETC: temp4
        }
    }
  }


  let labbit_data = make_dump_data('labbit');

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

        //hide step3 boxes and canvas3
        const canvas3_container = document.querySelector('.canvas3_container');
        const canvas4_container = document.querySelector('.canvas4_container');
        const step3_boxes = document.querySelector('.step3_boxes');
        const step4_boxes = document.querySelector('.step4_boxes');

        canvas3_container.style.display = "none";
        canvas4_container.style.display = "none";
        step3_boxes.style.display = "none";
        step4_boxes.style.display = "none";

        // reset all past selected lines
        canvas_drawes[0].clearRect(0, 0, canvas_width, canvas_height);
        canvas_drawes[1].clearRect(0, 0, canvas_width, canvas_height);
        canvas_drawes[2].clearRect(0, 0, canvas_width, canvas_height);
        canvas_drawes[3].clearRect(0, 0, canvas_width, canvas_height);
        
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

        //hide step3 boxes and canvas3
        const canvas3_container = document.querySelector('.canvas3_container');
        const canvas4_container = document.querySelector('.canvas4_container');
        const step3_boxes = document.querySelector('.step3_boxes');
        const step4_boxes = document.querySelector('.step4_boxes');

        canvas3_container.style.display = "none";
        canvas4_container.style.display = "none";
        step3_boxes.style.display = "none";
        step4_boxes.style.display = "none";

        // reset all past selected lines
        canvas_drawes[1].clearRect(0, 0, canvas_width, canvas_height);
        canvas_drawes[2].clearRect(0, 0, canvas_width, canvas_height);
        canvas_drawes[3].clearRect(0, 0, canvas_width, canvas_height);

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

        clicked_box_elem[1].style.backgroundColor = ''



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

        //hide step3 boxes and canvas3
        const canvas4_container = document.querySelector('.canvas4_container');
        const step4_boxes = document.querySelector('.step4_boxes');
        
        canvas4_container.style.display = "none";
        step4_boxes.style.display = "none";

        // reset all past selected lines
        canvas_drawes[1].clearRect(0, 0, canvas_width, canvas_height);
        canvas_drawes[2].clearRect(0, 0, canvas_width, canvas_height);
        canvas_drawes[3].clearRect(0, 0, canvas_width, canvas_height);
        
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

        // display canvas3 and step3 boxes
        const canvas3_container = document.querySelector('.canvas3_container');
        const step3_boxes = document.querySelector('.step3_boxes');

        canvas3_container.style.display = "block";
        step3_boxes.style.display = "flex";

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
        // const step3_left_user_title_nodes = document.querySelectorAll(`.step3_boxes > div :nth-child(2)`); // 추가
        step3_sibling_nodes.forEach((item) => item.style.visibility = 'hidden');
        step3_sibling_nodes.forEach((item) => item.classList.remove('left_user')); // 추가
        // step3_left_user_title_nodes.forEach(item => item.textContent = "직접유입");

        if (index === 0) {
            step3_sibling_nodes[index].style.visibility = 'visible'
            step3_sibling_nodes[index + 1].style.visibility = 'visible'
            step3_sibling_nodes[index + 2].style.visibility = 'visible'
            step3_sibling_nodes[index + 2].classList.add('left_user') //추가
            // step3_left_user_title_nodes[index + 2].textContent = "이탈유저" // 추가

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
            step3_sibling_nodes[index + 1].classList.add('left_user') //추가
            // step3_left_user_title_nodes[index + 1].textContent = "이탈유저" // 추가

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
            step3_sibling_nodes[index].classList.add('left_user') //추가
            // step3_left_user_title_nodes[index].textContent = "이탈유저" // 추가

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
        canvas_drawes[2].clearRect(0, 0, canvas_width, canvas_height);
        canvas_drawes[3].clearRect(0, 0, canvas_width, canvas_height);

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
        
        // display canvas3 and step3 boxes
        const canvas4_container = document.querySelector('.canvas4_container');
        const step4_boxes = document.querySelector('.step4_boxes');

        canvas4_container.style.display = "block";
        step4_boxes.style.display = "flex";

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
        step4_sibling_nodes.forEach((item) => item.classList.remove('left_user')); // 추가
        step4_sibling_nodes.forEach((item) => item.style.visibility = 'hidden');
        const step4_left_user_title_nodes = document.querySelectorAll(`.step4_boxes > div :nth-child(2)`); // 추가
        // step4_left_user_title_nodes.forEach(item => item.textContent = "직접유입"); // 추가

        if (index === 0) {
            step4_sibling_nodes[index].style.visibility = 'visible'
            step4_sibling_nodes[index + 1].style.visibility = 'visible'
            step4_sibling_nodes[index + 2].style.visibility = 'visible'
            step4_sibling_nodes[index + 2].classList.add('left_user') //추가
            // step4_left_user_title_nodes[index + 2].textContent = "이탈유저" // 추가

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
            step4_sibling_nodes[index + 1].classList.add('left_user') //추가
            // step4_left_user_title_nodes[index + 1].textContent = "이탈유저" // 추가


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
            step4_sibling_nodes[index].classList.add('left_user') //추가
            // step4_left_user_title_nodes[index].textContent = "이탈유저" // 추가

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
        canvas_drawes[3].clearRect(0, 0, canvas_width, canvas_height); 

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

    const step0_config = [
        {
            parant_class_name: "percent_s0_box1", 
            data_index: 0,  
            first_child_class_name:"percent_box_title", 
            second_child_class_name: "percent_box_value", 
            third_child_class_name:"percent_box_value2", 
        },{
            parant_class_name: "percent_s0_box2", 
            data_index: 1, 
            first_child_class_name:"percent_box_title", 
            second_child_class_name: "percent_box_value", 
            third_child_class_name:"percent_box_value2", 
        },{
            parant_class_name: "percent_s0_box3", 
            data_index: 2, 
            first_child_class_name:"percent_box_title", 
            second_child_class_name: "percent_box_value", 
            third_child_class_name:"percent_box_value2", 
        },{
            parant_class_name: "percent_s0_box4", 
            data_index: 3, 
            first_child_class_name:"percent_box_title", 
            second_child_class_name: "percent_box_value", 
            third_child_class_name:"percent_box_value2", 
        },{
            parant_class_name: "percent_s0_box5", 
            data_index: 4, 
            first_child_class_name:"percent_box_title", 
            second_child_class_name: "percent_box_value", 
            third_child_class_name:"percent_box_value2", 
        },
    ]
    
    const step0_data = 
        [
            [
                {
                    title_text: "직접 유입", 
                    value_text: "300", 
                    percent_text: 0.28
                },{
                    title_text: "NAVER", 
                    value_text: "300", 
                    percent_text: 0.28
                },{
                    title_text: "FACEBOOK", 
                    value_text: "300", 
                    percent_text: 0.28
                },{
                    title_text: "INSTAGRAM", 
                    value_text: "300", 
                    percent_text: 0.28
                },{
                    title_text: "ETC", 
                    value_text: "300", 
                    percent_text: 0.28
                },
            ],  
            [
                {
                    title_text: "직접 유입", 
                    value_text: "300", 
                    percent_text: 0.25
                },{
                    title_text: "NAVER", 
                    value_text: "300", 
                    percent_text: 0.35
                },{
                    title_text: "FACEBOOK", 
                    value_text: "300", 
                    percent_text: 0.45
                },{
                    title_text: "INSTAGRAM", 
                    value_text: "300", 
                    percent_text: 0.55
                },{
                    title_text: "ETC", 
                    value_text: "300", 
                    percent_text: 0.65
                },
            ]
    ]
    
    const step0_num = 0;
    const s0_boxes = d3.select(".step0_boxes")          
                    .selectAll()            
                    .data(step0_config)           
                    .enter()                 
                    .append("div")
                    .attr('class', function(d) { return d.parant_class_name; })
                    .attr('data-index', function(d) { return d.data_index; })            
                    .on('click', (event) => handle_s0_boxes_click(event, step0_num))
                    s0_boxes.append("div")
                    .attr('class', 'step0_border')
                    .attr('data-index', function(d) { return d.data_index; })
                    .on('click', (event) => handle_s0_boxes_click(event, step0_num))
    const s0_boxes_title = s0_boxes.append('p')
                    .attr('class', function(d) { return d.first_child_class_name; })
                    .attr('data-index', function(d) { return d.data_index; })
                    
    const s0_boxes_value = s0_boxes.append('p')
                    .attr('class', function(d) { return d.second_child_class_name; })
                    .attr('data-index', function(d) { return d.data_index; })
                    
    const s0_boxes_percent = s0_boxes.append('span')
                    .attr('class', function(d) { return d.third_child_class_name; })
                    .attr('data-index', function(d) { return d.data_index; })
                    
    const update_step0_data = (index) => {
                    s0_boxes_title.data(step0_data[index].reduce((accumulator, current) => [...accumulator, current.title_text], []))
                    .text(function(d) { return d; });

                    s0_boxes_value.data(step0_data[index].reduce((accumulator, current) => [...accumulator, current.value_text], []))
                    .text(function(d) { return d });

                    s0_boxes_percent.data(step0_data[index].reduce((accumulator, current) => [...accumulator, current.percent_text], []))
                    .text(function(d) { return `${Math.round(d*100)}%` });

                    for(let i = 0; i < step0_data[index].length; i++){
                        root.style.setProperty(`--step0_box${i+1}_percent`, step0_data[index][i].percent_text);
                    }
                }

        update_step0_data(0);
//  ---------------- step 1 boxes ---------------------------------

const step1_data = 
        [
            {
                domain: "www.naver.com", 
                title1: "랜딩1", 
                title2: "랜딩2"
            },
            {
                domain: "www.daum.com", 
                title1: "랜딩3", 
                title2: "랜딩4"
            }
        ]

const step1_config = [
        {
            parant_class_name: "percent_s1_hidden_box", 
            data_index: 0,  
            first_child_class_name:"percent_box_title", 
        },{
            parant_class_name: "percent_s1_hidden_box", 
            data_index: 1, 
            first_child_class_name:"percent_box_title", 
        },{
            parant_class_name: "percent_s1_center_box", 
            data_index: 2, 
            first_child_class_name:"percent_box_title", 
        },{
            parant_class_name: "percent_s1_box unclickable", 
            data_index: 3, 
            first_child_class_name:"percent_box_title", 
        },{
            parant_class_name: "percent_s1_box unclickable", 
            data_index: 4, 
            first_child_class_name:"percent_box_title", 
        },
    ]

    const step1_num = 1;
    const s1_boxes = d3.select(".step1_boxes")          
                    .selectAll()            
                    .data(step1_config)           
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
                    s1_boxes.append('span')
                    .attr('class', 'step1_notice')
                    .text("step 1")
                    
                    
    const update_step1_data = (index) => {
        
        const step1_percent_box_title = document.querySelector('.percent_s1_center_box :nth-child(2)');
        const step1_right_boxes = document.querySelectorAll('.percent_s1_box');
        step1_percent_box_title.innerText = step1_data[index].domain;
        step1_right_boxes[0].innerText = step1_data[index].title1;
        step1_right_boxes[1].innerText = step1_data[index].title1;
    }
    update_step1_data(0);


//  ---------------- step 2 boxes ---------------------------------

const step2_config = [
    {
        parant_class_name: "percent_s2_box1", 
        data_index: 0,  
        first_child_class_name:"percent_box_title", 
        second_child_class_name: "percent_box_value", 
        third_child_class_name:"percent_box_value2", 
    },{
        parant_class_name: "percent_s2_box2", 
        data_index: 1, 
        first_child_class_name:"percent_box_title", 
        second_child_class_name: "percent_box_value", 
        third_child_class_name:"percent_box_value2", 
    },{
        parant_class_name: "percent_s2_box3", 
        data_index: 2, 
        first_child_class_name:"percent_box_title", 
        second_child_class_name: "percent_box_value", 
        third_child_class_name:"percent_box_value2", 
    },{
        parant_class_name: "percent_s2_box4", 
        data_index: 3, 
        first_child_class_name:"percent_box_title", 
        second_child_class_name: "percent_box_value", 
        third_child_class_name:"percent_box_value2", 
    },{
        parant_class_name: "percent_s2_box5 left_user", 
        data_index: 4, 
        first_child_class_name:"percent_box_title", 
        second_child_class_name: "percent_box_value", 
        third_child_class_name:"percent_box_value2", 
    },
]

const step2_data = 
    [
        [
            {
                title_text: "상세페이지1", 
                value_text: "300", 
                percent_text: 0.28
            },{
                title_text: "상세페이지2", 
                value_text: "300", 
                percent_text: 0.28
            },{
                title_text: "상세페이지3", 
                value_text: "300", 
                percent_text: 0.28
            },{
                title_text: "상세페이지4", 
                value_text: "300", 
                percent_text: 0.28
            },{
                title_text: "이탈유저", 
                value_text: "300", 
                percent_text: 0.28
            },
        ],  
        [
            {
                title_text: "상세페이지6", 
                value_text: "300", 
                percent_text: 0.25
            },{
                title_text: "상세페이지7", 
                value_text: "300", 
                percent_text: 0.35
            },{
                title_text: "상세페이지8", 
                value_text: "300", 
                percent_text: 0.45
            },{
                title_text: "상세페이지9", 
                value_text: "300", 
                percent_text: 0.55
            },{
                title_text: "이탈유저", 
                value_text: "300", 
                percent_text: 0.65
            },
        ]
    ]


const step2_num = 2;
const s2_boxes = d3.select(".step2_boxes")          
                .selectAll()            
                .data(step2_config)           
                .enter()                 
                .append("div")
                .attr('class', function(d) { return d.parant_class_name; })
                .attr('data-index', function(d) { return d.data_index; })            
                .on('click', (event) => handle_s2_boxes_click(event, step2_num))
                s2_boxes.append("div")
                .attr('class', 'step2_border')
                .attr('data-index', function(d) { return d.data_index; })
                .on('click', (event) => handle_s2_boxes_click(event, step2_num))
const s2_boxes_title = s2_boxes.append('p')
                .attr('class', function(d) { return d.first_child_class_name; })
                .attr('data-index', function(d) { return d.data_index; })
                
const s2_boxes_value = s2_boxes.append('p')
                .attr('class', function(d) { return d.second_child_class_name; })
                .attr('data-index', function(d) { return d.data_index; })
                
const s2_boxes_percent = s2_boxes.append('span')
                .attr('class', function(d) { return d.third_child_class_name; })
                .attr('data-index', function(d) { return d.data_index; })
                s2_boxes.append('span')
                .attr('class', 'step2_notice')
                .text("step 2")

const update_step2_data = (index) => {
                s2_boxes_title.data(step2_data[index].reduce((accumulator, current) => [...accumulator, current.title_text], []))
                .text(function(d) { return d; });

                s2_boxes_value.data(step2_data[index].reduce((accumulator, current) => [...accumulator, current.value_text], []))
                .text(function(d) { return d });

                s2_boxes_percent.data(step2_data[index].reduce((accumulator, current) => [...accumulator, current.percent_text], []))
                .text(function(d) { return `${Math.round(d*100)}%` });

                for(let i = 0; i < step2_data[index].length; i++){
                    root.style.setProperty(`--step2_box${i+1}_percent`, step2_data[index][i].percent_text);
                }
            }

    update_step2_data(1);

//  ---------------- step 3 boxes ---------------------------------

const step3_config = [
    {
        parant_class_name: "percent_s3_box1", 
        data_index: 0,  
        first_child_class_name:"percent_box_title",
        third_child_class_name:"percent_box_value2", 
    },{
        parant_class_name: "percent_s3_box2", 
        data_index: 1, 
        first_child_class_name:"percent_box_title",
        third_child_class_name:"percent_box_value2", 
    },{
        parant_class_name: "percent_s3_box3", 
        data_index: 2, 
        first_child_class_name:"percent_box_title",
        third_child_class_name:"percent_box_value2", 
    },{
        parant_class_name: "percent_s3_box4", 
        data_index: 3, 
        first_child_class_name:"percent_box_title",
        third_child_class_name:"percent_box_value2", 
    },{
        parant_class_name: "percent_s3_box5 left_user", 
        data_index: 4, 
        first_child_class_name:"percent_box_title",
        third_child_class_name:"percent_box_value2", 
    },
]

const step3_data = 
    [
        [
            {
                title_text: "상세페이지1", 
                percent_text: 0.28
            },{
                title_text: "상세페이지2", 
                percent_text: 0.28
            },{
                title_text: "상세페이지3", 
                percent_text: 0.28
            },{
                title_text: "상세페이지4", 
                percent_text: 0.28
            },{
                title_text: "이탈유저", 
                percent_text: 0.28
            },
        ],  
        [
            {
                title_text: "상세페이지6", 
                percent_text: 0.25
            },{
                title_text: "상세페이지7", 
                percent_text: 0.35
            },{
                title_text: "상세페이지8", 
                percent_text: 0.45
            },{
                title_text: "상세페이지9", 
                percent_text: 0.55
            },{
                title_text: "이탈유저", 
                percent_text: 0.65
            },
        ]
    ]


const step3_num = 3;
const s3_boxes = d3.select(".step3_boxes")          
                .selectAll()            
                .data(step3_config)           
                .enter()                 
                .append("div")
                .attr('class', function(d) { return d.parant_class_name; })
                .attr('data-index', function(d) { return d.data_index; })            
                .on('click', (event) => handle_s3_boxes_click(event, step3_num));

                s3_boxes.append("div")
                .attr('class', 'step3_border')
                .attr('data-index', function(d) { return d.data_index; })
                .on('click', (event) => handle_s3_boxes_click(event, step3_num));

const s3_boxes_title = s3_boxes.append('p')
                .attr('class', function(d) { return d.first_child_class_name; })
                .attr('data-index', function(d) { return d.data_index; })
                
const s3_boxes_percent = s3_boxes.append('span')
                .attr('class', function(d) { return d.third_child_class_name; })
                .attr('data-index', function(d) { return d.data_index; })
                s3_boxes.append('span')
                .attr('class', 'step3_notice')
                .text("step 3")

const update_step3_data = (index) => {
                s3_boxes_title.data(step3_data[index].reduce((accumulator, current) => [...accumulator, current.title_text], []))
                .text(function(d) { return d; })

                s3_boxes_percent.data(step3_data[index].reduce((accumulator, current) => [...accumulator, current.percent_text], []))
                .text(function(d) { return `${Math.round(d*100)}%` })
    
                for(let i = 0; i < step3_data[index].length; i++){
                    root.style.setProperty(`--step3_box${i+1}_percent`, step3_data[index][i].percent_text);
                }
            }

    update_step3_data(0);

//  ---------------- step 4 boxes ---------------------------------

const step4_config = [
    {
        parant_class_name: "percent_s4_box1", 
        data_index: 0,  
        first_child_class_name:"percent_box_title", 
        third_child_class_name:"percent_box_value2", 
    },{
        parant_class_name: "percent_s4_box2", 
        data_index: 1, 
        first_child_class_name:"percent_box_title", 
        third_child_class_name:"percent_box_value2", 
    },{
        parant_class_name: "percent_s4_box3", 
        data_index: 2, 
        first_child_class_name:"percent_box_title", 
        third_child_class_name:"percent_box_value2", 
    },{
        parant_class_name: "percent_s4_box4", 
        data_index: 3, 
        first_child_class_name:"percent_box_title", 
        third_child_class_name:"percent_box_value2", 
    },{
        parant_class_name: "percent_s4_box5 left_user", 
        data_index: 4, 
        first_child_class_name:"percent_box_title", 
        third_child_class_name:"percent_box_value2", 
    },
]

const step4_data = 
    [
        [
            {
                title_text: "상세페이지1", 
                percent_text: 0.28
            },{
                title_text: "상세페이지2", 
                percent_text: 0.28
            },{
                title_text: "상세페이지3", 
                percent_text: 0.28
            },{
                title_text: "상세페이지4", 
                percent_text: 0.28
            },{
                title_text: "이탈유저", 
                percent_text: 0.28
            },
        ],  
        [
            {
                title_text: "상세페이지6", 
                percent_text: 0.25
            },{
                title_text: "상세페이지7", 
                percent_text: 0.35
            },{
                title_text: "상세페이지8", 
                percent_text: 0.45
            },{
                title_text: "상세페이지9", 
                percent_text: 0.55
            },{
                title_text: "이탈유저", 
                percent_text: 0.65
            },
        ]
    ]


const step4_num = 4;
const s4_boxes = d3.select(".step4_boxes")          
                .selectAll()            
                .data(step4_config)           
                .enter()                 
                .append("div")
                .attr('class', function(d) { return d.parant_class_name; })
                .attr('data-index', function(d) { return d.data_index; })            
                .on('click', (event) => handle_s4_boxes_click(event, step4_num));

                s4_boxes.append("div")
                .attr('class', 'step4_border')
                .attr('data-index', function(d) { return d.data_index; })
                .on('click', (event) => handle_s4_boxes_click(event, step4_num));

const s4_boxes_title = s4_boxes.append('p')
                .attr('class', function(d) { return d.first_child_class_name; })
                .attr('data-index', function(d) { return d.data_index; })
                
const s4_boxes_percent = s4_boxes.append('span')
                .attr('class', function(d) { return d.third_child_class_name; })
                .attr('data-index', function(d) { return d.data_index; })
                s4_boxes.append('span')
                .attr('class', 'step4_notice')
                .text("step 4")

const update_step4_data = (index) => {
                s4_boxes_title.data(step4_data[index].reduce((accumulator, current) => [...accumulator, current.title_text], []))
                .text(function(d) { return d; })

                s4_boxes_percent.data(step4_data[index].reduce((accumulator, current) => [...accumulator, current.percent_text], []))
                .text(function(d) { return `${Math.round(d*100)}%` });

                for(let i = 0; i < step4_data[index].length; i++){
                    root.style.setProperty(`--step4_box${i+1}_percent`, step4_data[index][i].percent_text);
                }
            }

    update_step4_data(1);

        

// step 0 curve lines 
        const percent_s0_box1 = document.querySelector('.percent_s0_box1');

        let s0_box_width = percent_s0_box1.clientWidth;
        let width_between_boxes = (canvas_width - (s0_box_width * 5)) / 4

        const box1_x = s0_box_width * 0 + width_between_boxes * 0 + s0_box_width / 2;
        const box2_x = s0_box_width * 1 + width_between_boxes * 1 + s0_box_width / 2;
        const box3_x = s0_box_width * 2 + width_between_boxes * 2 + s0_box_width / 2;
        const box4_x = s0_box_width * 3 + width_between_boxes * 3 + s0_box_width / 2;
        const box5_x = s0_box_width * 4 + width_between_boxes * 4 + s0_box_width / 2;

            const step0_canvas_downside_coord_x_y = [
                { box_x: box1_x, box_y: 0 }, 
                { box_x: box2_x, box_y: 0 }, 
                { box_x: box3_x, box_y: 0 }, 
                { box_x: box4_x, box_y: 0 }, 
                { box_x: box5_x, box_y: 0 }, 
            ];

            const step1_canvas_upperside_coord_x_y = [
                { box_x: (canvas_width / 2), box_y: canvas_height }, 
            ]

            const step1_canvas_downside_coord_x_y = [
                { box_x: (canvas_width / 2), box_y: 0 }, 
            ]

            const step2_canvas_upperside_coord_x_y = [
                { box_x: box1_x, box_y: canvas_height }, 
                { box_x: box2_x, box_y: canvas_height }, 
                { box_x: box3_x, box_y: canvas_height }, 
                { box_x: box4_x, box_y: canvas_height }, 
                { box_x: box5_x, box_y: canvas_height }, 
            ];

            const step2_canvas_downside_coord_x_y = [
                { box_x: box1_x, box_y: 0 }, 
                { box_x: box2_x, box_y: 0 }, 
                { box_x: box3_x, box_y: 0 }, 
                { box_x: box4_x, box_y: 0 }, 
                { box_x: box5_x, box_y: 0 }, 
            ];

            const step3_canvas_upperside_coord_x_y = [
                { box_x: box1_x, box_y: canvas_height }, 
                { box_x: box2_x, box_y: canvas_height }, 
                { box_x: box3_x, box_y: canvas_height }, 
                { box_x: box4_x, box_y: canvas_height }, 
                { box_x: box5_x, box_y: canvas_height }, 
            ];

            const step3_canvas_downside_coord_x_y = [
                { box_x: box1_x, box_y: 0 }, 
                { box_x: box2_x, box_y: 0 }, 
                { box_x: box3_x, box_y: 0 }, 
                { box_x: box4_x, box_y: 0 }, 
                { box_x: box5_x, box_y: 0 }, 
            ];

            const step4_canvas_upperside_coord_x_y = [
                { box_x: box1_x, box_y: canvas_height }, 
                { box_x: box2_x, box_y: canvas_height }, 
                { box_x: box3_x, box_y: canvas_height }, 
                { box_x: box4_x, box_y: canvas_height }, 
                { box_x: box5_x, box_y: canvas_height }, 
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
$(function(){
    const root = document.querySelector(':root');
    root.style.setProperty('--step0_box1_percent', '0.50');

    let c1_container = document.querySelector(".canvas1_container");
    let c2_container = document.querySelector(".canvas2_container");
    let c3_container = document.querySelector(".canvas3_container");
    let c4_container = document.querySelector(".canvas4_container");
    
    let canvas_width = document.querySelector(".step0_boxes").getBoundingClientRect().width;
    let canvas_height = document.querySelector(".step0_boxes").getBoundingClientRect().height;
    let heightRatio = canvas_height / canvas_width;
 
    c1_container.innerHTML += `<canvas id="canvas1" width="${canvas_width}" height="${canvas_height}"></canvas>`
    c2_container.innerHTML += `<canvas id="canvas2" width="${canvas_width}" height="${canvas_height}"></canvas>`
    c3_container.innerHTML += `<canvas id="canvas3" width="${canvas_width}" height="${canvas_height}"></canvas>`
    c4_container.innerHTML += `<canvas id="canvas4" width="${canvas_width}" height="${canvas_height}"></canvas>`

    let canvases = [document.getElementById('canvas1'), document.getElementById('canvas2'), document.getElementById('canvas3'), document.getElementById('canvas4')];
    let canvas_drawes = [canvases[0].getContext('2d'), canvases[1].getContext('2d'), canvases[2].getContext('2d'), canvases[3].getContext('2d')];
    const canvas_num = 4

    
    const clicked_box_elem = [];
    const isClicked = [false, false];


    const style = getComputedStyle(document.body);
    let step3_box_visibility = style.getPropertyValue('--visibility');

const handle_resize = () => {
    canvas_width = document.querySelector(".step0_boxes").getBoundingClientRect().width;
    canvas_height = document.querySelector(".step0_boxes").getBoundingClientRect().height;
    heightRatio = canvas_height / canvas_width;

    c1_container.removeChild(canvases[0]);
    c2_container.removeChild(canvases[1]);
    c3_container.removeChild(canvases[2]);
    c4_container.removeChild(canvases[3]);
    c1_container.innerHTML += `<canvas id="canvas1" width="${canvas_width}" height="${canvas_height}"></canvas>`;
    c2_container.innerHTML += `<canvas id="canvas2" width="${canvas_width}" height="${canvas_height}"></canvas>`;
    c3_container.innerHTML += `<canvas id="canvas3" width="${canvas_width}" height="${canvas_height}"></canvas>`;
    c4_container.innerHTML += `<canvas id="canvas4" width="${canvas_width}" height="${canvas_height}"></canvas>`;
    
    update_coordinates();

    for(let i = 0; i < canvas_num ; i++){
        canvases[i] = document.getElementById(`canvas${i+1}`)
        canvas_drawes[i] = canvases[i].getContext('2d')
    }
    for(let i = 0 ; i < 5 ; i++){
        if(i === indexes[0]){
            continue;
        }
        draw_canvas1_line(i, 0, false);
    }

    // draw default lines
    for(let i = 0 ; i < 5 ; i++){ 
        if(i === indexes[2]){
            continue;
        }
        draw_canvas2_line(i, 0, false);
   }

    if(indexes[0]){
        draw_canvas1_line(indexes[0], 0, true);
    }
    if(indexes[2]){
        draw_canvas2_line(indexes[2], 0, true);
    }

    update_canvas3_boxes_lines();
    update_canvas4_boxes_lines();
}

window.addEventListener('resize', handle_resize);

    
const make_random_value = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        
        return Math.floor(Math.random() * (max - min)) + min; 
      }

  const make_dump_data = (domain) => {

    const direct_flow = [];
    const NAVER_flow = [];
    const FACEBOOK_flow = [];
    const INSTAGRAM_flow = [];
    for(let i = 0; i < 30; i++){
        direct_flow[i] = make_random_value(1,1000);
    }

    for(let i = 0; i < 30; i++){
        NAVER_flow[i] = make_random_value(1,1000);
    }

    for(let i = 0; i < 30; i++){
        FACEBOOK_flow[i] = make_random_value(1,1000);
    }

    for(let i = 0; i < 30; i++){
        INSTAGRAM_flow[i] = make_random_value(1,1000);
    }

    return {[domain] : 
        { 
            domain : `www.${domain}.com`,
            direct_inflow: { 
                step2_page1:{
                    step3_page: {
                        step4_page: {
                            step4_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                            step4_selected_page_value: direct_flow[0],
                            etc: direct_flow[1],
                            left_user: direct_flow[2]
                        },
                        step3_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                        step3_selected_page_value: direct_flow[0] + direct_flow[1] + direct_flow[2],
                        etc: direct_flow[3],
                        left_user:direct_flow[4]
                    },
                    step2_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                    step2_selected_page_value: direct_flow[0] + direct_flow[1] + direct_flow[2] + direct_flow[3] + direct_flow[4],
                },
                step2_page2:{
                    step3_page: {
                        step4_page: {
                            step4_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                            step4_selected_page_value: direct_flow[7],
                            etc: direct_flow[8],
                            left_user: direct_flow[9],
                        },
                        step3_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                        step3_selected_page_value: direct_flow[7] + direct_flow[8] + direct_flow[9],
                        etc: direct_flow[10],
                        left_user: direct_flow[11],
                    },
                    step2_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                    step2_selected_page_value: direct_flow[7] + direct_flow[8] + direct_flow[9] + direct_flow[10] + direct_flow[11],
                },
                step2_page3:{
                    step3_page: {
                        step4_page: {
                            step4_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                            step4_selected_page_value: direct_flow[14],
                            etc: direct_flow[15],
                            left_user: direct_flow[16],
                        },
                        step3_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                        step3_selected_page_value: direct_flow[14] + direct_flow[15] + direct_flow[16],
                        etc: direct_flow[17],
                        left_user: direct_flow[18]
                    },
                    step2_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                    step2_selected_page_value: direct_flow[14] + direct_flow[15] + direct_flow[16] + direct_flow[17] + direct_flow[18],
                    
                },
                step2_page4:{
                    step3_page: {
                        step4_page: {
                            step4_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                            step4_selected_page_value: direct_flow[21],
                            etc: direct_flow[22],
                            left_user: direct_flow[23]
                        },
                        step3_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                        step3_selected_page_value: direct_flow[21] + direct_flow[22] + direct_flow[23],
                        etc: direct_flow[24],
                        left_user: direct_flow[25],
                    },
                    step2_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                    step2_selected_page_value: direct_flow[21] + direct_flow[22] + direct_flow[23] + direct_flow[24] + direct_flow[25],
 
                },
                step2_page5:{
                    step2_selected_page_name: "이탈유저",
                    left_user: direct_flow[28]
                },
                total_inflow: (() => {
                    let sum = 0;
                    for(let i = 0; i < 29; i++){ // 5,6, 12,13, 19, 20, 26,27 없앰
                        if(i % 7 === 5 || i % 7 === 6 ){
                            continue;
                        }
                        sum += direct_flow[i]
                    }
                    return sum;
                })(),
            },
            NAVER: { 
                step2_page1:{
                    step3_page: {
                        step4_page: {
                            step4_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                            step4_selected_page_value: NAVER_flow[0],
                            etc: NAVER_flow[1],
                            left_user: NAVER_flow[2]
                        },
                        step3_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                        step3_selected_page_value: NAVER_flow[0] + NAVER_flow[1] + NAVER_flow[2],
                        etc: NAVER_flow[3],
                        left_user:NAVER_flow[4]
                    },
                    step2_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                    step2_selected_page_value: NAVER_flow[0] + NAVER_flow[1] + NAVER_flow[2] + NAVER_flow[3] + NAVER_flow[4],
                },
                step2_page2:{
                    step3_page: {
                        step4_page: {
                            step4_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                            step4_selected_page_value: NAVER_flow[7],
                            etc: NAVER_flow[8],
                            left_user: NAVER_flow[9],
                        },
                        step3_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                        step3_selected_page_value: NAVER_flow[7] + NAVER_flow[8] + NAVER_flow[9],
                        etc: NAVER_flow[10],
                        left_user: NAVER_flow[11],
                    },
                    step2_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                    step2_selected_page_value: NAVER_flow[7] + NAVER_flow[8] + NAVER_flow[9] + NAVER_flow[10] + NAVER_flow[11],
                },
                step2_page3:{
                    step3_page: {
                        step4_page: {
                            step4_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                            step4_selected_page_value: NAVER_flow[14],
                            etc: NAVER_flow[15],
                            left_user: NAVER_flow[16],
                        },
                        step3_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                        step3_selected_page_value: NAVER_flow[14] + NAVER_flow[15] + NAVER_flow[16],
                        etc: NAVER_flow[17],
                        left_user: NAVER_flow[18]
                    },
                    step2_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                    step2_selected_page_value: NAVER_flow[14] + NAVER_flow[15] + NAVER_flow[16] + NAVER_flow[17] + NAVER_flow[18],
                },
                step2_page4:{
                    step3_page: {
                        step4_page: {
                            step4_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                            step4_selected_page_value: NAVER_flow[21],
                            etc: NAVER_flow[22],
                            left_user: NAVER_flow[23]
                        },
                        step3_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                        step3_selected_page_value: NAVER_flow[21] + NAVER_flow[22] + NAVER_flow[23],
                        etc: NAVER_flow[24],
                        left_user: NAVER_flow[25]
                    },
                    step2_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                    step2_selected_page_value: NAVER_flow[21] + NAVER_flow[22] + NAVER_flow[23] + NAVER_flow[24] + NAVER_flow[25],
                },
                step2_page5:{
                    step2_selected_page_name: "이탈유저",
                    left_user: NAVER_flow[28]
                },
                total_inflow: (() => {
                    let sum = 0;
                    for(let i = 0; i < 29; i++){ // 5,6, 12,13, 19, 20, 26,27 없앰
                        if(i % 7 === 5 || i % 7 === 6 ){
                            continue;
                        }
                        sum += NAVER_flow[i]
                    }
                    return sum;
                })(),
            },
            FACEBOOK: { 
                step2_page1:{
                    step3_page: {
                        step4_page: {
                            step4_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                            step4_selected_page_value: FACEBOOK_flow[0],
                            etc: FACEBOOK_flow[1],
                            left_user: FACEBOOK_flow[2]
                        },
                        step3_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                        step3_selected_page_value: FACEBOOK_flow[0] + FACEBOOK_flow[1] + FACEBOOK_flow[2],
                        etc: FACEBOOK_flow[3],
                        left_user:FACEBOOK_flow[4]
                    },
                    step2_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                    step2_selected_page_value: FACEBOOK_flow[0] + FACEBOOK_flow[1] + FACEBOOK_flow[2] + FACEBOOK_flow[3] + FACEBOOK_flow[4],
                },
                step2_page2:{
                    step3_page: {
                        step4_page: {
                            step4_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                            step4_selected_page_value: FACEBOOK_flow[7],
                            etc: FACEBOOK_flow[8],
                            left_user: FACEBOOK_flow[9],
                        },
                        step3_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                        step3_selected_page_value: FACEBOOK_flow[7] + FACEBOOK_flow[8] + FACEBOOK_flow[9],
                        etc: FACEBOOK_flow[10],
                        left_user: FACEBOOK_flow[11],
                    },
                    step2_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                    step2_selected_page_value: FACEBOOK_flow[7] + FACEBOOK_flow[8] + FACEBOOK_flow[9] + FACEBOOK_flow[10] + FACEBOOK_flow[11],
                },
                step2_page3:{
                    step3_page: {
                        step4_page: {
                            step4_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                            step4_selected_page_value: FACEBOOK_flow[14],
                            etc: FACEBOOK_flow[15],
                            left_user: FACEBOOK_flow[16],
                        },
                        step3_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                        step3_selected_page_value: FACEBOOK_flow[14] + FACEBOOK_flow[15] + FACEBOOK_flow[16],
                        etc: FACEBOOK_flow[17],
                        left_user: FACEBOOK_flow[18]
                    },
                    step2_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                    step2_selected_page_value: FACEBOOK_flow[14] + FACEBOOK_flow[15] + FACEBOOK_flow[16] + FACEBOOK_flow[17] + FACEBOOK_flow[18],
                },
                step2_page4:{
                    step3_page: {
                        step4_page: {
                            step4_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                            step4_selected_page_value: FACEBOOK_flow[21],
                            etc: FACEBOOK_flow[22],
                            left_user: FACEBOOK_flow[23]
                        },
                        step3_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                        step3_selected_page_value: FACEBOOK_flow[21] + FACEBOOK_flow[22] + FACEBOOK_flow[23],
                        etc: FACEBOOK_flow[24],
                        left_user: FACEBOOK_flow[25]
                    },
                    step2_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                    step2_selected_page_value: FACEBOOK_flow[21] + FACEBOOK_flow[22] + FACEBOOK_flow[23] + FACEBOOK_flow[24] + FACEBOOK_flow[25],
                },
                step2_page5:{
                    step2_selected_page_name: "이탈유저",
                    left_user: FACEBOOK_flow[28]
                },
                total_inflow: (() => {
                    let sum = 0;
                    for(let i = 0; i < 29; i++){ // 5,6, 12,13, 19, 20, 26,27 없앰
                        if(i % 7 === 5 || i % 7 === 6 ){
                            continue;
                        }
                        sum += FACEBOOK_flow[i]
                    }
                    return sum;
                })(),
            },
            INSTAGRAM: { 
                step2_page1:{
                    step3_page: {
                        step4_page: {
                            step4_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                            step4_selected_page_value: INSTAGRAM_flow[0],
                            etc: INSTAGRAM_flow[1],
                            left_user: INSTAGRAM_flow[2]
                        },
                        step3_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                        step3_selected_page_value: INSTAGRAM_flow[0] + INSTAGRAM_flow[1] + INSTAGRAM_flow[2],
                        etc: INSTAGRAM_flow[3],
                        left_user:INSTAGRAM_flow[4]
                    },
                    step2_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                    step2_selected_page_value: INSTAGRAM_flow[0] + INSTAGRAM_flow[1] + INSTAGRAM_flow[2] + INSTAGRAM_flow[3] + INSTAGRAM_flow[4],
                },
                step2_page2:{
                    step3_page: {
                        step4_page: {
                            step4_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                            step4_selected_page_value: INSTAGRAM_flow[7],
                            etc: INSTAGRAM_flow[8],
                            left_user: INSTAGRAM_flow[9],
                        },
                        step3_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                        step3_selected_page_value: INSTAGRAM_flow[7] + INSTAGRAM_flow[8] + INSTAGRAM_flow[9],
                        etc: INSTAGRAM_flow[10],
                        left_user: INSTAGRAM_flow[11],
                    },
                    step2_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                    step2_selected_page_value: INSTAGRAM_flow[7] + INSTAGRAM_flow[8] + INSTAGRAM_flow[9] + INSTAGRAM_flow[10] + INSTAGRAM_flow[11],
                },
                step2_page3:{
                    step3_page: {
                        step4_page: {
                            step4_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                            step4_selected_page_value: INSTAGRAM_flow[14],
                            etc: INSTAGRAM_flow[15],
                            left_user: INSTAGRAM_flow[16],
                        },
                        step3_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                        step3_selected_page_value: INSTAGRAM_flow[14] + INSTAGRAM_flow[15] + INSTAGRAM_flow[16],
                        etc: INSTAGRAM_flow[17],
                        left_user: INSTAGRAM_flow[18]
                    },
                    step2_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                    step2_selected_page_value: INSTAGRAM_flow[14] + INSTAGRAM_flow[15] + INSTAGRAM_flow[16] + INSTAGRAM_flow[17] + INSTAGRAM_flow[18],
                },
                step2_page4:{
                    step3_page: {
                        step4_page: {
                            step4_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                            step4_selected_page_value: INSTAGRAM_flow[21],
                            etc: INSTAGRAM_flow[22],
                            left_user: INSTAGRAM_flow[23]
                        },
                        step3_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                        step3_selected_page_value: INSTAGRAM_flow[21] + INSTAGRAM_flow[22] + INSTAGRAM_flow[23],
                        etc: INSTAGRAM_flow[24],
                        left_user: INSTAGRAM_flow[25]
                    },
                    step2_selected_page_name: `상세페이지${make_random_value(1,1000)}`,
                    step2_selected_page_value: INSTAGRAM_flow[21] + INSTAGRAM_flow[22] + INSTAGRAM_flow[23] + INSTAGRAM_flow[24] + INSTAGRAM_flow[25],
                },
                step2_page5:{
                    step2_selected_page_name: "이탈유저",
                    left_user: INSTAGRAM_flow[28]
                },
                total_inflow: (() => {
                    let sum = 0;
                    for(let i = 0; i < 29; i++){ // 5,6, 12,13, 19, 20, 26,27 없앰
                        if(i % 7 === 5 || i % 7 === 6 ){
                            continue;
                        }
                        sum += INSTAGRAM_flow[i]
                    }
                    return sum;
                })(),
            },
            ETC: make_random_value(1,1000)
        }
    }
  }

const indexes = [];
const step3_and_step4_etc_elems = [];

  let labbit = make_dump_data('labbit');
  labbit = labbit.labbit;

  console.log('labbit = ',labbit);
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

        //reset clicked index
        indexes[0] = null;
        indexes[1] = null;
        indexes[2] = null;
        indexes[3] = null;
        indexes[4] = null;

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
        
        // reset step2 data
        reset_step2_data();

        // reset step 3,4 past selected node transparent
        const step3_sibling_nodes = document.querySelectorAll(`.step3_boxes > div`);
        step3_sibling_nodes.forEach((item) => item.style.visibility = 'hidden');
        const step4_sibling_nodes = document.querySelectorAll(`.step4_boxes > div`);
        step4_sibling_nodes.forEach((item) => item.style.visibility = 'hidden');

        canvas_drawes[0] = canvas1.getContext('2d');
        
        indexes[0] = parseInt(e.target.dataset.index);

        // color elem's yellow 
        clicked_box_elem[0] = document.querySelector(`.step0_boxes [data-index="${indexes[0]}"]`)
        clicked_box_elem[0].classList.add("clicked_node");
        
        // make canvas 2 default curve
        for(let i = 0 ; i < 5 ; i++){
            draw_canvas2_line(i, 0, false);
        }

        // color target node's border and background color
        clicked_box_elem[0].firstChild.style.visibility = 'visible'

        draw_canvas1_line(indexes[0], 0, true);
       
        for(let i = 0 ; i < 5 ; i++){
            if(i === indexes[0]){
                continue;
            }
            draw_canvas1_line(i, 0, false);
        }
    }

    const handle_s1_box_click = (e) => {

        isClicked[1] = true;

        if(!isClicked[0]){
            alert("step 0 을 먼저 클릭 하셔야 합니다.")
            return;
        }

        //reset clicked indexes
        indexes[1] = null;
        indexes[2] = null;
        indexes[3] = null;
        indexes[4] = null;

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
        
        indexes[1] = parseInt(e.target.dataset.index);
        
        if(indexes[0] === 0){
            insert_step2_data(labbit, 'direct_inflow');
        }else if(indexes[0] === 1){
            insert_step2_data(labbit, 'NAVER');
        }else if(indexes[0] === 2){
            insert_step2_data(labbit, 'FACEBOOK');
        }else{
            insert_step2_data(labbit, 'INSTAGRAM');
        }
        

        // color elem's yellow 
        clicked_box_elem[1] = document.querySelector(`.step1_boxes [data-index="${indexes[1]}"]`)
        clicked_box_elem[1].classList.add("clicked_node");

        

        // step 1의 가운데 센터박스가 클릭될 때만 border 적용
        if(indexes[1] !== 2){
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

    const handle_s2_boxes_click = (e) => {

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
        

        //reset clicked index
        indexes[2] = null;
        indexes[3] = null;
        indexes[4] = null;

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

        // reset step3 etc_user
        if(step3_and_step4_etc_elems[0]){
            step3_and_step4_etc_elems[0].classList.remove('etc_user')
        }

        // display canvas3 and step3 boxes
        const canvas3_container = document.querySelector('.canvas3_container');
        const step3_boxes = document.querySelector('.step3_boxes');

        canvas3_container.style.display = "block";
        step3_boxes.style.display = "flex";

        canvas_drawes[1] = canvas2.getContext('2d');
        
        indexes[2] =  parseInt(e.target.dataset.index);
        
        if(indexes[0] === 0){
            insert_step3_data(labbit, 'direct_inflow', indexes[2] + 1);
        }else if(indexes[0] === 1){
            insert_step3_data(labbit, 'NAVER',  indexes[2] + 1);
        }else if(indexes[0] === 2){
            insert_step3_data(labbit, 'FACEBOOK',  indexes[2] + 1);
        }else{
            insert_step3_data(labbit, 'INSTAGRAM',  indexes[2] + 1);
        }
        // make step3 etc box unclickable
        if(indexes[2] === 0 ){
            step3_and_step4_etc_elems[0] = document.querySelector(`.step3_boxes [data-index="${indexes[2] + 1}"]`);
            step3_and_step4_etc_elems[0].classList.add('etc_user')
        }else {
            step3_and_step4_etc_elems[0] = document.querySelector(`.step3_boxes [data-index="${indexes[2]}"]`);
            step3_and_step4_etc_elems[0].classList.add('etc_user')
        }

        // color elem's yellow 
        clicked_box_elem[2] = document.querySelector(`.step2_boxes [data-index="${indexes[2]}"]`)
        
        clicked_box_elem[2].classList.add("clicked_node");
        
        // color target node's border
        clicked_box_elem[2].firstChild.style.visibility = 'visible'

        // show step notice
        clicked_box_elem[2].lastChild.style.visibility = "visible";
        
        // draw color lines
        draw_canvas2_line(indexes[2], 0, true);
        
        // draw default lines
        for(let i = 0 ; i < 5 ; i++){
            if(i === indexes[2]){
                continue;
            }
            draw_canvas2_line(i, 0, false);
        }

        // show 3 boxes after click step2's certain box

        update_canvas3_boxes_lines();
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

        // reset selected line index;
        canvas4_selected_lines_index = [];

        //reset clicked index
        indexes[3] = null;
        indexes[4] = null;

        // reset all past selected border
        const s3_border_siblings_node = document.querySelectorAll(`.step3_boxes .step3_border`);
        const s4_border_siblings_node = document.querySelectorAll(`.step4_boxes .step4_border`);
        s3_border_siblings_node.forEach((item) => item.style.visibility = 'hidden');
        s4_border_siblings_node.forEach((item) => item.style.visibility = 'hidden');
        
        // reset step4 etc_user
        if(step3_and_step4_etc_elems[1]){
            step3_and_step4_etc_elems[1].classList.remove('etc_user')
        }

        indexes[3] =  parseInt(e.target.dataset.index);
        
        if(indexes[0] === 0){
            insert_step4_data(labbit, 'direct_inflow', indexes[2] + 1);
        }else if(indexes[0] === 1){
            insert_step4_data(labbit, 'NAVER',  indexes[2] + 1);
        }else if(indexes[0] === 2){
            insert_step4_data(labbit, 'FACEBOOK',  indexes[2] + 1);
        }else{
            insert_step4_data(labbit, 'INSTAGRAM',  indexes[2] + 1);
        }

        // make step etc box unclickable
        if(indexes[2] === 0 || indexes[2] === 1 || indexes[2] === 2){
            step3_and_step4_etc_elems[1] = document.querySelector(`.step4_boxes [data-index="1"]`);
            step3_and_step4_etc_elems[1].classList.add('etc_user')
        }else{
            step3_and_step4_etc_elems[1] = document.querySelector(`.step4_boxes [data-index="2"]`);
            step3_and_step4_etc_elems[1].classList.add('etc_user')
        }

        // display canvas3 and step3 boxes
        const canvas4_container = document.querySelector('.canvas4_container');
        const step4_boxes = document.querySelector('.step4_boxes');

        canvas4_container.style.display = "block";
        step4_boxes.style.display = "flex";
    
        // color elem's yellow 
        clicked_box_elem[3] = document.querySelector(`.step3_boxes [data-index="${indexes[3]}"]`)
        
        clicked_box_elem[3].classList.add("clicked_node");
        step3_and_step4_etc_elems[0].classList.add('etc_user');
        
        // color target node's border
        clicked_box_elem[3].firstChild.style.visibility = 'visible'

        // show step notice
        clicked_box_elem[3].lastChild.style.visibility = "visible";

        update_canvas3_boxes_lines();
        update_canvas4_boxes_lines();
        // update_canvas4_boxes_lines(); 
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

        indexes[4] = null

        canvas_drawes[3] = canvas4.getContext('2d');
        
        indexes[4] = parseInt(e.target.dataset.index);
        
        s4_clicked_box_index = indexes[4];

         // color elem's yellow 
        clicked_box_elem[4] = document.querySelector(`.step4_boxes [data-index="${indexes[4]}"]`)
        clicked_box_elem[4].classList.add("clicked_node");
        
        // color target node's border
        clicked_box_elem[4].firstChild.style.visibility = 'visible'

        // show step notice
        clicked_box_elem[4].lastChild.style.visibility = "visible";
        
        // draw hightlighted lines
        draw_canvas4_line(indexes[4], indexes[3], true);
        
        for(let i = 0 ; i < canvas4_selected_lines_index.length ; i++){
            if(indexes[4] === canvas4_selected_lines_index[i]){
                continue;
            }
            draw_canvas4_line(canvas4_selected_lines_index[i], indexes[3], false);
        }
    }

        //  ---------------- step 0 boxes ---------------------------------

    const step0_config = [
        {
            parant_class_name: "percent_s0_box1", 
            data_index: 0,  
            first_child_class_name:"percent_box_title", 
            second_child_class_name: "percent_box_value", 
            third_child_class_name:"percent_box_value1", 
        },{
            parant_class_name: "percent_s0_box2", 
            data_index: 1, 
            first_child_class_name:"percent_box_title", 
            second_child_class_name: "percent_box_value", 
            third_child_class_name:"percent_box_value1", 
        },{
            parant_class_name: "percent_s0_box3", 
            data_index: 2, 
            first_child_class_name:"percent_box_title", 
            second_child_class_name: "percent_box_value", 
            third_child_class_name:"percent_box_value1", 
        },{
            parant_class_name: "percent_s0_box4", 
            data_index: 3, 
            first_child_class_name:"percent_box_title", 
            second_child_class_name: "percent_box_value", 
            third_child_class_name:"percent_box_value1", 
        },{
            parant_class_name: "percent_s0_box5", 
            data_index: 4, 
            first_child_class_name:"percent_box_title", 
            second_child_class_name: "percent_box_value", 
            third_child_class_name:"percent_box_value1", 
        },
    ]
    
    const step0_data = 
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
                    s0_boxes_title.data(step0_data.reduce((accumulator, current) => [...accumulator, current.title_text], []))
                    .text(function(d) { return d; });

                    s0_boxes_value.data(step0_data.reduce((accumulator, current) => [...accumulator, current.value_text], []))
                    .text(function(d) { return d });

                    s0_boxes_percent.data(step0_data.reduce((accumulator, current) => [...accumulator, current.percent_text], []))
                    .text(function(d) { return `${Math.round(d*100)}%` });

                    for(let i = 0; i < step0_data.length; i++){
                        root.style.setProperty(`--step0_box${i+1}_percent`, step0_data[i].percent_text);
                    }
                }
        
        
//  ---------------- step 1 boxes ---------------------------------

const step1_data = 
            {
                domain: "www.naver.com", 
                title1: "랜딩1", 
                title2: "랜딩2"
            }

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
                    
                    
    const update_step1_data = () => {
        
        const step1_percent_box_title = document.querySelector('.percent_s1_center_box :nth-child(2)');
        const step1_right_boxes = document.querySelectorAll('.percent_s1_box');
        step1_percent_box_title.innerText = step1_data.domain;
        step1_right_boxes[0].innerText = step1_data.title1;
        step1_right_boxes[1].innerText = step1_data.title2;
    }
    


//  ---------------- step 2 boxes ---------------------------------

const step2_config = [
    {
        parant_class_name: "percent_s2_box1", 
        data_index: 0,  
        first_child_class_name:"percent_box_title", 
        second_child_class_name: "percent_box_value", 
        third_child_class_name:"percent_box_value1", 
    },{
        parant_class_name: "percent_s2_box2", 
        data_index: 1, 
        first_child_class_name:"percent_box_title", 
        second_child_class_name: "percent_box_value", 
        third_child_class_name:"percent_box_value1", 
    },{
        parant_class_name: "percent_s2_box3", 
        data_index: 2, 
        first_child_class_name:"percent_box_title", 
        second_child_class_name: "percent_box_value", 
        third_child_class_name:"percent_box_value1", 
    },{
        parant_class_name: "percent_s2_box4", 
        data_index: 3, 
        first_child_class_name:"percent_box_title", 
        second_child_class_name: "percent_box_value", 
        third_child_class_name:"percent_box_value1", 
    },{
        parant_class_name: "percent_s2_box5 left_user", 
        data_index: 4, 
        first_child_class_name:"percent_box_title", 
        second_child_class_name: "percent_box_value", 
        third_child_class_name:"percent_box_value1", 
    },
]

const step2_data = 
        [
            {
                title_text: "상세페이지1",         
                value_text: 0,
                percent_text: 0
            },{
                title_text: "상세페이지2", 
                value_text: 0, 
                percent_text: 0
            },{
                title_text: "상세페이지3", 
                value_text: 0, 
                percent_text: 0
            },{
                title_text: "상세페이지4", 
                value_text: 0, 
                percent_text: 0
            },{
                title_text: "이탈유저", 
                value_text: 0, 
                percent_text: 0
            },
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

const update_step2_data = () => {
                s2_boxes_title.data(step2_data.reduce((accumulator, current) => [...accumulator, current.title_text], []))
                .text(function(d) { return d; });

                s2_boxes_value.data(step2_data.reduce((accumulator, current) => [...accumulator, current.value_text], []))
                .text(function(d) { return d });

                s2_boxes_percent.data(step2_data.reduce((accumulator, current) => [...accumulator, current.percent_text], []))
                .text(function(d) { return `${Math.round(d*100)}%` });

                for(let i = 0; i < step2_data.length; i++){
                    root.style.setProperty(`--step2_box${i+1}_percent`, step2_data[i].percent_text);
                }
            }

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
            {
                title_text: "상세페이지1", 
                value_text: 0,
                percent_text: 0.28
            },{
                title_text: "상세페이지2", 
                value_text: 0,
                percent_text: 0.28
            },{
                title_text: "상세페이지3", 
                value_text: 0,
                percent_text: 0.28
            },{
                title_text: "상세페이지4", 
                value_text: 0,
                percent_text: 0.28
            },{
                title_text: "이탈유저", 
                value_text: 0,
                percent_text: 0.28
            },
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

        const update_step3_data = () => {
            s3_boxes_title.data(step3_data.reduce((accumulator, current) => [...accumulator, current.title_text], []))
            .text(function(d) { return d; });

            s3_boxes_percent.data(step3_data.reduce((accumulator, current) => [...accumulator, current.percent_text], []))
            .text(function(d) { return `${Math.round(d*100)}%` });

            for(let i = 0; i < step3_data.length; i++){
                root.style.setProperty(`--step3_box${i+1}_percent`, step3_data[i].percent_text);
            }
        }

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
            {
                title_text: "상세페이지1", 
                value_text: 0,
                percent_text: 0.28
            },{
                title_text: "상세페이지2", 
                value_text: 0,
                percent_text: 0.28
            },{
                title_text: "상세페이지3", 
                value_text: 0,
                percent_text: 0.28
            },{
                title_text: "상세페이지4", 
                value_text: 0,
                percent_text: 0.28
            },{
                title_text: "이탈유저", 
                value_text: 0,
                percent_text: 0.28
            },
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

const update_step4_data = () => {
                s4_boxes_title.data(step4_data.reduce((accumulator, current) => [...accumulator, current.title_text], []))
                .text(function(d) { return d; })

                s4_boxes_percent.data(step4_data.reduce((accumulator, current) => [...accumulator, current.percent_text], []))
                .text(function(d) { return `${Math.round(d*100)}%` });

                for(let i = 0; i < step4_data.length; i++){
                    root.style.setProperty(`--step4_box${i+1}_percent`, step4_data[i].percent_text);
                }
            }

        let percent_s0_box1 = document.querySelector('.percent_s0_box1')    
        let s0_box_width = percent_s0_box1.clientWidth;
        let width_between_boxes = (canvas_width - (s0_box_width * 5)) / 4
            
        let box1_x = s0_box_width * 0 + width_between_boxes * 0 + s0_box_width / 2;
        let box2_x = s0_box_width * 1 + width_between_boxes * 1 + s0_box_width / 2;
        let box3_x = s0_box_width * 2 + width_between_boxes * 2 + s0_box_width / 2;
        let box4_x = s0_box_width * 3 + width_between_boxes * 3 + s0_box_width / 2;
        let box5_x = s0_box_width * 4 + width_between_boxes * 4 + s0_box_width / 2;
            
            let canvas_downside_coord_x_y = [
                { box_x: box1_x, box_y: 0 }, 
                { box_x: box2_x, box_y: 0 }, 
                { box_x: box3_x, box_y: 0 }, 
                { box_x: box4_x, box_y: 0 }, 
                { box_x: box5_x, box_y: 0 }, 
            ];
        
            let canvas_upperside_coord_x_y = [
                { box_x: box1_x, box_y: canvas_height }, 
                { box_x: box2_x, box_y: canvas_height }, 
                { box_x: box3_x, box_y: canvas_height }, 
                { box_x: box4_x, box_y: canvas_height }, 
                { box_x: box5_x, box_y: canvas_height }, 
            ];
        
            let step1_canvas_upperside_coord_x_y = [
                { box_x: (canvas_width / 2), box_y: canvas_height }, 
            ]
        
            let step1_canvas_downside_coord_x_y = [
                { box_x: (canvas_width / 2), box_y: 0 }, 
            ]

        

// step 0 curve lines 
const update_coordinates = () => {
     percent_s0_box1 = document.querySelector('.percent_s0_box1');

     s0_box_width = percent_s0_box1.clientWidth;
     width_between_boxes = (canvas_width - (s0_box_width * 5)) / 4

     box1_x = s0_box_width * 0 + width_between_boxes * 0 + s0_box_width / 2;
     box2_x = s0_box_width * 1 + width_between_boxes * 1 + s0_box_width / 2;
     box3_x = s0_box_width * 2 + width_between_boxes * 2 + s0_box_width / 2;
     box4_x = s0_box_width * 3 + width_between_boxes * 3 + s0_box_width / 2;
     box5_x = s0_box_width * 4 + width_between_boxes * 4 + s0_box_width / 2;

         canvas_downside_coord_x_y = [
                { box_x: box1_x, box_y: 0 }, 
                { box_x: box2_x, box_y: 0 }, 
                { box_x: box3_x, box_y: 0 }, 
                { box_x: box4_x, box_y: 0 }, 
                { box_x: box5_x, box_y: 0 }, 
            ];

         canvas_upperside_coord_x_y = [
                { box_x: box1_x, box_y: canvas_height }, 
                { box_x: box2_x, box_y: canvas_height }, 
                { box_x: box3_x, box_y: canvas_height }, 
                { box_x: box4_x, box_y: canvas_height }, 
                { box_x: box5_x, box_y: canvas_height }, 
            ];

         step1_canvas_upperside_coord_x_y = [
                { box_x: (canvas_width / 2), box_y: canvas_height }, 
            ]

         step1_canvas_downside_coord_x_y = [
                { box_x: (canvas_width / 2), box_y: 0 }, 
            ]
        }

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

            canvas_drawes[0].moveTo(canvas_downside_coord_x_y[start_index].box_x, canvas_downside_coord_x_y[start_index].box_y);

            //bezierCurveTo(조절점1x, 조절점1y, 조절점2x, 조절점2y, 선의 끝점x, 선의 끝점y)
            canvas_drawes[0].bezierCurveTo(
                            canvas_downside_coord_x_y[start_index].box_x, canvas_upperside_coord_x_y[start_index].box_y / 2, 
                            step1_canvas_upperside_coord_x_y[end_index].box_x, canvas_upperside_coord_x_y[start_index].box_y / 2, 
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

    
            canvas_drawes[1].moveTo(canvas_upperside_coord_x_y[start_index].box_x, canvas_upperside_coord_x_y[start_index].box_y);
            //bezierCurveTo(조절점1x, 조절점1y, 조절점2x, 조절점2y, 선의 끝점x, 선의 끝점y)
            canvas_drawes[1].bezierCurveTo(
                            canvas_upperside_coord_x_y[start_index].box_x, canvas_upperside_coord_x_y[start_index].box_y / 2, 
                            step1_canvas_downside_coord_x_y[end_index].box_x, canvas_upperside_coord_x_y[start_index].box_y / 2, 
                            step1_canvas_downside_coord_x_y[end_index].box_x, step1_canvas_downside_coord_x_y[end_index].box_y
                            );
            canvas_drawes[1].lineWidth = 1;
            canvas_drawes[1].stroke();
        }

        canvas_upperside_coord_x_y
        const draw_canvas3_line = (start_index, end_index, selected) => {
            canvas_drawes[2].beginPath();

            if(selected){
                canvas_drawes[2].strokeStyle = '#FFB300';
                canvas_drawes[2].setLineDash([0]);
            } else {
                canvas_drawes[2].strokeStyle = '#C1C1C1';
                canvas_drawes[2].setLineDash([4]);
            }
    
            canvas_drawes[2].moveTo(canvas_upperside_coord_x_y[start_index].box_x, canvas_upperside_coord_x_y[start_index].box_y);
            //bezierCurveTo(조절점1x, 조절점1y, 조절점2x, 조절점2y, 선의 끝점x, 선의 끝점y)
            canvas_drawes[2].bezierCurveTo(
                            canvas_upperside_coord_x_y[start_index].box_x, canvas_upperside_coord_x_y[start_index].box_y / 2, 
                            canvas_downside_coord_x_y[end_index].box_x, canvas_upperside_coord_x_y[start_index].box_y / 2, 
                            canvas_downside_coord_x_y[end_index].box_x, canvas_downside_coord_x_y[end_index].box_y
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
    
            canvas_drawes[3].moveTo(canvas_upperside_coord_x_y[start_index].box_x, canvas_upperside_coord_x_y[start_index].box_y);
            //bezierCurveTo(조절점1x, 조절점1y, 조절점2x, 조절점2y, 선의 끝점x, 선의 끝점y)
            canvas_drawes[3].bezierCurveTo(
                            canvas_upperside_coord_x_y[start_index].box_x, canvas_upperside_coord_x_y[start_index].box_y / 2, 
                            canvas_downside_coord_x_y[end_index].box_x, canvas_upperside_coord_x_y[start_index].box_y / 2, 
                            canvas_downside_coord_x_y[end_index].box_x, canvas_downside_coord_x_y[end_index].box_y
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

        const reset_step2_data = () => {
            for(let i = 0; i < 5; i++){
                step2_data[i].title_text = ""
                step2_data[i].value_text = ""
                step2_data[i].percent_text = ""
            }
            update_step2_data(); 
        }

        const insert_step0_data = (data) => {
            
                const step0_total_inflow = (data.direct_inflow.total_inflow + data.NAVER.total_inflow + data.FACEBOOK.total_inflow + data.INSTAGRAM.total_inflow + data.ETC);

                step0_data[0].value_text = data.direct_inflow.total_inflow;
                step0_data[0].percent_text = data.direct_inflow.total_inflow / step0_total_inflow

                step0_data[1].value_text = data.NAVER.total_inflow;
                step0_data[1].percent_text = data.NAVER.total_inflow / step0_total_inflow
        

                step0_data[2].value_text = data.FACEBOOK.total_inflow;
                step0_data[2].percent_text = data.FACEBOOK.total_inflow / step0_total_inflow

                step0_data[3].value_text = data.INSTAGRAM.total_inflow;
                step0_data[3].percent_text = data.INSTAGRAM.total_inflow / step0_total_inflow

                step0_data[4].value_text = data.ETC;
                step0_data[4].percent_text = data.ETC / step0_total_inflow

        
                update_step0_data(); 
        }

        const insert_step1_data = (data) => {
                step1_data.domain = data.domain;
                step1_data.title1 = '랜딩1';
                step1_data.title2 = '랜딩2';
        
                update_step1_data(); 
        }

        const insert_step2_data = (data, step0_inflow_route) => {
            
                const step2_total_inflow = (data[step0_inflow_route].step2_page1.step2_selected_page_value + data[step0_inflow_route].step2_page2.step2_selected_page_value + data[step0_inflow_route].step2_page3.step2_selected_page_value + data[step0_inflow_route].step2_page4.step2_selected_page_value + data[step0_inflow_route].step2_page5.left_user);

                step2_data[0].title_text = data[step0_inflow_route].step2_page1.step2_selected_page_name;
                step2_data[0].value_text = data[step0_inflow_route].step2_page1.step2_selected_page_value;
                step2_data[0].percent_text = step2_data[0].value_text / step2_total_inflow

                step2_data[1].title_text = data[step0_inflow_route].step2_page2.step2_selected_page_name;
                step2_data[1].value_text = data[step0_inflow_route].step2_page2.step2_selected_page_value;
                step2_data[1].percent_text = step2_data[1].value_text / step2_total_inflow
        

                step2_data[2].title_text = data[step0_inflow_route].step2_page3.step2_selected_page_name;
                step2_data[2].value_text = data[step0_inflow_route].step2_page3.step2_selected_page_value;
                step2_data[2].percent_text = step2_data[2].value_text / step2_total_inflow

                step2_data[3].title_text = data[step0_inflow_route].step2_page4.step2_selected_page_name;
                step2_data[3].value_text = data[step0_inflow_route].step2_page4.step2_selected_page_value;
                step2_data[3].percent_text = step2_data[3].value_text / step2_total_inflow

                step2_data[4].title_text = data[step0_inflow_route].step2_page5.step2_selected_page_name;
                step2_data[4].value_text = data[step0_inflow_route].step2_page5.left_user;
                step2_data[4].percent_text = step2_data[4].value_text / step2_total_inflow
        
                update_step2_data(); 
        }
        
        const insert_step3_data = (data, step0_inflow_route, step2_page_num) => {
            
            const step3_total_inflow = data[step0_inflow_route][`step2_page${step2_page_num}`]['step3_page']['etc'] + data[step0_inflow_route][`step2_page${step2_page_num}`]['step3_page']['left_user'] + data[step0_inflow_route][`step2_page${step2_page_num}`]['step3_page']['step3_selected_page_value']

            if(indexes[2] === 0 || indexes[2] === 1){

                step3_data[0].title_text = data[step0_inflow_route][`step2_page${step2_page_num}`]['step3_page']['step3_selected_page_name'];
                step3_data[0].value_text = data[step0_inflow_route][`step2_page${step2_page_num}`]['step3_page']['step3_selected_page_value'];
                step3_data[0].percent_text = step3_data[0].value_text / step3_total_inflow
    
                step3_data[1].title_text = 'ETC'
                step3_data[1].value_text = data[step0_inflow_route][`step2_page${step2_page_num}`]['step3_page']['etc'];
                step3_data[1].percent_text = step3_data[1].value_text / step3_total_inflow
        
                step3_data[2].title_text = '이탈유저'
                step3_data[2].value_text = data[step0_inflow_route][`step2_page${step2_page_num}`]['step3_page']['left_user'];
                step3_data[2].percent_text = step3_data[2].value_text / step3_total_inflow

            }else if(indexes[2] === 2){

                step3_data[1].title_text = data[step0_inflow_route][`step2_page${step2_page_num}`]['step3_page']['step3_selected_page_name'];
                step3_data[1].value_text = data[step0_inflow_route][`step2_page${step2_page_num}`]['step3_page']['step3_selected_page_value'];
                step3_data[1].percent_text = step3_data[1].value_text / step3_total_inflow
    
                step3_data[2].title_text = 'ETC'
                step3_data[2].value_text = data[step0_inflow_route][`step2_page${step2_page_num}`]['step3_page']['etc'];
                step3_data[2].percent_text = step3_data[2].value_text / step3_total_inflow
        
                step3_data[3].title_text = '이탈유저'
                step3_data[3].value_text = data[step0_inflow_route][`step2_page${step2_page_num}`]['step3_page']['left_user'];
                step3_data[3].percent_text = step3_data[3].value_text / step3_total_inflow

            }else {

                step3_data[2].title_text = data[step0_inflow_route][`step2_page${step2_page_num}`]['step3_page']['step3_selected_page_name'];
                step3_data[2].value_text = data[step0_inflow_route][`step2_page${step2_page_num}`]['step3_page']['step3_selected_page_value'];
                step3_data[2].percent_text = step3_data[2].value_text / step3_total_inflow
    
                step3_data[3].title_text = 'ETC'
                step3_data[3].value_text = data[step0_inflow_route][`step2_page${step2_page_num}`]['step3_page']['etc'];
                step3_data[3].percent_text = step3_data[3].value_text / step3_total_inflow
        
                step3_data[4].title_text = '이탈유저'
                step3_data[4].value_text = data[step0_inflow_route][`step2_page${step2_page_num}`]['step3_page']['left_user'];
                step3_data[4].percent_text = step3_data[4].value_text / step3_total_inflow
            }

            update_step3_data(); 
    }

    const insert_step4_data = (data, step0_inflow_route, step2_page_num) => {
            
        const step4_total_inflow = data[step0_inflow_route][`step2_page${step2_page_num}`]['step3_page']['step4_page']['etc'] + data[step0_inflow_route][`step2_page${step2_page_num}`]['step3_page']['step4_page']['left_user'] + data[step0_inflow_route][`step2_page${step2_page_num}`]['step3_page']['step4_page']['step4_selected_page_value']

        if((indexes[2] === 0 || indexes[2] === 1 || indexes[2] === 2)){

            step4_data[0].title_text = data[step0_inflow_route][`step2_page${step2_page_num}`]['step3_page']['step4_page']['step4_selected_page_name'];
            step4_data[0].value_text = data[step0_inflow_route][`step2_page${step2_page_num}`]['step3_page']['step4_page']['step4_selected_page_value'];
            step4_data[0].percent_text = step4_data[0].value_text / step4_total_inflow

            step4_data[1].title_text = 'ETC'
            step4_data[1].value_text = data[step0_inflow_route][`step2_page${step2_page_num}`]['step3_page']['step4_page']['etc'];
            step4_data[1].percent_text = step4_data[1].value_text / step4_total_inflow
    
            step4_data[2].title_text = '이탈유저'
            step4_data[2].value_text = data[step0_inflow_route][`step2_page${step2_page_num}`]['step3_page']['step4_page']['left_user'];
            step4_data[2].percent_text = step4_data[2].value_text / step4_total_inflow

        }else{

            step4_data[1].title_text = data[step0_inflow_route][`step2_page${step2_page_num}`]['step3_page']['step4_page']['step4_selected_page_name'];
            step4_data[1].value_text = data[step0_inflow_route][`step2_page${step2_page_num}`]['step3_page']['step4_page']['step4_selected_page_value'];
            step4_data[1].percent_text = step4_data[1].value_text / step4_total_inflow

            step4_data[2].title_text = 'ETC'
            step4_data[2].value_text = data[step0_inflow_route][`step2_page${step2_page_num}`]['step3_page']['step4_page']['etc'];
            step4_data[2].percent_text = step4_data[2].value_text / step4_total_inflow
    
            step4_data[3].title_text = '이탈유저'
            step4_data[3].value_text = data[step0_inflow_route][`step2_page${step2_page_num}`]['step3_page']['step4_page']['left_user'];
            step4_data[3].percent_text = step4_data[3].value_text / step4_total_inflow
        }

        update_step4_data(); 
}

    const update_canvas3_boxes_lines = () => {

        // draw hightlighted lines
        if(indexes[3] !== null){
            draw_canvas3_line(indexes[3], indexes[2], true);
        }
        
        

        const step3_sibling_nodes = document.querySelectorAll(`.step3_boxes > div`);
        step3_sibling_nodes.forEach((item) => item.style.visibility = 'hidden');
        step3_sibling_nodes.forEach((item) => item.classList.remove('left_user')); // 추가
        
        
        if (indexes[2] === 0) {
            step3_sibling_nodes[indexes[2]].style.visibility = 'visible'
            step3_sibling_nodes[indexes[2] + 1].style.visibility = 'visible'
            step3_sibling_nodes[indexes[2] + 2].style.visibility = 'visible'
            step3_sibling_nodes[indexes[2] + 2].classList.add('left_user') //추가

            for(let i = 0 ; i < 3 ; i++){
                if(i === indexes[3]){
                    continue;
                }
                draw_canvas3_line(i, indexes[2], false);
            }


        }else if (indexes[2] === 1 || indexes[2] === 2 || indexes[2] === 3) {
            step3_sibling_nodes[indexes[2] - 1].style.visibility = 'visible'
            step3_sibling_nodes[indexes[2]].style.visibility = 'visible'
            step3_sibling_nodes[indexes[2] + 1].style.visibility = 'visible'
            step3_sibling_nodes[indexes[2] + 1].classList.add('left_user') //추가
        

            // (start_index, end_index, selected)
            
            for(i = indexes[2] ; i < indexes[2] + 3; i++){
                if(indexes[3] !== null && i === (indexes[3] + 1)){
                    continue;
                }
                draw_canvas3_line(i - 1, indexes[2], false);
            }


        }else {
            step3_sibling_nodes[indexes[2] - 2].style.visibility = 'visible'
            step3_sibling_nodes[indexes[2] - 1].style.visibility = 'visible'
            step3_sibling_nodes[indexes[2]].style.visibility = 'visible'
            step3_sibling_nodes[indexes[2]].classList.add('left_user') //추가
        }
    }
    const update_canvas4_boxes_lines = () => {
        // draw hightlighted lines
        
        
        // draw hightlighted lines
        if(indexes[4] !== null){
            draw_canvas4_line(indexes[4], indexes[3], true);
        }
        
        // show 3 boxes after click step2's certain box

        const step4_sibling_nodes = document.querySelectorAll(`.step4_boxes > div`);
        step4_sibling_nodes.forEach((item) => item.classList.remove('left_user')); // 추가
        step4_sibling_nodes.forEach((item) => item.style.visibility = 'hidden');
    

        if (indexes[3] === 0) {
            step4_sibling_nodes[indexes[3]].style.visibility = 'visible'
            step4_sibling_nodes[indexes[3] + 1].style.visibility = 'visible'
            step4_sibling_nodes[indexes[3] + 2].style.visibility = 'visible'
            step4_sibling_nodes[indexes[3] + 2].classList.add('left_user') //추가
        
            for(let i = 0 ; i < 3 ; i++){
                if(indexes[4] !== null && i === indexes[3]){
                    continue;
                }
                draw_canvas4_line(i, indexes[3], false);
            }

            canvas4_selected_lines_index.push(indexes[3]);
            canvas4_selected_lines_index.push(indexes[3] + 1);
            canvas4_selected_lines_index.push(indexes[3] + 2);

        } else if (indexes[3] === 1 || indexes[3] === 2) {
            step4_sibling_nodes[indexes[3] - 1].style.visibility = 'visible'
            step4_sibling_nodes[indexes[3]].style.visibility = 'visible'
            step4_sibling_nodes[indexes[3] + 1].style.visibility = 'visible'
            step4_sibling_nodes[indexes[3] + 1].classList.add('left_user') //추가
        


            // (start_index, end_index, selected)
            for(i = indexes[3] ; i < indexes[3] + 3; i++){
                if(indexes[4] !== null && i === (indexes[4] + 1)){
                    continue;
                }
                draw_canvas4_line(i - 1, indexes[3], false);
            }

            canvas4_selected_lines_index.push(indexes[3] - 1);
            canvas4_selected_lines_index.push(indexes[3]);
            canvas4_selected_lines_index.push(indexes[3] + 1);

        } else {
            step4_sibling_nodes[indexes[3] - 2].style.visibility = 'visible'
            step4_sibling_nodes[indexes[3] - 1].style.visibility = 'visible'
            step4_sibling_nodes[indexes[3]].style.visibility = 'visible'
            step4_sibling_nodes[indexes[3]].classList.add('left_user') //추가
        

            canvas4_selected_lines_index.push(indexes[3] - 2);
            canvas4_selected_lines_index.push(indexes[3] - 1);
            canvas4_selected_lines_index.push(indexes[3]);
        }
    }
        insert_step0_data(labbit);
        insert_step1_data(labbit);
        reset_step2_data();
})
document.addEventListener('DOMContentLoaded', function(){

    let start_date = moment().subtract(29, 'days');
    let end_date = moment();
  
    function cb(start, end) {
        $('#demo > .intro_calendar > span').html(
            start.format('YYYY / MM / DD') + ' - ' + end.format('YYYY / MM / DD'));
    }
    cb(start_date, end_date);

    $('#demo').daterangepicker({
        firstDay: 1,
        startDate: moment().startOf('hour'),
        endDate: moment().startOf('hour').add(32, 'hour'),
        locale: {
            "separator": " ~ ", 
            "format": 'YYYY-MM-DD', 
            "applyLabel": "확인",
            "cancelLabel": "취소", 
            "customRangeLabel": "직접 입력",
            "daysOfWeek": ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
            "monthNames": ["01", "02", "03", "04", "05", "06", "07","08", "09", "10", "11", "12"]
        },
        ranges: {
            '오늘': [moment(), moment()],
            '어제': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            '이번주 (일~오늘)': [moment().subtract(4, 'days'), moment()],
            '최근 7일': [moment().subtract(6, 'days'), moment()],
            '지난주 (일~토)': [moment().subtract(11, 'days'), moment().subtract(5, 'days')],
            '이번 달': [moment().startOf('month'), moment().endOf('month')],
            '최근 14일': [moment().subtract(13, 'days'), moment()],
            '최근 30일': [moment().subtract(29, 'days'), moment()],
            '지난 달': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        "alwaysShowCalendars": true,
        "startDate":start_date,
        "endDate": end_date,
        "opens": "left"
    }, cb);

    $('.site_select').on('click', '.site_head', function () {
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $(this).next().fadeOut();
        } else {
            $('.site_head').removeClass('open');
            $('.site_list').fadeOut();
            $(this).addClass('open');
            $(this).next().fadeIn();
        }
    });

    $('.site_select').on('click', '.site_item', function () {
        $('.site_head').removeClass('open');
        $(this).parent().fadeOut();
        $(this).parent().prev().text($(this).text());
        $(this).parent().prev().prepend('<span class="site_logo"></span>');
        $(this).parent().prev().prev().val($(this).text());
    });

    $(document).click(function (e) {
        if (!$(e.target).closest('.site_select').length) {
            $('.site_head').removeClass('open');
            $('.site_list').fadeOut();
        }
    });

    $('.depth').siblings('.gnb_depth2').slideUp();
    $('.depth.active').siblings('.gnb_depth2').slideDown();

    let navbtn_Click = $('.gnb_depth1').find('a');
        navbtn_Click.on('click', function(e){
            e.preventDefault();

            if($(this).hasClass('active')) {
                $(this).removeClass('active').siblings('.gnb_depth2').slideUp();
            } else {
                $(this).addClass('active').siblings('.gnb_depth2').slideDown();
                $(this).parent().siblings().find('a').removeClass('active').siblings('.gnb_depth2').slideUp();
            }
        });

    let toogleClick = $('.circle_btn.left');
        toogleClick.on('click', function(e){
            e.preventDefault();

            if(!$(this).parent().hasClass('active')){
                $(this).parent().siblings('.nugget_wrap').addClass('toogle').siblings('aside').addClass('active');
                $(this).siblings('.nugget_gnb').addClass('on').find('.depth').removeClass('active').siblings('.gnb_depth2').slideUp();

            }else{
                $(this).parent().siblings('.nugget_wrap').removeClass('toogle');
                $(this).parent().removeClass('active').find('.nugget_gnb').removeClass('on');
            }
        });

    const commentary_btn = $('.commentary_box').find('p');
    const commentary_desc_box = $('.hidden_btn').find('a');

    commentary_btn.on('click', function(e){
        e.preventDefault();

        if(!$(this).hasClass('on')) {
            $(this).addClass('on').parent().siblings('.hidden_box.tit').addClass('active').slideDown();
        }else {
            $(this).removeClass('on').parent().siblings('.hidden_box').removeClass('active').slideUp().find('.hidden_btn > a').removeClass('on');
        }
    })

    commentary_desc_box.on('click', function(e){
        e.preventDefault();

        if(!$(this).hasClass('on')) {
            $(this).addClass('on').closest('.hidden_box.active').siblings('.hidden_box.desc').addClass('active').slideDown();
        }else {
            $(this).removeClass('on').closest('.hidden_box.active').siblings('.hidden_box.desc').removeClass('active').slideUp();
        }
    })

    var btt = $('.back_to_top'); // BACK TO TOP

    $(window).scroll(function(){
        if($(this).scrollTop() > 300){
            btt.addClass('show')
        }else{
            btt.removeClass('show')
        }
    });
    
    btt.click(function(e){
        e.preventDefault();
        $('html, body').animate({scrollTop:0}, 1000);
    });        
})


var TIPS = ['Hello', 'We\'re setting things up for you', ['Getting important updates', 'Please don\'t turn off your PC'],
        ['This may take a few minutes', 'Please don\'t turn off your PC'], 'Please Wait', 'Installing Apps', ['You can get new apps from the Store', 'Installing App 1 of 4'],
        ['Doing Something', 'Installing App 2 of 4'],
        ['Preparing your new Apps', 'Please don\'t turn off your PC'],
        ['Almost There', ''],
        ['尽情使用吧', '@xCss(translation, correction and font by @faratartech)<br/>address: xCss/Welcome8.1 and faratartech/Welcome8.1']
    ],
    isTrue = true,
    i = 0,
    timer = null;

function init(){
    if(document.readyState == 'complete'){
        var text = $('.text'),
            rgb = [0, 0, 0];
        alpha(text, TIPS[i], true, 2000, 1800);
        setTimeout(function() {
            timer = setInterval(function() {
                $('.main').style.backgroundColor = "rgb(" + color(rgb).toString() + ")";
            }, 1000 / 60);
        }, 17500);
    }
}
function jump(){
    var a = document.createElement('a');
    a.href = "https://github.com/xcss/Welcome8.1";
    a.target = "_blank";
    a.click();
    a.remove();
}
document.addEventListener('readystatechange', init, true);
    /**
     * [$ 获取目标元素]
     * @param  {[element]} selector [description]
     * @return {[element]}          [description]
     */
function $(selector) {
    return document.querySelector(selector);
}
/**
 * [alpha 元素渐显渐隐动画]
 * @param  {[element]}  target  [目标元素]
 * @param  {[Text]}     text    [显示文本]
 * @param  {[boolean]}  fade    [渐显/渐隐:true/false]
 * @param  {[Number]}   consume [耗时(ms)]
 * @param  {[Number]}   delay   [延时进行下一步(ms)]
 * @return {[null]}             []
 */
function alpha(target, text, fade, consume, delay, callback) {
    var ie = (window.ActiveXObject) ? true : false,
        n = fade ? 0 : 1;
    if (i == TIPS.length) {
        clearInterval(timer);
        if (document.addEventListener) {
            document.addEventListener('click', jump);
        } else if (document.attachEvent) {
            document.attachEvent('onclick', jump);
        }
        return;
    }
    if (text instanceof Array) {
        target.innerHTML = text[0];
        $('.desc').innerHTML = text[1];
    } else {
        target.innerHTML = text;
        $('.desc').innerHTML = '';
    }
    var time = setInterval(function() {
        if (fade) {
            n += 0.01;
            ie && (target.style.filter = 'Alpha(opacity:' + n * 100 + ')') || (target.style.opacity = n);
            if (n >= 1) {
                clearInterval(time);
                //callback && callback();
                isTrue = false;
                setTimeout(function() {
                    alpha(target, TIPS[i++], isTrue, consume, delay, callback);
                }, delay);
            }
        } else {
            n -= 0.01;
            ie && (target.style.filter = 'Alpha(opacity:' + n * 100 + ')') || (target.style.opacity = n);
            if (n <= 0) {
                clearInterval(time);
                //callback && callback();
                isTrue = true;
                setTimeout(function() {
                    alpha(target, TIPS[i], isTrue, consume, delay, callback);
                }, delay);
            }
        }
    }, consume / 100);
}


/**
 * 颜色平滑过渡算法
 * @param  {[Array]} rgb [颜色数组]
 * @return {[Array]}     [颜色数组]
 */
function color(rgb) {
    // var r = rgb[0],
    //     g = rgb[1],
    //     b = rgb[2];
    // if(r < 255 && g == 0 && b == 0 ){
    //     rgb[0] = ++r;
    // }else if(r == 255 && g < 200 && b == 0){
    //     rgb[1] = ++g;
    // }else if(r > 0 && g == 200 && b == 0){
    //     rgb[0] = --r;
    // }else if(r == 0 && g == 200 && b < 255){
    //     rgb[2] = ++b;
    // }else if(r == 0 && g > 0 && b == 255){
    //     rgb[1] = --g;
    // }else if(r < 255 && g == 0 && b == 255){
    //     rgb[0] = ++r;
    // }else if(r == 255 && g == 0 && b > 0){
    //     rgb[2] = --b;
    // }

    ((rgb[0] < 255 && rgb[1] === 0 && rgb[2] === 0) && (rgb[0] = ++rgb[0])) ||
    ((rgb[0] === 255 && rgb[1] < 200 && rgb[2] === 0) && (rgb[1] = ++rgb[1])) ||
    ((rgb[0] > 0 && rgb[1] === 200 && rgb[2] === 0) && (rgb[0] = --rgb[0])) ||
    ((rgb[0] === 0 && rgb[1] === 200 && rgb[2] < 255) && (rgb[2] = ++rgb[2])) ||
    ((rgb[0] === 0 && rgb[1] > 0 && rgb[2] === 255) && (rgb[1] = --rgb[1])) ||
    ((rgb[0] < 255 && rgb[1] === 0 && rgb[2] === 255) && (rgb[0] = ++rgb[0])) ||
    ((rgb[0] === 255 && rgb[1] === 0 && rgb[2] > 0) && (rgb[2] = --rgb[2]));
    return rgb;
}

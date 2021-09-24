window.addEventListener('load', () => {
    // 1. 获取元素
    let arrow_l = document.querySelector('.arrow-l');
    let arrow_r = document.querySelector('.arrow-r');
    let focus = document.querySelector('.focus ');
    let focusWidth = focus.offsetWidth
        // 2 . 鼠标经过focus 就显示隐藏左右按钮
    focus.addEventListener('mouseenter', () => {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(times);
        times = null; // 清除定时器变量
    })
    focus.addEventListener('mouseleave', () => {
            arrow_l.style.display = 'none';
            arrow_r.style.display = 'none';
            times = setInterval(() => {
                // 手动调用
                arrow_r.click();
            }, 2000)

        })
        // 3.动态生成小圆圈 有几张图片，我就生成几个小圆圈
    let ul = focus.querySelector('ul')
    let ol = focus.querySelector('.circle')
        // console.log(ul.children.length);
    for (let i = 0; i < ul.children.length; i++) {
        let li = this.document.createElement('li')
            // 记录当前小圆圈的索引号 通过自定义属性来做 
        li.setAttribute('index', i)
            // 将小li插入 ol 里面
        ol.appendChild(li)
            // 4. 小圆圈的排他思想 我们可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', () => {
            //干掉所有人 ，把所有的li 清除current类名
            for (let i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ''
            }
            // 留下我自己 当前的小li 设置current 类名
            this.className = 'current'
                // 5.点击小圆圈 ，移动图片，当然移动的是 ul
                // 当我们点击了某个小li 就拿到当前li的的索引号
            let index = this.getAttribute('index')
                // 当我们点击了某个小li 就要把这个li的索引号给num
            num = index
                // 当我们点击了某个小li 就要把这个li的索引号给circle
            circle = index
                // console.log(focusWidth);
                // console.log(index);
                //  ul 的移动距离 就是小圆圈 的索引号 乘以 图片的宽度 注意是负值\
                // animate(obj,target,callback)
            animate(ul, -index * focusWidth)
        })
    }
    // 把ol里面的第一个小li设置类名为current
    ol.children[0].className = 'current'
        // 6.克隆第一张图片放到(li)ul 最后面
    let f = ul.children[0].cloneNode(true)
    ul.appendChild(f)
        // 7.点击右侧按钮，图片滚动一张
    let num = 0
        // circle 控制小圆圈的播放
    let circle = 0
        // flag 节流阀
    let flag = true
    arrow_r.addEventListener('click', () => {
            if (flag) {
                // 如果走到了最后复制的一张图片，此时我们的ul 要快速复原 left 改为0
                if (num == ul.children.length - 1) {
                    ul.style.left = 0;
                    num = 0
                }
                num++;
                animate(ul, -num * focusWidth, () => {
                        flag = true
                    })
                    // 8.点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量来控制小圆圈的播放
                circle++

                // 如果circle == 4 说明走到最后我们克隆的这张图片了 我们就复原
                if (circle == ol.children.length) {
                    circle = 0
                }
                // 调用函数
                circleChange()
            }
        })
        // 9 .左侧按钮
    arrow_l.addEventListener('click', () => {
        // 如果走到了最后复制的一张图片，此时我们的ul 要快速复原 left 改为0
        if (flag) {
            if (num == 0) {
                flag = false
                num = ul.children.length - 1
                ul.style.left = -num * focusWidth + 'px';

            }
            num--;
            animate(ul, -num * focusWidth, () => {
                    flag = true
                })
                //10.点击左侧按钮，小圆圈跟随一起变化 可以再声明一个变量来控制小圆圈的播放
            circle--;
            // 如果circle <0 说明第一张图片，则小圆圈要改为第4个小圆圈（3)
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            // 调用函数
            circleChange()

        }
    })

    function circleChange() {
        // 先清除其余小圆圈的current类名
        for (let i = 0; i < ol.children.length; i++) {
            ol.children[i].className = ''
        }
        // 留下当前的小圆圈的current类名
        ol.children[circle].className = 'current'
    }
    // 10.自动播放轮播图
    let times = setInterval(() => {
        // 手动调用
        arrow_r.click();
    }, 2000)
})
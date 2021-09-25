window.addEventListener('load', () => {
    // 获取元素
    let dropdown = document.querySelector('.dropdown')
    let dd = dropdown.querySelector('.dd')
    let lis = dd.querySelectorAll('li') // 获取dd里面的所有小li
    let ddd = document.querySelectorAll('.ddd')

    //for循环绑定事件
    for (let i = 0; i < lis.length; i++) {
        ddd[i].setAttribute('index', i)
        lis[i].addEventListener('mouseenter', () => {
            let index = ddd[i].getAttribute('index')

            for (let i = 0; i < ddd.length; i++) {
                ddd[index].style.display = 'block'
            }
            lis[i].addEventListener('mouseleave', () => {
                for (let i = 0; i < ddd.length; i++) {
                    ddd[index].style.display = 'none'
                }
            })
        })


    }


    // p = function(obj, obj1) {
    //     // 鼠标经过显示
    //     obj.addEventListener('mouseenter', () => {
    //             // console.log(1);
    //             obj1.style.display = 'block'

    //         })
    //         // 鼠标离开隐藏
    //     obj.addEventListener('mouseleave', () => {
    //         obj1.style.display = 'none'
    //     })
    // }




})
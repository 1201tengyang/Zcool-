/**
 * Created by 七彩城 on 2017/11/19.
 */
$(function () {
  var $content = $('.content')
  var $header = $('.header')
  var $headerLi = $('.header li')
  var $contentLi = $('.content .navList li')
  var $contentList = $('.contentList')
  var contentLis = document.querySelectorAll('.contentList>li')

  var now = 0
  var preIndex = 0
  var isMove = false

  $contentHeight = document.documentElement.clientHeight - $header.outerHeight()

  console.log($contentHeight);
  $content.css('height', $contentHeight)

  $content.on('mousewheel DOMMouseScroll', function (e) {
    // 与 IE 做兼容处理   ie低版本中 event是作为window属性存在的
    e = e || event
    // chrome 和 ie   e.originalEvent.wheelDelta > 0 (滚轮向上)
    // firefox        e.originalEvent.detail < 0   (滚轮向上)
    if(isMove){
      return
    }
    isMove = true
    var delta = (e.originalEvent.wheelDelta > 0 ? 1 : -1) || (e.originalEvent.detail > 0 ? -1 : 1)

      setTimeout(function () {
        if (delta > 0) {  // 滚轮向上
          // 滚轮向上的逻辑
          if (now>0) {
            now--
            console.log(now)
            move(now)
          }
          console.log(now);
        }else if (delta < 0) {
          // 滚轮向下的逻辑
          if (now<contentLis.length-1) {
            now++
            if((now==0&&delta > 0)||(now==contentLis.length&&delta < 0)){
              // 如果 now = 0 并且滚轮向上  或者 now = lis的length 并且滚轮向下  都return
              return;
            }
            move(now)
          }
        }
      },200)
      setTimeout(function () {
        isMove = false
      },1000)
   /* 兼容处理
    tabWrap.addEventListener('transitionEnd',transitionEnd);
    tabWrap.addEventListener('webkitTransitionEnd',transitionEnd);
    解绑处理
    tabWrap.removeEventListener('transitionEnd',transitionEnd);
    tabWrap.removeEventListener('webkitTransitionEnd',transitionEnd);*/
    //  取消滚轮的默认行为
    //  firefox: window.event.returnValue = false     ie chormme: e.preventDefault()
    window.event? window.event.returnValue = false : e.preventDefault()
  })

  headBind()
  function headBind() {
    $.each($headerLi, function (i) {
      $headerLi[i].index = i
      $($headerLi[i]).on('click', function () {
        preIndex = now
        move(this.index)
        now = this.index
      })
    })
    $.each($contentLi, function (i) {
      $contentLi[i].index = i
      $($contentLi[i]).on('click', function () {
        preIndex = now
        move(this.index)
        now = this.index
      })
    })
  }

  function move(index) {
    $($headerLi[index]).siblings().removeClass('active')
    $($headerLi[index]).addClass('active')
    $($contentLi[index]).siblings().removeClass('on')
    $($contentLi[index]).addClass('on')
    $($contentList).css(// 设置内容区中的li的移动
      'top', -index * $contentHeight + 'px'
    );
    // $('.content .contentList').css('top', -index*$contentHeight + 'px')
  }

})

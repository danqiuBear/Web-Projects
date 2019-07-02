/**
 * Created by Caesar on 2019/6/18.
 */
var babyzone = function() {
    function id(name){return document.getElementById(name);}

    //遍历函数


    //ECMAScript函数不介意传递进来多少个参数，也不在乎传进来的参数是什么数据类型。
    //也就是说，即便你定义的函数只接受两个参数，在调用这个函数时也未必一定要传递两个参数。
    //ECMAScript中的参数在内部是用一个数组来表示的
    function each(arr, callback, thisp){
        if(arr.forEach){
            arr.forEach(callback,thisp);
        }else{
            for (var i = 0,len = arr.length; i < len; i++){
                callback.call(thisp, arr[i],i,arr);
            }
        }
    }
    function fadeIn(elem){
        setOpacity(elem,0);
        for(var i = 0; i < 20; i++){
            (function(){
                var pos = i*5;
                setTimeout(function(){
                    setOpacity(elem, pos)
                },i*25);
            })(i);
        }
    }
    function fadeOut(elem){
        for(var i = 0; i <= 20; i++){
            (function(){
                var pos = 100-i*5;
                setTimeout(function(){
                    setOpacity(elem,pos);
                },i*25);
            })(i);
        }
    }
    function setOpacity(elem, level){
        if(elem.filters){
            elem.style.filter = "alpha(opacity="+level + ")";
        }else{
            elem.style.opacity=level/100;
        }
    }
    return{
        //count:图片数量， wrapId:包裹图片的DIV, ulId:按钮DIV， infoId:信息栏
        scroll:function(count, wrapId, ulId, infoId){
            var self = this;
            var targetIdx = 0;//目标图片序号
            var curIndex = 0;//现在图片序号

            //添加Li按钮
            var frag=document.createDocumentFragment();
            this.info = id(infoId);
            this.num=[];//存储各个li的应用，为下面的添加事件做准备

            for(var i = 0; i<count;i++){
                (this.num[i]=frag.appendChild(document.createElement("li"))).innerHTML=i+1;
            }
            id(ulId).appendChild(frag);

            //初始化信息
            this.img = id(wrapId).getElementsByTagName("a");
            this.info.innerHTML = self.img[0].firstChild.title;
            console.log(this.img[0]);
            console.dir(this.img);
            this.num[0].className="on";
            //将除了第一张外的所有图片设置为透明
            each(this.img, function(elem, idx, arr){
                if(idx!=0)setOpacity(elem,0);
            });

            //为所有的li添加点击事件
            each(this.num,function(elem,idx,arr){
                elem.onclick=function(){
                    self.fade(idx, curIndex);
                    curIndex = idx;
                    targetIdx = idx;
                }
            });
            //自动轮播效果
            var itv = setInterval(function(){
                if(targetIdx < self.img.length-1){
                    targetIdx++;
                }else{
                    targetIdx=0;
                }
                self.fade(targetIdx,curIndex);
                curIndex = targetIdx;
            },3000);

            id(ulId).onmouseover=function(){clearInterval(itv)};
            id(ulId).onmouseout=function(){
                itv = setInterval(function(){
                   if(targetIdx < self.num.length-1){
                       targetIdx++;
                   }else{
                       targetIdx=0;
                   }
                    self.fade(targetIdx,curIndex);
                    curIndex=targetIdx;
                },3000);
            }

        },
        fade:function(idx,lastIdx){
            if(idx==lastIdx)return;
            var self=this;
            fadeOut(self.img[lastIdx]);
            fadeIn(self.img[idx]);
            each(self.num, function(elem, elemidx, arr){
                if(elemidx != idx){
                    self.num[elemidx].className="";
                }else{
                    self.num[elemidx].className='on';
                    id("list").style.background="";
                }
            });
            this.info.innerHTML = self.img[idx].firstChild.title;
        }
    }
}();
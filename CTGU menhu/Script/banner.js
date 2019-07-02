/**
 * Created by Caesar on 2019/6/18.
 */
var babyzone = function() {
    function id(name){return document.getElementById(name);}

    //��������


    //ECMAScript���������⴫�ݽ������ٸ�������Ҳ���ں��������Ĳ�����ʲô�������͡�
    //Ҳ����˵�������㶨��ĺ���ֻ���������������ڵ����������ʱҲδ��һ��Ҫ��������������
    //ECMAScript�еĲ������ڲ�����һ����������ʾ��
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
        //count:ͼƬ������ wrapId:����ͼƬ��DIV, ulId:��ťDIV�� infoId:��Ϣ��
        scroll:function(count, wrapId, ulId, infoId){
            var self = this;
            var targetIdx = 0;//Ŀ��ͼƬ���
            var curIndex = 0;//����ͼƬ���

            //����Li��ť
            var frag=document.createDocumentFragment();
            this.info = id(infoId);
            this.num=[];//�洢����li��Ӧ�ã�Ϊ����������¼���׼��

            for(var i = 0; i<count;i++){
                (this.num[i]=frag.appendChild(document.createElement("li"))).innerHTML=i+1;
            }
            id(ulId).appendChild(frag);

            //��ʼ����Ϣ
            this.img = id(wrapId).getElementsByTagName("a");
            this.info.innerHTML = self.img[0].firstChild.title;
            console.log(this.img[0]);
            console.dir(this.img);
            this.num[0].className="on";
            //�����˵�һ���������ͼƬ����Ϊ͸��
            each(this.img, function(elem, idx, arr){
                if(idx!=0)setOpacity(elem,0);
            });

            //Ϊ���е�li���ӵ���¼�
            each(this.num,function(elem,idx,arr){
                elem.onclick=function(){
                    self.fade(idx, curIndex);
                    curIndex = idx;
                    targetIdx = idx;
                }
            });
            //�Զ��ֲ�Ч��
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
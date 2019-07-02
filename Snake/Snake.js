/**
 * Created by Caesar on 2019/6/23.
 */
(function(){
    var elements = [];//存放小蛇的每个身体部分
    //小蛇的构造函数
    function Snake(width, height, direction){
        this.width = width ||20;
        this.height = height ||20;
        this.direction = direction || "right";

        this.body = [
            {x:3, y:2, color:"red"},//头
            {x:2, y:2, color:"orange"},//身体
            {x:1, y:2, color:"orange"}//身体
        ]
    }
    Snake.prototype.init = function(map){
        //先删除之前的小蛇
        remove();

        //循环遍历创建div
        for(var i = 0; i < this.body.length; i++){
            //创建div
            var div = document.createElement("div");
            //把div加入到map地图中
            map.appendChild(div);
            //设置div样式
            div.style.position = "absolute";
            div.style.width = this.width+"px";
            div.style.height = this.height + "px";


            div.style.left = this.body[i].x*this.width+ "px";
            div.style.top = this.body[i].y*this.height + "px";
            div.style.backgroundColor = this.body[i].color;
            //方向暂时不定
            //把div加入到elements数组中-----目的是为了删除
            elements.push(div);//别把这里漏了啊啊啊啊啊啊啊
        }
    };

    //让小蛇动起来
    Snake.prototype.move = function(food, map){
        var i = this.body.length-1;
        for(;i>0;i--){
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
        }

        //判断方向--改变小蛇的头的坐标位置
        switch (this.direction){
            case "right":
                this.body[0].x +=1;
                break;
            case  "left":
                this.body[0].x -=1;
                break;
            case  "top":
                this.body[0].y -=1;
                break;
            case  "bottom":
                this.body[0].y +=1;
                break;
        }
        //判断有没有吃到食物
        //小蛇的头的坐标和食物的坐标一致

        var headX = this.body[0].x*this.width;
        var headY = this.body[0].y*this.height;

        //判断蛇的头的坐标和食物的坐标是否相同
        if(headX==food.x && headY==food.y){
            //获取小蛇最后的尾巴
            var lastTail = this.body[this.body.length-1];
            this.body.push({
                x:lastTail.x,
                y:lastTail.y,
                color:lastTail.color
            });
            //把食物删除，重新初始化食物
            food.init(map);
        }
    };


    function remove(){
        //删除map中的小蛇的每个div，同时删除elements数组中的每个元素，从蛇尾向蛇头方向删除div
        var i = elements.length-1;
        for(; i>=0; i--){
            //先从当前的子元素中找到该子元素的父级元素,然后再弄死这个子元素
            var ele = elements[i];
            ele.parentNode.removeChild(ele);
            elements.splice(i,1);
        }
    }
    window.Snake = Snake;
    //
})();
/**
 * Created by Caesar on 2019/6/23.
 */
(function(){
    var elements=[];//用来保存每个系小方块食物的
    //食物就是一个对象，有宽，有高，有颜色，有横纵坐标，先定义构造函数，然后创建对象
    function Food(x, y, width, height, color){
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 20;
        this.height = height || 20;
        this.color = color || "green";
    }
    Food.prototype.init = function(map){
        //先删除这个小食物
        //外部无法访问的函数
        remove();
        var div = document.createElement("div");
        map.appendChild(div);

        //设置div的样式
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.backgroundColor = this.color;

        //先脱离文档流
        div.style.position = "absolute";

        //随机横纵坐标
        this.x = parseInt(Math.random()*(map.offsetWidth/this.width))*this.width;
        this.y = parseInt(Math.random()*(map.offsetHeight/this.height))*this.height;
        div.style.left = this.x + "px";
        div.style.top = this.y + "px";

        elements.push(div);
    };
    //私有函数---删除食物
    function remove(){
        for(var i = 0; i < elements.length; i++){
            var ele = elements[i];
            ele.parentNode.removeChild(ele);
            elements.splice(i,1);
        }
    }
    window.Food = Food;
})();
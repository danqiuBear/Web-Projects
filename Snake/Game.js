/**
 * Created by Caesar on 2019/6/23.
 */
(function(){
    var that = null;//该变量的目的就是为了保存游戏Game的实例对象
    function Game(map){
        this.food = new Food();//食物对象
        this.snake = new Snake();//小蛇对象
        this.map = map;//地图
        that = this;//保存当前的实例对象到that变量中====================此时that就是this

    }
    Game.prototype.init = function(){
        //初始化游戏
        //初始化食物
        this.food.init(this.map);
        this.snake.init(this.map);

        //调用移动小蛇的方法
        this.runSnake(this.food, this.map);
        //调按键的方法
        this.bindKey();
    };
    Game.prototype.runSnake = function(food, map){
        //自动的去移动
        var timeId = setInterval(function(){
            this.snake.init(map);
            this.snake.move(food, map);

            //横坐标的最大值
            var maxX = map.offsetWidth/this.snake.width;
            //纵坐标的最大值
            var maxY = map.offsetHeight/this.snake.height;
            //小蛇头的坐标
            var headX = this.snake.body[0].x;
            var headY = this.snake.body[0].y;

            if(headX < 0  || headX > maxX){
                clearInterval(timeId);
                alert("Game Over!");
            }

            if(headY < 0  || headY > maxY){
                clearInterval(timeId);
                alert("Game Over!");
            }
        }.bind(that),150);
    };

    Game.prototype.bindKey = function(){
        //获取用户的按键，改变小蛇的方向
        document.addEventListener("keydown",function(e){
            console.log("key")
            //这里的this应该是出发keydown的事件对象===》document
            //所以， 这里的this就是document
            //获取按键的值
            switch (e.keyCode){
                case 37:this.snake.direction="left";break;
                case 38:this.snake.direction="top";break;
                case 39:this.snake.direction="right";break;
                case 40:this.snake.direction="bottom";break;
            }
        }.bind(that), false);
    };

    window.Game = Game;
})();
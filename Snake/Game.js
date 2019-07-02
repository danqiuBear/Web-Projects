/**
 * Created by Caesar on 2019/6/23.
 */
(function(){
    var that = null;//�ñ�����Ŀ�ľ���Ϊ�˱�����ϷGame��ʵ������
    function Game(map){
        this.food = new Food();//ʳ�����
        this.snake = new Snake();//С�߶���
        this.map = map;//��ͼ
        that = this;//���浱ǰ��ʵ������that������====================��ʱthat����this

    }
    Game.prototype.init = function(){
        //��ʼ����Ϸ
        //��ʼ��ʳ��
        this.food.init(this.map);
        this.snake.init(this.map);

        //�����ƶ�С�ߵķ���
        this.runSnake(this.food, this.map);
        //�������ķ���
        this.bindKey();
    };
    Game.prototype.runSnake = function(food, map){
        //�Զ���ȥ�ƶ�
        var timeId = setInterval(function(){
            this.snake.init(map);
            this.snake.move(food, map);

            //����������ֵ
            var maxX = map.offsetWidth/this.snake.width;
            //����������ֵ
            var maxY = map.offsetHeight/this.snake.height;
            //С��ͷ������
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
        //��ȡ�û��İ������ı�С�ߵķ���
        document.addEventListener("keydown",function(e){
            console.log("key")
            //�����thisӦ���ǳ���keydown���¼�����===��document
            //���ԣ� �����this����document
            //��ȡ������ֵ
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
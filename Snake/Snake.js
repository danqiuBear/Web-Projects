/**
 * Created by Caesar on 2019/6/23.
 */
(function(){
    var elements = [];//���С�ߵ�ÿ�����岿��
    //С�ߵĹ��캯��
    function Snake(width, height, direction){
        this.width = width ||20;
        this.height = height ||20;
        this.direction = direction || "right";

        this.body = [
            {x:3, y:2, color:"red"},//ͷ
            {x:2, y:2, color:"orange"},//����
            {x:1, y:2, color:"orange"}//����
        ]
    }
    Snake.prototype.init = function(map){
        //��ɾ��֮ǰ��С��
        remove();

        //ѭ����������div
        for(var i = 0; i < this.body.length; i++){
            //����div
            var div = document.createElement("div");
            //��div���뵽map��ͼ��
            map.appendChild(div);
            //����div��ʽ
            div.style.position = "absolute";
            div.style.width = this.width+"px";
            div.style.height = this.height + "px";


            div.style.left = this.body[i].x*this.width+ "px";
            div.style.top = this.body[i].y*this.height + "px";
            div.style.backgroundColor = this.body[i].color;
            //������ʱ����
            //��div���뵽elements������-----Ŀ����Ϊ��ɾ��
            elements.push(div);//�������©�˰�������������
        }
    };

    //��С�߶�����
    Snake.prototype.move = function(food, map){
        var i = this.body.length-1;
        for(;i>0;i--){
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
        }

        //�жϷ���--�ı�С�ߵ�ͷ������λ��
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
        //�ж���û�гԵ�ʳ��
        //С�ߵ�ͷ�������ʳ�������һ��

        var headX = this.body[0].x*this.width;
        var headY = this.body[0].y*this.height;

        //�ж��ߵ�ͷ�������ʳ��������Ƿ���ͬ
        if(headX==food.x && headY==food.y){
            //��ȡС������β��
            var lastTail = this.body[this.body.length-1];
            this.body.push({
                x:lastTail.x,
                y:lastTail.y,
                color:lastTail.color
            });
            //��ʳ��ɾ�������³�ʼ��ʳ��
            food.init(map);
        }
    };


    function remove(){
        //ɾ��map�е�С�ߵ�ÿ��div��ͬʱɾ��elements�����е�ÿ��Ԫ�أ�����β����ͷ����ɾ��div
        var i = elements.length-1;
        for(; i>=0; i--){
            //�ȴӵ�ǰ����Ԫ�����ҵ�����Ԫ�صĸ���Ԫ��,Ȼ����Ū�������Ԫ��
            var ele = elements[i];
            ele.parentNode.removeChild(ele);
            elements.splice(i,1);
        }
    }
    window.Snake = Snake;
    //
})();
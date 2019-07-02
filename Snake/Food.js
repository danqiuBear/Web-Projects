/**
 * Created by Caesar on 2019/6/23.
 */
(function(){
    var elements=[];//��������ÿ��ϵС����ʳ���
    //ʳ�����һ�������п��иߣ�����ɫ���к������꣬�ȶ��幹�캯����Ȼ�󴴽�����
    function Food(x, y, width, height, color){
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 20;
        this.height = height || 20;
        this.color = color || "green";
    }
    Food.prototype.init = function(map){
        //��ɾ�����Сʳ��
        //�ⲿ�޷����ʵĺ���
        remove();
        var div = document.createElement("div");
        map.appendChild(div);

        //����div����ʽ
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.backgroundColor = this.color;

        //�������ĵ���
        div.style.position = "absolute";

        //�����������
        this.x = parseInt(Math.random()*(map.offsetWidth/this.width))*this.width;
        this.y = parseInt(Math.random()*(map.offsetHeight/this.height))*this.height;
        div.style.left = this.x + "px";
        div.style.top = this.y + "px";

        elements.push(div);
    };
    //˽�к���---ɾ��ʳ��
    function remove(){
        for(var i = 0; i < elements.length; i++){
            var ele = elements[i];
            ele.parentNode.removeChild(ele);
            elements.splice(i,1);
        }
    }
    window.Food = Food;
})();
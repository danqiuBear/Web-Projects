/**
 * Created by Caesar on 2019/6/18.
 */

function dropdownBar(){
    ulo = [];
    lio=[];
    fa = [];
    show = [];

    /*
    //·â×°
    for(var i = 0; i < 6; i++){
        fa[i] = "fa"+(i+1);
        show[i] = "show"+(i+1);
        ulo[i]= document.getElementById(fa[i]);
        lio[i] = document.getElementById(show[i]);
    }
    function singledrop(uli, lii){
        uli.onmouseenter = function(){
            lii.style.display="block";
        };
        uli.onmouseleave=function(){
            lii.style.display="none";
        };
    }
    singledrop(ulo[0],lio[0]);
    singledrop(ulo[1],lio[1]);
    singledrop(ulo[2],lio[2]);
    singledrop(ulo[3],lio[3]);
    singledrop(ulo[4],lio[4]);
    singledrop(ulo[5],lio[5]);*/


    //±Õ°ü
    for(var i = 0; i < 6; i++){
        (function(v){
            fa[v] = "fa"+(v+1);
            show[v] = "show"+(v+1);
            ulo[v]= document.getElementById(fa[v]);
            lio[v] = document.getElementById(show[v]);
            ulo[v].onmouseenter = function(){
                lio[v].style.display="block";
            };
            ulo[v].onmouseleave=function(){
                lio[v].style.display="none";
            };
        })(i);
    }
}

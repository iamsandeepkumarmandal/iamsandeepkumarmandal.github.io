$(document).ready(function(){
    $("#page1").bind("click",function(){
        $(".page").hide();
        $("#page2").show();
        startRound1();
    })
    $("#dropperarea").droppable({
        classes: {
          "ui-droppable-active": "ui-state-active",
          "ui-droppable-hover": "ui-state-hover"
        },
        drop: function( event, ui ) {
           var draggableId = ui.draggable.attr("id");
          console.log("dropped"+draggableId);
          if(draggableId=="card4"){
            id="#"+draggableId;
            $(id).draggable({ revert: false });
            $(id).addClass("round1card3anim");
            setTimeout(function(){
                round1Completed();
            },1000)

          }
          else{
            
            id="#"+draggableId;
            console.log(id)
              $(id).draggable({ revert: true });
          }
          
        }
    });
});

function startRound1(){
    setTimeout(function(){
        $("#introscreen").hide();
        $("#game1area").show();
        msg2Round1();
    },2000,);
    $("#card1").draggable({ revert: "invalid" });
    $("#card2").draggable({ revert: "invalid" });
    $("#card3").draggable({ revert: "invalid" });
    $("#card4").draggable({ revert: "invalid" });
    
}

function msg2Round1(){

    setTimeout(function(){
        $("#intro2").show();
        $("#intro1").hide();
        $("#cursor").show();
        startGame();
    },2000);

}

function startGame(){
    setTimeout(function(){$('#cursor').hide();}, 2000);
    //$("#cursor").delay(2000).hide()
}

function round1Completed(){
    $("#seq1").show();
    setTimeout(function(){
        $("#game1area").hide();
        $("#game1won").show()
    },1000)
}
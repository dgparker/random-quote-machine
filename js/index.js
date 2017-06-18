//variables for the randomQuote function receiving the quote and author from API
var quote = '';
var author = '';
function randomQuote() { //fetch data from the API
  $.ajax({
      url: "https://api.forismatic.com/api/1.0/?",
      dataType: "jsonp",
      data: "method=getQuote&format=jsonp&lang=en&jsonp=?",
      success: function(response) {
        quote = response.quoteText;
        author = response.quoteAuthor;
        $("#history").append(quote + "<br/>&dash; " + author + "&dash;</p>");
      }
  });
};

 //monitors keyboard input for ENTER key to control console functionality
function scroller(){
  var height = 0;
$("#history").each(function(i, value){
  height += parseInt($(this).height());
});
height += '';
$("#prompt").animate({scrollTop:height});
};

$(document).ready(function(){
  //click functions managing open windows and icon status
  $('a[href="#programExitApp"]').click(function(){
    $("#program").hide();
    $("#programIcon").hide();
});
  $('a[href="#programMinApp"]').click(function(){
    $("#program").hide();
    $("#programIcon").removeClass("active");
});
  $('a[href="#readmeExitApp"]').click(function(){
    $("#readme").hide();
    $("#readmeIcon").hide();
});
  $('a[href="#readmeMinApp"]').click(function(){
   $("#readme").hide();
   $("#readmeIcon").removeClass("active");
});
  $('a[href="#programIcon"]').click(function(){
   $("#program").show();
   $("#programIcon").addClass("active");
});
  $('a[href="#readmeIcon"]').click(function(){
   $("#readme").show();
   $("#readmeIcon").addClass("active");
});
  $('a[href="#startProgram"]').click(function(){
   $("#program").show();
   $("#programIcon").show();
   $("#programIcon").addClass("active");
});
  $('a[href="#startReadme"]').click(function(){
   $("#readme").show();
   $("#readmeIcon").show();
   $("#readmeIcon").addClass("active");
});
  $('a[href="#shutdown"]').click(function(){
   $("#screen").hide();
   $("html").css("background-color", "black");
   $("#powerButton").show();
});
  $('a[href="#powerOn"]').click(function(){
   $("#program").hide();
   $("#programIcon").hide();
   $("#readme").hide();
   $("#readmeIcon").hide();
   $("#screen").show();
   $("html").css("background-color", "teal");
   $("#powerButton").hide();
});
  
  
  //function monitoring click-on start icon
  $(document).click(function(e){
    var id = e.target.id;
    if(id =="startIcon" || id =="menuItem" || id =="starMenu"){
      $("#startMenu").show();
    }else{
      $("#startMenu").hide();
    }
  });
});

  //function for setting focus to the text area when clicking anywhere in the         console window
$(document).click(function(e){ 
  var focusID = e.target.id;
  if(focusID == "prompt" || focusID =="history" || 
     focusID == "consoleText" || focusID == "command"){
    $("#command").focus();
  };
});

 //monitors keyboard input for ENTER key to control console functionality
$(document).keydown(function(e){ 
  var help = "<br><br>Valid commands are:<br><br> quote - Displays a random quote<br><br>tweet - Opens a page to tweet the last quote received<br><br>info - Contains info about the Quotinator<br><br>help - Displays the help menu<br> ";
  var info = "<br><br>The quotinator was developed by Dylan Parker in response to a FreeCodeCamp.com project. It's sole purpose is to provide the user with random quotes and give them the ability to share those quotes via twitter.<br><br>";
    if(e.which == 13){
      var cmdInput = $("#command").val().toLowerCase();
      if(cmdInput == "help"){ //displays the help menu inside the console window
        $("#history").append("X:\Quotinator>",$("#command").val(), help);
        $(function(){
          scroller();
        });
        $("#command").val("");
      }else if(cmdInput =="quote"){ //returns a quote received from the API
        $("#history").append("X:\Quotinator>",$("#command").val(), "<br>");
        $(function(){
          randomQuote();
          scroller();
        });
        $("#command").val("");
       }else if(cmdInput == "info"){ //displays info inside the console window
        $("#history").append("X:\Quotinator>",$("#command").val(), info);
        $("#command").val("");
        $(function(){
          scroller();
        });
       }else if(cmdInput == "tweet"){ //opens a page to tweet the quote
        $("#history").append("X:\Quotinator>",$("#command").val(),"<br>");
        $(function(){
          var uri = quote + " - " + author + "- ";
          var enc = encodeURIComponent(uri);
          window.open("https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + enc)
        });
        $("#command").val("");        
       }else{
       $("#history").append("X:\Quotinator>", $("#command").val(),"<br>");
       $("#command").val("");
      };
    };
  });
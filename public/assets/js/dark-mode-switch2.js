(function() {
    var darkSwitch;

    window.onload = function(){
        darkSwitch = document.getElementById("darkModeClick");
        console.log("Dark Switch loaded!");
        console.log("darkSwitch = ", darkSwitch);

        if (darkSwitch) {
            console.log("Dark switch initialized!");
          initTheme();
          darkSwitch.addEventListener("click", function(event) {
            console.log("Dark switch invoked!")
            resetTheme();
          });
    }
    
    
    
      function initTheme() {
          console.log("initTheme() invoked!");
        var darkThemeSelected =
          localStorage.getItem("darkSwitch") !== null &&
          localStorage.getItem("darkSwitch") === "dark";
        
        darkThemeSelected
          ? document.body.setAttribute("data-theme", "dark") 
          : document.body.removeAttribute("data-theme");
  
        if (darkThemeSelected){
          document.getElementById("darkModeText").innerHTML=`Turn Lights On`;
          document.getElementById("darkModeIcon").className="zmdi zmdi-brightness-5";
        }
        else {
          document.getElementById("darkModeText").innerHTML=`Turn Lights Off`;
          document.getElementById("darkModeIcon").className="zmdi zmdi-brightness-3";
        }
      }
      function resetTheme() {
        if (localStorage.getItem('darkSwitch') != "dark") {
          document.body.setAttribute("data-theme", "dark");
          localStorage.setItem("darkSwitch", "dark");
          document.getElementById("darkModeText").innerHTML=`Turn Lights On`;
          document.getElementById("darkModeIcon").className="zmdi zmdi-brightness-5";
        } else {
          document.body.removeAttribute("data-theme");
          localStorage.removeItem("darkSwitch");
          document.getElementById("darkModeText").innerHTML=`Turn Lights Off`;
          document.getElementById("darkModeIcon").className="zmdi zmdi-brightness-3";
        }
      }
    }
  })();
  
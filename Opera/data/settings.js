window.addEventListener("load", function () {
  /*  */
  var head = document.documentElement || document.head || document.querySelector("head");
  if (head) {
    var link = document.getElementById("youtube-sidebar-style-css");
    if (!link) {
      link = document.createElement("link");
      link.type = "text/css";
      link.rel = "stylesheet";
      link.setAttribute("id", "youtube-sidebar-style-css");
      link.href = chrome.runtime.getURL("data/button.css");
      head.appendChild(link);
    }
    /*  */
    var table = document.createElement("table");
    table.setAttribute("id", "top-button-table");
    /*  */
    var tr = document.createElement("tr");
    var faqicon = chrome.runtime.getURL("data/icons/faq.png");
    var backicon = chrome.runtime.getURL("data/icons/back.png");
    var homeicon = chrome.runtime.getURL("data/icons/home.png");
    var popouticon = chrome.runtime.getURL("data/icons/popout.png");
    var forwardicon = chrome.runtime.getURL("data/icons/forward.png");
    var settingsicon = chrome.runtime.getURL("data/icons/settings.png");
    /*  */
    var backButton = document.createElement("td");
    backButton.setAttribute("title", "Back");
    backButton.setAttribute("id", "back-button");
    backButton.style.backgroundImage = "url(" + backicon + ')';
    backButton.addEventListener("click", function () {window.history.back()});
    tr.appendChild(backButton);
    /*  */

    var settingsButton = document.createElement("td");
    settingsButton.setAttribute("title", "Settings");
    settingsButton.setAttribute("id", "settings-button");
    settingsButton.style.backgroundImage = "url(" + settingsicon + ')';
    settingsButton.addEventListener("click", function () {
      window.history.back()
    });
    tr.appendChild(settingsButton);
    /*  */

    var homeButton = document.createElement("td");
    homeButton.setAttribute("title", "Home");
    homeButton.setAttribute("id", "home-button");
    homeButton.style.backgroundImage = "url(" + homeicon + ')';
    homeButton.addEventListener("click", function () {window.history.back()});
    tr.appendChild(homeButton);
    /*  */

    /*  */
    var faqButton = document.createElement("td");
    faqButton.setAttribute("id", "faq-button");
    faqButton.setAttribute("title", "Support page");
    faqButton.style.backgroundImage = "url(" + faqicon + ')';
    faqButton.addEventListener("click", function () {
      url = "https://www.downloadhub.cloud/2023/02/sidebar.html#CSS1"
      window.open(url , '_blank');
    });
    tr.appendChild(faqButton);

    table.appendChild(tr);
    document.body.appendChild(table);
  }
});


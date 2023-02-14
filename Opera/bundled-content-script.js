/**
 * By @Codehemu - ( JS: MIT License)
 * License - https://github.com/hemucode/LICENSE ( CSS: MIT License)
 */
async function init() {
  try {
    var a = new Promise(function(resolve, reject){
          chrome.storage.sync.get({"enabled": true}, function(options){
              resolve(options.enabled);
          })
      });

    const enabled = await a;
    console.log(enabled + " enabled");

    var d = new Promise(function(resolve, reject){
        chrome.storage.sync.get({"videosubscribe":true}, function(options){
            resolve(options.videosubscribe);
        })
    });

    var c = new Promise(function(resolve, reject){
        chrome.storage.sync.get({"videolike": false}, function(options){
            resolve(options.videolike);
        })
    });


    const videolike = await c;
    console.log(videolike + " videolike");
    if (videolike) {
        console.log("videolike Run...");
        head = document.documentElement || document.head || document.querySelector("head");
        if (head) {
          var css = document.createElement("style");
          var head = document.head;
          head.appendChild(css);
          css.type = 'text/css';
          css.innerText = `#player-container-outer{ box-shadow: 0 0 25px #58a6ff; } #player-container-outer:hover { box-shadow: none; animation: animate 8s linear infinite; } #player-container-outer:before { content: ''; position: absolute; top: -5px; bottom: -5px; right: -5px; left: -5px; z-index: -1; background: linear-gradient(90deg, #03a9f4, #f441a4, #ffeb3b, #03a9f4); background-size: 400%; filter: blur(30px); opacity: 0; transition: 0.5s; } #player-container-outer:hover:before { filter: blur(30px); opacity: 1; animation: animate 8s linear infinite; } .btnvz1{ margin-right: 15px; } .removex1{ width: 100px; height: 37px; color: #58a6ff; background: #065fd4; border: 0; font-family: sans-serif; align-items: right; border-radius: 2px; } #footer-text.ytd-commentbox{ text-align: right !important; } .ytp-swatch-background-color { animation: animate 8s linear infinite; } .ytp-swatch-background-color:before { content: ''; position: absolute; top: -5px; bottom: -5px; right: -5px; left: -5px; z-index: -1; background: linear-gradient(90deg, #03a9f4, #f441a4, #ffeb3b, #03a9f4); background-size: 400%; filter: blur(5px); opacity: 0; transition: 0.5s; } .ytp-swatch-background-color:before { filter: blur(5px); opacity: 1; animation: animate 8s linear infinite; } .ytd-searchbox:hover { animation: animate 8s linear infinite; } @keyframes animate { 0% { background-position: 0%; } 100% { background-position: 400%; } } .ytd-searchbox:before { content: ''; position: absolute; top: -5px; bottom: -5px; right: -5px; left: -5px; z-index: -1; background: linear-gradient(90deg, #03a9f4, #f441a4, #ffeb3b, #03a9f4); background-size: 400%; filter: blur(30px); opacity: 0; transition: 0.5s; } .ytd-searchbox:hover:before { filter: blur(30px); opacity: 1; animation: animate 8s linear infinite; } .glow:hover { animation: animate 8s linear infinite; } .glow:before { content: ''; position: absolute; top: -5px; bottom: -5px; right: -5px; left: -5px; z-index: -1; background: linear-gradient(90deg, #03a9f4, #f441a4, #ffeb3b, #03a9f4); background-size: 400%; filter: blur(30px); opacity: 0; transition: 0.5s; } .glow:hover:before { filter: blur(30px); opacity: 1; animation: animate 8s linear infinite; } /* Comment Button */ #cancel-button.ytd-commentbox, #submit-button.ytd-commentbox{ background: #065fd4 !important; } /* webkit-scrollbar */ ::-webkit-scrollbar-thumb{ background: linear-gradient(to top, #008aff, #00ffe7); } ::-webkit-scrollbar{ background: #0d1117 !important; } /* Primary Background */ ytd-app, #guide-content.ytd-app, .playlist-items.ytd-playlist-panel-renderer, #chips.ytd-feed-filter-chip-bar-renderer, #chips-wrapper.ytd-feed-filter-chip-bar-renderer, #left-arrow-button.ytd-feed-filter-chip-bar-renderer, #right-arrow-button.ytd-feed-filter-chip-bar-renderer, #container.ytd-searchbox, #search-icon-legacy.ytd-searchbox, #left-arrow.ytd-feed-filter-chip-bar-renderer, #right-arrow.ytd-feed-filter-chip-bar-renderer, ytd-playlist-sidebar-renderer, ytd-item-section-renderer, ytd-alert-with-button-renderer[type=INFO], ytd-alert-with-button-renderer[type=SUCCESS],#primary.ytd-two-column-browse-results-renderer, #tabs-inner-container.ytd-c4-tabbed-header-renderer,ytd-browse[page-subtype=channels]{ background: #0d1117 !important; } /* Secondary Background */ ytd-masthead, .sbsb_a,.sbdd_b, ytd-mini-guide-renderer, ytd-mini-guide-entry-renderer, yt-chip-cloud-renderer, ytd-merch-shelf-renderer, .header.ytd-playlist-panel-renderer, #left-arrow-button.yt-chip-cloud-renderer, #right-arrow-button.yt-chip-cloud-renderer, #channel-header.ytd-c4-tabbed-header-renderer, #show-hide-button.ytd-live-chat-frame>ytd-toggle-button-renderer.ytd-live-chat-frame, ytd-two-column-browse-results-renderer[page-subtype=history] #secondary.ytd-two-column-browse-results-renderer{ background: #161b22 !important; } /* Primary Font Color */ yt-formatted-string, #container.ytd-searchbox input.ytd-searchbox, .gsfs{ color: #58a6ff !important; } /* Secondary Font Color */ span,yt-icon,.ytd-guide-entry-renderer{ color: #d2a8ff !important; } /* Others Font Color */ a,ytd-text-header-renderer{ color: #606060 !important; } #left-arrow.ytd-feed-filter-chip-bar-renderer, #right-arrow.ytd-feed-filter-chip-bar-renderer, #left-arrow.yt-chip-cloud-renderer, #right-arrow.yt-chip-cloud-renderer{ position: initial !important; } #container.ytd-searchbox, #search-icon-legacy.ytd-searchbox{ border: 1px solid #58a6ff !important; box-shadow : none !important; } #container.ytd-searchbox{ border-radius: 4px 0 4px 0 !important; } #search-icon-legacy.ytd-searchbox{ border-radius: 0 4px 4px 0 !important; }`  
        }
    }

    console.log(`[Sidebar for YouTube™ v${chrome.runtime.getManifest().version} Enabled]`);
    console.log(`ID : ${chrome.runtime.id}`)


    // console.log(enabled);

    if (enabled) {
      setInterval(()=>{
          const btn=document.querySelector(".ytp-ad-skip-button");
          if(btn) {btn.click();}
          if( ! document.querySelector('.ad-showing') ) return
                const video=document.querySelector('video')
                if( ! video)  return
                if(btn) {
                  btn.click()
                } else {
                  video.currentTime = isNaN(video.duration) ? 0 : video.duration
                }
      },300);
      await Promise.all([injectStyles()]);
    }

  }
  catch(err) {
    console.log(err.message);
  }
 
}
init();

/**
 * @returns Promise
 */

function injectStyles() {
  head = document.documentElement || document.head || document.querySelector("head");
  if (head) {
    var css = document.createElement("style");
    var head = document.head;
    head.appendChild(css);
    css.type = 'text/css';
    css.innerText = `/* Hide by Element */ ytd-promoted-video-renderer, ytd-movie-offer-module-renderer, ytd-promoted-sparkles-web-renderer, ytd-promoted-sparkles-text-search-renderer, ytd-player-legacy-desktop-watch-ads-renderer { display: none !important; visibility: hidden !important; } /* Hide by ID */ #player-ads, #search-pva, #premium-yva, #masthead-ad, #feedmodule-PRO, #video-masthead, #watch-buy-urls, #sub-frame-error, #main-frame-error, #watch7-sidebar-ads, #feed-pyv-container, #shelf-pyv-container, #watch-branded-actions, #watch-channel-brand-div, #homepage-chrome-side-promo, #watch-channel-brand-div-text { display: none !important; visibility: hidden !important; } /* Hide by Class */ .iv-promo, .video-ads, .promoted-videos, .ytp-ad-progress, .ytp-ad-progress-list, .searchView.list-view, .html5-ad-progress-list, .watch-extra-info-right, .watch-extra-info-column, .lohp-pyv-shelf-container, .ytd-merch-shelf-renderer, .carousel-offer-url-container, .youtubeSuperLeaderBoardAdHolder, .youtubeSuperLeaderOverallAdArea, .ytd-movie-offer-module-renderer, .ytd-action-companion-ad-renderer { display: none !important; visibility: hidden !important; } /* Hide by Rule */ iframe[id^=ad_], div[class*="-ad-v"], div[class*="-ads-"], a[href*="/adwords/"], a[href*="doubleclick.net"], iframe[src*="doubleclick.net"], a[href^="http://www.youtube.com/cthru?"], a[href^="https://www.youtube.com/cthru?"], a[onclick*="\"ping_url\":\"http://www.google.com/aclk?"] { display: none !important; visibility: hidden !important; } .badge-style-type-ad, .GoogleActiveViewElement, .sparkles-light-cta, .ytd-compact-promoted-video-renderer, .ytd-companion-slot-renderer, .ytd-player-legacy-desktop-watch-ads-renderer, .ytd-promoted-sparkles-text-search-renderer, .ytd-video-masthead-ad-v3-renderer, .ytp-ad-progress-list, [layout*="display-ad-"], #masthead-ad, #merch-shelf, #player-ads, #show-ad, #YtKevlarVisibilityIdentifier, a[href^="https://www.googleadservices.com/pagead/aclk?"], ytd-compact-promoted-video-renderer, ytd-companion-slot-renderer, ytd-display-ad-renderer, ytd-promoted-sparkles-text-search-renderer, ytd-promoted-sparkles-web-renderer, ytd-video-masthead-ad-advertiser-info-renderer, ytd-video-masthead-ad-v3-renderer, ytm-promoted-sparkles-web-renderer { display: none !important; }`
  }
}
var oldurl = document.location.href;
setInterval(()=>{
  newurl = document.location.href;
  if (!(newurl==oldurl)) {
    return chrome.runtime.sendMessage({
      action: "INSERT_CSS_RULE",
      rule: document.location.href,
    });
  }
},2000)


var config = {};

config.welcome = {
  set lastupdate (val) {app.storage.write("lastupdate", val)},
  get lastupdate () {return app.storage.read("lastupdate") !== undefined ? app.storage.read("lastupdate") : 0}
};

chrome.runtime.onStartup.addListener(async () => {
  await filters();
});



// async function filters(){
//   console.log("filters");
//   const RULE = {
//     id: 1,
//     condition: {
//       urlFilter: "||youtube.com^",
//       resourceTypes: ['sub_frame']
//     },
//     action: {
//       type: 'modifyHeaders',
//       requestHeaders: [
//         {header: 'x-frame-options', operation: 'remove'},
//         {header: 'frame-options', operation: 'remove'}
//       ],
//     },
//   };
//   chrome.declarativeNetRequest.updateDynamicRules({
//     removeRuleIds: [RULE.id],
//     addRules: [RULE],
//   });

// }

var CURRENT_YOUTUBE_URL = "https://www.youtube.com/";


chrome.runtime.onMessage.addListener(async (request, sender) => {
  switch (request.action) {
    case "INSERT_CSS_RULE": {
      return CURRENT_YOUTUBE_URL = `${request.rule}`;
      console.log(request.rule)
    }
    case "INSERT_CSS": {
      return chrome.tabs.create({ url: CURRENT_YOUTUBE_URL });
    } 
  }
});





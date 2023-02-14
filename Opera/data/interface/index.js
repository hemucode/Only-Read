async function init() {
  return Promise.all([translate(), hydrate()]);
}

function translate() {
  return new Promise((resolve) => {
    const elements = document.querySelectorAll("[data-message]");
    for (const element of elements) {
      const key = element.dataset.message;
      const message = chrome.i18n.getMessage(key);
      if (message) {
        element.textContent = message;
      } else {
        console.error("Missing chrome.i18n message:", key);
      }
    }
    resolve();
  });
}

/**
 * @returns Promise
 */
async function hydrate() {

   var a = new Promise(function(resolve, reject){
        chrome.storage.sync.get({"enabled": true}, function(options){
            resolve(options.enabled);
        })
    });

  const enabled = await a;
  console.log(enabled);


  // Hydrate Logo
  const $logo = document.querySelector(".logo");
  $logo.style.filter = enabled ? "grayscale(0)" : "grayscale(100%)";
  $logo.style.opacity = enabled ? "1" : "0.7";


  // Hydrate Checkbox Label
  const $checkboxLabel = document.querySelector("[data-message=adsblock]");
  $checkboxLabel.textContent = chrome.i18n.getMessage(
    enabled ? "adsblock" : "adsunblock"
  );

  // Hydrate Checkbox Label
  const $enabledCheckbox = document.querySelector("input[name=ads]");
  $enabledCheckbox.checked = enabled;
  $enabledCheckbox.addEventListener("change", async (event) => {
    const enabled = event.currentTarget.checked;

    // Persist
    await chrome.storage.sync.set({ enabled });

    // Update Checkbox Label
    $checkboxLabel.textContent = chrome.i18n.getMessage(
      enabled ? "adsblock" : "adsunblock"
    );

    // Update Logo
    $logo.style.filter = enabled ? "grayscale(0)" : "grayscale(100%)";
    $logo.style.opacity = enabled ? "1" : "0.7";
  });


  var c = new Promise(function(resolve, reject){
        chrome.storage.sync.get({"videolike": false}, function(options){
            resolve(options.videolike);
        })
    });

  const videolike = await c;
  console.log(videolike);



  // Hydrate Checkbox Label
  const $checkboxLabel_2 = document.querySelector("[data-message=autolike]");
  $checkboxLabel_2.textContent = chrome.i18n.getMessage(
    videolike ? "autolike" : "manuallike"
  );

  // Hydrate Checkbox Label
  const $enabledCheckbox_2 = document.querySelector("input[name=like]");
  $enabledCheckbox_2.checked = videolike;
  $enabledCheckbox_2.addEventListener("change", async (event) => {
    const videolike = event.currentTarget.checked;

    // Persist
    await chrome.storage.sync.set({ videolike });

    // Update Checkbox Label
    $checkboxLabel_2.textContent = chrome.i18n.getMessage(
      videolike ? "autolike" : "manuallike"
    );
  });


  document.querySelector(".teaser").href = `https://addons.opera.com/extensions/details/sidebar-for-youtubetm-12/`

}

init();


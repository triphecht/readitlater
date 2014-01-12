var addToList = function(info, tab) {
  chrome.tabs.query({
    'active': true,
    'windowId': chrome.windows.WINDOW_ID_CURRENT
  },

  function(tabs, newToRead) {
    var newTitle = tabs[0].title;
    var newURL = tabs[0].url;
    var newToRead = [];

    console.log('Adding ' + newTitle + ' -- ' + newURL);

    try {
      console.log('Attempting to load list');
      newToRead = JSON.parse(localStorage.getItem('ReadItLater'));

      // check for dupes
      var i = 0;
      var dupe = false;

      while((i < newToRead.length) && (dupe != true)) {
        if(newToRead[i].url == newURL) {
          alert("Duplicate entry -- not added");
          dupe = true;
        }
        i++;
      }

      if(dupe == false) {
        newToRead.push({
          'title': newTitle,
          'url': newURL
        });

        localStorage.setItem('ReadItLater', JSON.stringify(newToRead));
      }
    }

    // Error -- clear list
    catch (e) {
      console.log('Error: ' + e);

      // Clear list and add link
      newToRead = [];

      newToRead.push({
        'title': newTitle,
        'url': newURL
      });

      localStorage.setItem('ReadItLater', JSON.stringify(newToRead));
    }
  });
};

chrome.contextMenus.create({
  "title": "Read It Later",
  "contexts": ["page", "selection", "image", "link"],
  "onclick": addToList
});
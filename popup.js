import { getActiveTabURL } from "./utils.js";


// adding a new bookmark row to the popup
const addNewBookmark = () => {};

const viewBookmarks = (currentBookmarks = []) => {

      const bookmarksElement = document.getElementById("bookmarks");
      bookmarksElement.innerHTML = "";

      if(currentBookmarks.length>0){

        for(let i=0; i<currentBookmarks.length; i++){

            addNewBookmark(bookmarksElement, bookmark);
        
        }
      }

      else {
        
           bookmarksElement.innerHTML = "<i>No bookmarks.</i>";

      }

};

const onPlay = e => {};

const onDelete = e => {};

const setBookmarkAttributes =  () => {};

document.addEventListener("DOMContentLoaded", async () => {

    const activeTab = await getActiveTabURL();
    const queryParameters = activeTab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);

    const currentVideo = urlParameters.get("v");

    if(activeTab.url.includes("youtube.com/watch") && currentVideo){
        chrome.storage.sync.get([currentVideo], function(data){
            const currentVideoBookmarks = data[currentVideo] ? JSON.parse(data[currentVideo]): [];

            // This piece of code determines whether the current page is a youtube page or not. If not then it displays an apt message.

            viewBookmarks(currentVideoBookmarks)
        })
    }

    else {
        
        const container = document.getElementsByClassName("container")[0];
        container.innerHTML = '<div class="title">This is not a youtube video page. </div>';

    }

});

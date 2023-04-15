import { getActiveTabURL } from "./utils.js";

const chrome = window.chrome;


// adding a new bookmark row to the popup
const addNewBookmark = (bookmarksElement, bookmark) => {
    
    //It adds to the list of existing bookmarks list. BookmarksElement is the html div where the bookmarks are placed and bookamrk is an object containing information for the latest timestamp bookmark like time and description.
        const BookmarkTitleElement = document.createElement("div");
        const newBookmarkElement = document.createElement("div");

        BookmarkTitleElement.textContent = bookmark.desc;
        BookmarkTitleElement.className = "bookmark-title";

        newBookmarkElement.id = "bookmark-" + bookmark.time;
        newBookmarkElement.className = "bookmark";
        newBookmarkElement.setAttribute("timestamp", bookmark.time);

        newBookmarkElement.appendChild(BookmarkTitleElement);
        bookmarksElement.appendChild(newBookmarkElement);

};

const viewBookmarks = (currentBookmarks) => {
    debugger;

    //Shows all the bookmarks in the popup.
      const bookmarksElement = document.getElementById("bookmarks");
      bookmarksElement.innerHTML = "";
      
      if(currentBookmarks.length>0){

        for(let i=0; i<currentBookmarks.length; i++){

            const bookmark = currentBookmarks[i];
            addNewBookmark(bookmarksElement, bookmark);
            console.log(bookmark.desc);
            console.log(bookmark.time)
        
        }
      }

      else {
        
           bookmarksElement.innerHTML = "<i>No bookmarks.</i>";

      }

};


const updatePopup = async () => {

    const activeTab = await getActiveTabURL();
    const queryParameters = activeTab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);
  
    const currentVideo = urlParameters.get("v");
  
    if (activeTab.url.includes("youtube.com/watch")) {

      chrome.storage.sync.get([currentVideo], function (data) {

        const currentVideoBookmarks = data[currentVideo]
          ? JSON.parse(data[currentVideo])
          : [];
  
        viewBookmarks(currentVideoBookmarks);

      });
    } 
    
    else {

      const container = document.getElementsByClassName("container")[0];
      container.innerHTML =
        '<div class="title">This is not a youtube video page. </div>';

    }
  };



const onPlay = e => {};

const onDelete = e => {};

const setBookmarkAttributes =  () => {};

document.addEventListener("DOMContentLoaded", async () => {

   

    const activeTab = await getActiveTabURL();
    const queryParameters = activeTab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);

    let currentVideoBookmarks = [];
    console.log("statement right before if and else statements for chrome.storage.")
    const currentVideo = urlParameters.get("v");
 
    if(activeTab.url.includes("youtube.com/watch")){
        chrome.storage.sync.get([currentVideo], function(data){
            currentVideoBookmarks = data[currentVideo] ? JSON.parse(data[currentVideo]): [];

            // This piece of code determines whether the current page is a youtube page or not. If not then it displays an apt message.
            // If the page is a youtube vid page, then the bookmark timestamp array is extracted from chrome.storage and stored in a constant.
            // And then the viewbookmarks function is called with the updated list of bookmarks as the parameter. This updates the popup box.

            viewBookmarks(currentVideoBookmarks);
        })
    }

    else {
        
        const container = document.getElementsByClassName("container")[0];
        container.innerHTML = '<div class="title">This is not a youtube video page. </div>';

    }
    
    chrome.storage.onChanged.addListener((changes, areaName) => {

        console.log("The chrome.storage.onChanged event listener is being triggered.")
    
        if(changes[currentVideo]) {
            currentVideoBookmarks = JSON.parse(changes[currentVideo].newValue);
            updatePopup();
        }
    
    });

    
});
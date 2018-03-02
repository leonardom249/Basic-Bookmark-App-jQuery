'use strict';

/* global store, api */

// eslint-disable-next-line no-unused-vars

console.log('bookmarks connected to HTML');

const bookmarkList = (function(){

  ///html to add to dom based on events:

  const addCreateBookmarkFormToHtml= function() {
    return `
    <p>Create Bookmark:</p>
                    <form id="create-bookmark-form">

                    <label for="input-title">Title: </label>
                    <input type="text" placeholder="ex: Cats Gone Wild" id="input-title">
                        <br>

                    <label for="input-link">Link: </label>
                    <input type="text" placeholder="ex: YouTube.com..." id="input-link">
                         <br>

                    <label for="input-description">Description: </label>
                        <br>
                    <textarea placeholder="text here" cols="40" rows="5" id="input-description"></textarea> 
                            <br>

                    <label for="input-rating">Rating:  </label>
                        <input type="number" min="1" max="5" id="input-rating">
                            <br>
                            
                    <button type="submit" id="create-bookmark-button">
                             Add Bookmark
                    </button>

                    </form>  `;
  };

  const addBookmarksRenderedtoHtml = function(bookmark){
    return `
     <li data-bookmark-id='${bookmark.id}' class= "bookmark-class">

       <span class="bookmark-title">${bookmark.title}</span> 

       <span class="bookmark-rating">Rating: ${bookmark.rating}</span>

       <input type="checkbox" id="detailed-view-toggle">Detailed View

       <button type="submit" id="remove-button">
             Remove Bookmark
       </button>
     </li>`;
  };

  const addDetailedViewToHTML = function (bookmark){
    return `
    <li data-bookmark-id='${bookmark.id}' class="bookmark-class">

        <span class="bookmark-title">${bookmark.title}</span> 

        <span class="bookmark-rating">Rating: ${bookmark.rating}</span>

        <input type="checkbox" class="detailed-view-toggle">Detailed View

        <button type="submit" class="remove-button">
              Remove Bookmark
        </button>

        <section class="detailed-view-on">
          <ul>
             <li>
               <span class="description-on">Description: ${bookmark.description}</span><br>
               <a href="${bookmark.link}" class="clickable-link">
                    View Link
               </a>
             </li>
          </ul>
        </section>             
    </li>`;
  };



  const render = function (){
    console.log('render called');
    if (store.isAdding === true){
      renderAddBookmarkField();
    }
    else {
      $('#creating-bookmark-section').empty();
    }
    const newBookmarkHTML = store.bookmarks.map(obj => addBookmarksRenderedtoHtml(obj));
    $('#bookmarks-rendered').html(newBookmarkHTML);
  };

  const renderAddBookmarkField = function () {
    $('#creating-bookmark-section').html(addCreateBookmarkFormToHtml);
  };

  const handleAddBookmarkFile = function () {
    $('#init-add-bookmark').on('click',function(event) {
      event.preventDefault();
      store.isAdding = true;
      render();
    });
  };
  
  const handleNewBookmarkSubmit = function (){
    $('#creating-bookmark-section').on('submit', '#create-bookmark-form', event => {
      event.preventDefault();
      const newTitleName = $('#input-title').val();
      const newLinkName = $('#input-link').val();
      const newDescription = $('#input-description').val();
      const newRating = $('#input-rating').val();
      api.createBookmarks(newTitleName, newLinkName, newDescription, newRating, (newBookmark)=>{
        store.addBookmark(newBookmark);
        $('#input-title').val('');
        $('#input-link').val('');
        $('#input-description').val('');
        $('#input-rating').val('');
        store.isAdding = false;
        render();
      });

    });
  };





  const getBookmarkIdFromElement = function(bookmark){
    return $(bookmark)
      .closest('.bookmark-class')
      .data('bookmark-id');
      //working with api but not with .splice?
  };



  const handleDetailedViewClicked = function (){
  };

  // const handleToggleFilterClick = function() {
  //   $('#detailed-view-toggle').click(() => {
  //     console.log('handled toggle ran');
  //     store.toggleCheckedFilter();
  //     render();
  //   });
  // };

  const handleBookmarkRemoveClicked = function(){
    $('#bookmarks-rendered').on('click', '#remove-button', event => {
      console.log('remove handle clicked');
      const id = getBookmarkIdFromElement(event.currentTarget);
      api.deleteBookmarks(id, () => {
        store.findAndDelete(id);
        render();
      });
      render();
    });
  };

  const bindThemAll = function (){
    //handleToggleFilterClick();
    handleNewBookmarkSubmit();
    handleAddBookmarkFile();
    handleDetailedViewClicked();
    handleBookmarkRemoveClicked();
  };

  return {
    render,
    bindThemAll
  };
}());
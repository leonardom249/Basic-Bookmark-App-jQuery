'use strict';
/* global store*/

console.log('api connected to HTML');

const api = (function () {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/megan';

  let getBookmarks = function(callback){
    $.getJSON( `${BASE_URL}/bookmarks`, callback);
  };


  const createBookmarks = function(title, url, desc, rating, callback){
    const newBookmark = JSON.stringify({title, url, desc, rating});
    console.log('createBookmarks' + title);

    $.ajax({
      url : `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/JSON',
      data: newBookmark,
      success: callback
    });


  };



  const deleteBookmarks = function(id, callback){
    $.ajax( {
      url : `${BASE_URL}/bookmarks/${id}`,
      method : 'DELETE',
      contentType : 'application/json',
      success : callback
    });
  };

  return {
    getBookmarks,
    createBookmarks,
    deleteBookmarks
  };


})();
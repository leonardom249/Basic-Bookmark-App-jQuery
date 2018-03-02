'use strict';

/* global Item */

// eslint-disable-next-line no-unused-vars

console.log('store connected to HTML')


const store = (function(){
  
  const addBookmark = function(bookmark) {
    this.bookmarks.push(bookmark);
    console.log(this.bookmarks);
  };

  const findById = function(id) {
    return this.bookmarks.find(bookmark => bookmark.id === id);
  };

  const toggleCheckedFilter = function() {
    this.detailedViewChecked = !this.detailedViewChecked;
  };


  const findAndDelete = function (id){
    const idBookmark = this.findById(id);
    this.items.splice(idBookmark, 1);
  };

  return {
    bookmarks: [],
    detailedViewChecked: false,

    findAndDelete,
    addBookmark,
    findById,
    toggleCheckedFilter,
  };
  
}());
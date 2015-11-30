'use strict';

var Dispatcher = require('../core/Dispatcher');
var ActionConstants = require('../constants/ActionConstants');
var Store = require('../stores/Store');
var Promise = require('es6-promise').Promise; // jshint ignore:line
var Api = require('../services/Api');

var ActionCreator = {

  getCategories: function () {
    Api
      .get('http://localhost:3000/authors')
      .then(function (categories) {
        Dispatcher.handleViewAction({
          actionType: ActionConstants.RECEIVE_CATEGORIES,
          categories: categories
        });
      })
      .catch(function () {
        Dispatcher.handleViewAction({
          actionType: ActionConstants.RECEIVE_ERROR,
          error: 'There was a problem getting the categories'
        });
      });
  },

  sendText: function (text) {
    Api
      .post('http://localhost:3000/authors', {author: {name: text}})
      .then(function (text) {
        Dispatcher.handleViewAction({
          actionType: ActionConstants.SEND_TEXT,
          text: text
        });
      })
      .catch(function () {
        Dispatcher.handleViewAction({
          actionType: ActionConstants.RECEIVE_ERROR,
          error: 'There was a problem sending the text'
        });
      });

    // This might not be necessary
    Api
      .get('http://localhost:3000/authors')
      .then(function (categories) {
        Dispatcher.handleViewAction({
          actionType: ActionConstants.RECEIVE_CATEGORIES,
          categories: categories
        });
      })
      .catch(function () {
        Dispatcher.handleViewAction({
          actionType: ActionConstants.RECEIVE_ERROR,
          error: 'There was a problem getting the categories'
        });
      });
  }
};

module.exports = ActionCreator;

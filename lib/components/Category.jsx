'use strict';

var React = require('react');
var Store = require('../stores/Store');
var ActionCreator = require('../actions/ActionCreator');
var ENTER_KEY_CODE = 13;

var Category = React.createClass({

  getInitialState: function () {
    return {
      categories: [],
      text: ''
    };
  },

  componentWillMount: function () {
    Store.addChangeListener(this._onChange);
  },

  // Good place to call API
  componentDidMount: function () {
    ActionCreator.getCategories();
  },

  componentWillUnmount: function () {
    Store.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState({text: event.target.value});
    this.setState({
      categories: Store.getCategories()
    });
  },

  _onKeyDown: function (event, value) {
    if (event.keyCode == ENTER_KEY_CODE){
      event.preventDefault();
      var text = this.state.text.trim();
      if (text){
        ActionCreator.sendText(text);
      }
      this.setState({text: '', categories: Store.getCategories()});
    }
  },

  /* jshint ignore:start */
  render: function () {
    var categories;

    if (this.state.categories) {
      categories = this.state.categories.map(function (category) {
        return <li key={ category.id }>{ category.name }</li>;
      });
    }

    return (
      <div>
        <input
        ref="newText"
        type="text"
        value={this.state.text}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
        autoFocus={true}
        />
        { categories }
      </div>
    );

  }
  /* jshint ignore:end */

});

module.exports = Category;

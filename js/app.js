//https://github.com/stfnhrrs/capecodne.ws/tree/master/app/assets/javascripts


// next step: click on list item, display bike.
// http://coenraets.org/blog/2011/12/backbone-js-wine-cellar-tutorial-part-1-getting-started/



'use strict';

// namespace
var app = app || {};

//--------------
// Models
//--------------

app.SingleBike = Backbone.Model.extend({

    defaults: {
        coverImage: '/images/placeholder.gif',
        type: 'type',
        brand: 'brand',
        model: 'model'
    }

});

//--------------
// Collections
//--------------

app.BikeCollection = Backbone.Collection.extend({
    model: app.SingleBike,

    // url gets the data
    url: 'js/data/data.json',

    initialize: function() {
        console.log('collection initialized');
    }
});

// create the global collection of bikes, passing in the JSON data.
//var Bikes = new app.BikeCollection(bikes);

// //--------------
// // Views
// //--------------

// show a list of bikes
app.BikeListView = Backbone.View.extend({
    //el: $('#main'),
    tagname: 'ul',

    initialize: function() {
        this.model.bind('reset', this.render, this);
    },

    render: function() {
        _.each(this.model.models, function (item) {
            $(this.el).append(new app.BikeListItemView({model:item}).render().el);
        }, this);
        return this;
    }

});

app.BikeListItemView = Backbone.View.extend({
    tagName: 'ul',
    className: 'bike',

    template: _.template($('#bike-list').html()),

    render: function() {
        $(this.el).html(this.template(this.model.attributes));
        return this;
    }

});

app.BikeView = Backbone.View.extend({

    template: _.template($('#bike-template').html()),

    render: function() {
        $(this.el).html(this.template(this.model.attributes));
        return this;
    }
});



//--------------
//Routers
//--------------

app.BikeAppRouter = Backbone.Router.extend({

    routes: {
        '' : 'index',
        'bikes/:id': 'show'
    },

    index: function() {
      // on home route, render
      this.bikeList = new app.BikeCollection(bikes);
      this.bikeListView = new app.BikeListView({model: this.bikeList});
      //this.bikeList.fetch();
      $('#sidebar').html(this.bikeListView.render().el);
      console.log(bikes + 'home route');
    },

    show: function(id) {
        console.log("with id " + id);
        var bikeTypeView = new app.BikeView({id: id});
        $('#main').html(bikeTypeView.render().el);
    }

});

var bikeAppRouter = new app.BikeAppRouter();

//Initialize the app.
(function(){
  Backbone.history.start();
})();
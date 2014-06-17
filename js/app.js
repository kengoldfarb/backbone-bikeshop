//https://github.com/stfnhrrs/capecodne.ws/tree/master/app/assets/javascripts
'use strict';

// namespace
var app = {};

//--------------
// Models
//--------------

app.SingleBike = Backbone.Model.extend({
    initialize: function() {
        console.log('The model has been initialized.');
    },
    defaults: function() {
        return {
            model: 'Sledgehammer',
            photo: '/images/placeholder.gif'
        }; 
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
    },

    //filter out mountain bikes
    mountain: function() {
        return this.where({model: mountain});
    }
});

// create the global collection of bikes, passing in the JSON data.
//var Bikes = new app.BikeCollection(bikes);

// //--------------
// // Views
// //--------------

// single bike view, articles show view
app.BikeView = Backbone.View.extend({
    el: $('#main'),
    tagname: 'li',

    template: _.template($('#bike-template').html()),

    events: {
        'click #mtb' : 'showMountain'
    },

    initialize: function() {
        this.bike = new app.BikeView({id: this.id});
        this.bike.fetch();
        this.bike.on('sync', this.render, this);
        console.log('single bike view init');
    },

    render: function() {
        this.$el.html(this.template({bike: this.bike}));
        console.log(bike)
        return this;
    },

    showMountain: function() {
        console.log('view mountain bikes');

    }

});

// all bikes view, articles index view
app.AppView = Backbone.View.extend({

    template: _.template($('#intro-template').html()),

    events: {
        'click a': 'showBike'
    },

    initialize: function() {
        // passing bikes in calls the model
        this.collection = new app.BikeCollection(bikes);
        this.collection.fetch();
        this.collection.on('sync', this.render, this);
    },

    render: function() {
        this.$el.html(this.template({bikes: this.collection.toJSON()}));
        console.log(bikes)
        return this;
    },

    showBike: function(e) {
        Backbone.history.navigate($(e.currentTarget).attr('href'), {trigger: true});
        console.log('showbike')
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
      var view = new app.AppView(bikes);
      $('.container').html(view.render().el);
      console.log(bikes);
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
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
        console.log(this.model)
    },

    // filter out mountain bikes
    mountain: function() {
        return this.where({model: mountain});
    }
});

// create the global collection of bikes
var Bikes = new app.BikeCollection();
console.log(Bikes)

// //--------------
// // Views
// //--------------

// single bike view, articles show view
// app.BikeView = Backbone.View.extend({
//     el: $('#main'),
//     tagname: 'li',

//     template: _.template($('#bike-template').html()),

//     events: {
//         'click #mtb' : 'showMountain'
//     },

//     initialize: function() {
//         console.log('single bike view init');
//         this.listenTo(this.model, 'change', this.render);
//     },

//     render: function() {
//         this.$el.html(this.template({Bikes: this.model.toJSON()}));
//         return this;
//     },

//     showMountain: function() {
//         console.log('view mountain bikes');

//     }

// });

// // all bikes view, articles index view
// app.AppView = Backbone.View.extend({

//     template: _.template($('#intro').html()),

//     events: {
//         'click a': 'showBike'
//     },

//     initialize: function() {
//         this.collection = new app.BikeCollection();
//         this.collection.fetch();
//         this.collection.on('all', this.render, this);
//         //Bikes.fetch();
//         console.log(this.collection)
//     },

//     render: function() {
//         this.$el.html(this.template({Bikes: this.collection}));
//         console.log(Bikes);
//         return this;
//     },

//     showBike: function(e) {
//         Backbone.history.navigate($(e.currentTarget).attr('href'), {trigger: true})
//     }

// });

//var App = new app.AppView;

//--------------
// Routers
//--------------

// app.BikeAppRouter = Backbone.Router.extend({

//     routes: {
//         '' : 'index',
//         'bike/:id': 'show'
//     },

//     index: function() {
//       // on home route, render
//       console.log('home');
//     },

//     show: function(id) {
//         console.log("with id" + id);
//         this.appView = new app.AppView({collection: Bikes, id: id});
//         $('#main').html(this.appView.render().el);
//     }

// });

// var bikeAppRouter = new app.BikeAppRouter();

// //Initialize the app.
// (function(){
//   Backbone.history.start();
// })();
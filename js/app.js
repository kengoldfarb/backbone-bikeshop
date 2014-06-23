//http://blog.42floors.com/structure-render-views-backbone/
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

// MAIN APP VIEW W/HEADER SUBVIEW
app.MainView = Backbone.View.extend({
    template: _.template($('#header-template').html()),

    initialize: function() {
        this.render();
        new app.HeaderView({el: 'header'});
    },

    render: function() {
        this.$el.html(this.template);
    }
});

// HEADER SUB VIEW
app.HeaderView = Backbone.View.extend({
    events: {
        'click a': 'navigate'
    },

    template: _.template($('#header-template').html()),
    
    initialize: function() {
        this.render();
    },

    render: function() {
        this.$el.html(this.template);
    },

    navigate: function(e) {
        e.preventDefault();
        console.log($(e.currentTarget).attr('href'))
        Backbone.history.navigate($(e.currentTarget).attr('href'), {trigger: true});
    }
});

// BIKE CATEGORY VIEW
app.BikeTypeIndexView = Backbone.View.extend({
    template: _.template($('#main-template').html()),

    initialize: function() {
        this.render();
        this.collection = new app.BikeCollection(bikes);

        new app.BikeTypeListView({
            el: this.$('ul'),
            collection: this.collection
        });
    },

    render: function() {
        this.$el.html(this.template);
    }
});

// THE LIST OF ALL THE MOUNTAIN BIKES, FOR EXAMPLE
app.BikeTypeListView = Backbone.View.extend({
    initialize: function() {
        this.render();
    },

    render: function() {
        this.$el.html('');
        this.collection.each(this.renderBike, this);
    },

    renderBike: function(bike) {
        this.$el.append(new app.BikeTypeIndexBikeView({
            tagname: 'li',
            model: app.SingleBike
        }).el);
    }
});

// A SINGLE MOUNTAIN BIKE, FOR EXAMPLE
app.BikeTypeIndexBikeView = Backbone.View.extend({
    template: _.template($('#single-bike-template').html()),

    initialize: function() {
        this.render();
    },

    render: function() {
        this.$el.html(this.template);
    }
});



//--------------
//Router
//--------------

app.BikeAppRouter = Backbone.Router.extend({

    routes: {
        '' : 'index',
        'bikes': 'bikeIndex'
    },

    index: function() {
      // on home route, render
      this.setup();
    },

    setup: function() {
        console.log('setup route');
        if(!this.mainView) {
            this.mainView = new app.MainView({ el: 'header' });
            console.log('in if');
        }
    },

    bikeIndex: function() {
        this.setup();
        new app.BikeTypeIndexView({ el: $('.main')});
    }

});

var bikeAppRouter = new app.BikeAppRouter();

//Initialize the app.
(function(){
  Backbone.history.start();
})();





// single bike view, articles show view
// app.BikeView = Backbone.View.extend({
//     el: $('#main'),
//     tagname: 'li',

//     template: _.template($('#bike-template').html()),

//     events: {
//         'click #mtb' : 'showMountain'
//     },

//     initialize: function() {
//         this.bike = new app.BikeView({id: this.id});
//         this.bike.fetch();
//         this.bike.on('sync', this.render, this);
//         console.log('single bike view init');
//     },

//     render: function() {
//         this.$el.html(this.template({bike: this.bike}));
//         console.log(bike)
//         return this;
//     },

//     showMountain: function() {
//         console.log('view mountain bikes');

//     }

// });

// all bikes view, articles index view
// app.AppView = Backbone.View.extend({

//     template: _.template($('#intro-template').html()),

//     events: {
//         'click a': 'showBike'
//     },

//     initialize: function() {
//         // passing bikes in calls the model
//         this.collection = new app.BikeCollection(bikes);
//         this.collection.fetch();
//         this.collection.on('sync', this.render, this);
//     },

//     render: function() {
//         this.$el.html(this.template({bikes: this.collection.toJSON()}));
//         console.log(bikes)
//         return this;
//     },

//     showBike: function(e) {
//         Backbone.history.navigate($(e.currentTarget).attr('href'), {trigger: true});
//         console.log('showbike')
//     }

// });


//--------------
//Routers
//--------------

// app.BikeAppRouter = Backbone.Router.extend({

//     routes: {
//         '' : 'index',
//         'bikes/:id': 'show'
//     },

//     index: function() {
//       // on home route, render
//       var view = new app.AppView(bikes);
//       $('.container').html(view.render().el);
//       console.log(bikes);
//     },

//     show: function(id) {
//         console.log("with id " + id);
//         var bikeTypeView = new app.BikeView({id: id});
//         $('#main').html(bikeTypeView.render().el);
//     }

// });

// var bikeAppRouter = new app.BikeAppRouter();

// //Initialize the app.
// (function(){
//   Backbone.history.start();
// })();
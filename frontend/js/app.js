App = Ember.Application.create();
App.ApplicationAdapter = DS.FixtureAdapter.extend();
id_count = 3;
App.Router.map(function() {
  this.resource('about');
  this.resource('home');
  this.resource('playlist', { path: 'playlist/:playlist_id'},
    function() {
      this.resource('video', {path: 'video/:video_id'})
    }
  );
});

App.ApplicationRoute = Ember.Route.extend({
  searchResults: [1,2,3],

  model: function() {
    return this.store.find('playlist');
  },

  actions: {
    addPlaylist: function(playlist_name) {
      this.get('store').push('playlist', {id: id_count, title: playlist_name})
      id_count += 1;
    },
    addVideo: function() {
      alert("hi")
    },
    youtubeSearch: function(search_query) {
      searchResults = [{etag: "FOuwADrXJjsTKgUIQJoQC6nKNFY/7BoRtJF13QuMNFxwC3Ec8xUPaCc", description: "TAEYANG - 눈,코,입 (EYES, NOSE, LIPS) M/V] #TAEYANG #RISE #EYESNOSELIPS * 눈, 코, 입(EYES, NOSE, LIPS) COVER PROJECT BY YOU Submission ...", url: "https://i.ytimg.com/vi/UwuAPyOImoI/default.jpg", title: "TAEYANG - 눈,코,입 (EYES, NOSE, LIPS) M/V", videoId: "UwuAPyOImoI"},
                       {etag: "FOuwADrXJjsTKgUIQJoQC6nKNFY/7BoRtJF13QuMNFxwC3Ec8xUPaCc", description: "TAEYANG - 눈,코,입 (EYES, NOSE, LIPS) M/V] #TAEYANG #RISE #EYESNOSELIPS * 눈, 코, 입(EYES, NOSE, LIPS) COVER PROJECT BY YOU Submission ...", url: "https://i.ytimg.com/vi/UwuAPyOImoI/default.jpg", title: "TAEYANG - 눈,코,입 (EYES, NOSE, LIPS) M/V", videoId: "UwuAPyOImoI"}];
      //$('#myResults').append("<ul>")
      for (i = 0; i < searchResults.length; i++) {
        //$('#myResults').append("<li>");
        title = searchResults[i].title;
        image = searchResults[i].url;
        this.get('store').createRecord('video', {title: title})
        //$('#myResults').append("<img src=" + image + ">" + title);
        //$('#myResults').append('<button {{action "addVideo"}}>+</button>')
        //$('#myResults').append("</li>");
      }
      //$('#myResults').append("</ul>");
    //   api_key = "AIzaSyAhe1BqglbuLH3s2ZUBacjEoxTQ7ZKD0-k"
    //   result = $.get("https://www.googleapis.com/youtube/v3/search", 
    //                   { key: api_key,
    //                     part: "snippet",
    //                     q: search_query
    //                   },
    //                   function(data) {
    //                     searchResults = data.items;
    //                     for (i = 0; i < searchResults.length; i++) {
    //                       $('#myResults').append(searchResults[i].snippet.title);
    //                     }
    //                   }
    //                 ); 

    // }
    }
  }
});

App.Playlist = DS.Model.extend({
  title: DS.attr('string'),
  watcher_count: DS.attr('number'),
  videos: DS.hasMany('video', {async: true}),
});

App.Video = DS.Model.extend({
  title: DS.attr('string'),
  playlist: DS.belongsTo('playlist'),
  url: DS.attr('string')
});

App.Playlist.FIXTURES = [
  {
    id: 1,
    title: "kpop",
    watcher_count: 18,
    videos: [1, 2]
  },
  {
    id: 2,
    title: "The Parley Letter",
    watcher_count: 20,
    videos: [3]
  }
];

App.Video.FIXTURES = [
  {
    id: 1,
    title: "nightblue3 game",
    url: "//www.youtube.com/embed/3-hz4HRcbzM"
  },
  {
    id: 2,
    title: "poker phil helmuth",
    url: "//www.youtube.com/embed/TJvtPnKLQ34"
  },
  {
    id: 3,
    title: "gangnam style",
    url: "//www.youtube.com/embed/rqtr_RvR3sY"
  }
];

App.SearchView = Ember.View.extend({
  templateName: 'search',
  name: "Bob"
});


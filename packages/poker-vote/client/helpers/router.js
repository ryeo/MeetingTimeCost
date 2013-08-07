var loadQRCodeScript = function (callback) {
  var js, s;
      
  // load required script
  js = document.createElement('script');
  js.type = 'text/javascript';
  js.async = true;
  js.src = 'https://raw.github.com/davidshimjs/qrcodejs/master/qrcode.min.js';
  
  // @TODO finish that part to be compatible with IE, FF, Chrome, Opera and mobile
  if (callback) {
    js.onload = callback;
  }
  
  s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(js, s);
};

Meteor.Router.add({
  /**
   * Poker tools
   */
  '/poker': {
    to: 'pokerCreate',
    and: function funcGotToCreateRoom() {
      loadQRCodeScript();
      
      // clear session
      Session.set('currentRoom', false);
    }
  },
 
  /**
   * gestion de la salle (freeze/reset, qrcode)
   */ 
  '/poker/:id': {
    as: 'pokerRoomCreated',
    to: 'pokerCreate',
    and: function funcVote(id) {
      loadQRCodeScript();

      Session.set('currentRoom', id); 
    }
  },
  
  /**
   * resultat du vote
   */
  '/poker/:id/result': {
    to: 'pokerResult',
    and: function funcResult(id) {
      Session.set('currentRoom', id);
    }
  },

  /**
   * salle de vote
   */
  '/poker/:id/vote': {
    as: 'pokerVote',
    to: 'pokerVote',
    and: function funcVote(id) {
      Session.set('currentRoom', id); 
    }
  }
});

Meteor.Router.filters({
	'requireLogin': function(page) {
		if (Meteor.user())
			return page;
		else if (Meteor.loggingIn())
			return 'loading';
		else
			return 'accessDenied';
	},
});

Meteor.Router.filter('requireLogin', {only: ['pokerCreate', 'pokerResult']});

Package.describe({
  summary: "Poker vote system for apile project management",
  // internal for now. Should be external when it has a richer API to do
  // actual API things with the service, not just handle the OAuth flow.
  internal: true });

Package.on_use(function(api) {
  api.use('templating', 'client');
  
  api.add_files('server', 'server');
  api.add_files('client', 'client');
  api.add_files('collections', ['client', 'server']);
});

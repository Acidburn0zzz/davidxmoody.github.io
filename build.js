var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var permalinks = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
var each = require('metalsmith-each');
var dateInFilename = require('metalsmith-date-in-filename');

Metalsmith(__dirname)
  .clean(true)
  .metadata({
    title: "David Moody's Blog",
    description: "A blog about programming"
  })

  .use(dateInFilename())

  .use(collections({
    posts: {
      pattern: 'posts/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(function(files, metalsmith) {
    // Set default templates
    metalsmith.metadata().posts.forEach(function(post) {
      post.template = 'post.html';
    });
  })

  .use(markdown())
  .use(permalinks({
    pattern: ':title'
  }))

  // Use templates once then once again to wrap *every file* in default.html
  .use(templates('mustache'))
  .use(each(function(file) {
    file.template = 'default.html';
  }))
  .use(templates('mustache'))

  .build(function(err) {
    if (err) throw err;
    console.log("Finished");
  });
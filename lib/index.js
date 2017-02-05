const less = require('less');

// convert all .less files to .css
function plugin(options) {
  return function(files, metalsmith, done) {
    return Promise.all(
      Object.keys(files)
        .filter(file => file.endsWith('.less'))
        .map(file => 
          less.render(files[file].contents.toString(), options.lessOptions)
            .then(cb => {
              files[file.replace('\.less', '.css')] = {contents: new Buffer(cb.css)};
            })
            .then(() => {
              if (!options.copySource)
                delete files[file];
            })
      ))
      .catch(err => done(err))
      .then(() => done(null)); // have to pass null or metalsmith gets mad
  }
}

module.exports = plugin;
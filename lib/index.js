const less = require('less');
const autoprefix = require('less-plugin-autoprefix');


var options = {
    copySource: false,
    lessOptions: {
        plugins: [new autoprefix({browsers: ["last 2 versions"]})]
    }
}

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
            .then(() => done(null));
    }
}

module.exports = plugin;
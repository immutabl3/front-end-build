# front-end-build

A gulp build system for js, css and copying/deleting of assets.

`npm install @immutabl3/front-end-build`

# gulpfile.js

- use `watch` anywhere in the gulp task name for development and livereload
- use the `--production` flag or set `NODE_ENV=production` to generate a production build
- use the `--silent` flag to disable error beeps

```js
const gulp = require('gulp');
const {
	move,
	del,
	scripts,
	styles
} = require('@immutabl3/front-end-build');

gulp.task('scripts', scripts({
    source: './app/index.js',
    dest: './public/scripts',
    file: 'site.js'
}));

gulp.task('styles', styles({
    source: './styles/index.scss',
    dest: './public/styles',
    map: './maps',
    file: 'site.css',
    watch: './styles/**/*.scss'
}));

gulp.task('assets', copy({
	task: 'assets',
    from: './assets/**/*',
    to: './public/assets/'
}));

gulp.task('modernizr:move', copy({
    task: 'modernizr',
    from: './modernizr.js',
    to: './public/scripts/'
}));

gulp.task('modernizr:del', del(
	'./modernizr.js'
));

gulp.task('modernizr',
    gulp.series(
        'modernizr:move',
        'modernizr:del'
    )
);

gulp.task('watch',
    gulp.parallel(
        'scripts',
        'styles'
    )
);

gulp.task('default',
    gulp.parallel(
        'scripts',
        'styles',
        'assets'
    )
);
```

# License

MIT

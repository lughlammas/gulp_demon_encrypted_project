import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
import cleanCSS from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';
import obfuscator from 'gulp-javascript-obfuscator';


const sass = gulpSass(dartSass);

// Compilar SASS
const compilaSass = () => {
    return gulp.src('./source/styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
};


const comprimeImagens = () => {
    return gulp.src('./source/images/**/*.{png,jpg,jpeg,gif,svg}')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
};

const comprimeJavaScript = () => {
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscator({
            compact: true,
            controlFlowFlattening: true,
            deadCodeInjection: true,
            stringArray: true,
            rotateStringArray: true,
            stringArrayEncoding: ['base64'], // 👹
            stringArrayThreshold: 1
        }))
        .pipe(gulp.dest('./build/scripts'));
};

export const sassTask = compilaSass;
export const images = comprimeImagens;
export const javascript = comprimeJavaScript;
export default gulp.parallel(compilaSass, comprimeImagens, comprimeJavaScript);

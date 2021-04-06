import {src, dest, parallel} from 'gulp';
import csso from 'gulp-csso';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import autoprefixer from 'gulp-autoprefixer';

/**
 *  Основные директории
 */
const dirs = {
  src: 'src',
  dest: 'build'
};

/**
 * Пути к файлам
 */
const path = {
  styles: {
    src: `${dirs.src}/sass/`,
    save: `${dirs.dest}/css/`
  },
  views: {
    src: `${dirs.src}/html/`,
    save: `${dirs.dest}`
  }
};

/**
 * Основные задачи
 */
export const styles = () => src(`${path.styles.src}style.scss`)
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(csso())
  .pipe(rename({
    suffix: `.min`
  }))
  .pipe(dest(path.styles.save));

export const views = () => src(`${path.views.src}*.html`)
  .pipe(dest(path.views.save));

/**
 * Для билда
 */
export const build = parallel(styles, views);

export default build;

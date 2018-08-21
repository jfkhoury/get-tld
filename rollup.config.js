import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-minify-es';

export default {
  input: 'src/getTld.js',
  output: {
    file: 'dist/getTld.js',
    format: 'cjs',
    name: "getTld"
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [['env', { modules: false }]]
    }
  ),
    minify()
  ]
};

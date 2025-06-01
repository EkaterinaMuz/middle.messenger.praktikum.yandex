import postcssPresetEnv from 'postcss-preset-env';
import cssnano from 'cssnano';
import  nested from 'postcss-nested';

const config = {
  plugins: [
    postcssPresetEnv({ stage: 1 }),
    cssnano({ preset: 'default' }),
    nested()
  ],
};

export default config;

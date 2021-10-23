import createIconSet from './lib/create-icon-set';
import glyphMap from './glyphmaps/RemixIcon.json';

const iconSet = createIconSet(glyphMap, 'Remix Icon', 'RemixIcon.ttf');

export default iconSet;
export const {
  Button,
  getImageSource,
  getImageSourceSync,
} = iconSet;


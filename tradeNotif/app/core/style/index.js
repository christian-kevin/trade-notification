import Color from './_color';
import Typography from './_typography';
import { REM_UNIT } from '../constant';

const extendedStyleSheetConfig = {
  rem: REM_UNIT,
};

export default Object.assign({}, extendedStyleSheetConfig, Typography, Color);

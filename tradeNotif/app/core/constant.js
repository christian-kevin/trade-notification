import { Dimensions } from 'react-native';
/**
 * Disclaimer:
 * PLEASE DON'T IMPORT ANY FILES, BECAUSE THIS FILE NEED TO LOAD FIRST
 */

const { height, width } = Dimensions.get('window');

// region SCREEN CONSTANT
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
export const SCREEN_WIDTH_NORMAL_LIMIT = 340;
// endregion

// region TYPOGRAPHY CONSTANT
export const NORMAL_FONT_SIZE = 14;
export const BIG_FONT_SIZE = 16;
export const REM_UNIT = SCREEN_WIDTH > SCREEN_WIDTH_NORMAL_LIMIT ? BIG_FONT_SIZE : NORMAL_FONT_SIZE;
// endregion

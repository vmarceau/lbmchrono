// Ideally, this data would be available from a server endpoint somewhere.
// For simplicity, it is currently hard-coded in an asset file.
export const RUNNERS = require('../assets/runners.json');

export const MAX_BIBS = 56;

// Results export
export const EMAIL_SUBJECT = 'Résultats LBM';
export const EMAIL_BODY = 'Résultats complets en pièce jointe.';
export const EMAIL_RECIPIENTS = process.env.EXPO_PUBLIC_EMAIL_RECIPIENTS;

// Colors
export const COLOR_BIB_BTN_BG = '#002e56';
export const COLOR_BIB_BTN_TEXT = '#0088ff';
export const COLOR_START_BTN_BG = '#0a2a12';
export const COLOR_START_BTN_TEXT = '#37d05c';
export const COLOR_STOP_BTN_BG = '#340e0d';
export const COLOR_STOP_BTN_TEXT = '#ea4c49';
export const COLOR_SECONDARY_BTN_BG = '#1c1c1e';
export const COLOR_SECONDARY_BTN_TEXT = '#9d9ca2';

import {PaletteColor, PaletteColorOptions, ThemeOptions} from '@mui/material/styles';
import React from 'react';

declare module '@mui/material/styles' {
  interface Palette {
    border?: PaletteColor;
  }

  interface PaletteOptions {
    border?: PaletteColorOptions;
  }
}

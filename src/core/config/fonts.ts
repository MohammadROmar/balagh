import localFont from 'next/font/local';

const openSans = localFont({
  preload: true,
  variable: '--open-sans-font',
  src: '../../assets/fonts/NotoKufiArabic-VariableFont_wght.ttf',
});

const notoKufiArabic = localFont({
  preload: true,
  variable: '--kufi-font',
  src: '../../assets/fonts/NotoKufiArabic-VariableFont_wght.ttf',
});

export const fontVariables = `${openSans.variable} ${notoKufiArabic.variable}`;

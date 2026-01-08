import { Open_Sans, Noto_Kufi_Arabic } from 'next/font/google';

const notoKufiArabic = Noto_Kufi_Arabic({
  variable: '--kufi-font',
  subsets: ['arabic'],
  preload: true,
});

const openSans = Open_Sans({
  variable: '--open-sans-font',
  subsets: ['latin'],
  preload: true,
});

export const fontVariables = `${openSans.variable} ${notoKufiArabic.variable}`;

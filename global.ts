import messages from './messages/ar.json';

declare module 'next-intl' {
  interface AppConfig {
    Messages: typeof messages;
  }
}

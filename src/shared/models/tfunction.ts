import { useTranslations } from 'use-intl';
import type { Messages, NamespaceKeys, NestedKeyOf } from 'next-intl';

export type TFunction<
  NestedKey extends NamespaceKeys<Messages, NestedKeyOf<Messages>> = never,
> = ReturnType<
  typeof useTranslations<
    NestedKey extends never ? NestedKeyOf<Messages> : NestedKey
  >
>;

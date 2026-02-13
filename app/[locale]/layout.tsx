import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import HeaderComp from "@/components/Header";
import FooterComp from "@/components/Footer";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{locale: string}>;
  }
) {
  const params = await props.params;

  const {
    children
  } = props;

  const {locale} = params;
  if (!hasLocale(routing.locales, locale)) {
    throw new Error(`Unsupported locale: ${locale}`);
  }

  setRequestLocale(locale);

  return (
    <NextIntlClientProvider>
      <HeaderComp />
      <main className="absolute pt-20 pb-20 left-0 right-0 overflow-y-auto">
        {children}
      </main>
      <FooterComp />
    </NextIntlClientProvider>
  );
}

import {Link} from '@/i18n/navigation';
import {use} from 'react';
import {setRequestLocale} from 'next-intl/server';

export default function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <div className="p-3 prose prose-neutral max-w-none dark:prose-invert">
      <div className="relative mb-4 flex items-center justify-center">
        <Link
          href="/"
          className="absolute left-0 text-sm text-blue-600 underline hover:text-blue-800"
        >
          ← Back to Home
        </Link>
        <h2 className="m-0 text-customBlue underline">Contact Us</h2>
      </div>
      <p>
        You can contact us by visiting <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" href="https://angli-lab.com" target="_blank" rel="noopener">https://angli-lab.com</a>.
      </p>
    </div>
  );
}

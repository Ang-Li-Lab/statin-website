import {Link} from '@/i18n/navigation';
import {use} from 'react';
import {setRequestLocale} from 'next-intl/server';

export default function TermsPage({
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
        <h2 className="m-0 text-customBlue underline">Terms &amp; Conditions</h2>
      </div>
        <p className="text-sm text-muted-foreground">
          Developed at Ang Li Lab <br />
          Effective Date: August 26, 2025 <br />
          Version: 1.0
        </p>

        <h2>1) Overview</h2>
        <p>
          This website provides an interactive, client-side tool for
          educational and informational purposes related to cancer-associated
          venous thromboembolism (VTE). By using the site, you agree to these
          terms.
        </p>

        <h2>2) Use of the Site</h2>
        <ul>
          <li>No login or account is required.</li>
          <li>
            Do not use the site for medical diagnosis, treatment, or clinical
            decision-making. Consult qualified professionals for patient care.
          </li>
          <li>Do not misuse or attempt to disrupt the site or its services.</li>
        </ul>

        <h2>3) Privacy</h2>
        <ul>
          <li>No PHI is collected, stored, or processed.</li>
          <li>
            We do not employ user tracking/analytics beyond basic server logs
            needed for security and performance (e.g., IP, timestamp).
          </li>
        </ul>

        <h2>4) Intellectual Property</h2>
        <p>
          All site content (text, diagrams, UI) is owned by the authors and
          collaborators unless noted. Do not reproduce or distribute without
          permission.
        </p>

        <h2>5) No Warranties</h2>
        <p>
          The site is provided “as is” without warranties of any kind, including
          accuracy, completeness, or fitness for a particular purpose.
        </p>

        <h2>6) Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, the authors, developers, and
          hosting institution are not liable for any damages arising from use of
          the site or reliance on its content.
        </p>

        <h2>7) Changes</h2>
        <p>
          Terms may be updated periodically. Continued use after changes
          indicates acceptance. The effective date above reflects the latest
          version.
        </p>

        <h2>8) Contact</h2>
        <p>
          Questions? Visit our{" "}
          <Link href="/contact">Contact</Link> page.
        </p>

    </div>
  );
}

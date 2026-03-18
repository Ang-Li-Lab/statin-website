import {Link} from '@/i18n/navigation';

export default function FooterComp() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-14 bg-customBlue text-white p-4 z-50">
      <div className="container mx-auto text-center">
        <div className="grid grid-cols-1 gap-3 text-center md:grid-cols-3 md:text-center">
          <div>
            <nav className="space-x-2">
              <Link href="/about" className="underline-offset-4 underline">
                About
              </Link>
              <span aria-hidden="true">|</span>
              <Link href="/contact" className="underline-offset-4 underline">
                Contact
              </Link>
            </nav>
          </div>

          <div className="order-last md:order-none">
            <p>
              © 2026 Copyright:{" "}
              <a
                href="https://angli-lab.com/"
                target="_blank"
                rel="noopener"
                className="underline-offset-4 underline"
              >
                Ang Li Lab
              </a>
            </p>
          </div>

          <div>
            <nav>
              <Link href="/terms" className="underline-offset-4 underline">
                Terms &amp; Conditions
              </Link>
            </nav>
          </div>
        </div>

      </div>
    </footer>
  );
}

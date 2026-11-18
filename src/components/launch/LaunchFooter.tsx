import BrandLogo from "@/components/layout/BrandLogo";
import Container from "@/components/ui/Container";
import { CONTACT, SITE_NAME } from "@/lib/site";

export default function LaunchFooter() {
  return (
    <footer className="site-footer py-10">
      <Container className="flex flex-col items-center gap-4 text-center text-sm sm:flex-row sm:justify-between sm:text-left">
        <BrandLogo inverted href="/" />
        <span>{CONTACT.address}</span>
        <span>
          &copy; {new Date().getFullYear()} {SITE_NAME}
        </span>
      </Container>
    </footer>
  );
}

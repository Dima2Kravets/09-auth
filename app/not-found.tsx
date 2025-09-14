import css from "@/app/page.module.css"
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'Unfortunately, this page does not exist. Please check the URL or return to the homepage.',
  alternates: {
    canonical: "/not-found", 
  },
  openGraph: {
    type: "website",
    title: "Page Not Found – Note Hub",
    description: "The page you are looking for does not exist. Check the URL or go back to the Note Hub homepage.",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Note Hub - Page Not Found",
      }
    ],
    url: `https://notehub.com/not-found`,
  }
};


const NotFound = () => {
  return (
    <div>
     <h1 className={css.title}>404 - Page not found</h1>
        <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;    
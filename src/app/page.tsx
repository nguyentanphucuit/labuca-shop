import Hero from '@/app/components/Hero';
import styles from './page.module.css';
import './globals.css';

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <Hero />
      </main>
    </>
  );
}

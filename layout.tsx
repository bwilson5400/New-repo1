import './styles.css';
import { ReactNode } from 'react';
export const metadata = { title: 'RP Studios — Manager' };
export default function RootLayout({ children }: { children: ReactNode }) {
  return (<html lang="en"><body>{children}</body></html>);
}

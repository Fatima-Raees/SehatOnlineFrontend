
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

import { ReactNode } from 'react';

export function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  
  useEffect(() => {
    const isLoggedIn = Cookies.get("loggedIn") === "true";
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [router]);
  
  
  
  return children;
}

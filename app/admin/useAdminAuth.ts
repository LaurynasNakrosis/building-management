'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes
const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes of inactivity

export type AuthState =
  | { status: 'loading' }
  | { status: 'authenticated'; user: string }
  | { status: 'unauthenticated' };

export function useAdminAuth() {
  const [auth, setAuth] = useState<AuthState>({ status: 'loading' });
  const router = useRouter();
  const logoutTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clearAuth = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('loginTime');
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
    }
    setAuth({ status: 'unauthenticated' });
    router.push('/sign-in');
  };

  const resetInactivityTimer = () => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
    }
    logoutTimerRef.current = setTimeout(() => {
      clearAuth();
    }, INACTIVITY_TIMEOUT);
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('adminUser');
    const loginTimeStr = localStorage.getItem('loginTime');

    if (!isAuthenticated || isAuthenticated !== 'true' || !storedUser) {
      clearAuth();
      return;
    }

    if (loginTimeStr) {
      const loginTime = parseInt(loginTimeStr, 10);
      if (isNaN(loginTime)) {
        clearAuth();
        return;
      }
      const timeSinceLogin = Date.now() - loginTime;
      if (timeSinceLogin >= SESSION_DURATION) {
        clearAuth();
        return;
      }
    } else {
      clearAuth();
      return;
    }

    setAuth({ status: 'authenticated', user: storedUser });
    resetInactivityTimer();

    const events = ['click', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    events.forEach((event) => {
      window.addEventListener(event, resetInactivityTimer);
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetInactivityTimer);
      });
      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
      }
    };
  }, [router]);

  return { auth, clearAuth };
}

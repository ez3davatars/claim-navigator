import { useEffect, useState } from 'react';

function scrollToHash(hash: string) {
  requestAnimationFrame(() => {
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
}

export function useRoute(): [string, (path: string) => void] {
  const [path, setPath] = useState<string>(window.location.pathname || '/');

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname || '/');
    window.addEventListener('popstate', onPop);
    window.addEventListener('cn:navigate', onPop as EventListener);
    return () => {
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('cn:navigate', onPop as EventListener);
    };
  }, []);

  const nav = (to: string) => {
    window.history.pushState({}, '', to);
    window.dispatchEvent(new Event('cn:navigate'));
    const hash = to.split('#')[1];
    if (hash) scrollToHash(hash);
    else window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  return [path, nav];
}

export function navigate(to: string) {
  if (to.startsWith('#')) {
    const id = to.slice(1);
    const el = document.getElementById(id);
    if (el) { el.scrollIntoView({ behavior: 'smooth' }); return; }
  }
  window.history.pushState({}, '', to);
  window.dispatchEvent(new Event('cn:navigate'));
  const hash = to.split('#')[1];
  if (hash) scrollToHash(hash);
  else window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
}

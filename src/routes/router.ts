const ROUTE_PUSH_EVENT_NAME = 'route-push';
const ROUTE_REPLACE_EVENT_NAME = 'route-replace';

declare global {
  interface WindowEventMap {
    'route-push': CustomEvent<{ nextUrl: string }>;
    'route-replace': CustomEvent<{ nextUrl: string }>;
  }
}

export const pushRouter = (onRoute: () => void) => {
  window.addEventListener(ROUTE_PUSH_EVENT_NAME, (e) => {
    const { nextUrl } = e.detail;
    if (nextUrl) {
      history.pushState(null, '', nextUrl);
      onRoute();
    }
  });
};

export const replaceRouter = (onRoute: () => void) => {
  window.addEventListener(ROUTE_REPLACE_EVENT_NAME, (e) => {
    const { nextUrl } = e.detail;
    if (nextUrl) {
      history.replaceState(null, '', nextUrl);
      onRoute();
    }
  });
};

export const popStateRouter = (onRoute: () => void) => {
  window.addEventListener('popstate', () => {
    onRoute();
  });
};

export const push = (nextUrl: string) => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_PUSH_EVENT_NAME, {
      detail: {
        nextUrl,
      },
    }),
  );
};

export const replace = (nextUrl: string) => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_REPLACE_EVENT_NAME, {
      detail: {
        nextUrl,
      },
    }),
  );
};

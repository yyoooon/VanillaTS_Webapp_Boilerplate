const route = (target: Element) => {
  const { pathname } = window.location;
  switch (pathname) {
    case '/':
      console.log(target);
      break;
    default:
      console.log('not found page');
  }
};

export default route;

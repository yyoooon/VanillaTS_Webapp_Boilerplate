export const createElement = (tagName:string) => {
  return document.createElement(tagName);
};

export const addClass = ($targetDom:HTMLElement, classArr = []) => {
  if (!classArr.length) {
    return;
  }

  classArr.map((className) => {
    $targetDom.classList.add(className);
  });
};

export const addDataset = ($targetDom:HTMLElement, dataObj:{[key:string]:string}) => {
  for (let [key, value] of Object.entries(dataObj)) {
    $targetDom.dataset[key] = value;
  }
};

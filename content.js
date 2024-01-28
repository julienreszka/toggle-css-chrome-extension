function disableStyles(styleElements, linkElements) {
  for (let i = 0; i < styleElements.length; i++) {
    styleElements[i].setAttribute('data-original-disabled', 'true');
    styleElements[i].disabled = true;
  }
  for (let i = 0; i < linkElements.length; i++) {
    linkElements[i].setAttribute('data-original-disabled', linkElements[i].disabled);
    linkElements[i].disabled = true;
  }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  let styleElements = document.getElementsByTagName('style');
  let linkElements = Array.from(document.getElementsByTagName('link')).filter(link => link.rel === 'stylesheet');
  if (styleElements.length > 0 && linkElements.length > 0 && Array.from(styleElements).every(el => el.disabled) && Array.from(linkElements).every(el => el.disabled)) {
    location.reload();
  } else {
    sessionStorage.setItem('scrollPosition', window.scrollY);
    disableStyles(styleElements, linkElements);
  }
});

window.onload = function () {
  if (sessionStorage.getItem('scrollPosition') !== null) {
    setTimeout(function () {
      window.scrollTo(0, Number(sessionStorage.getItem('scrollPosition')));
      sessionStorage.removeItem('scrollPosition');
    }, 100)
  }
};

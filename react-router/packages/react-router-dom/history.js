function getDOMLocation(historyState) {
  const _ref = historyState || {};
  const { key, state } = _ref;
  const { location } = window;
  const { pathname, search, hash } = location;
  const path = `${pathname}${search}${hash}`;
}
function getHistoryState() {
  try {
    return window.history.state || {};
  } catch (e) {
    return {};
  }
}
function createBrowserHistory(props = {}) {
  const globalHistory = window.history;
  const initialLocation = getDOMLocation(getHistoryState());
  return {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref,
    push,
    replace,
    go,
    goBack,
    goForward,
    block,
    listen,
  };
}
export {
  createBrowserHistory,
};

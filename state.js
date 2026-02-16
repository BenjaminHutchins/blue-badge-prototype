// Shared state — persists across pages via sessionStorage
const STATE_KEY = 'blueBadgeFormData';

const defaultState = {
  applyingFor: '',
  firstName:   '',
  lastName:    '',
  dobDay:      '',
  dobMonth:    '',
  dobYear:     '',
  email:       ''
};

function getState() {
  try {
    const raw = sessionStorage.getItem(STATE_KEY);
    return raw ? Object.assign({}, defaultState, JSON.parse(raw)) : Object.assign({}, defaultState);
  } catch(e) {
    return Object.assign({}, defaultState);
  }
}

function saveState(updates) {
  try {
    const current = getState();
    sessionStorage.setItem(STATE_KEY, JSON.stringify(Object.assign(current, updates)));
  } catch(e) {}
}

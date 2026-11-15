// Teks UI login (sumber: reference/login-demo.html).

export const authCopy = {
  navLogin: 'Log in',
  heroLogin: 'Log in to read case studies',
  logout: 'Log out',

  modal: {
    title: [{ text: 'Welcome ' }, { text: 'back.', italic: true }],
    lead: 'Log in to unlock the case studies behind each project.',
    username: 'Username',
    password: 'Password',
    show: 'Show',
    hide: 'Hide',
    submit: 'Log in',
    submitting: 'Logging in',
    close: 'Close',
    demoLabel: 'Demo account:',
    // Akun uji publik DummyJSON (aman ditampilkan).
    demo: { username: 'emilys', password: 'emilyspass' },
    demoButton: 'Use demo account',
    empty: 'Enter your username and password.',
    badCredentials: (msg: string) => `${msg}. Check your username and password, or use the demo account.`,
  },

  reason: (project: string) => `Log in to read the ${project} case study.`,

  welcome: {
    title: (name: string) => `Welcome back, ${name}`,
    sub: 'Case studies are now unlocked.',
  },

  lock: {
    locked: 'Case studies are locked. Log in to read them.',
    unlocked: 'Case studies unlocked.',
    caseStudy: 'Case study',
    readCaseStudy: 'Read case study',
  },

  drawer: {
    close: 'Close case study',
    built: 'What I built',
    apis: 'APIs I integrated',
    stack: 'Stack',
  },

  toast: {
    loggedIn: (name: string) => `Logged in as ${name}`,
    loggedOut: 'Logged out',
    expired: 'Your session ended. Log in again to read the case studies.',
  },
};

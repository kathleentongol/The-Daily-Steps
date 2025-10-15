document.addEventListener('DOMContentLoaded', () => {
  const loginSection = document.getElementById('loginSection');
  const mainSite = document.getElementById('mainSite');
  const loginBtn = document.getElementById('loginBtn');
  const emailInput = document.getElementById('emailInput');
  const passwordInput = document.getElementById('passwordInput');
  const logoutBtn = document.getElementById('logoutBtn');
  const welcomeMsg = document.getElementById('welcomeMsg');
  const startJourney = document.getElementById('startJourney');
  const challengesSection = document.getElementById('challengesSection');
  const markBtn = document.getElementById('markComplete');
  const completedCountEl = document.getElementById('completedCount');
  const streakCountEl = document.getElementById('streakCount');
  const todayStatusEl = document.getElementById('todayStatus');
  const quoteText = document.getElementById('quoteText');
  const quoteAuthor = document.getElementById('quoteAuthor');
  const challengeTitle = document.querySelector('.challenge-title');
  const challengeDesc = document.querySelector('.today-challenge p:not(.challenge-title)');

  /* ----------- LOGIN SYSTEM ----------- */
  const savedEmail = localStorage.getItem('daily_email');
  const savedPassword = localStorage.getItem('daily_password');

  if (savedEmail && savedPassword) {
    loginSection.style.display = 'none';
    mainSite.style.display = 'block';
    welcomeMsg.textContent = `Welcome back, ${savedEmail}`;
  }

  loginBtn.addEventListener('click', () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    const storedEmail = localStorage.getItem('daily_email');
    const storedPass = localStorage.getItem('daily_password');

    if (storedEmail && storedPass) {
      if (email === storedEmail && password === storedPass) {
        alert('Login successful!');
        loginSection.style.display = 'none';
        mainSite.style.display = 'block';
        welcomeMsg.textContent = `Welcome back, ${email}`;
      } else {
        alert('Incorrect email or password.');
      }
    } else {
      localStorage.setItem('daily_email', email);
      localStorage.setItem('daily_password', password);
      alert('Account created successfully!');
      loginSection.style.display = 'none';
      mainSite.style.display = 'block';
      welcomeMsg.textContent = `Welcome, ${email}`;
    }
  });

  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('daily_email');
    localStorage.removeItem('daily_password');
    location.reload();
  });

  /* ----------- QUOTES ----------- */
  const quotes = [
    { text: "A year from now you may wish you had started today.", author: "Karen Lamb" },
    { text: "Small daily improvements are the key to staggering long-term results.", author: "Unknown" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln" },
    { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "Every step you take is a step away from where you used to be.", author: "Brian Chargualaf" },
    { text: "It always seems impossible until it’s done.", author: "Nelson Mandela" },
    { text: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
    { text: "Dream big. Start small. Act now.", author: "Robin Sharma" }
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteText.textContent = `“${randomQuote.text}”`;
  quoteAuthor.textContent = `— ${randomQuote.author}`;

  /* ----------- DAILY CHALLENGES ----------- */
  const challenges = [
    { title: "Take a 10-Minute Walk", desc: "Step outside and enjoy a brief walk around your neighborhood or office." },
    { title: "Write Down 3 Things You’re Grateful For", desc: "Focus on the positive by listing three things that made you smile today." },
    { title: "Drink 8 Glasses of Water", desc: "Stay hydrated to keep your body and mind refreshed." },
    { title: "Compliment Someone", desc: "Say something nice to a friend, family member, or stranger." },
    { title: "Do 15 Minutes of Stretching", desc: "Loosen up and refresh your body with a short stretching session." },
    { title: "Meditate for 5 Minutes", desc: "Find a quiet space, breathe deeply, and center your thoughts." },
    { title: "Read 5 Pages of a Book", desc: "Feed your mind with a few pages of something inspiring or educational." },
    { title: "Declutter One Small Area", desc: "Tidy your desk, shelf, or digital files for a sense of order." },
    { title: "Spend 10 Minutes Outside", desc: "Enjoy the fresh air and sunshine—connect with nature for a bit." },
    { title: "Write a Kind Message to Yourself", desc: "Self-love matters. Leave a positive note for future you." },
    { title: "Avoid Screens for 30 Minutes", desc: "Unplug and rest your eyes by stepping away from devices." },
    { title: "Do 10 Push-Ups or Sit-Ups", desc: "A quick burst of exercise to get your blood flowing." },
    { title: "Reach Out to a Friend", desc: "Send a message to someone you haven’t talked to in a while." },
    { title: "Plan Tomorrow’s Tasks", desc: "Write down your priorities for tomorrow to start fresh." },
    { title: "Listen to a Motivational Podcast", desc: "Find inspiration from a podcast that uplifts you." }
  ];

  const today = new Date().toDateString();
  let savedChallenge = JSON.parse(localStorage.getItem('daily_challenge'));

  if (!savedChallenge || savedChallenge.date !== today) {
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    savedChallenge = { date: today, ...randomChallenge };
    localStorage.setItem('daily_challenge', JSON.stringify(savedChallenge));
  }

  challengeTitle.textContent = savedChallenge.title;
  challengeDesc.textContent = savedChallenge.desc;

  /* ----------- STREAK SYSTEM ----------- */
  const state = {
    completed: Number(localStorage.getItem('daily_completed') || 0),
    streak: Number(localStorage.getItem('daily_streak') || 0),
    doneToday: localStorage.getItem('daily_done_today') === 'true',
  };

  function render() {
    completedCountEl.textContent = state.completed;
    streakCountEl.textContent = state.streak;
    todayStatusEl.textContent = state.doneToday ? 'Completed' : 'Pending';
    markBtn.textContent = state.doneToday ? '✓ Completed' : '⟳ Mark As Complete';
  }

  markBtn.addEventListener('click', () => {
    if (state.doneToday) {
      state.doneToday = false;
      state.completed = Math.max(0, state.completed - 1);
      state.streak = Math.max(0, state.streak - 1);
    } else {
      state.doneToday = true;
      state.completed += 1;
      state.streak += 1;
    }
    localStorage.setItem('daily_completed', state.completed);
    localStorage.setItem('daily_streak', state.streak);
    localStorage.setItem('daily_done_today', state.doneToday);
    render();
  });

  startJourney.addEventListener('click', () => {
    challengesSection.scrollIntoView({ behavior: 'smooth' });
    challengesSection.style.display = 'block';
  });

  render();
});

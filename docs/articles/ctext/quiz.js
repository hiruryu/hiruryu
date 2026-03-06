    const answers = {
      q1: ["fyálo", "fyalo"],
      q2: [""]
    };

document.querySelectorAll('.quiz-container').forEach(container => {
  const input = container.querySelector('.quiz-input');
  const feedback = container.querySelector('.feedback');
  const revealSpan = container.querySelector('.reveal');
  const userAnswerSpan = container.querySelector('.user-answer');
  const qid = container.getAttribute('data-id');

  function reset() {
    input.value = '';
    input.style.color = '';
    feedback.textContent = '';
    feedback.className = 'feedback';
    revealSpan.textContent = '';
    revealSpan.className = 'reveal';
    userAnswerSpan.textContent = '';
    userAnswerSpan.className = 'user-answer';
  }

  input.addEventListener('focus', () => {
    if (feedback.classList.contains('correct')) return;
    reset();
  });

  input.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const raw = input.value;
    const val = raw.trim();

    input.style.color = '';
    feedback.textContent = '';
    feedback.className = 'feedback';
    revealSpan.textContent = '';
    revealSpan.className = 'reveal';
    userAnswerSpan.textContent = '';

    if (val === '??') {
      const correct = answers[qid][0];
      revealSpan.textContent = correct;
      input.style.color = '#7dc87d';
      return;
    }

    if (val.includes('??')) {
      const userVal = val.replace(/\?\?/g, '');
      if (userVal) {
        userAnswerSpan.textContent = `あなたの回答：${userVal}`;
      }
      const correct = answers[qid][0];
      revealSpan.textContent = correct;
      input.style.color = '#7dc87d';
      return;
    }

    const validList = answers[qid].map(a => a.toLowerCase());
    if (validList.includes(val.toLowerCase())) {
      feedback.textContent = '✅ 正解！';
      feedback.classList.add('correct');
      input.style.color = '#17ab39';
    } else {
      feedback.textContent = '不正解';
      feedback.classList.add('wrong');
      input.style.color = '#e21a1a';
    }
  });
});

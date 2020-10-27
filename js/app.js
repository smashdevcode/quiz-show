const contentElement = document.getElementById('content');

function renderQuestions() {
  const questionsHtml = questions.map((q) => {
    const choicesHtml = q.choices.map((c) => `    
      <div>
        <p id="choice-${q.id}-${c.id}">${c.text} (${c.id}, ${c.isSelected})</p>
      </div>
    `);

    return `
      <div>
        <h2>${q.question} (${q.id})</h2>
        <div>
          ${choicesHtml.join('')}
        </div>
      </div>
    `;
  });

  contentElement.innerHTML = questionsHtml.join('');
}

function handleChoiceClick(elementId) {
  const values = elementId.split('-');
  const questionId = parseInt(values[1], 10);
  const choiceId = parseInt(values[2], 10);

  const question = questions.find((q) => q.id === questionId);

  question.choices.forEach((c) => {
    c.isSelected = false;
  });

  const choice = question.choices.find((c) => c.id === choiceId);
  choice.isSelected = true;

  renderQuestions();
}

contentElement.addEventListener('click', (event) => {
  const elementId = event.target.id;
  if (elementId.startsWith('choice')) {
    handleChoiceClick(elementId);
  }
});

renderQuestions();

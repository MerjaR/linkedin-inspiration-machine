let currentSet = 0;
const ideaSets = [
  [
    "Share a personal story about your first lesson in marketing.",
    "List 3 mistakes most people make in marketing — and how to fix them.",
    "Break down a recent trend in marketing and what it means.",
    "Explain how Elon Musk would market your product differently.",
    "Ask a bold question about the future of brand storytelling."
  ],
  [
    "Compare your company's growth to a well-known startup and extract lessons.",
    "Turn a surprising customer insight into a marketing insight.",
    "Write a post as if your company is talking to your future self.",
    "Highlight a failure and how it reshaped your strategy.",
    "Tell the origin story of your product through a user’s perspective."
  ]
];

let generatedIdeas = [];

function renderIdeas(setIndex) {
  generatedIdeas = ideaSets[setIndex];
  const ideaList = document.getElementById("idea-list");
  ideaList.innerHTML = "";
  generatedIdeas.forEach((idea, index) => {
    const li = document.createElement("li");
    li.textContent = idea;
    ideaList.appendChild(li);
  });
}

document.getElementById("generate").addEventListener("click", () => {
  renderIdeas(currentSet);
  document.getElementById("ideas-section").classList.remove("hidden");
  document.getElementById("output").classList.add("hidden");
});

document.getElementById("regenerate").addEventListener("click", () => {
  currentSet = (currentSet + 1) % ideaSets.length;
  renderIdeas(currentSet);
});

document.getElementById("generate-prompt").addEventListener("click", () => {
  const ideaNumber = parseInt(document.getElementById("idea-number").value);
  const persona = document.getElementById("persona").value.trim();
  const enhancement = document.getElementById("enhancement").value;
  const company = document.getElementById("company").value.trim();
  const role = document.getElementById("role").value.trim();
  const tweak = document.getElementById("tweak").value.trim();
  const extras = document.getElementById("extras").value.trim();

  if (!ideaNumber || ideaNumber < 1 || ideaNumber > 5) {
    alert("Please enter a valid idea number (1–5).");
    return;
  }

  const selectedIdea = generatedIdeas[ideaNumber - 1];
  const promptParts = [
    `Take idea #${ideaNumber} ("${selectedIdea}") and write it as a full LinkedIn post.`,
    `Use a tone and voice similar to ${persona}.`,
    company || role ? `This is for a ${role || 'creator'} at ${company || '[company name]'}.` : '',
    tweak ? `Make it a ${tweak} style post.` : '',
    extras ? `Include this context: ${extras}` : '',
    `Include ${enhancement}.`
  ];

  const finalPrompt = promptParts.filter(Boolean).join(' ');

  document.getElementById("prompt2").innerText = finalPrompt;
  document.getElementById("output").classList.remove("hidden");
});

// Copy to clipboard
document.querySelectorAll(".copy-btn").forEach(button => {
  button.addEventListener("click", () => {
    const targetId = button.getAttribute("data-target");
    const text = document.getElementById(targetId).innerText;

    navigator.clipboard.writeText(text).then(() => {
      alert("Prompt copied!");
    });
  });
});

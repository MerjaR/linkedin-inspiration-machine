let generatedIdeas = [];

document.getElementById("generate").addEventListener("click", () => {
  const topic = document.getElementById("topic").value.trim();
  const persona = document.getElementById("persona").value.trim();

  if (!topic || !persona) {
    alert("Please enter both a topic and a persona.");
    return;
  }

  // Dummy ideas (simulating what ChatGPT might return)
  generatedIdeas = [
    `Share a personal story about your first lesson in ${topic}.`,
    `List 3 mistakes most people make in ${topic} — and how to fix them.`,
    `Break down a recent trend in ${topic} and what it means.`,
    `Explain how ${persona} would approach ${topic} differently.`,
    `Ask a bold question about the future of ${topic} to spark engagement.`
  ];

  const ideaList = document.getElementById("idea-list");
  ideaList.innerHTML = "";
  generatedIdeas.forEach((idea, index) => {
    const li = document.createElement("li");
    li.textContent = idea;
    ideaList.appendChild(li);
  });

  document.getElementById("ideas-section").classList.remove("hidden");
  document.getElementById("output").classList.add("hidden");
});

document.getElementById("generate-prompt").addEventListener("click", () => {
  const ideaNumber = parseInt(document.getElementById("idea-number").value);
  const persona = document.getElementById("persona").value.trim();
  const enhancement = document.getElementById("enhancement").value;

  if (!ideaNumber || ideaNumber < 1 || ideaNumber > 5) {
    alert("Please enter a valid idea number (1–5).");
    return;
  }

  const prompt = `Take idea #${ideaNumber} ("${generatedIdeas[ideaNumber - 1]}") and write it as a full LinkedIn post. Use a tone and voice similar to ${persona}. Include ${enhancement}.`;

  document.getElementById("prompt2").innerText = prompt;
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

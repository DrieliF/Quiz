const highScoreList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoreList.innerHTML = highScores
.map(score => {
   return `<li claSS="high-score">${score.name}- ${score.score}</li>`;
})
.join("");
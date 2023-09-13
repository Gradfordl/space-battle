const spaceBattle = {
  element: document.querySelector("#space-battle"),
  // Game screen
  render: () => {
    let enemy = aliens[aliens.length - 1];
    spaceBattle.element.innerHTML = `<h2> ROUND ${level}</h2>
    <p> Your ship has a current hull of ${protag.hull}. </p>`;
    enemyStat.innerHTML = `<p>The enemy you're currently fighting has a hull of ${enemy.hull}, a firepower of ${enemy.firepower} and ${enemy.accuracy} accuracy!</p>`;
  },
};
const enemyStat = document.querySelector("#enemy-stats");

//Create my main class Ship
class Ship {
  constructor(hull, firepower, accuracy) {
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }

  attack(enemy) {
    if (aliens.length) {
      enemyStat.innerHTML = `<p>The enemy you're currently fighting has a hull of ${enemy.hull}, a firepower of ${enemy.firepower} and ${enemy.accuracy} accuracy!</p>`;
      spaceBattle.render();
      if (Math.random() < protag.accuracy) {
        alert("Your attack landed!");
        enemy.hull -= this.firepower;
        spaceBattle.render();

        if (enemy.hull <= 0) {
          aliens.pop();
          alert("You have destroyed this enemy.");
          if (
            confirm(
              "You've defeated this enemy! Press Ok to battle the next enemy, or Cancel to retreat."
            )
          ) {
            return;
          } else {
            alert("Alright, lets pack it in.");
            this.retreat();
            return;
          }
        }
      } else {
        alert("Your attack missed and you have done 0 damage to your enemy");
      }
    
      if (Math.random() < enemy.accuracy) {
        protag.hull -= enemy.firepower;
        spaceBattle.render();
        alert(
          `Your enemy attacked you and did ${enemy.firepower} damage to you!`
        );
        if (protag.hull <= 0) {
            alert("The aliens have destroyed your ship. GAME OVER!");
            this.retreat();
        }
      } else {
        alert("The enemy's attack missed and did 0 damage to you!");
      }
      
    } else {
      alert("You've defeated all the enemies! YOU WIN! Click Ok to be restarted from Round 1 with full health!");
      this.retreat();
    }
  }
  
  retreat() {
    if (modal.style.display === "flex") {
      modal.style.display = "none";
    } else {
      modal.style.display = "flex";
    }
    startBtn.style.display = "flex";
    aliens = [];
    level = 1;
    protag.hull = 20;
    enemyStat.textContent = "";
    console.log("RESTART COMPLETE");
  }
}

// Create Protagonist (USSAssembly) SubClass
class USSAssembly extends Ship {
  constructor(hull, firepower, accuracy) {
    super(hull, firepower, accuracy);
    this.hull = 20;
    this.firepower = 5;
    this.accuracy = 0.7;
  }
}

const protag = new USSAssembly(20, 5, 0.7);

let aliens = [];
// Create alien SubClass
class Alien extends Ship {
  constructor(hull, firepower, accuracy) {
    super(hull, firepower, accuracy);
  }
}

function startGame() {
  for (let i = 0; i < 6; i++) {
    let hullRdm = Math.floor(Math.random() * (6 - 3) + 3);
    let firepowerRdm = Math.floor(Math.random() * (4 - 2) + 2);
    let accuracyRdm = Math.random() * (0.8 - 0.6) + 0.6;
    let alien = new Alien(hullRdm, firepowerRdm, accuracyRdm);
    aliens.push(alien);
  }
  spaceBattle.render();
}

const startBtn = document.getElementById("start");

startBtn.addEventListener("click", (evt) => {
  startGame();
  evt.preventDefault();
  startBtn.style.display = "none";
  modal.style.display = "flex";
});

//Create Level click counter
let level = 1;
function onClick() {
  level++;
}
// Connect attack method to button
const attackBtn = document.getElementById("attack");

attackBtn.addEventListener("click", () => {
  onClick();
  let enemy = aliens[aliens.length - 1];
  protag.attack(enemy);
  spaceBattle.render();
});

// Connect retreat method to button
const restartBtn = document.getElementById("restart");

restartBtn.addEventListener("click", () => {
  alert(`You'll be restarted from round 1 with full health!`);
  protag.retreat();
  enemyStat.textContent = "";
});

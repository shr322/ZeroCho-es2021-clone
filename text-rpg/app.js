"use strict";

const $startScreen = document.querySelector("#start-screen");
const $gameMenu = document.querySelector("#game-menu");
const $battleMenu = document.querySelector("#battle-menu");
const $heroName = document.querySelector("#hero-name");
const $heroLevel = document.querySelector("#hero-level");
const $heroHp = document.querySelector("#hero-hp");
const $heroXp = document.querySelector("#hero-xp");
const $heroAtt = document.querySelector("#hero-att");
const $monstername = document.querySelector("#monster-name");
const $monsterHp = document.querySelector("#monster-hp");
const $monsterAtt = document.querySelector("#monster-att");
const $message = document.querySelector("#message");

class Game {
  constructor(name) {
    this.monster = null;
    this.hero = null;
    this.monsterList = [
      { name: "슬라임", hp: 25, att: 10, xp: 10 },
      { name: "스켈레톤", hp: 50, att: 15, xp: 20 },
      { name: "마왕", hp: 150, att: 35, xp: 50 },
    ];

    this.start(name);
  }

  start(name) {
    $gameMenu.addEventListener("submit", this.onGameMenuInput);
    $battleMenu.addEventListener("submit", this.onBattleMenuInput);
    this.changeScreen("game");
    this.hero = new Hero(this, name);
    this.updateHeroStat();
  }

  changeScreen(screen) {
    if (screen === "start") {
      $startScreen.style.display = "block";
      $gameMenu.style.display = "none";
      $battleMenu.style.display = "none";
    } else if (screen === "game") {
      $startScreen.style.display = "none";
      $gameMenu.style.display = "block";
      $battleMenu.style.display = "none";
    } else if (screen === "battle") {
      $startScreen.style.display = "none";
      $gameMenu.style.display = "none";
      $battleMenu.style.display = "block";
    }
  }

  onGameMenuInput = (e) => {
    e.preventDefault();
    const input = e.target["menu-input"].value;
    if (input === "1") {
      this.changeScreen("battle");
    } else if (input === "2") {
    } else if (input === "3") {
      this.changeScreen("game");
    }
  };

  onBattleMenuInput = (e) => {
    e.preventDefault();
    const input = e.target["battle-input"].value;
    if (input === "1") {
      this.changeScreen("battle");
    } else if (input === "2") {
    } else if (input === "3") {
      this.changeScreen("game");
    }
  };

  updateHeroStat() {
    /* 
     구조분해 할당 문법

     // 객체 분해하기
      let options = {
        title: "Menu",
        width: 100,
        height: 200
      };

      let {title, width, height} = options;

      alert(title);  // Menu
      alert(width);  // 100
      alert(height);
    
    */

    const { hero } = this;
    console.log(hero);
    if (hero === null) {
      $heroName.innerText = "";
      $heroLevel.innerText = "";
      $heroHp.innerText = "";
      $heroXp.innerText = "";
      $heroAtt.innerText = "";
      return;
    }
    $heroName.innerText = hero.name;
    $heroLevel.innerText = `${hero.lev}Lev`;
    $heroHp.innerText = `HP: ${hero.hp}/${hero.maxHp}`;
    $heroXp.innerText = `XP: ${hero.xp}/${15 * hero.lev}`;
    $heroAtt.innerText = `ATT: ${hero.att}`;
  }
}

class Hero {
  constructor(game, name) {
    this.game = game;
    this.name = name;
    this.lev = 1;
    this.maxHp = 100;
    this.hp = 100;
    this.xp = 0;
    this.att = 10;
  }
  attack(target) {
    target.hp -= this.att;
  }
  heal(monster) {
    this.hp += 20;
    this.hp -= monster.att;
  }
}

let game = null;
$startScreen.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target["name-input"].value;
  game = new Game(name);
});

"use strict";

const hero = {
  name: "",
  lev: 1,
  maxHp: 100,
  hp: 100,
  xp: 0,
  att: 10,
  attack(monster){
    console.log(monster, this)
    monster.hp -= this.att;
    this.hp -= monster.att;
  },
  heal(monster){
    this.hp += 20;
    this.hp -= monster.att;
  }
};

let monster = null;
const monsterList = [
  { name: "슬라임", hp: 25, att: 10, xp: 10 },
  { name: "스켈레톤", hp: 50, att: 15, xp: 20 },
  { name: "마왕", hp: 150, att: 35, xp: 50 },
];
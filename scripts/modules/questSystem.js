export const QuestManager = class {
  constructor() {
    this.quests = [];
    this.completed = [];
  }

  addQuest(quest) {
    this.quests.push(quest);
  }

  complete(name) {
    if (!this.completed.includes(name)) this.completed.push(name);
  }

  isComplete(name) {
    return this.completed.includes(name);
  }
};
/**
 * Extend the base Actor entity by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class Rolemaster2EActor extends Actor {

  /**
   * Augment the basic actor data with additional dynamic data.
   */
  prepareData() {
    super.prepareData();

    const actorData = this.data;
    const data = actorData.data;
    const flags = actorData.flags;

    // Make separate methods for each Actor type (character, npc, etc.) to keep
    // things organized.
    if (actorData.type === 'character') this._prepareCharacterData(actorData);
  }

  /**
   * Prepare Character type specific data
   */
  _prepareCharacterData(actorData) {
    const data = actorData.data;

    // Make modifications to data here. For example:

    // Loop through ability scores, and add their modifiers to our sheet output.
    for (let [key, stat] of Object.entries(data.stats)) {
      // Calculate the modifier using d20 rules.
      stat.normal_bonus = this._getNormalBonus(stat.value);
    }
  }

  _getNormalBonus(value) {
    let normalBonus = 0;

    switch(true) {
      case (value === 1):
        normalBonus = -25;
        break;
      case (value === 2):
        normalBonus = -20;
        break;
      case (value <= 4):
        normalBonus = -15;
        break;
      case (value <= 9):
        normalBonus = -10;
        break;
      case (value <= 24):
        normalBonus = -15;
        break;
      case (value <= 74):
        normalBonus = 0;
        break;
      case (value <= 89):
        normalBonus = 5;
        break;
      case (value <= 94):
        normalBonus = 10;
        break;        
      case (value <= 97):
        normalBonus = 15;
        break;
      case (value <= 99):
        normalBonus = 20;
        break;          
      case (value <= 100):
        normalBonus = 25;
        break;                
      case (value <= 101):
        normalBonus = 30;
        break;
      case (value <= 102):
        normalBonus = 35;
        break;                  
    }

    return normalBonus;
  }

}
/*
    Baileys CooldownManager by github.com/ZTRdiamond
    ------------------------------------------------------
    Inspired from @mengkodingan/ckptw
    Source: https://github.com/ZanixonGroup/amira-bot-base
    | Don't delete this credit!
*/

const cooldown = new Map()
class Cooldown {
  #milliseconds
  #cooldown
  #timeout
  
  constructor(m, milliseconds){
    this.#milliseconds = milliseconds;
    this.#cooldown = cooldown;
    this.#timeout = 0;
    
    let sender = m?.key?.participant || m?.key?.remoteJid;
    let query = `cooldown_${m?.command}_${m?.key?.remoteJid}_${sender}`;
    const getCooldown = this.#cooldown.get(query);
    if(getCooldown) {
      this.#timeout = Number(getCooldown) - Date.now();
    } else {
      this.#cooldown.set(query, (Date.now() + this.#milliseconds));
      setTimeout(() => {
        this.#cooldown.delete(query);
      }, this.#milliseconds);
    }
  }
  
  get onCooldown() {
    return this.#timeout ? true : false;
  }
  
  get timeLeft() {
    return this.#timeout;
  }
  
   get timeFormatted() {
    return this.formatTime(this.#timeout);
  }
  
  formatTime(milliseconds) {
    const units = [
        { label: 'y', duration: 365 * 24 * 60 * 60 * 1000 },
        { label: 'mo', duration: 30 * 24 * 60 * 60 * 1000 },
        { label: 'w', duration: 7 * 24 * 60 * 60 * 1000 },
        { label: 'd', duration: 24 * 60 * 60 * 1000 },
        { label: 'h', duration: 60 * 60 * 1000 },
        { label: 'm', duration: 60 * 1000 },
        { label: 's', duration: 1000 }
    ];
    let result = '';
    for (const unit of units) {
        const value = Math.floor(milliseconds / unit.duration);
        milliseconds %= unit.duration;
        if (value > 0) {
            result += `${value}${unit.label} `;
        }
    }
    return result.trim() || '0s';
  }
}

export default Cooldown;
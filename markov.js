/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // create new Map for paids
    let chains = new Map();
    for (let i=0; i<this.words.length; i++){
      let word=this.words[i];
      let next=this.words[i+1] || null;
      
      if(chains.has(word)){
        let ops = chains.get(word);
        ops.push(next);
      }
      else{
        chains.set(word, [next]);
      }
    }
    this.chains=chains;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let keys = Array.from(this.chains.keys());
    let key = keys[Math.floor(Math.random()*keys.length)];
    let res = [];

    while(res.length < numWords && key !== null){
      res.push(key);
      let nextOp=this.chains.get(key);
      key = nextOp[Math.floor(Math.random()*nextOp.length)];
    }
    return res.join(' ');
  }
}

module.exports = {
  MarkovMachine
};
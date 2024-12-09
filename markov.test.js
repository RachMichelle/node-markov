const markov = require('./markov')

describe('MarkovMachine class', function () {
    let machine;
    beforeEach(function () {
        machine = new markov.MarkovMachine('the cat in the hat');
    })
    test('create instance of MarkokvMachine', function () {
        expect(machine).toBeInstanceOf(markov.MarkovMachine)
    })
    test('should create object Map for chains', function () {
        let chains = machine.chains;
        expect(chains).toBeInstanceOf(Map);
    })
    test('should return a string', function () {
        let res = machine.makeText();
        expect(res).toEqual(expect.any(String))
    })
})
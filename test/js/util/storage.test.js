var test = require('tape');
var sinon = require('sinon');

// storage is a singleton
var storage = require('../../../js/storage');

test('storage: functions available', function(t) {
    t.equal(typeof storage.save, 'function');
    t.equal(typeof storage.remove, 'function');
    t.equal(typeof storage.get, 'function');

    t.end();
});

test('storage: save()', function(t) {
    var lc = {
        setItem: function() {}
    };

    var stub = sinon.stub(lc, 'setItem');

    var model1 = {
        a: 'a',
        b: 'b'
    };

    var model2 = {
        c: 'c',
        d: 'd'
    };

    var id = storage.save(model1, lc);

    t.equal(id, 0);
    t.equal(stub.calledOnce, true);
    t.equal(stub.args[0][1], JSON.stringify([model1]));

    var id2 = storage.save(model2, lc);

    t.equal(id2, 1);
    t.equal(stub.calledTwice, true);
    t.equal(stub.args[1][1], JSON.stringify([model1, model2]));

    model1.a = 'abc';

    var id3 = storage.save(model1, lc);

    t.equal(id3, 0);
    t.equal(stub.calledThrice, true);
    t.equal(stub.args[2][1], JSON.stringify([model1, model2]));

    t.end();
});

test('storage: remove()', function(t) {
    var lc = {
        setItem: function() {}
    };

    var stub = sinon.stub(lc, 'setItem');

    var model2 = {
        c: 'c',
        d: 'd',
        id: 1
    };

    storage.remove(0, lc);

    t.equal(stub.callCount, 1);
    t.equal(stub.args[0][1], JSON.stringify([model2]));

    t.end();
});

test('storage: get', function(t) {
    var lc = {
        getItem: function() {},
        setItem: function() {}
    };

    var getItemStub = sinon.stub(lc, 'getItem');
    sinon.stub(lc, 'setItem');

    var models = [{
        "c": "c",
        "d": "d",
        "id": 13
    }, {
        "a": "a",
        "b": "b",
        "id": 12
    }];

    getItemStub.returns(JSON.stringify(models));

    var savedModels = storage.get(lc);

    t.equals(getItemStub.calledOnce, true);
    t.equals(JSON.stringify(models), JSON.stringify(savedModels));

    var id = storage.save({
        g: 'g'
    }, lc);

    t.equal(14, id);

    t.end();
});

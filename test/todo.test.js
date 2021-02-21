const { describe, it, beforeEach, afterEach  } = require('mocha');
const { expect } = require('chai');
const { createSandbox } = require('sinon');

const Todo = require('../src/todo');

describe('todo', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = createSandbox()
  });

  afterEach(() => sandbox.restore());

  describe('#isValid', () => {

    it('should return invalid when creating a todo instace without "text"', () => {
      const data = {
        text: '',
        when: new Date('2020-12-01')
      }

      const todo = new Todo(data);
      const result = todo.isValid();

      expect(result).to.not.ok;
    });


    it('should return invalid when creating a todo instace without "when"', () => {
      const data = {
        text: 'Hello world',
        when: new Date('20-12-01')
      }

      const todo = new Todo(data);
      const result = todo.isValid();

      expect(result).to.not.ok;
    });


    it('should return invalid when creating a todo instace with invalid "when"', () => {
      const data = {
        text: 'Hello world',
        when: new Date('20-12-01')
      }

      const todo = new Todo(data);
      const result = todo.isValid();

      expect(result).to.not.ok;
    });


    it('should have "id", "text", "when" and "status" propreties after creating todo instance', () => {
      () => {
        const data = {
          text: 'Hello world',
          when: new Date('20-12-01')
        }
        
        const expectedId = "0001"

        const uuid = require('uuid');
        const fakeUUID = sandbox.fake.returns(expectedId);
        sandbox.replace(uuid, "v4", fakeUUID);
  
        const todo = new Todo(data);

        const expectedItem = {
          text: data.text,
          when: data.when,
          status: "",
          id: expectedId
        }

        const result = todo.isValid();
  
        expect(result).to.be.ok;
        expect(uuid.v4.calledOnce).to.be.ok
        expect(todo).to.be.deep.equal(expectedItem);
      }
    });

  })
})
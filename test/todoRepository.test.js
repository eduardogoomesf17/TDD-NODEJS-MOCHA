const { describe, it, before, afterEach  } = require('mocha');
const { expect } = require('chai');
const { createSandbox } = require('sinon');

const TodoRepository = require('../src/todo.repository');

describe('todoRepository', () => {
  let todoRepository;

  before(() => {
    todoRepository = new TodoRepository();
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('methods signature', () => {
    it('should call insertOne from lokijs', () => {
      const mockDatabase = [
        {
          name: 'eduardo',
          age: 20,
          meta: { revision: 0, created: 1613922135771, version: 0 },
          '$loki': 1
        },
      ]

      const functionName = "find";
      const expectedReturn = mockDatabase;

      sandbox.stub(
        todoRepository.schedule,
        functionName, 
      ).returns(expectedReturn);


      const result = todoRepository.list();
      expect(result).to.be.deep.equal(expectedReturn);
      expect(todoRepository.schedule[functionName].calledOnce).to.be.ok;
    });

    it('should call find from lokijs', () => {
      const functionName = "insertOne";
      const expectedReturn = true;
      
      sandbox.stub(
        todoRepository.schedule,
        functionName, 
      ).returns(expectedReturn);
        
      const data = { name: "Eduardo", age: 20 };

      const result = todoRepository.create(data);

      expect(result).to.be.ok;
      expect(todoRepository.schedule[functionName].calledOnceWithExactly(data)).to.be.ok;
    });

  });

});



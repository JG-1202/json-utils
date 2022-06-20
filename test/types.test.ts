import {
  ArrayType, DeepPartial, DeepRequired, JsonType, ObjectType,
} from '../index';

describe('Types', () => {
  it('checks if types are exported', async () => {
    const obj: ObjectType = {};
    void obj;

    const array: ArrayType = [];
    void array;

    const json: JsonType = {} || [];
    void json;

    const deepPartial: DeepPartial<any> = {};
    void deepPartial;

    const deepRequired: DeepRequired<any> = {};
    void deepRequired;
  });
  it('deepPartial vs deepRequired', () => {
    interface TestObject {
      propA: {
        nestedProp: {
          array: number[]
        }
      }
    }
    interface TestObjectOptional {
      propA?: {
        nestedProp?: {
          array?: number[]
        }
      }
    }
    const testObject = {
      propA: {
        nestedProp: {
          array: [1],
        },
      },
    };
    const testerRequired = (input: TestObjectOptional) => void input;
    const testerOptional = (input: DeepPartial<TestObject>) => void input;
    testerRequired(testObject);
    testerOptional({});
    testerOptional({ propA: {} });
    testerOptional({ propA: { nestedProp: {} } });
    testerOptional(testObject);
    const deepRequired: DeepRequired<TestObjectOptional> = testObject;
    deepRequired.propA.nestedProp.array.pop();
  });
});

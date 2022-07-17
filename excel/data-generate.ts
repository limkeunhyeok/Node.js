import * as faker from 'faker';

export function getExcelArrayData() {
  let data = [['name', 'value', 'symbol', 'desc']];

  for (let i = 0; i < 100; i++) {
    data.push([
      faker.lorem.word(),
      faker.lorem.word(),
      faker.lorem.word(),
      faker.lorem.sentence(),
    ])
  }
  return data;
}

export function getExcelJsonData() {
  let data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      email: faker.internet.email(),
      username: faker.internet.userName(),
      nickname: faker.lorem.word(),
      isActive: faker.datatype.boolean(),
    })
  }
  return data;
}

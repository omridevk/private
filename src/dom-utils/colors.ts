import faker from "faker";

export default function createRandomColor() {
  return faker.internet.color();
}

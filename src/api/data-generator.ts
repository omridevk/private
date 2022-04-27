import faker from "faker";

export interface CarData {
  vin: string;
  timestamp: any;
  fuel: number;
  wiperFluid: number;
  location: {
    lat: number;
    lng: number;
  };
}

export default function generateCarData(vin: string): CarData {
  return {
    vin,
    timestamp: timestamp(),
    fuel: fuelLevel(),
    wiperFluid: wiperFluid(),
    location: location(),
  }
}

function timestamp() {
  return new Date().getTime()
}

function fuelLevel() {
  return percentage()
}

function wiperFluid() {
  return percentage()
}

function location() {
  return {
    lat: coordinate(),
    lng: coordinate(),
  }
}

function coordinate() {
  return faker.random
    .number({ min: 0, max: 25, precision: 0.000000001 })
}

function percentage() {
  return faker.random.number({ min: 0, max: 1, precision: 0.01 })
}

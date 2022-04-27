import type { CarData } from "./data-generator";
import generateCarData from "./data-generator";
import Joi from "joi";

const carDataSchema = Joi.object().keys({
  vin: Joi.string().alphanum().length(17),
  timestamp: Joi.date().timestamp("javascript"),
  fuel: Joi.number().max(1),
  wiperFluid: Joi.number().max(1),
  location: {
    lat: Joi.number().min(0).max(35).precision(10),
    lng: Joi.number().min(0).max(35).precision(10),
  },
});

const VIN = 'ABCDEF123456EVGI8'

describe('Data Generator', () => {
  let carData: CarData
  beforeEach(() => (carData = generateCarData(VIN)))

  it('Should match the correct schema', () => {
    expect(Joi.validate(carData, carDataSchema).error).toBe(null)
  })

  it('Should have the provided vin', () => {
    expect(carData.vin).toEqual(VIN)
  })
})

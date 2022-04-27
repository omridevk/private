import createStreamerFrom from "./streamer";
import generateCarData from "./data-generator";

export default function createCarStreamer(vin: string) {
  return createStreamerFrom(() => generateCarData(vin));
}

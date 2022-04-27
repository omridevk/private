import createStreamerFrom from "./streamer";
import generateCarData from "./data-generator";

describe("Data streamer", () => {
  let dataStreamer;
  beforeEach(() => {
    dataStreamer = createStreamerFrom(
      () => generateCarData("12345678901234567"),
      [200, 500]
    );
    dataStreamer.start();
  });

  afterEach(() => {
    dataStreamer.stop();
  });

  it("should provide stream data within time limit", function (done) {
    const d = new Date().getTime();

    dataStreamer.subscribe((data) => {
      const timeDiff = new Date().getTime() - d;
      console.log(timeDiff);
      expect(timeDiff).toBeGreaterThanOrEqual(200);
      expect(timeDiff).toBeLessThanOrEqual(500);
      done();
    });
  });

  it("should be called until stopped", function (done) {
    let counter = 0;
    dataStreamer.subscribe(() => {
      counter++;
      if (counter >= 3) {
        dataStreamer.stop();
        expect(counter).toEqual(3);
        done();
      }
    });
  });
});

import createStreamerFrom from "../../api/streamer";
import generateCarData, { CarData } from "../../api/data-generator";
import { useCallback, useEffect, useState } from "react";
import createRandomColor from "../../dom-utils/colors";

export function useVins(filterEvents: boolean) {
  const [data, setData] = useState<Record<string, CarData>>({});
  const [enabledVins, setEnabledVins] = useState<string[]>([]);
  const [vins, setVins] = useState<Set<{ vin: string; color: string }>>(
    new Set()
  );
  const toggleVin = useCallback((vin: string, checked: boolean) => {
    setEnabledVins((prev) => {
      const newItems = prev?.filter((item) => item !== vin);
      if (!checked) {
        return newItems;
      }
      return [...newItems, vin];
    });
  }, []);
  const addVin = useCallback((vin) => {
    toggleVin(vin, true);
    setVins((prev) => {
      return new Set([...prev, { vin, color: createRandomColor() }]);
    });
  }, [toggleVin]);
  const handler = useCallback(
    (data) => {
      if (filterEvents && data.fuel * 100 < 15) {
        console.log("filtered an event", { data });
        return;
      }
      setData((prev) => ({
        ...prev,
        [data.vin]: data,
      }));
    },
    [filterEvents]
  );
  useEffect(() => {
    const streams = [...vins].map((item) => {
      const stream = createStreamerFrom(() => generateCarData(item.vin));
      stream.subscribe(handler);
      stream.start();
      return stream;
    });
    return () => {
      streams.forEach((item) => item.removeHandler(handler));
    };
  }, [handler, vins]);
  return {
    vins: vins,
    toggleVin,
    enabledVins,
    addVin,
    data,
  };
}

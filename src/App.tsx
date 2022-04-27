import "./App.css";
import React, { useCallback, useEffect, useState } from "react";
import generateCarData from "./api/data-generator";
import createStreamerFrom from "./api/streamer";
import {
  Box,
  Checkbox,
  checkboxClasses,
  Grid,
  Paper,
  styled,
  Toolbar,
} from "@mui/material";
import { CarSearcher } from "./features/car-searcher";
import createRandomColor from "./dom-utils/colors";
import { CarsInfo } from "./features/car-searcher/cars-info";

const StyledVinNumber = styled("span")<{ color: string }>`
  color: ${({ color }) => color};
`;

const App = () => {
  const [data, setData] = useState<any>({});
  const [vins, setVins] = useState<{ vin: string; color: string }[]>([]);
  const [enabledVins, setEnabledVins] = useState<string[]>([]);
  const [filterEvents, setFilterEvents] = useState(false);
  const streamHandler = useCallback(
    (data) => {
      if (filterEvents && data.fuel * 100 < 15) {
        console.log("filtered an event", { data });
        return;
      }
      setData((prevData: any) => ({
        ...prevData,
        [data.vin]: {
          ...data,
        },
      }));
    },
    [filterEvents]
  );

  function handleToggle(enable: boolean, vin: string) {
    setEnabledVins((prev: string[]) => {
      const newData = prev.filter((item) => item !== vin);
      if (enable) {
        return [...newData, vin];
      }
      return newData;
    });
  }
  useEffect(() => {
    const subs = vins.map((item) =>
      createStreamerFrom(() => generateCarData(item.vin))
    );
    subs.forEach((item) => {
      item.subscribe(streamHandler);
      item.start();
    });
    return () => {
      subs.forEach((item) => item.removeHandler(streamHandler));
    };
  }, [streamHandler, vins]);

  function handleSearch(vin: string) {
    if (vins.find((item) => item.vin === vin)) {
      return;
    }
    setEnabledVins((prev) => [...prev, vin]);
    setVins((prev) => [...prev, { vin, color: createRandomColor() }]);
  }
  
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper
        sx={{
          width: 1200,
          m: 4,
          display: "flex",
          minHeight: 600,
          justifyContent: "center",
        }}
      >
        <Grid
          container
          sx={{ height: "100%", justifyContent: "center", maxWidth: 1200 }}
        >
          <Grid item xs={3} sx={{ padding: 2 }}>
            <CarSearcher onSearch={handleSearch}></CarSearcher>
            {vins.map((item) => (
              <Box
                key={item.vin}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Checkbox
                  style={{color: item.color}}
                  checked={enabledVins.includes(item.vin)}
                  onChange={(_, checked) => handleToggle(checked, item.vin)}
                />
                <StyledVinNumber color={item.color}>{item.vin}</StyledVinNumber>
              </Box>
            ))}
          </Grid>
          <CarsInfo
            filterEvents={filterEvents}
            onFilterEventChanged={(checked) => setFilterEvents(checked)}
            vins={vins}
            data={data}
            enabledVins={enabledVins}
          />
        </Grid>
      </Paper>
    </Box>
  );
};

export default App;

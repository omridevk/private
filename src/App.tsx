import "./App.css";
import React, { useState } from "react";
import { Box, Checkbox, Grid, Paper, styled } from "@mui/material";
import { CarSearcher } from "./features/car-searcher";
import { CarsInfo } from "./features/car-searcher/cars-info";
import { useVins } from "./features/car-searcher/use-vins";

const StyledVinNumber = styled("span")<{ color: string }>`
  color: ${({ color }) => color};
`;

const App = () => {
  const [filterEvents, setFilterEvents] = useState(false);
  const {data, enabledVins, toggleVin, vins, addVin } = useVins(filterEvents);
  
  function handleSearch(vin: string) {
    addVin(vin);
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
            {[...vins].map((item) => (
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
                  onChange={(_, checked) => toggleVin(item.vin, checked)}
                />
                <StyledVinNumber color={item.color}>{item.vin}</StyledVinNumber>
              </Box>
            ))}
          </Grid>
          <CarsInfo
            filterEvents={filterEvents}
            onFilterEventChanged={(checked) => setFilterEvents(checked)}
            vins={[...vins]}
            data={data}
            enabledVins={enabledVins}
          />
        </Grid>
      </Paper>
    </Box>
  );
};

export default App;

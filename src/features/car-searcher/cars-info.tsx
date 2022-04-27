import { Box, Checkbox, Grid, Toolbar } from "@mui/material";
import EventNotification from "../../components/EventNotification";
import React from "react";
import { CarData } from "../../api/data-generator";

interface Props {
  filterEvents: boolean;
  onFilterEventChanged: (checked: boolean) => void;
  vins: { vin: string; color: string }[];
  data: Record<string, CarData>;
  enabledVins: string[];
}


export function CarsInfo({
  filterEvents,
  onFilterEventChanged,
  vins,
  data,
  enabledVins,
}: Props) {
  return (
    <Grid item xs={9}>
      <Box sx={{ padding: 1 }}>
        <Toolbar>
          <Checkbox
            checked={filterEvents}
            onChange={(_, checked) => onFilterEventChanged(checked)}
          />
          <span>Filter events where fuel is under 15%</span>
        </Toolbar>
        <Box sx={{ overflow: "auto", maxHeight: 600 }}>
          {vins.map(
            (vin) =>
              enabledVins.includes(vin.vin) && (
                <Box sx={{ padding: 1 }} key={vin.vin}>
                  {data[vin.vin] && (
                    <EventNotification
                      color={vin.color}
                      carEvent={data[vin.vin]}
                    />
                  )}
                </Box>
              )
          )}
        </Box>
      </Box>
    </Grid>
  );
}

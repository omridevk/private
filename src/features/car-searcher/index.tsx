import Input from "../../components/Input";
import { Box } from "@mui/material";
import Button from "../../components/Button";
import { useState } from "react";

export function CarSearcher({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  const [query, setQuery] = useState("");
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Input
        value={query}
        onChange={(event: any) => setQuery(event.target.value)}
      />
      <Button
        onClick={() => {
          onSearch(query);
          setQuery("");
        }}
      >
        Add
      </Button>
    </Box>
  );
}

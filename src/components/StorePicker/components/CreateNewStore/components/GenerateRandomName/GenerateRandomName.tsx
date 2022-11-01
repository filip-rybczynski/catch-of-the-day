// React
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Types
import { GenerateRandomNameProps } from "./GenerateRandomName.interface";

// Utils
import { generateName } from "./utils";

// Material UI
import {
  Button,
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

export const GenerateRandomName = ({
  setStoreName,
}: GenerateRandomNameProps) => {
  const [generatedName, setGeneratedName] = useState("");
  const [nameLength, setNameLength] = useState<2 | 3>(2);

  useEffect(() => {
    setStoreName(generatedName);
  }, [generatedName]);

  const handleGenClick = () => {
    setGeneratedName(generateName(nameLength));
  };

  return (
    <Box>
      <Typography variant="h2" component="p">
        {generatedName || "Click the button to generate a name!"}
      </Typography>
      <Button onClick={handleGenClick}>Generate name!</Button>
      <label>
        Number of words in name
        <ToggleButtonGroup
          size="small"
          value={nameLength}
          onChange={(e, val) => setNameLength(val)}
          exclusive
          aria-label="length of generated name"
        >
          <ToggleButton value={2}>2</ToggleButton>
          <ToggleButton value={3}>3</ToggleButton>
        </ToggleButtonGroup>
      </label>
    </Box>
  );
};

GenerateRandomName.propTypes = {
  setStoreName: PropTypes.func.isRequired,
};

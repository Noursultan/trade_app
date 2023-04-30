import { Box, useMediaQuery } from "@mui/material";
import Row1 from "./Row1";
import Row2 from "./Row2";
import Row3 from "./Row3";

const gridTemplateLargeScreens = `
  "a b c"
  "a b c"
  "a b c"
  "a b f"
  "d e f"
  "d e f"
  "d h i"
  "g h i"
  "g h j"
  "g h j"
`;

const gridTemplateMediumScreens = `
  "a b"
  "a b"
  "a b"
  "a b"
  "c d"
  "c d"
  "c d"
  "e f"
  "e f"
  "g f"
  "g h"
  "g h"
  "i h"
  "i h"
  "j j"
  "j j"
`;

const gridTemplateSmallScreens = `
  "a"
  "a"
  "a"
  "a"
  "b"
  "b"
  "b"
  "b"
  "c"
  "c"
  "c"
  "d"
  "d"
  "d"
  "e"
  "e"
  "f"
  "f"
  "f"
  "g"
  "g"
  "g"
  "h"
  "h"
  "h"
  "h"
  "i"
  "i"
  "j"
  "j"
`;

const Dashboard = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1440px)");
  const isAboveMediumScreensTwo = useMediaQuery("(min-width: 1024px)");
  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      sx={
        isAboveMediumScreens
          ? {
              gridTemplateColumns: "repeat(3, minmax(442px, 1fr))",
              gridTemplateRows: "repeat(10, 70px)",
              gridTemplateAreas: gridTemplateLargeScreens
            }
        : isAboveMediumScreensTwo
            ? {
                gridTemplateColumns: "repeat(2, minmax(468px, 1fr))",
                gridAutoRows: "70px",
                gridTemplateAreas: gridTemplateMediumScreens
              }
          : {
              gridAutoColumns: "minmax(704px, 1fr)",
              gridAutoRows: "70px",
              gridTemplateAreas: gridTemplateSmallScreens
            }
      }
    >
      <Row1 />
      <Row2 />
      <Row3 />
    </Box>
  );
};

export default Dashboard;
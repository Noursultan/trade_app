import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useGetPartnersQuery } from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import WTO from "../../assets/wto.png"
import EEU from "../../assets/EEU.jpg"
import ECO from "../../assets/ECO.svg"
import SCO from "../../assets/SCO.jpg"

const Row3 = () => {
  const { palette } = useTheme();
  const { data: partnerData } = useGetPartnersQuery();

  const listOfOrganizationsData = [
    {
      name: 'WTO',
      OrgImg: WTO
    },
    {
      name: 'EEU',
      OrgImg: EEU
    },
    {
      name: 'ECO',
      OrgImg: ECO
    },
    {
      name: 'SCO',
      OrgImg: SCO
    },
  ]

  const partnerExportColumns = [
    {
      field: "percentage",
      headerName: "Share of total Kyrgyz Export",
      flex: 1,
      renderCell: (params: GridCellParams) => `${params.value}%`
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.5,  
    },
    {
      field: "total",
      headerName: "Total Export",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ];

  const partnerImportColumns = [
    {
      field: "percentage",
      headerName: "Share of total Kyrgyz Import",
      flex: 1,
      renderCell: (params: GridCellParams) => `${params.value}%`
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.5,  
    },
    {
      field: "total",
      headerName: "Total Import",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ];

  return (
    <>
      <DashboardBox gridArea="g">
        <BoxHeader
          title="List of Main Export Partners"
          sideText={`${partnerData?.[0]?.mainExportPartners?.length || 0} partners`}
        />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={partnerData?.[0]?.mainExportPartners || []}
            columns={partnerExportColumns}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="h">
        <BoxHeader
          title="List of Main Import Partners"
          sideText={`${partnerData?.[0]?.mainImportPartners?.length} partners`}
        />
        <Box
          mt="1rem"
          p="0 0.5rem"
          height="80%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={partnerData?.[0]?.mainImportPartners || []}
            columns={partnerImportColumns}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="i">
        <BoxHeader title="Kyrgyzstan Trade Member of" sideText="4 organisations" />
        <Box display={"flex"} justifyContent={"space-evenly"} p="0 2rem" mt=".8rem">
          {listOfOrganizationsData.map((el, index) => (
            <Box key={index}>
              <Box width="50px" height="50px" borderRadius="50%">
                <img src={el.OrgImg} alt={el.name} style={{ width: "100%", height: "100%" }} />
              </Box>
              <Typography color={"white"} mt={".5rem"} textAlign={"center"}>{el.name}</Typography>
            </Box>
          ))}
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="j">
        <BoxHeader
          title="Overall Summary and Explanation Data"
          sideText="+15%"
        />
        <Box
          height="15px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor={palette.primary[800]}
          borderRadius="1rem"
        >
          <Box
            height="15px"
            bgcolor={palette.primary[600]}
            borderRadius="1rem"
            width="40%"
          ></Box>
        </Box>
        <Typography margin="0 1rem" variant="h6">
          The dashboard is about the trade-economic situation of Kyrgyzstan. Kyrgyzstan's economy is heavily reliant on 
          agriculture and mining, with gold and other minerals being major export commodities. The country is a participant of various 
          trade agreements and organisations. The country is actively working to increase its exports and expand its trading partners.
        </Typography>
      </DashboardBox>
    </>
  );
};

export default Row3;
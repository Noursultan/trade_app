import React, { useMemo } from 'react'
import DashboardBox from '@/components/DashboardBox'
import BoxHeader from '@/components/BoxHeader'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from 'recharts'
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import { useGetGDPQuery, useGetTradeValuesQuery } from '@/state/api'
import shirt from "@/assets/shirt.jpg"
import gold from "@/assets/gold.jpg"
import wheat from "@/assets/wheat.jpg"
import FormatNumbers from '@/components/FormatNumbers'
import FormatNumbersToEuro from '@/components/FormatNumbersToEuro'

const Row2 = () => {
    const { palette } = useTheme()
    const { data: tradeValues } = useGetTradeValuesQuery();
    const { data: gdp } = useGetGDPQuery()
    const isMediumScreens = useMediaQuery("(max-width: 1024px)");
    const isAboveNineHundredScreens = useMediaQuery("(min-width: 900px) and (max-width: 1023px)");

    const tradeIntensity = useMemo(() => {
        return (tradeValues?.[0]?.total ?? []).map(({ year, export: exportValue, import: importValue }, index) => {
          const exportValueNumeric = parseInt(String(exportValue).replace(/\$/g, ''));
          const importValueNumeric = parseInt(String(importValue).replace(/\$/g, ''));
          const gdpValueNumeric = parseInt(String((gdp?.[0]?.total ?? [])[index]?.gdp)?.replace(/\$/g, '')) || 1;
          const tradeIntensityValue = ((exportValueNumeric + importValueNumeric) / gdpValueNumeric) * 100;
          return {
            year,
            "trade intensity": tradeIntensityValue.toFixed(2),
            gdp: (gdp?.[0]?.total ?? [])[index]?.gdp
          };
        });
      }, [tradeValues, gdp]);

      const EUtrade = useMemo(() => {
        return (
            tradeValues &&
            tradeValues[0].EU.map(({ year, _id, import: importValue }) => {
                return {
                    id: _id,
                    year: year,
                    export: importValue,
                }
            })
        )
      }, [tradeValues])

      const listOfExportData = [
        {
          name: 'manufacturing',
          OrgImg: shirt,
          percentage: 69.7
        },
        {
          name: 'farming',
          OrgImg: wheat,
          percentage: 13.4
        },
        {
            name: 'mining',
            OrgImg: gold,
            percentage: 10.8
        }
      ]

    return (
        <>
            <DashboardBox gridArea="d">
                <BoxHeader
                    title="Trade Intensity vs GDP"
                    sideText="128.28%"
                />
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={tradeIntensity}
                        margin={{
                            top: 20,
                            right: 0,
                            left: -10,
                            bottom: 55,
                        }}
                    >
                        <CartesianGrid vertical={false} stroke={palette.grey[800]} />
                        <XAxis
                            dataKey="year"
                            tickLine={false}
                            style={{ fontSize: "10px" }}
                        />
                        <YAxis
                            yAxisId="left"
                            orientation="left"
                            tickLine={false}
                            axisLine={false}
                            style={{ fontSize: "10px" }}
                            tickFormatter={(tick) => {return `${tick}%`}}
                            domain={[15, 130]}
                        />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            tickLine={false}
                            axisLine={false}
                            style={{ fontSize: "10px" }}
                            tickFormatter={FormatNumbers}
                        />
                        <Tooltip 
                            formatter={(value, name) => {
                                if (name === 'gdp') {
                                    return FormatNumbers(value);
                                } else {
                                    return `${value}%`;
                                }
                            }}
                        />
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="trade intensity"
                            stroke={palette.tertiary[500]}
                        />
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="gdp"
                            stroke={palette.primary.main}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </DashboardBox>
            <DashboardBox gridArea="e">
                <BoxHeader title="Export Goods as a share of Total Export" sideText="3 main categories" />
                <Box display={"flex"} justifyContent={"space-around"} p="0 2rem" mt="1rem">
                    <Box display={"flex"} justifyContent={"space-between"} gap={ isMediumScreens ? '4rem' : '1.1rem'}>
                        {listOfExportData.map((el, index) => (
                            <Box key={index} display={"flex"} flexDirection={"column"} alignItems={"center"}>
                                <Box width="50px" height="50px" borderRadius="50%">
                                    <img src={el.OrgImg} alt={el.name} style={{ width: "100%", height: "100%" }} />
                                </Box>
                                <Typography color={palette.grey[300]} mt={".5rem"}>{el.name}</Typography>
                            </Box>
                        ))}
                    </Box>
                    <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
                        {listOfExportData.map((el, index) => (
                            <Box key={index}>
                                <Typography fontSize={"13px"} color={palette.grey[300]}>{el.name} {isAboveNineHundredScreens ? '' : 'is'} {isAboveNineHundredScreens ? 'takes up' : ''} {el.percentage}% { isAboveNineHundredScreens ? 'of the total Kyrgyz Export' : ''}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </DashboardBox>
            <DashboardBox gridArea="f">
                <BoxHeader title="Kyrgyz Export to EU over time" sideText="-1.33%" />
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                        margin={{
                            top: 20,
                            right: 25,
                            bottom: 40,
                            left: -5,
                        }}
                    >
                        <CartesianGrid stroke={palette.grey[800]} />
                        <XAxis
                            dataKey="year"
                            name="year"
                            axisLine={false}
                            tickLine={false}
                            style={{ fontSize: "10px" }}
                        />
                        <YAxis
                            dataKey="export"
                            name="export"
                            axisLine={false}
                            tickLine={false}
                            style={{ fontSize: "10px" }}
                            tickFormatter={FormatNumbersToEuro}
                            domain={[0, 210000000]}
                        />
                        <ZAxis type="number" range={[40]} />
                        <Tooltip formatter={FormatNumbersToEuro} />
                        <Scatter
                            data={EUtrade}
                            fill={palette.tertiary[500]}
                        />
                    </ScatterChart>
                </ResponsiveContainer>
            </DashboardBox>
        </>
    )
}

export default Row2

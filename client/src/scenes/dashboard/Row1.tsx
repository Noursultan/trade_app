import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FormatNumbers from "@/components/FormatNumbers";
import { useGetTradeValuesQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  BarChart,
  Bar,
  LineChart,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
  Area,
} from "recharts";

const Row1 = () => {
  const { palette } = useTheme();
  const { data } = useGetTradeValuesQuery();

  const tradeValues = useMemo(() => {
    return (
        data &&
        data[0].total.map(({ year, export: exportValue, import: importValue }) => {
            return { 
                year: year,
                export: exportValue,
                import: importValue
            };
        })
    );
  }, [data]);

  const growthRate = useMemo(() => {
    if (!data || data.length === 0) {
        return [];
    }
    const growthRateData = data[0].total.map(({ year, export: exportValue, import: importValue }, index) => {
        if (index === 0) {
            return null;
        }
        const prevExportValue = data[0].total[index - 1].export || 0;
        const exportGrowthRate = ((exportValue - prevExportValue) / prevExportValue) * 100 || 0;

        const prevImportValue = data[0].total[index - 1].import || 0;
        const importGrowthRate = ((importValue - prevImportValue) / prevImportValue) * 100 || 0;

        return {
            year: year,
            "export growth rate": exportGrowthRate.toFixed(2),
            "import growth rate": importGrowthRate.toFixed(2)
        };
    }).filter(Boolean);

    return growthRateData;
    }, [data]);

    const exportData = useMemo(() => {
      return (
        data &&
        data[0].total.map(({ year, export: exportData }) => {
          return {
            year: year,
            export: exportData
          };
        })
      );
    }, [data]);

  return (
    <>
      <DashboardBox gridArea="a">
        <BoxHeader
          title="Export and Import since 1991 in USD"
          subtitle="top line represents import, bottom line represents export"
          sideText="-64.36%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={tradeValues}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 60
            }}
          >
            <defs>
              <linearGradient id="exportColor" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="importColor" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="year"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "10px" }}
              tickFormatter={FormatNumbers}
            />
            <Tooltip formatter={(value) => FormatNumbers(value)} />
            <Area
              type="monotone"
              dataKey="export"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#exportColor)"
            />
            <Area
              type="monotone"
              dataKey="import"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#importColor)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="b">
        <BoxHeader
          title="Growth Rate"
          subtitle="green line represents export, purple line represents import"
          sideText="+7.5%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={growthRate}
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
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
              domain={[-35, 135]}
              tickFormatter={(tick) => {return `${tick}%`}}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
              domain={[-25, 40]}
              tickFormatter={(tick) => {return `${tick}%`}}
            />
            <Tooltip formatter={(tick) => {return `${tick}%`}} />
            <Legend
              height={20}
              wrapperStyle={{
                margin: "0 0 10px 0",
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="import growth rate"           
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="export growth rate"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="c">
        <BoxHeader
          title="Total Export Value year by year since 1991 in USD"
          subtitle="graph is representing the kyrgyz export year by year"
          sideText="+29.41%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={exportData}
            margin={{
              top: 17,
              right: 15,
              left: -5,
              bottom: 58,
            }}
          >
            <defs>
              <linearGradient id="colorExport" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="year"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={FormatNumbers}
            />
            <Tooltip formatter={(value) => FormatNumbers(value)} />
            <Bar dataKey="export" fill="url(#colorExport)" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row1;
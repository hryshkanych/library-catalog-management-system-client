import { Box } from "@mui/material";
import { Bar, Line, Pie } from "react-chartjs-2";
import theme from "src/theme/theme";
import { ChartData } from "src/types/chartTypes";

export const generateLineChart = (data: ChartData) => {
  return (
    <Box sx={{maxHeight: 600, overflow: 'auto', display: 'flex', justifyContent: 'center'}}>
      <Line
        data={{
          labels: data.labels,
          datasets: [
            {
              data: data.values,
              borderColor: theme.palette.secondary.light,
              fill: false,
              borderWidth: 2
            }
          ]
        }}
        options={{
          responsive: true,
          scales: {
            x: {
              ticks: {
                color: theme.palette.secondary.light
              }
            },
            y: {
              ticks: {
                color: theme.palette.secondary.light
              }
            }
          },
          plugins: {
            tooltip: {
              backgroundColor: theme.palette.primary.main,
              titleColor: theme.palette.secondary.light,
              bodyColor: theme.palette.secondary.light
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </Box>
  );
};

export const generateBarChart = (data: ChartData) => {
  return (
    <Box sx={{maxHeight: 600, overflow: 'auto', display: 'flex', justifyContent: 'center'}}>
      <Bar
        data={{
          labels: data.labels,
          datasets: [
            {
              data: data.values,
              backgroundColor: theme.palette.primary.light
            }
          ]
        }}
        options={{
          responsive: true,
          scales: {
            x: {
              ticks: {
                color: theme.palette.secondary.light
              }
            },
            y: {
              ticks: {
                color: theme.palette.secondary.light
              }
            }
          },
          plugins: {
            tooltip: {
              backgroundColor: theme.palette.primary.main,
              titleColor: theme.palette.secondary.light,
              bodyColor: theme.palette.secondary.light
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </Box>
  );
};

export const generatePieChart = (data: ChartData) => {
  return (
    <Box sx={{maxHeight: 600, overflow: 'auto', display: 'flex', justifyContent: 'center'}}>
      <Pie
        data={{
          labels: data.labels,
          datasets: [
            {
              data: data.values,
              backgroundColor: [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.info.main, theme.palette.success.main] // Ensure slices have enough contrast
            }
          ]
        }}
        options={{
          responsive: true,
          plugins: {
            tooltip: {
              backgroundColor: theme.palette.primary.main,
              titleColor: theme.palette.secondary.light,
              bodyColor: theme.palette.secondary.light
            },
            legend: {
              labels: {
                color: theme.palette.secondary.light
              }
            }
          }
        }}
      />
    </Box>
  );
};
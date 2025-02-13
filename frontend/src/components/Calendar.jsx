/* eslint-disable react/prop-types */
"use client";
import { Box, Heading } from "@chakra-ui/react";
import { DayPicker } from "react-day-picker";
export default function Calendar({ value, onChange }) {
  return (
    <Box borderRadius="lg" overflow="hidden" p={6} bg="teal.900">
      <Heading as="h2" size="xl" mb={4} color="orange.300">
        Calendar
      </Heading>
      <DayPicker
        onSelect={onChange}
        selected={value}
        mode="single"
        styles={{
          day: {
            color: "orange",
            padding: "0.2em",
            textAlign: "center",
          },
          selectedDay: {
            backgroundColor: "teal",
            color: "white",
            padding: "0.2em",
            textAlign: "center",
          },

          weekdays: {
            color: "orange",
            fontWeight: "bold",
            fontSize: "1.2em",
            width: "100%",
            paddingBlock: "0.5em",
            textAlign: "center",
          },
          month_grid: {
            width: "100%",
            paddingBlock: "0.5em",
          },
          caption: {
            color: "orange",
            fontWeight: "bold",
            marginBottom: "0.5em",
            paddingBlock: "0.2em",
            textAlign: "center",
          },
          button_next: {
            color: "orange.200",
          },
          button_previous: {
            color: "orange",
          },
        }}
      />
    </Box>
  );
}

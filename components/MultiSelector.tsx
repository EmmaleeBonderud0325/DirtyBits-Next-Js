import React, { useState, useEffect, FC, ReactElement } from "react";
import { MultiSelect } from "primereact/multiselect";
import { Skeleton } from "primereact/skeleton";

interface Props {}

export const MultiSelectDemo: FC<Props> = (props): ReactElement => {
  const [lazyItems, setLazyItems] = useState([]);
  const [lazyLoading, setLazyLoading] = useState<boolean>(false);
  const [selectedCities2, setSelectedCities2] = useState(null);

  const cssValues = {
    padding: ".25rem .5rem",
    borderRadius: "3px",
    display: "inline-flex",
    marginRight: ".5rem",
    backgroundColor: "red",
    color: "red",
    minWidth: "15rem",
    paddingTop: ".25rem",
    paddingBottom: ".25rem",
    width: "17px",
  };

  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  const countries = [
    { name: "Australia", code: "AU" },
    { name: "Brazil", code: "BR" },
    { name: "China", code: "CN" },
    { name: "Egypt", code: "EG" },
    { name: "France", code: "FR" },
    { name: "Germany", code: "DE" },
    { name: "India", code: "IN" },
    { name: "Japan", code: "JP" },
    { name: "Spain", code: "ES" },
    { name: "United States", code: "US" },
  ];

  const groupedCities = [
    {
      label: "Germany",
      code: "DE",
      items: [
        { label: "Berlin", value: "Berlin" },
        { label: "Frankfurt", value: "Frankfurt" },
        { label: "Hamburg", value: "Hamburg" },
        { label: "Munich", value: "Munich" },
      ],
    },
    {
      label: "USA",
      code: "US",
      items: [
        { label: "Chicago", value: "Chicago" },
        { label: "Los Angeles", value: "Los Angeles" },
        { label: "New York", value: "New York" },
        { label: "San Francisco", value: "San Francisco" },
      ],
    },
    {
      label: "Japan",
      code: "JP",
      items: [
        { label: "Kyoto", value: "Kyoto" },
        { label: "Osaka", value: "Osaka" },
        { label: "Tokyo", value: "Tokyo" },
        { label: "Yokohama", value: "Yokohama" },
      ],
    },
  ];

  useEffect(() => {
    setLazyItems(Array.from({ length: 100000 }));
    setLazyLoading(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={cssValues}>
      <div className="card">
        <h5>Chips</h5>
        <MultiSelect
          value={selectedCities2}
          options={cities}
          onChange={(e) => setSelectedCities2(e.value)}
          optionLabel="name"
          placeholder="Select a City"
          display="chip"
        />
      </div>
    </div>
  );
};

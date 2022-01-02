import React, { useState } from "react";
import chroma from "chroma-js";
import Select from "react-select";
import { connect, useDispatch } from "react-redux";

import { updateProblemTags } from "../../redux/actions";

function MultiSelect(props) {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(updateProblemTags(Array.isArray(e) ? e.map((x) => x.value) : []));
  };

  const colourOptions = props.value;
  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ":hover": {
        backgroundColor: data.color,
        color: "white",
      },
    }),
  };
  return (
    <div>
      <Select
        closeMenuOnSelect={false}
        defaultValue={[colourOptions[1], colourOptions[2]]}
        isMulti
        name="colors"
        value={colourOptions.filter((obj) =>
          props.tagsValue.includes(obj.value)
        )}
        onChange={handleChange}
        options={colourOptions}
        className="basic-multi-select"
        classNamePrefix="select"
        styles={colourStyles}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    tagsValue: state.addProblemData.tags,
  };
};

export default connect(mapStateToProps, { updateProblemTags })(MultiSelect);

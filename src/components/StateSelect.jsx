import React from 'react';
import {
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from '@material-ui/core';

export default function StateSelect({ value, onChange }) {
  return (
    <FormControl fullWidth>
      <InputLabel>State</InputLabel>
      <Select
        value={value}
        onChange={onChange}
      >
        <MenuItem value="1">Alabama</MenuItem>
        <MenuItem value="2">Alaska</MenuItem>
        <MenuItem value="4">Arizona</MenuItem>
        <MenuItem value="5">Arkansas</MenuItem>
        <MenuItem value="12">California</MenuItem>
        <MenuItem value="13">Colorado</MenuItem>
        <MenuItem value="14">Connecticut</MenuItem>
        <MenuItem value="15">Delaware</MenuItem>
        <MenuItem value="16">District of Columbia</MenuItem>
        <MenuItem value="18">Florida</MenuItem>
        <MenuItem value="19">Georgia</MenuItem>
        <MenuItem value="21">Hawaii</MenuItem>
        <MenuItem value="22">Idaho</MenuItem>
        <MenuItem value="23">Illinois</MenuItem>
        <MenuItem value="24">Indiana</MenuItem>
        <MenuItem value="25">Iowa</MenuItem>
        <MenuItem value="26">Kansas</MenuItem>
        <MenuItem value="27">Kentucky</MenuItem>
        <MenuItem value="28">Louisiana</MenuItem>
        <MenuItem value="29">Maine</MenuItem>
        <MenuItem value="31">Maryland</MenuItem>
        <MenuItem value="32">Massachusetts</MenuItem>
        <MenuItem value="33">Michigan</MenuItem>
        <MenuItem value="34">Minnesota</MenuItem>
        <MenuItem value="35">Mississippi</MenuItem>
        <MenuItem value="36">Missouri</MenuItem>
        <MenuItem value="37">Montana</MenuItem>
        <MenuItem value="38">Nebraska</MenuItem>
        <MenuItem value="39">Nevada</MenuItem>
        <MenuItem value="40">New Hampshire</MenuItem>
        <MenuItem value="41">New Jersey</MenuItem>
        <MenuItem value="42">New Mexico</MenuItem>
        <MenuItem value="43">New York</MenuItem>
        <MenuItem value="44">North Carolina</MenuItem>
        <MenuItem value="45">North Dakota</MenuItem>
        <MenuItem value="47">Ohio</MenuItem>
        <MenuItem value="48">Oklahoma</MenuItem>
        <MenuItem value="49">Oregon</MenuItem>
        <MenuItem value="51">Pennsylvania</MenuItem>
        <MenuItem value="53">Rhode Island</MenuItem>
        <MenuItem value="54">South Carolina</MenuItem>
        <MenuItem value="55">South Dakota</MenuItem>
        <MenuItem value="56">Tennessee</MenuItem>
        <MenuItem value="57">Texas</MenuItem>
        <MenuItem value="58">Utah</MenuItem>
        <MenuItem value="59">Vermont</MenuItem>
        <MenuItem value="61">Virginia</MenuItem>
        <MenuItem value="62">Washington</MenuItem>
        <MenuItem value="63">West Virginia</MenuItem>
        <MenuItem value="64">Wisconsin</MenuItem>
        <MenuItem value="65">Wyoming</MenuItem>
      </Select>
    </FormControl>
  );
}

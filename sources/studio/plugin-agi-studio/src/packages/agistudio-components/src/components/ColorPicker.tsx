import { Paper, ButtonGroup, Button } from '@mui/material';
import * as React from 'react';

export interface ColorPickerProps {
  props: any,
  handleSetColor(color: number): void;
}

export function ColorPicker({props, handleSetColor}: ColorPickerProps) {
  
  return (
    <Paper elevation={1} sx={{ width: '355px', padding: '15px' }}>
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button
        onClick={() => {
          handleSetColor(0);
        }}
        sx={{ height: '35px', 'background-color': 'black' }}
      ></Button>
      <Button
        onClick={() => {
          handleSetColor(1);
        }}
        sx={{ height: '35px', 'background-color': 'blue' }}
      ></Button>
      <Button
        onClick={() => {
          handleSetColor(2);
        }}
        sx={{ height: '35px', 'background-color': 'green' }}
      ></Button>
      <Button
        onClick={() => {
          handleSetColor(3);
        }}
        sx={{ height: '35px', 'background-color': 'Teal' }}
      ></Button>
      <Button
        onClick={() => {
          handleSetColor(4);
        }}
        sx={{ height: '35px', 'background-color': 'red' }}
      ></Button>
      <Button
        onClick={() => {
          handleSetColor(5);
        }}
        sx={{ height: '35px', 'background-color': 'purple' }}
      ></Button>
      <Button
        onClick={() => {
          handleSetColor(6);
        }}
        sx={{ height: '35px', 'background-color': 'brown' }}
      ></Button>
      <Button
        onClick={() => {
          handleSetColor(7);
        }}
        sx={{ height: '35px', 'background-color': 'lightgray' }}
      ></Button>
    </ButtonGroup>

    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button
        onClick={() => {
          handleSetColor(8);
        }}
        sx={{ height: '35px', 'background-color': 'gray' }}
      ></Button>
      <Button
        onClick={() => {
          handleSetColor(9);
        }}
        sx={{ height: '35px', 'background-color': 'RoyalBlue' }}
      ></Button>
      <Button
        onClick={() => {
          handleSetColor(10);
        }}
        sx={{ height: '35px', 'background-color': 'lightgreen' }}
      ></Button>
      <Button
        onClick={() => {
          handleSetColor(11);
        }}
        sx={{ height: '35px', 'background-color': 'Aqua' }}
      ></Button>
      <Button
        onClick={() => {
          handleSetColor(12);
        }}
        sx={{ height: '35px', 'background-color': 'Salmon' }}
      ></Button>
      <Button
        onClick={() => {
          handleSetColor(13);
        }}
        sx={{ height: '35px', 'background-color': 'magenta' }}
      ></Button>
      <Button
        onClick={() => {
          handleSetColor(14);
        }}
        sx={{ height: '35px', 'background-color': 'yellow', color: 'black' }}
      ></Button>
      <Button
        onClick={() => {
          handleSetColor(15);
        }}
        sx={{ height: '35px', 'background-color': 'white', color: 'black' }}
      ></Button>
    </ButtonGroup>
  </Paper>

  );
}

export default ColorPicker;

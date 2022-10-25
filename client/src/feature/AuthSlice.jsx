import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialstate = {
  user: null,
  isError: false,
  isSuccess: false,
  islOading: false,
  message: "",
};

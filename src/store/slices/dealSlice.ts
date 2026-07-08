import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Deal } from "@/src/types/deal";

interface DealState {
  deals: Deal[];
  loading: boolean;
  error: string | null;
}

const initialState: DealState = {
  deals: [],
  loading: false,
  error: null,
};

const dealSlice = createSlice({
  name: "deals",
  initialState,
  reducers: {
    setDeals(state, action: PayloadAction<Deal[]>) {
      state.deals = action.payload;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setDeals, setLoading, setError } = dealSlice.actions;

export default dealSlice.reducer;

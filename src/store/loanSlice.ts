import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface LoanCalculation {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  emi: number;
  totalPayment: number;
  totalInterest: number;
  date: string;
}

interface LoanState {
  history: LoanCalculation[];
}

const initialState: LoanState = {
  history: [],
};

export const loanSlice = createSlice({
  name: 'loan',
  initialState,
  reducers: {
    addToHistory: (state, action: PayloadAction<LoanCalculation>) => {
      state.history.unshift(action.payload);
    },
    clearHistory: state => {
      state.history = [];
    },
  },
});

export const {addToHistory, clearHistory} = loanSlice.actions;
export default loanSlice.reducer;

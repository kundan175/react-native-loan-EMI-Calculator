export const calculateEMI = (
  principal: number,
  interestRate: number,
  tenure: number,
): number => {
  const monthlyRate = interestRate / (12 * 100);
  const totalMonths = tenure * 12;

  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1);

  return Math.round(emi * 100) / 100;
};

export const calculateTotalAmount = (emi: number, tenure: number): number => {
  return Math.round(emi * tenure * 12 * 100) / 100;
};

export const calculateTotalInterest = (
  totalAmount: number,
  principal: number,
): number => {
  return Math.round((totalAmount - principal) * 100) / 100;
};

export interface LoanDetails {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  emi: number;
  totalPayment: number;
  totalInterest: number;
  date: string;
}

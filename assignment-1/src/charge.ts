export type Invoice = {
  total: number;
};

export type Receipt = {
  total: number;
  deposit: number;
  change: number;
};

export type Payment = {
  type: 'CASH' | 'COUPON';
  percentage?: number;
  amount?: number;
};

const calculateDiscountedAmount = (total: number, percentage: number): number => {
  if (percentage < 0 || percentage > 100) {
    throw new Error('Percentage should be between 0 and 100.');
  }

  return Math.floor(total * (percentage / 100));
};

const calculateCouponPaymentAmount = (total: number, payment: Payment): number => {
  if (payment.percentage != null) {
    return calculateDiscountedAmount(total, payment.percentage);
  } else {
    return payment.amount || 0;
  }
};

const calculateCashPaymentAmount = (payment: Payment): number => {
  return payment.amount || 0;
};

const isCouponUsed = (payments: Payment[]): boolean => {
  return payments.every((payment) => payment.type === 'COUPON');
};

export function charge(invoice: Invoice, payments: Payment[]) {
  const total = invoice.total;
  let deposit = 0;

  payments
    .sort((payment) => (payment.type !== 'CASH' ? -1 : 1))
    .map((payment) => {
      if (payment.type === 'COUPON') {
        deposit += calculateCouponPaymentAmount(total, payment);
      } else {
        if (deposit >= total) {
          throw new Error('OverCharge');
        }
        deposit += calculateCashPaymentAmount(payment);
      }
    });
  if (total > deposit) {
    throw new Error('Shortage');
  }

  const change = isCouponUsed(payments) ? 0 : deposit - total;
  return { total, deposit, change };
}

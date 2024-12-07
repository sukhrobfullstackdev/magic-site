/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useCallback } from 'react';
import { Flex, Spacer, TextField } from '@magiclabs/ui';

import styles from './cost-estimator.module.less';

export const CostEstimator: React.FC = () => {
  const [totalMonthlyUsers, setTotalMonthlyUsers] = useState(1000);
  const [totalMonthlyLogins, setTotalMonthlyLogins] = useState(1);

  const monthlyTotalCost = totalMonthlyUsers * Math.min(totalMonthlyLogins, 4) * 0.0085;

  const isNumeric = value => {
    return /^-?\d+$/.test(value);
  };

  const estimatePrice = useCallback(({ target: { value } }) => {
    if (isNumeric(value) || !value) {
      setTotalMonthlyUsers(value);
    }
  }, []);

  return (
    <div className={`price__calculator ${styles.priceCalculator}`}>
      <div className={styles.heading}>COST ESTIMATOR</div>
      <Flex.Column className={styles.content}>
        <label>Active users</label>
        <Spacer size={12} orientation="vertical" />
        <div className={styles.inputWrapper}>
          <TextField value={totalMonthlyUsers} maxLength={8} onChange={e => estimatePrice(e)} size="lg" />
        </div>

        <Spacer size={30} orientation="vertical" />
        <label htmlFor="monthlyLogin">Monthly logins per user</label>
        <Spacer size={12} orientation="vertical" />

        <select
          dir="rtl"
          value={totalMonthlyLogins}
          onChange={e => setTotalMonthlyLogins(Number(e.target.value))}
          className={styles.MonthlyLoginsDropdown}
          id="monthlyLogin"
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4+</option>
        </select>
        <Spacer size={40} orientation="vertical" />
        <Flex.Row className={styles.monthlyTotal} horizontal="space-between" vertical="center">
          <h4>Cost</h4>
          <div className={styles.totalMonthlyCost}>
            <h3>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(monthlyTotalCost > 0 ? monthlyTotalCost : 0)}
              <span style={{ color: 'var(--grayDarker)' }}> /mo</span>
            </h3>
          </div>
        </Flex.Row>
        {totalMonthlyLogins >= 4 && totalMonthlyUsers > 0 && (
          <div className={styles.fairPricingProtection}>FAIR PRICING GUARANTEE</div>
        )}
      </Flex.Column>
    </div>
  );
};

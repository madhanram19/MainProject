import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDepositAmountMutation, useGetDepositQuery } from '../../redux/api';

const Deposit = () => {
  const [amount, setAmount] = useState(0);
  const user = localStorage.getItem('loggedUserId');
  const [depositAmount] = useDepositAmountMutation();
  const { data, isLoading, isError, refetch } = useGetDepositQuery(user);
  const deposit = async () => {
    if (!amount) toast.error('Please Enter Valid Amount');
    try {
      await depositAmount({ user, inr: amount, currency: 'inr' });
      toast.success('amount deposited successfully');
      refetch();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <p>Wallet</p>
      <p>Balance = {data?.balance?.inr || 0}</p>
      <input type="number" onChange={(e) => setAmount(e.target.value)} />
      <button onClick={deposit}>Submit</button>
    </div>
  );
};

export default Deposit;

import { useState } from 'react';

function useShippingState() {
  const [shipping, setShipping] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  return {
    shipping,
    setShipping,
  };
}

export default useShippingState;

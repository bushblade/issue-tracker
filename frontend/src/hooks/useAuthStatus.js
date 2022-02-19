import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useAuthStatus = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setIsLogin(true);
    } else {
      setIsLoading(false);
    }
    setIsLoading(false);
  }, [user]);

  return { isLogin, isLoading };
};

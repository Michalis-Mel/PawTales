import { createContext, useState } from 'react';

export const HomeMsgContext = createContext();

export function HomeMsgProvider({ children }) {
  const [message, setMessage] = useState('');

  return (
    <HomeMsgContext.Provider value={{ message, setMessage }}>
      {children}
    </HomeMsgContext.Provider>
  );
}

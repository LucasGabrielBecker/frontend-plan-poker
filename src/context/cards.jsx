import { createContext } from "preact";
import { useContext, useState, useMemo } from "preact/hooks";

export const CardsContext = createContext({});

export const CardsProvider = ({ children }) => {
  const [cards, setCards] = useState([]);

  return (
    <CardsContext.Provider value={{ cards, setCards }}>
      {children}
    </CardsContext.Provider>
  );
};

export function useCards() {
  const ctx = useContext(CardsContext);

  if (!ctx) {
    throw new Error("useCards must be used within an ReducerProvider");
  }

  return ctx;
}

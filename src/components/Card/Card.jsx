import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Card = ({ card, handleVotingCard }) => {
  const { pathname } = useLocation();
  const isAdmin = pathname.includes("admin");

  return (
    <Container voting={card.voting} className="container">
      <div className="body">
        <div className="header">
          <span>{card.title}</span>
        </div>
        <hr />
        <div className="content">
          <span>{card.description}</span>
        </div>
      </div>
      {isAdmin && (
        <div className="btn" onClick={() => handleVotingCard(card)}>
          Votar
        </div>
      )}
    </Container>
  );
};

export default Card;

const Container = styled.div`
  min-width: 300px;
  max-width: 400px;
  height: 25rem;
  background-color: var(--primary-700);
  color: var(--primary-50);
  border-radius: 1rem;
  padding: 2rem;
  border: ${({ voting }) =>
    voting ? "3px solid #ffffffa6" : "3px solid transparent"};
  box-shadow: inset var(--shadow-elevation-low);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .header {
    text-align: left;
    margin-bottom: 1.2rem;
    span {
      font-weight: 600;
      font-size: 1.8rem;
    }
  }

  .content {
    margin-top: 1.2rem;
    span {
      font-weight: 400;
      font-size: 1.4rem;
    }
  }

  &:not(:first-child) {
    margin-left: 2rem;
  }

  .btn {
    min-height: var(--tap-area-height);
    font-size: 1.6rem;
    background-color: rgba(255, 255, 255, 0.2);
    margin-top: 1.6rem;
    border-radius: 0.4rem;
    display: grid;
    place-items: center;
    cursor: pointer;
    transition: background-color 200ms;
    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
  }

  .points {
  }
`;

const Votes = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const Point = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  background-color: #fff;
  color: #696969;
  margin-left: 1rem;
`;

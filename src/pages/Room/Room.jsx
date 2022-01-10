import { useCallback } from "preact/hooks";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { useReduce } from "../../context/socket";
import toast from "react-hot-toast";

import { useFetch } from "../../hooks/useFetch";
import { Listeners, Card } from "../../components";
import { VotingSection } from "./VotingSection";

import { NoUserForm } from "./NoUserForm";
import env from "../../env";

function Room() {
  const { state } = useReduce();
  const { cards, showVotes } = state;
  const [searchParams] = useSearchParams();
  const room = searchParams.get("room");
  const { loading, error } = useFetch(`${env.BACKEND_URL}/rooms/${room}`);
  const user = localStorage.getItem("user");
  console.log({ user });

  if (error) {
    toast(error);
    return null;
  }

  if (loading) return <h1>carregando...</h1>;

  if (!user) return <NoUserForm />;

  return (
    <Container>
      <Listeners />
      <CardWrapper>
        {cards?.length && cards.map((card) => <Card card={card} room={room} />)}
      </CardWrapper>

      <VotingSection showVotes={showVotes}/>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow-wrap: break-word;
  flex-wrap: wrap;
  padding: 2rem;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  overflow-wrap: break-word;
  flex-wrap: wrap;
`;

export default Room;

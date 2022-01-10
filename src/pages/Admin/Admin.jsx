import styled from "styled-components";
import { useFetch } from "../../hooks";
import { useSearchParams } from "react-router-dom";
import { useReduce } from "../../context/socket";
import { Card } from "../../components";
import { EVENTS } from "../../config/SocketEvents";
import { VotingSection } from "../Room/VotingSection";
import toast from "react-hot-toast";
import env from "../../env";

function Admin() {
  const { dispatch } = useReduce();
  const [searchParams] = useSearchParams();
  const { state } = useReduce();
  const { cards } = state;
  const room = searchParams.get("room");
  const { loading, error } = useFetch(`${env.BACKEND_URL}/rooms/${room}`);
  const handleVotingCard = (card) => {
    dispatch({
      type: EVENTS.EMITTERS.SET_VOTING_CARD,
      payload: { cardId: card._id, room },
    });
  };

  if (loading) return <h1>Carregando...</h1>;
  if (error) toast(error.toString());
  return (
    <Container>
      <Cards>
        {cards &&
          cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleVotingCard={handleVotingCard}
              style={{ marginLeft: 20 }}
            />
          ))}
      </Cards>
      <CustomVotingSection />
    </Container>
  );
}

const Cards = styled.div`
  display: flex;
`;

const Container = styled.main`
  height: 80vh;
  padding: 40px;
  display: flex;
  justify-content: space-around;
`;

const CustomVotingSection = styled(VotingSection)`
  max-height: 300px;
`;
export default Admin;

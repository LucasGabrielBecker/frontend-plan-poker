import styled from "styled-components";
import { Select, DefaultButton } from "../../components";

export const VoteWrapper = ({ getStates }) => {
  const { handleVote, voted } = getStates();

  return (
    <Wrapper onSubmit={handleVote}>
      <Label>Vote por um story point</Label>
      <Select />

      <DefaultButton
        type="submit"
        disabled={voted}
        style={{
          backgroundColor: !voted ? "var(--primary-500)" : "var(--primary-50)",
          cursor: !voted ? "pointer" : "default",
          marginTop: 20,
        }}
      >
        Enviar Voto
      </DefaultButton>
    </Wrapper>
  );
};

const Label = styled.span`
  margin-top: 10px;
  margin-bottom: 10px;
`;
const Wrapper = styled.form`
  width: 80%;
  max-width: 600px;
  display: flex;
  flex-flow: column;
`;

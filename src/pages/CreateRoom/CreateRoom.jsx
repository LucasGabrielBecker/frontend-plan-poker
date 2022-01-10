import { useState, useCallback } from "preact/hooks";
import styled from "styled-components";
import { FadeIn, DefaultButton, DefaultInput } from "../../components";
import ClearIcon from "../../assets/close_icon.svg";
import { useNavigate } from "react-router-dom";
import { useStickyState } from "../../hooks";
import { CardList, Buttons } from "./Components";
import axios from "axios";
import toast from "react-hot-toast";
import useCreateRoom from "../../hooks/useCreateRoom";
const STEPS = {
  CREATING: "creating",
  VOTING: "voting",
};

export default function CreateRoom() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [step, setStep] = useState(STEPS.CREATING);
  const [copyLinks, setCopyLinks] = useState({
    roomId: null,
  });
  const [error, setError] = useState("");
  const [hasAlertedAboutSaving, setHasAlertedAboutSaving] = useStickyState(
    false,
    "alerted-create-cards"
  );
  const [creatingCards, setCreatingCards] = useStickyState(
    false,
    "want-to-create-cards"
  );

  const handleDeleteCard = (cardId) => setCards(prev => prev.filter(card => card.id !== cardId))
  

  const createNewCard = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    if (creatingCards && !title) {
      setError(`Opa vamos la, pelos menos um titulo tem que ter, ne?`);
      return;
    }
    const description = e.target.description.value;
    const newCard = {
      id: Date.now(),
      title,
      description,
    };
    console.log("this is my newCard: ", newCard);
    setCards((prev) => [...prev, newCard]);
    e.target.reset();
  };

  const handleCreatingCard = () => {
    if (!hasAlertedAboutSaving) {
      toast("Vamos salvar esta opcao pra voce", {
        duration: 3000,
        icon: "",
        style: { backgroundColor: "#FFF", color: "#000" },
      });
      setHasAlertedAboutSaving(true);
    }
    setCreatingCards((prev) => !prev);
  };
  const InputOpacityStyle = {
    opacity: creatingCards ? 1 : 0,
    width: "100%",
    marginBottom: 10,
    border: "1px solid var(--primary-50)",
  };

  const handleSkipCardCreation = async () => {
    const { error, data } = await useCreateRoom();
    if (error) {
      toast(error);
      return;
    }

    setStep((prev) => STEPS.VOTING);
    setCopyLinks({
      roomId: data?.room?.name,
    });
  };

  const handleCreateRoom = useCallback(async () => {
    const { error, data } = await useCreateRoom(cards);
    if (error) {
      toast(error.msg);
      return;
    }

    setStep((prev) => STEPS.VOTING);
    setCopyLinks({
      roomId: data?.room?.name,
    });
  }, [cards, step]);

  const handleGoToRoom = () => {
    navigate(`/admin?room=${copyLinks.roomId}`);
  };

  const CreatingCardsComponent = useCallback(
    ({ step, handleCreateRoom }) => (
      <div style={{ display: "flex", flexFlow: "column" }}>
        <DefaultInput
          type="text"
          name="title"
          placeholder="Titulo"
          autoComplete="off"
          style={InputOpacityStyle}
        />
        <DefaultInput
          type="text"
          name="description"
          placeholder="Descricao"
          autoComplete="off"
          width={300}
          style={InputOpacityStyle}
        />
        <ButtonsWrapper>
          <DefaultButton type="submit" style={{ width: 300 }}>
            Adicionar card
          </DefaultButton>
          <Spacer />
          {step === STEPS.CREATING ? (
            <DefaultButton
              onClick={handleCreateRoom}
              type="button"
              style={{ width: 300 }}
            >
              Criar Cards
            </DefaultButton>
          ) : (
            <DefaultButton
              onClick={handleGoToRoom}
              type="button"
              style={{ width: 300 }}
            >
              Iniciar votação
            </DefaultButton>
          )}
        </ButtonsWrapper>
      </div>
    ),
    [step]
  );

  return (
    <Container>
      <CardList cards={cards} handleDeleteCard={handleDeleteCard} />
      <Form onSubmit={createNewCard}>
        <span style={{ color: "var(--primary-300)", fontSize: "1.6rem" }}>
          Voce nao precisa criar cards para votar caso esteja gerenciando-os por
          outra plataforma.
        </span>
        <Wrapper>
          <Label htmlFor="creting-cards">Quero criar meus cards</Label>
          <DefaultInput
            type="checkbox"
            id="creting-cards"
            checked={creatingCards}
            onChange={handleCreatingCard}
            style={{
              width: `3rem`,
              minHeight: `1.8rem`,
              height: `1.2rem`,
              marginTop: 0,
            }}
          />
        </Wrapper>
        {error && (
          <Error>
            {error}
            <img src={ClearIcon} onClick={() => setError("")} width="20" />{" "}
          </Error>
        )}
        {creatingCards ? (
          <CreatingCardsComponent
            step={step}
            handleCreateRoom={handleCreateRoom}
          />
        ) : (
          <FadeIn duration={600} style={{ flex: 1 }}>
            <DefaultButton
              type="button"
              onClick={handleSkipCardCreation}
              style={{
                backgroundColor: "#FFF",
                color: "#696969",
                border: "1px solid var(--primary-200)",
                width: 200,
              }}
              children="Ir direto para votação"
            />
          </FadeIn>
        )}
        {copyLinks.roomId !== null && <Buttons roomId={copyLinks.roomId} />}
      </Form>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Form = styled.form`
  width: 60%;
  height: max-content;
  background-color: #fff;

  display: flex;
  flex-direction: column;
  padding: 4rem;
  border-radius: 4rem;
`;
const Label = styled.label`
  color: #696969;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 5rem 0;
`;
const Error = styled.span`
  color: #7b2a2a;
  font-weight: 300;
  font-size: 1.6rem;
  margin-top: 3rem;

  display: flex;
`;
const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Spacer = styled.div`
  width: 3rem;
`;

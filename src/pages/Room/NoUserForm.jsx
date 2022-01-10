import { Modal, DefaultInput, DefaultButton } from "../../components";
import { EVENTS } from "../../config/SocketEvents";
import { useReduce } from "../../context/socket";

export const NoUserForm = () => {
  const { dispatch } = useReduce();
  const onSubmit = (e) => {
    e.preventDefault();
    const nickname = e.target.name.value;
    dispatch({
      type: EVENTS.EMITTERS.REGISTER,
      payload: { username: nickname },
    });
  };

  return (
    <Modal>
      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          flexFlow: "column",
          marginTop: 40,
        }}
      >
        <DefaultInput
          type="text"
          placeholder="Como voce gostaria de ser chamado?"
          name="name"
        />
        <DefaultButton type="submit" style={{ marginTop: 20 }}>
          Entrar
        </DefaultButton>
      </form>
    </Modal>
  );
};

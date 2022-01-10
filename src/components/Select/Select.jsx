import styled from "styled-components";
import arrowDown from "../../assets/arrow_down.svg";

const options = [
  { value: 0.5 },
  { value: 2 },
  { value: 3 },
  { value: 5 },
  { value: 8 },
];
const Select = () => (
  <SelectWrapper>
    <CustomSelect id="select" name="points">
      <option value="0" selected disabled>
        0
      </option>
      {options.map(({ value }) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </CustomSelect>
    <ArrowDown src={arrowDown} alt="arrow down" />
  </SelectWrapper>
);

const CustomSelect = styled.select`
  -webkit-appearance: none;
  padding: 7px 40px 7px 12px;
  width: 100%;
  border: 1px solid #e8eaed;
  border-radius: 5px;
  background: #bfdded;
  box-shadow: var(--shadow-elevation-low);
  cursor: pointer;
  font-family: inherit;
  font-size: 16px;
  transition: all 150ms ease;
  color: #003a59;

  &:required:invalid {
    color: #5a667f;
  }

  option {
    color: #696969;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(#0077ff, 0.2);
  }

  &:hover + img {
    transform: rotate(90deg);
    transition: transform 200ms;
  }

  .sprites {
    position: absolute;
    width: 0;
    height: 0;
    pointer-events: none;
    user-select: none;
  }
`;

const ArrowDown = styled.img`
  width: 3rem;
  height: 3rem;
  will-change: transform;
  transition: transform 500ms;
  pointer-events: none;
  position: absolute;
  right: 2rem;
  top: 0.8rem;
`;

const SelectWrapper = styled.div`
  position: relative;
`;
export default Select;

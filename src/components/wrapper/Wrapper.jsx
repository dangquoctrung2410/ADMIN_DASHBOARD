import "./Wrapper.css";

function Wrapper({ children, custom }) {
  return <div className={"wrapper-global"}>{children}</div>;
}

export default Wrapper;

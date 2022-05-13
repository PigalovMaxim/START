import cn from "classnames";
import s from "./Input.module.scss";

function Input(props) {
  return (
    <div className={cn(s.wrapper, props.wrapclx ? props.wrapclx : "")}>
      {props.img ? <img src={props.img}/> : <div/>}
      <input
        ref={props.refer}
        className={cn(s.inp, props.classnames ? props.classnames : "")}
        placeholder={props.text ? props.text : ""}
      />
    </div>
  );
}

export default Input;

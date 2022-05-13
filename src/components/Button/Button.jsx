import cn from "classnames";
import s from "./Button.module.scss";

function Button(props) {
  return (
    <button onClick={props.click ? props.click : () => {}} className={cn(s.btn, props.classnames ? props.classnames : "")}>
      {props.text ? props.text : ""}
    </button>
  );
}

export default Button;

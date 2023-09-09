export function Button1(props) {
  return (
    <button
      type={props.type}
      className=" h-[50px] py-1 px-5 bg-primaryOrange6 rounded-full active:text-primaryOrange1 text-primaryOrange2 hover:text-primaryOrange3 disabled:bg-primaryGray6 disabled:text-primaryGray5"
    >
      {props.button}
    </button>
  );
}

export function Button2(props) {
  return (
    <button
      type={props.type}
      className=" h-[50px] px-5 py-1 bg-primaryOrange2 rounded-full active:bg-primaryOrange1 text-white hover:bg-primaryOrange3 disabled:bg-primaryGray4 disabled:text-primaryGray3"
    >
      {props.button}
    </button>
  );
}

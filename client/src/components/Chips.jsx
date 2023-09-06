export function ChipsOrange(props) {
  return (
    <div className="inline-flex items-center border border-primaryOrange3 rounded-full px-3 py-1 text-primaryOrange3 bg-primaryOrange6">
      <span className="text-sm font-semibold">{props.petType}</span>
    </div>
  );
}

export function ChipsGreen(props) {
  return (
    <div className="inline-flex items-center border  border-secondaryGreen1 rounded-full px-3 py-1 text-secondaryGreen1 bg-secondaryGreen2">
      <span className="text-sm font-semibold">{props.petType}</span>
    </div>
  );
}

export function ChipsPink(props) {
  return (
    <div className="inline-flex items-center border  border-secondaryPink1 rounded-full px-3 py-1 text-secondaryPink1 bg-secondaryPink2">
      <span className="text-sm font-semibold">{props.petType}</span>
    </div>
  );
}

export function ChipsBlue(props) {
  return (
    <div className="inline-flex items-center border  border-secondaryBlue1 rounded-full px-3 py-1 text-secondaryBlue1 bg-secondaryBlue2">
      <span className="text-sm font-semibold">{props.petType}</span>
    </div>
  );
}


import './Styles.scss'
 type InputProps = {
  value: string,
  onChange: (e:  React.ChangeEvent<HTMLInputElement>)=>void
}
export default function Input({value,onChange}: InputProps) {
  return <input value={value} onChange={onChange} className='search-text' aria-label="Demo input" placeholder="Type something…" />;
}



const Button = ({text,onClick}:{text:string,onClick?:()=>void}) => {
  return (
    <button onClick={onClick} className='text-white bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-700 hover:to-purple-500 rounded-lg px-4 py-4 font-semibold text-sm shadow-md transition-all duration-1000 ease-in-out
  '>
    {text}
  </button>
  )
}

export default Button
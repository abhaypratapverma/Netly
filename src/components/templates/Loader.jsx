import loader from "../../assets/loader.gif";
const Loader = () => {
  return (
    <div className='flex justify-center items-center w-full h-full '>
        <img className="rounded-full h-25 w-25" src={loader} alt="" />
    </div>
  )
}

export default Loader
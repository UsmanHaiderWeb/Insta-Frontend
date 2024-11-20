import React , { memo } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AllSearchedUsers = () => {
    const searches = useSelector(state => state.searches);

return (<>
    {searches.map((i, idx) => (
        <Link key={`${i}, ${idx}`} to={`/profile/${i._id}`} className='w-full flex justify-between items-center pr-3'>
            <div className='flex justify-start items-center gap-x-3'>
                <Link to={`/profile/${i._id}`} className='w-12 h-12 rounded-full overflow-hidden' style={{boxShadow: "0px 0px 5px 0.5px black"}}>
                    <img src={i.dp} className='w-full h-full object-cover object-center' />
                </Link>
                <div>
                    <h5>{i.username}</h5>
                    <p className='opacity-85 text-[14px] tracking-wide'>{i.email}</p>
                </div>
            </div>
            <Link to={`/profile/${i._id}`}>
                <svg className='w-7 fill-[#5a5a5a]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path></svg>
            </Link>
        </Link>
    ))}
</>)}

export default memo(AllSearchedUsers)
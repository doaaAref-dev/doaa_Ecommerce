
import { DahTables } from '../../Components/DashTables'

import { IoEyeOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
export default function  Banner1 () {
      const Home_Banner_List_columns = [
    { id: "Slide_image", label: "Image", minWidth: 150 },
   

    { id: "Action", label: "Action", minWidth: 150 }
  ];


  const Home_Banner_List_rows = [
     {
       image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTBJhtmntGMjfOkZ96qBDvImBu2PXMz-z-cRrMdymVj5VzbnPKVoIv-99899g3__JKAiAkTxjUtan4wv7J1A3I7OlKScX-VXGmDuLgoz8um453EyEttlM5AblJWa6nd2UM_RykrslfD9zo&usqp=CAc", name: 'Food',
       Action: <div className='flex gap-3 items-center'><button><IoEyeOutline size={25} color='#2377fc' />
       </button><button><CiEdit size={25} color='#22c55e' />
         </button><button><RiDeleteBinLine size={25} color='#ff5200' />
         </button></div>,
     },
     {
       image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS52SOVpHkII5bus8eryzVLRommeXG8dLhdVaCWyhsJDlm4hTHocYf90W8D2WidrFKw54DXsPccdPfXlKFqGDY13S0E7aYJ3_mP3ZCqPnRg0hUKVI-64oTsZ4c7PbDW1nVYStkC0QM&usqp=CAc", name: "Fasion", Action: <div className='flex gap-3 items-center'><button><IoEyeOutline size={25} color='#2377fc' />
       </button><button><CiEdit size={25} color='#22c55e' />
         </button><button><RiDeleteBinLine size={25} color='#ff5200' />
         </button></div>, 
        
     },
     {
       image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS52SOVpHkII5bus8eryzVLRommeXG8dLhdVaCWyhsJDlm4hTHocYf90W8D2WidrFKw54DXsPccdPfXlKFqGDY13S0E7aYJ3_mP3ZCqPnRg0hUKVI-64oTsZ4c7PbDW1nVYStkC0QM&usqp=CAc", name: 'Electronics', Action: <div className='flex gap-3 items-center'><button><IoEyeOutline size={25} color='#2377fc' />
       </button><button><CiEdit size={25} color='#22c55e' />
         </button><button><RiDeleteBinLine size={25} color='#ff5200' />
         </button></div>, 
     },
   ];
  return (
    <div className='ProductList_Content !pl-[300px] !py-[100px] flex flex-col gap-3 !pr-[50px] bg-[#8fbac740]'>
     <DahTables
                columns={Home_Banner_List_columns}
                rows={Home_Banner_List_rows}
                title="Home Slider Banners"
              />
    </div>
  )
}

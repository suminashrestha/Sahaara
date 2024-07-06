import { memo } from "react";
import { FaPhone, FaWhatsapp, FaEnvelope } from "react-icons/fa";

 const BottomContact= memo(function BottomContact() {
  return (
    <div className="h-[9vh] w-[100vw] bg-black text-white sticky bottom-0 flex justify-center items-center ">
      <div className="w-[70%] flex justify-around">
        <a href="tel:9810007834">
          <FaPhone />
        </a>
        <a href="mailto: manandharsomash@gmail.com">
          <FaEnvelope />
        </a>
        <a href="whatsapp://send?phone=9810007834">
          <FaWhatsapp />
        </a>
      </div>
    </div>
  );
}
)

export default BottomContact;

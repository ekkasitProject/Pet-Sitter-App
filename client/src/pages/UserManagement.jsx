import Header from "../components/Header";
import UserProfile from "../components/UserProfile";
import React, { useEffect, useState } from "react";
import YourPet from "../components/YourPet";
import BookingHistory from "../components/BookingHistory";

function UserManagement() {
  const [toggleProfile, setToggleProfile] = useState(true);
  const [toggleYourPet, setToggleYourPet] = useState(false);
  const [toggleBooking, setToggleBooking] = useState(false);

  const handleToggleProfile = () => {
    setToggleProfile(true);
    setToggleYourPet(false);
    setToggleBooking(false);
  };
  const handleToggleYourPet = () => {
    setToggleProfile(false);
    setToggleYourPet(true);
    setToggleBooking(false);
  };
  const handleToggleBooking = () => {
    setToggleProfile(false);
    setToggleYourPet(false);
    setToggleBooking(true);
  };

  return (
    <>
      <Header />
      <div className="w-full h-full flex mt-10 font-satoshi">
        <div className="  w-2/5 h-full flex justify-center p-11">
          <div className=" shadow-custom3 w-[300px] h-2/12 rounded-xl  ml-10 flex flex-col flex-wrap leading-[3rem]">
            <div className="text-headLine4 flex justify-start items-center  pl-7">
              Account
            </div>
            <button
              onClick={handleToggleProfile}
              className="text-headLine5 gap-4 text-primaryGray3  flex justify-start items-center p-4 pl-7 hover:text-primaryOrange2 active:text-primaryOrange2 active:bg-primaryOrange6 focus:text-primaryOrange2 focus:bg-primaryOrange6 hover:fill-primaryOrange2 focus:fill-primaryOrange2 active:fill-primaryOrange2"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-0 stroke-current fill-current"
              >
                <path d="M15.7085 12.7096C16.6889 11.9383 17.4045 10.8806 17.7558 9.68358C18.107 8.4866 18.0765 7.2099 17.6683 6.0311C17.2602 4.85231 16.4948 3.83003 15.4786 3.10649C14.4624 2.38296 13.246 1.99414 11.9985 1.99414C10.7511 1.99414 9.53465 2.38296 8.51846 3.10649C7.50228 3.83003 6.73688 4.85231 6.32874 6.0311C5.92061 7.2099 5.89004 8.4866 6.24129 9.68358C6.59254 10.8806 7.30814 11.9383 8.28853 12.7096C6.60861 13.3827 5.14282 14.499 4.04742 15.9396C2.95203 17.3801 2.26809 19.0909 2.06853 20.8896C2.05409 21.021 2.06565 21.1538 2.10256 21.2807C2.13947 21.4075 2.201 21.5259 2.28364 21.629C2.45055 21.8371 2.69332 21.9705 2.95853 21.9996C3.22375 22.0288 3.48969 21.9514 3.69786 21.7845C3.90602 21.6176 4.03936 21.3749 4.06853 21.1096C4.28812 19.1548 5.22022 17.3494 6.68675 16.0384C8.15328 14.7274 10.0514 14.0027 12.0185 14.0027C13.9856 14.0027 15.8838 14.7274 17.3503 16.0384C18.8168 17.3494 19.7489 19.1548 19.9685 21.1096C19.9957 21.3554 20.113 21.5823 20.2976 21.7467C20.4823 21.911 20.7213 22.0011 20.9685 21.9996H21.0785C21.3407 21.9695 21.5803 21.8369 21.7451 21.6309C21.9099 21.4248 21.9866 21.162 21.9585 20.8996C21.758 19.0958 21.0704 17.3806 19.9694 15.9378C18.8684 14.4951 17.3954 13.3791 15.7085 12.7096ZM11.9985 11.9996C11.2074 11.9996 10.434 11.765 9.77625 11.3255C9.11845 10.886 8.60576 10.2613 8.30301 9.53037C8.00026 8.79947 7.92105 7.9952 8.07539 7.21928C8.22973 6.44335 8.61069 5.73062 9.1701 5.17121C9.72951 4.6118 10.4422 4.23084 11.2182 4.0765C11.9941 3.92215 12.7984 4.00137 13.5293 4.30412C14.2602 4.60687 14.8849 5.11956 15.3244 5.77736C15.7639 6.43515 15.9985 7.20851 15.9985 7.99964C15.9985 9.0605 15.5771 10.0779 14.827 10.8281C14.0768 11.5782 13.0594 11.9996 11.9985 11.9996Z" />
              </svg>
              Profile
            </button>
            <button
              onClick={handleToggleYourPet}
              className="text-headLine5 gap-4 text-primaryGray3  flex justify-start items-center p-4 pl-7 hover:text-primaryOrange2 active:text-primaryOrange2 active:bg-primaryOrange6 focus:text-primaryOrange2 focus:bg-primaryOrange6 hover:fill-primaryOrange2 focus:fill-primaryOrange2 active:fill-primaryOrange2"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="stroke-0 stroke-current fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16.2481 12.378C15.3157 10.889 13.7276 10 12 10C10.2725 10 8.68429 10.889 7.75201 12.378L5.50519 15.9657C5.1324 16.5611 4.9604 17.2486 5.00767 17.954C5.05494 18.6596 5.31721 19.3166 5.76604 19.8543C6.21518 20.3919 6.80867 20.7592 7.4823 20.9168C8.15594 21.0743 8.84649 21.0071 9.47918 20.7225L9.52044 20.7037C11.1126 20.0012 12.9324 20.0075 14.5206 20.7225C14.9302 20.9068 15.3642 21 15.8021 21C16.0402 21 16.2797 20.9723 16.517 20.917C17.1907 20.7595 17.7841 20.3922 18.2334 19.8546C18.6824 19.3171 18.9449 18.6599 18.9923 17.9544C19.0397 17.2486 18.8677 16.5611 18.4949 15.9656L16.2481 12.378ZM17.3103 19.0465C16.7388 19.7303 15.8143 19.9465 15.0096 19.5844C14.0531 19.1538 13.0265 18.9386 11.9995 18.9386C10.9735 18.9386 9.94698 19.1536 8.99114 19.5837L8.96395 19.596C8.16542 19.9417 7.25449 19.7227 6.6893 19.0465C6.11843 18.3625 6.05345 17.3941 6.52773 16.6366L8.77471 13.0489C9.48266 11.9184 10.6883 11.2434 12 11.2434C13.3117 11.2434 14.5175 11.9184 15.2256 13.0489L17.4722 16.6365C17.9467 17.3943 17.8815 18.3628 17.3103 19.0465Z" />
                <path d="M5.49763 12.8405C6.12624 12.5765 6.60379 12.0227 6.84241 11.2809C7.06929 10.5751 7.05071 9.77818 6.78978 9.03689C6.52871 8.2961 6.05383 7.69137 5.45273 7.33389C4.82101 6.95853 4.12713 6.89741 3.49957 7.1619C2.23701 7.69267 1.65761 9.39859 2.20816 10.9655C2.64795 12.2127 3.67367 13 4.71069 13C4.97548 13 5.24102 12.9486 5.49763 12.8405ZM3.27417 10.5169C2.94976 9.59351 3.23478 8.61131 3.90992 8.32747C4.03183 8.2761 4.16073 8.25058 4.29231 8.25058C4.4954 8.25058 4.70519 8.31122 4.90709 8.43135C5.27016 8.64707 5.56023 9.02161 5.72377 9.48573C5.88717 9.95017 5.90174 10.4405 5.76466 10.8665C5.63902 11.257 5.39861 11.5441 5.08788 11.6746C4.41363 11.9588 3.59963 11.4394 3.27417 10.5169Z" />
                <path d="M9.99984 9C11.6541 9 13 7.43009 13 5.5004C13 3.57023 11.6541 2 9.99984 2C8.34573 2 7 3.57023 7 5.5004C7 7.43009 8.34573 9 9.99984 9ZM9.99984 3.22578C10.9939 3.22578 11.8028 4.24622 11.8028 5.5004C11.8028 6.7541 10.9939 7.77422 9.99984 7.77422C9.00582 7.77422 8.19723 6.7541 8.19723 5.5004C8.19723 4.24622 9.00582 3.22578 9.99984 3.22578Z" />
                <path d="M15.9387 9.87912C16.2117 9.96092 16.4904 10 16.7677 10C18.062 10 19.3233 9.14965 19.8046 7.84281C20.0818 7.09054 20.0635 6.29512 19.7533 5.60322C19.4286 4.87902 18.827 4.35327 18.059 4.12268C17.291 3.8924 16.46 3.98838 15.7196 4.39311C15.0123 4.77988 14.4703 5.40704 14.1936 6.15931C13.6094 7.74623 14.3922 9.41494 15.9387 9.87912ZM15.4125 6.52495C15.5932 6.03375 15.9386 5.62902 16.3851 5.38486C16.7982 5.15895 17.2489 5.10146 17.6539 5.22294C18.0588 5.34457 18.3815 5.634 18.5627 6.03813C18.7584 6.47485 18.7668 6.98581 18.5857 7.47701C18.2248 8.45729 17.2191 9.0413 16.344 8.77887C15.4695 8.5163 15.0515 7.50523 15.4125 6.52495Z" />
                <path d="M22.1082 10.4868C21.0511 9.58343 19.4697 9.97448 18.5833 11.3596C17.6978 12.7454 17.8362 14.6084 18.8917 15.5124C19.2767 15.8423 19.7315 16 20.197 16C21.0084 16 21.8525 15.5209 22.4166 14.6399C23.3022 13.2542 23.1639 11.3912 22.1082 10.4868ZM21.525 13.8764C21.0016 14.6937 20.1166 14.9648 19.5519 14.4809C18.9876 13.9977 18.9532 12.9396 19.4752 12.1228C19.8222 11.5806 20.329 11.2789 20.7961 11.2789C21.0324 11.2789 21.2585 11.3561 21.4485 11.5186C22.0123 12.0024 22.0466 13.0601 21.525 13.8764Z" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.50688 15.9659L7.7537 12.3782C8.68598 10.8892 10.2742 10.0002 12.0017 10.0002C13.7293 10.0002 15.3174 10.8892 16.2498 12.3782L18.4966 15.9658C18.8694 16.5613 19.0414 17.2488 18.994 17.9545C18.9466 18.6601 18.6841 19.3172 18.2351 19.8548C17.7858 20.3924 17.1923 20.7597 16.5187 20.9172C16.2814 20.9725 16.0419 21.0002 15.8038 21.0002C15.3659 21.0002 14.9319 20.907 14.5223 20.7227C12.9341 20.0077 11.1143 20.0014 9.52213 20.7039L9.48087 20.7227C8.84818 21.0073 8.15763 21.0745 7.48399 20.917C6.81036 20.7594 6.21687 20.3921 5.76773 19.8545C5.3189 19.3168 5.05663 18.6598 5.00936 17.9542C4.96209 17.2488 5.13409 16.5613 5.50688 15.9659ZM9.64468 20.9777C9.6442 20.9779 9.64371 20.9782 9.64323 20.9784L9.60396 20.9963C8.9114 21.3078 8.15362 21.3816 7.41571 21.2091C6.67791 21.0365 6.02782 20.6337 5.53751 20.0468C5.04767 19.46 4.76149 18.7424 4.71003 17.9743C4.65857 17.2063 4.84607 16.456 5.25261 15.8067L7.49943 12.219C8.48542 10.6442 10.1687 9.7002 12.0017 9.7002C13.8348 9.7002 15.5179 10.6443 16.5041 12.2189L17.8337 14.342C17.5532 13.3431 17.7218 12.1535 18.3322 11.1982C19.2842 9.7107 21.067 9.20113 22.3048 10.2589C23.5021 11.2846 23.6156 13.3237 22.6711 14.8017C22.062 15.7529 21.1299 16.3002 20.1987 16.3002C19.6725 16.3002 19.1574 16.1242 18.7221 15.7606L18.7509 15.8065C19.1574 16.4559 19.3449 17.2064 19.2933 17.9747C19.2417 18.7428 18.9554 19.4604 18.4654 20.0471C17.9749 20.6339 17.3249 21.0368 16.587 21.2093C16.3277 21.2698 16.0652 21.3002 15.8038 21.3002C15.3229 21.3002 14.847 21.1977 14.3992 20.9963C12.8891 20.3165 11.1587 20.3102 9.64468 20.9777ZM18.8934 15.5126C19.2784 15.8425 19.7332 16.0002 20.1987 16.0002C21.0101 16.0002 21.8542 15.5211 22.4183 14.6401C23.3039 13.2544 23.1656 11.3914 22.1099 10.487C21.0528 9.58363 19.4714 9.97467 18.585 11.3598C17.6994 12.7456 17.8379 14.6086 18.8934 15.5126ZM8.99284 19.5839C9.94867 19.1538 10.9752 18.9387 12.0012 18.9387C13.0282 18.9387 14.0548 19.154 15.0113 19.5846C15.816 19.9467 16.7405 19.7305 17.312 19.0467C17.8832 18.363 17.9483 17.3945 17.4739 16.6367L15.2272 13.0491C14.5191 11.9186 13.3134 11.2436 12.0017 11.2436C10.69 11.2436 9.48435 11.9186 8.7764 13.0491L6.52942 16.6368C6.05514 17.3943 6.12012 18.3627 6.691 19.0467C7.25618 19.7229 8.16711 19.9419 8.96564 19.5962L8.99284 19.5839ZM8.84433 19.3218L8.86921 19.3106C9.86425 18.8628 10.9333 18.6387 12.0012 18.6387C13.0701 18.6387 14.1388 18.8628 15.1344 19.311C15.8147 19.6172 16.5953 19.4364 17.0818 18.8543C17.5694 18.2707 17.6255 17.4441 17.2196 16.7959L14.973 13.2083C14.973 13.2083 14.973 13.2083 14.973 13.2083C14.3186 12.1636 13.2079 11.5436 12.0017 11.5436C10.7954 11.5436 9.6849 12.1636 9.03066 13.2083L6.7837 16.796C6.78369 16.796 6.7837 16.796 6.7837 16.796C6.37802 17.444 6.43395 18.2705 6.92132 18.8545C7.40195 19.4294 8.17002 19.6126 8.84433 19.3218ZM6.8441 11.2811C6.60548 12.0229 6.12793 12.5767 5.49932 12.8407C5.24271 12.9488 4.97717 13.0002 4.71238 13.0002C3.67536 13.0002 2.64964 12.2129 2.20985 10.9657C1.6593 9.39879 2.2387 7.69286 3.50126 7.1621C4.12882 6.89761 4.8227 6.95873 5.45442 7.33409C6.05552 7.69156 6.5304 8.29629 6.79147 9.03709C7.0524 9.77837 7.07098 10.5753 6.8441 11.2811ZM3.385 6.88554C4.10804 6.58091 4.90168 6.6567 5.60767 7.07618C6.27658 7.47398 6.79303 8.13896 7.07441 8.93737C7.35572 9.73655 7.37788 10.6008 7.12971 11.3729C6.86854 12.1847 6.33684 12.8144 5.61549 13.1173C5.32149 13.2411 5.0164 13.3002 4.71238 13.3002C3.52058 13.3002 2.39907 12.4044 1.92693 11.0655C1.34096 9.39774 1.93274 7.49605 3.385 6.88554ZM3.91161 8.32767C3.23647 8.6115 2.95145 9.5937 3.27587 10.5171C3.60132 11.4396 4.41532 11.959 5.08957 11.6748C5.40031 11.5443 5.64072 11.2572 5.76635 10.8667C5.90343 10.4407 5.88886 9.95036 5.72546 9.48592C5.56192 9.02181 5.27185 8.64726 4.90878 8.43154C4.70688 8.31141 4.49709 8.25078 4.294 8.25078C4.16242 8.25078 4.03352 8.2763 3.91161 8.32767ZM5.44246 9.58549C5.29821 9.1762 5.04839 8.86345 4.75554 8.68946C4.59401 8.59334 4.43648 8.55078 4.294 8.55078C4.20174 8.55078 4.1125 8.56856 4.0281 8.60413C3.79522 8.70203 3.60408 8.93182 3.50701 9.26618C3.41042 9.59888 3.41613 10.0112 3.55888 10.4175C3.70219 10.8236 3.94819 11.1263 4.21332 11.2956C4.47693 11.4638 4.74512 11.4944 4.97306 11.3984C5.18572 11.309 5.37558 11.1018 5.48076 10.7748C5.59574 10.4175 5.58642 9.99468 5.44246 9.58549ZM15.8542 10.1667C14.1285 9.64869 13.2748 7.79142 13.9138 6.05585C14.2157 5.23504 14.8068 4.55142 15.5773 4.13009C16.384 3.68912 17.2977 3.5809 18.1468 3.83552C18.9973 4.09085 19.668 4.67607 20.0287 5.48069C20.373 6.24856 20.3904 7.1255 20.0878 7.94668C19.5633 9.37075 18.1902 10.3002 16.7694 10.3002C16.4638 10.3002 16.1559 10.2571 15.8542 10.1667ZM19.8063 7.843C20.0835 7.09074 20.0652 6.29532 19.755 5.60341C19.4303 4.87922 18.8287 4.35346 18.0607 4.12288C17.2927 3.8926 16.4617 3.98857 15.7213 4.3933C15.014 4.78007 14.472 5.40724 14.1953 6.1595C13.611 7.74642 14.3939 9.41513 15.9404 9.87932C16.2134 9.96111 16.4921 10.0002 16.7694 10.0002C18.0637 10.0002 19.325 9.14984 19.8063 7.843ZM15.6957 6.6288C15.3797 7.48709 15.7615 8.29035 16.4318 8.49171C17.1232 8.69904 17.9875 8.23847 18.3059 7.37355C18.4626 6.94849 18.4512 6.51924 18.2906 6.16103C18.1431 5.83207 17.8864 5.60569 17.5693 5.51045C17.2502 5.41478 16.8821 5.4561 16.5307 5.64826C16.1498 5.85657 15.8521 6.20363 15.6957 6.6288ZM17.6556 5.22313C18.0605 5.34476 18.3832 5.6342 18.5644 6.03832C18.7601 6.47504 18.7685 6.98601 18.5874 7.47721C18.2265 8.45749 17.2208 9.04149 16.3457 8.77907C15.4712 8.51649 15.0532 7.50543 15.4142 6.52514C15.5949 6.03395 15.9403 5.62922 16.3868 5.38505C16.7999 5.15915 17.2506 5.10165 17.6556 5.22313ZM19.5536 14.4811C20.1183 14.965 21.0033 14.6939 21.5267 13.8766C22.0483 13.0603 22.014 12.0026 21.4502 11.5188C21.2602 11.3563 21.034 11.2791 20.7978 11.2791C20.3307 11.2791 19.8239 11.5808 19.4769 12.123C18.9549 12.9398 18.9893 13.9979 19.5536 14.4811ZM19.7296 12.2847C19.5008 12.6428 19.3959 13.0518 19.4077 13.4174C19.4197 13.7859 19.5478 14.0812 19.7487 14.2533C19.9422 14.4191 20.1942 14.4638 20.4678 14.38C20.7463 14.2946 21.0442 14.0737 21.2741 13.7148C21.5026 13.357 21.6075 12.9482 21.5956 12.5827C21.5837 12.2143 21.4558 11.9189 21.2549 11.7466C21.1217 11.6327 20.9657 11.5791 20.7978 11.5791C20.4585 11.5791 20.0367 11.8047 19.7296 12.2847ZM13.3017 5.50059C13.3017 7.55097 11.8632 9.3002 10.0015 9.3002C8.14003 9.3002 6.70169 7.55093 6.70169 5.50059C6.70169 3.44984 8.13998 1.7002 10.0015 1.7002C11.8632 1.7002 13.3017 3.44981 13.3017 5.50059ZM11.5045 5.50059C11.5045 4.34336 10.7686 3.52597 10.0015 3.52597C9.2345 3.52597 8.49892 4.34329 8.49892 5.50059C8.49892 6.65732 9.23442 7.47442 10.0015 7.47442C10.7687 7.47442 11.5045 6.65725 11.5045 5.50059ZM13.0017 5.50059C13.0017 7.43028 11.6558 9.0002 10.0015 9.0002C8.34742 9.0002 7.00169 7.43028 7.00169 5.50059C7.00169 3.57043 8.34742 2.0002 10.0015 2.0002C11.6558 2.0002 13.0017 3.57043 13.0017 5.50059ZM11.8045 5.50059C11.8045 4.24642 10.9956 3.22597 10.0015 3.22597C9.00751 3.22597 8.19892 4.24642 8.19892 5.50059C8.19892 6.75429 9.00751 7.77442 10.0015 7.77442C10.9956 7.77442 11.8045 6.75429 11.8045 5.50059Z"
                />
              </svg>
              Your Pet
            </button>
            <button
              onClick={handleToggleBooking}
              className="text-headLine5 pb-5 gap-4 text-primaryGray3  flex justify-start items-center p-4 pl-7 hover:text-primaryOrange2 active:text-primaryOrange2 active:bg-primaryOrange6 focus:text-primaryOrange2 focus:bg-primaryOrange6 hover:fill-primaryOrange2 focus:fill-primaryOrange2 active:fill-primaryOrange2"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="stroke-0 stroke-current fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3.71023 16.29C3.61513 16.199 3.50298 16.1276 3.38023 16.08C3.13677 15.98 2.86369 15.98 2.62023 16.08C2.49748 16.1276 2.38534 16.199 2.29023 16.29C2.19919 16.3851 2.12783 16.4972 2.08023 16.62C2.00365 16.8021 1.98273 17.0028 2.0201 17.1968C2.05748 17.3908 2.15147 17.5694 2.29023 17.71C2.38743 17.7983 2.49905 17.8694 2.62023 17.92C2.73993 17.9729 2.86936 18.0002 3.00023 18.0002C3.1311 18.0002 3.26053 17.9729 3.38023 17.92C3.50142 17.8694 3.61303 17.7983 3.71023 17.71C3.84899 17.5694 3.94299 17.3908 3.98036 17.1968C4.01773 17.0028 3.99681 16.8021 3.92023 16.62C3.87264 16.4972 3.80127 16.3851 3.71023 16.29ZM7.00023 8H21.0002C21.2654 8 21.5198 7.89464 21.7073 7.70711C21.8949 7.51957 22.0002 7.26522 22.0002 7C22.0002 6.73478 21.8949 6.48043 21.7073 6.29289C21.5198 6.10536 21.2654 6 21.0002 6H7.00023C6.73502 6 6.48066 6.10536 6.29313 6.29289C6.10559 6.48043 6.00023 6.73478 6.00023 7C6.00023 7.26522 6.10559 7.51957 6.29313 7.70711C6.48066 7.89464 6.73502 8 7.00023 8ZM3.71023 11.29C3.56961 11.1512 3.39104 11.0572 3.19705 11.0199C3.00306 10.9825 2.80234 11.0034 2.62023 11.08C2.49905 11.1306 2.38743 11.2017 2.29023 11.29C2.19919 11.3851 2.12783 11.4972 2.08023 11.62C2.02733 11.7397 2 11.8691 2 12C2 12.1309 2.02733 12.2603 2.08023 12.38C2.13087 12.5012 2.2019 12.6128 2.29023 12.71C2.38743 12.7983 2.49905 12.8694 2.62023 12.92C2.73993 12.9729 2.86936 13.0002 3.00023 13.0002C3.1311 13.0002 3.26053 12.9729 3.38023 12.92C3.50142 12.8694 3.61303 12.7983 3.71023 12.71C3.79856 12.6128 3.86959 12.5012 3.92023 12.38C3.97314 12.2603 4.00047 12.1309 4.00047 12C4.00047 11.8691 3.97314 11.7397 3.92023 11.62C3.87264 11.4972 3.80127 11.3851 3.71023 11.29ZM21.0002 11H7.00023C6.73502 11 6.48066 11.1054 6.29313 11.2929C6.10559 11.4804 6.00023 11.7348 6.00023 12C6.00023 12.2652 6.10559 12.5196 6.29313 12.7071C6.48066 12.8946 6.73502 13 7.00023 13H21.0002C21.2654 13 21.5198 12.8946 21.7073 12.7071C21.8949 12.5196 22.0002 12.2652 22.0002 12C22.0002 11.7348 21.8949 11.4804 21.7073 11.2929C21.5198 11.1054 21.2654 11 21.0002 11ZM3.71023 6.29C3.61513 6.19896 3.50298 6.12759 3.38023 6.08C3.19812 6.00342 2.99741 5.9825 2.80342 6.01987C2.60943 6.05725 2.43086 6.15124 2.29023 6.29C2.2019 6.3872 2.13087 6.49882 2.08023 6.62C2.02733 6.7397 2 6.86913 2 7C2 7.13087 2.02733 7.2603 2.08023 7.38C2.13087 7.50119 2.2019 7.6128 2.29023 7.71C2.38743 7.79833 2.49905 7.86936 2.62023 7.92C2.80234 7.99658 3.00306 8.0175 3.19705 7.98013C3.39104 7.94275 3.56961 7.84876 3.71023 7.71C3.79856 7.6128 3.86959 7.50119 3.92023 7.38C3.97314 7.2603 4.00047 7.13087 4.00047 7C4.00047 6.86913 3.97314 6.7397 3.92023 6.62C3.86959 6.49882 3.79856 6.3872 3.71023 6.29ZM21.0002 16H7.00023C6.73502 16 6.48066 16.1054 6.29313 16.2929C6.10559 16.4804 6.00023 16.7348 6.00023 17C6.00023 17.2652 6.10559 17.5196 6.29313 17.7071C6.48066 17.8946 6.73502 18 7.00023 18H21.0002C21.2654 18 21.5198 17.8946 21.7073 17.7071C21.8949 17.5196 22.0002 17.2652 22.0002 17C22.0002 16.7348 21.8949 16.4804 21.7073 16.2929C21.5198 16.1054 21.2654 16 21.0002 16Z" />
              </svg>
              Booking History
            </button>
          </div>
        </div>
        <div className="w-full flex justify-center  mr-20 mt-11 mb-20">
          {toggleProfile ? <UserProfile /> : null}
          {toggleYourPet ? <YourPet /> : null}
          {toggleBooking ? <BookingHistory /> : null}
        </div>
      </div>
    </>
  );
}

export default UserManagement;

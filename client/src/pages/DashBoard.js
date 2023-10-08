import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { FaCopy } from "react-icons/fa";
import airtime from "../images/airtime.svg";
import data from "../images/data.jpg";
import cable from "../images/cable.jpg";
import utility from "../images/utility.jpg";
import historyImage from "../images/history.png";
import withdraw from "../images/withdraw.png";
import { useGlobalContext } from "../context/UserContext";
import WarningAlert from "../components/WarningAlert";
import { FaWhatsapp } from "react-icons/fa";

const DashBoard = () => {
  const { user } = useGlobalContext();
  const navigate = useNavigate();

  const copyReferralLink = async () => {
    const userName = encodeURIComponent(user.userName);
    await window.navigator.clipboard.writeText(
      `https://www.oladataplug.com/register/${userName}`
    );
    toast.success("Referral link copied");
  };

  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    if (user.userType === "smart earner") {
      const time = Math.random() * 7000;
      setTimeout(() => {
        setShowAlert(true);
      }, [time]);
    }
    // eslint-disable-next-line
  }, []);

  const navigation = [
    { name: "Airtime", image: airtime, link: "/profile/buyairtime" },
    { name: "data", image: data, link: "/profile/buydata" },
    { name: "Tv subscription", image: cable, link: "/profile" },
    { name: "Utility", image: utility, link: "/profile/electricity" },
    { name: "History", image: historyImage, link: "/profile/transactions" },
    { name: "withdraw", image: withdraw, link: "/profile" },
  ];
  const copyAccNo = async (number) => {
    window.navigator.clipboard.writeText(number);
    toast.success("Account number copied");
  };
  const pay_with_card = () => {
    if (user.reservedAccountNo3) {
      window.open(
        `https://topup.vpay.africa/${user.reservedAccountNo3}`,
        "blank"
      );
    } else {
      navigate("/profile/fundWallet");
    }
  };

  return (
    <Container className="">
      {/* {!isNotificationCheck && notification && (
        <Notification msg={notification} close={() => clearNotification()} />
      )} */}
      {showAlert && <WarningAlert close={() => setShowAlert(false)} />}
      <div className=" main__container z-0 ">
        <div className="z-10 m-auto bg-[#25d366] max-w-[60%] rounded-lg mt-5">
          <p className="text-center text-small leading-none text-white">
            <FaWhatsapp className="m-1" />
            <a
              href="https://chat.whatsapp.com/DzmXMfIwfVuANrkUPuyQBB"
              target="blank"
            >
              click here{" "}
            </a>
            to join our whatsapp community
          </p>
        </div>
        <div>
          <h3 className=" text-lg font-bold text-center">
            Welcome back, {user.userName && user.userName.substring(0, 10)}
          </h3>
        </div>

        <div className="flex justify-between px-4 md:pl-20">
          <div className="text-xl font-bold md:font-extrabold  ">
            ₦{user.balance.toFixed(2)}
            {/* <small>({user.userType})</small> */}
          </div>
          <a href="#fundWallet" className="btn text-xs">
            fund your wallet
          </a>
        </div>
        {/* navigation__section */}
        <section className="flex flex-wrap m-auto justify-center items-stretch space-x-4 space-y-4 cursor-pointer ">
          {navigation.map((e, index) => (
            <div
              // className="each__nav"
              className="grid items-center place-content-center  border-2 border-[#162147] w-[40%] max-w-[200px] bg-white rounded-xl"
              key={index}
              onClick={() => navigate(`${e.link}`)}
            >
              <img
                className="img"
                src={e.image}
                alt="airtime"
                width={"200px"}
              />
              <p className="title service__name">{e.name}</p>
            </div>
          ))}
        </section>
        <h3 className="text-center font-bold pt-3 pb-0">Payment accounts</h3>
        <div className="title-underline"></div>
        <div className="others">
          <section className="account__section " id="fundWallet">
            <div className="card">
              <div className="w-100 bg-white rounded-lg">
                <p className="text-sm text-[#25d366]">
                  1.08% charges is applied{" "}
                </p>
              </div>
              <h3 className="text-sm p-0 m-0">
                Account name <br /> OlaDataPlug-
                {user.userName && user.userName.substring(0, 10)}
              </h3>
              <div className="text-sm">
                <p>
                  {user.reservedAccountBank} <b>{user.reservedAccountNo}</b>{" "}
                  <FaCopy
                    onClick={() => copyAccNo(user.reservedAccountNo)}
                    className="copy__icon"
                  />
                </p>
                <p>
                  {user.reservedAccountBank2} <br />
                  <b>{user.reservedAccountNo2}</b>
                  <FaCopy
                    onClick={() => copyAccNo(user.reservedAccountNo2)}
                    className="copy__icon"
                  />
                </p>
                <p className="text-xs capitalize opacity-60">
                  All payments made to the above account number will
                  automatically fund your wallet
                </p>
                <button
                  onClick={pay_with_card}
                  className="btn btn-block special__btn "
                >
                  Pay with ATM card instead (1% charges)
                </button>
              </div>
            </div>
            {user.reservedAccountBank3 && (
              <div className="card">
                <div className="w-100 bg-white rounded-lg">
                  <p className="text-sm text-[#25d366]">
                    1% charges is applied
                  </p>
                </div>
                <h3 className="text-sm p-0 m-0">
                  Account name: <br /> Sodiq Ismail-OlaDataPlug-
                  {user.userName && user.userName.substring(0, 10)}
                </h3>
                <div className="text-sm">
                  <p>
                    {user.reservedAccountBank3} <b>{user.reservedAccountNo3}</b>{" "}
                    <FaCopy
                      onClick={() => copyAccNo(user.reservedAccountNo3)}
                      className="copy__icon"
                    />
                  </p>

                  <p className="text-xs capitalize opacity-60">
                    All payments made to the above account number will
                    automatically fund your wallet
                  </p>
                  <button
                    // onClick={() => navigate("/profile/fundWallet")}
                    onClick={pay_with_card}
                    className="btn btn-block special__btn"
                  >
                    Pay with ATM card instead (1% charges)
                  </button>
                </div>
              </div>
            )}
          </section>
          <section className="referral__section">
            <div className="card">
              <h1 className="sub__title">refer a friend</h1>
              <div className="note">
                Refer people to OlaDataPlug and earn ₦500 immediately the person
                upgrade his/her account to Reseller.
              </div>
              <button className="btn special__btn" onClick={copyReferralLink}>
                Copy referral link
              </button>
              <div className="card">
                {user.userType === "smart earner" && (
                  <>
                    <div className="sub__title">Upgrade your account</div>
                    <button
                      className="btn special__btn"
                      onClick={() => setShowAlert(true)}
                    >
                      Upgrade to reseller @ ₦1000
                    </button>
                  </>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </Container>
  );
};
// <Container>
//   {showAlert && <WarninAlert close={() => setShowAlert(false)} />}
//   <div className="main__container">
//     <div>
//       <h3 className="title text-sm font-light">
//         Welcome back, {user.userName && user.userName.substring(0, 10)}
//       </h3>

//       {/* <div className="marquee" behavior="" direction="left">
//         <p>
//           <span className="text-blue-900">
//             Note that Airtel CG is now ₦220/gb. Kindly reduce your price to
//             maximize your sales. Thank you
//           </span>
//         </p>
//       </div> */}
//     </div>
//     <div className="wallet__balance">
//       <div className="balance title">
//         ₦{user.balance.toFixed(2)}
//         <small>({user.userType})</small>
//       </div>
//       <a href="#fundWallet" className="btn">
//         fund wallet
//       </a>
//     </div>
//     <section className="navigation__section">
//       {navigation.map((e, index) => (
//         <div
//           className="each__nav"
//           key={index}
//           onClick={() => navigate(`${e.link}`)}
//         >
//           <img className="img" src={e.image} alt="airtime" />
//           <p className="title service__name">{e.name}</p>
//         </div>
//       ))}
//     </section>
//     <h3 className="title">Payment account</h3>
//     <div className="title-underline"></div>
//     <div className="others">
//       <section className="account__section " id="fundWallet">
//         <div className="card">
//           <h1 className="sub__title">
//             Account name <br /> OlaDataPlug-
//             {user.userName && user.userName.substring(0, 10)}
//           </h1>
//           <div className="content">
//             <p>
//               {user.reservedAccountBank} <b>{user.reservedAccountNo}</b>{" "}
//               <FaCopy onClick={copyAccNo1} className="copy__icon" />
//             </p>
//             <p>
//               {user.reservedAccountBank2} <br />
//               <b>{user.reservedAccountNo2}</b>
//               <FaCopy onClick={copyAccNo2} className="copy__icon" />
//             </p>
//             <p className="text-sm opacity-60">
//               All payments made to the above account number will
//               automatically fund your wallet- 1.08% charges applied
//             </p>
//             <button
//               onClick={() => navigate("/profile/fundWallet")}
//               className="btn btn-block special__btn"
//             >
//               Pay with ATM card instead
//             </button>
//           </div>
//         </div>
//       </section>
//       <section className="referral__section">
//         <div className="card">
//           <h1 className="sub__title">refer a friend</h1>
//           <div className="note">
//             Refer people to OlaDataPlug and earn ₦500 immediately the person
//             upgrade his/her account to Reseller.
//           </div>
//           <button className="btn special__btn" onClick={copyReferralLink}>
//             Copy referral link
//           </button>
//           <div className="card">
//             <div className="sub__title">Upgrade your account</div>
//             <button
//               className="btn special__btn"
//               onClick={() => setShowAlert(true)}
//             >
//               Upgrade to reseller @ ₦1000
//             </button>
//           </div>
//         </div>
//       </section>
//     </div>
//   </div>
// </Container>

export default DashBoard;
const Container = styled.div`
  box-shadow: var(--shadow-4);
  margin: 0 auto;
  width: 100%;
  padding-top: 5rem;
  img {
    max-width: 5rem;
  }
  .main__container {
    padding: 0.5rem;
    background-color: var(--grey-100);
  }
  .wallet__balance {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: auto;
    margin-bottom: 1rem;
    max-width: 80%;
  }
  .navigation__section {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    align-items: center;
  }
  .each__nav {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: var(--borderRadius);
    min-width: 25%;
    box-shadow: var(--shadow-3);
    padding: 1rem;
  }
  .service__name {
    font-size: 1rem;
  }
  .others {
    @media (min-width: 800px) {
      display: flex;
      justify-content: center;
      align-items: stretch;
      height: 100%;
      min-height: 100%;
      max-width: 80%;
      margin: auto;
      section {
        width: 50%;
      }
    }
    .referral__section {
      align-self: stretch;
    }
  }

  .account__section {
    width: 100%;
    .title {
      font-size: 1.5rem;
      margin: 1rem;
    }
  }
  .card {
    max-width: 80%;
    width: 100%;
    margin: 1rem auto;
    background-color: var(--primary-600);
    color: var(--white);
    padding: 1rem;
    border-radius: var(--borderRadius);
    text-align: center;
    text-transform: uppercase;
    font-weight: 900;
    /* border: 2px solid red; */
  }
  .content {
    /* border: 2px solid red; */
    width: 100%;
    /* text-align: center; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .copy__icon {
    font-size: 1.5rem;
    margin-left: 0.5rem;
  }
  .note {
    opacity: 0.7;
  }
  .special__btn {
    background-color: var(--grey-100);
    color: var(--primary-600);
  }
  @media (min-width: 500px) {
    .navigation__section {
      display: flex;
      /* border: 2px solid red; */
    }
  }
`;

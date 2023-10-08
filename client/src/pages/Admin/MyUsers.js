import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import FormRowSelect from "../../components/FormRowSelect";
import FormInput from "../../components/FormInput";
import Pagination from "../../components/Pagination";
import { useGlobalContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { TableContainer } from "../../Styles/Styles";
import UserDetails from "../../components/UserDetail";
function MyUsers() {
  const {
    fetchUser,
    adminDetails,
    page,
    phoneNumber,
    userAccount,
    userTypeOptions,
    selectedUserType,
    handleChange,
    clearFilter,
    filteringTransactions,
    totalUsers,
    totalBalance,
    changePage,
    adminUpgradeUser,
    user,
  } = useGlobalContext();
  const [userDetails, setUserDetails] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, [page, phoneNumber, userAccount, selectedUserType]);
  const [localSearch, setLocalSearch] = useState({
    phoneNumber: phoneNumber || "",
    userAccount: userAccount || "",
  });
  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    // if (filteringTransactions) return;
    handleChange({ name, value });
  };
  const handleUserTransaction = (userName) => {
    handleChange({ name: "userAccount", value: userName });
    changePage(1);
    navigate("/profile/transactions");
  };
  const handleSendEmail = (email) => {
    handleChange({ name: "userAccount", value: email });
    navigate("/admin/sendMail");
  };
  const handleUpgradeUser = ({ userId, userType }) => {
    let newUserType = "";
    if (userType === "api user") {
      // downgrade user
      newUserType = "smart earner";
      // Upgrade user
    } else if (userType === "smart earner") {
      newUserType = "reseller";
    } else {
      newUserType = "api user";
    }
    adminUpgradeUser({ userId, userType: newUserType });
  };
  const debounce = () => {
    let timeoutID = "";
    return (e) => {
      let name = e.target.name;
      let value = e.target.value;
      clearTimeout(timeoutID);
      setLocalSearch({ ...localSearch, [name]: value });
      timeoutID = setTimeout(() => {
        handleChange({ name, value });
      }, [2000]);
    };
  };
  const optimizedDebounce = useMemo(() => debounce(), []);
  const clearAllFilter = () => {
    setLocalSearch({ phoneNumber: "", userAccount: "" });
    clearFilter();
  };
  return (
    <Wrapper>
      <FormRowSelect
        list={userTypeOptions}
        handleChange={handleInputChange}
        labelText="user type"
        name="selectedUserType"
        value={selectedUserType}
      />
      <FormInput
        handleChange={optimizedDebounce}
        labelText="userAccount"
        name="userAccount"
        value={localSearch.userAccount}
        placeholder="userName"
      />
      <FormInput
        handleChange={optimizedDebounce}
        labelText="phone Number"
        name="phoneNumber"
        value={localSearch.phoneNumber}
        placeholder="phone number"
      />
      <button onClick={clearAllFilter} className="btn btn-block btn-danger">
        Clear filters
      </button>
      <Pagination />
      <div className="flex justify-between">
        <h6>
          Total balance:₦{totalBalance ? totalBalance.toFixed(2) : "0.00"}
        </h6>
        <h6>Total users:{totalUsers}</h6>
      </div>
      {userDetails._id && (
        <UserDetails
          {...userDetails}
          handleUserTransaction={handleUserTransaction}
          handleSendEmail={handleSendEmail}
          handleUpgradeUser={handleUpgradeUser}
          close={() => setUserDetails({})}
        />
      )}
      <TableContainer>
        <table className="" id="t01">
          <thead>
            <tr>
              <th>Member since</th>
              <th>username</th>
              <th>type</th>
              <th>balance</th>
              <th>last seen</th>
              <th>phone number</th>
              <th>email</th>
            </tr>
          </thead>

          <tbody>
            {adminDetails.allUsers.map((e, index) => {
              const {
                // fullName,
                userName,
                userType,
                balance,
                phoneNumber,
                email,
                createdAt,
                lastLogin,
                _id,
              } = e;
              return (
                <>
                  <tr key={_id} onClick={() => setUserDetails(e)}>
                    <td>{moment(createdAt).startOf("day").fromNow()}</td>
                    <td>{userName}</td>
                    <td>{userType}</td>
                    <td
                      className={
                        balance < 100 ? "text-red-500" : "text-green-500"
                      }
                    >
                      {balance && balance.toFixed(2)}
                    </td>
                    <td>
                      {(lastLogin && moment(lastLogin).calendar()) || "unknown"}
                    </td>
                    <td>{phoneNumber}</td>
                    <td>{email}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </TableContainer>
      <Pagination />
    </Wrapper>
  );
}

export default MyUsers;
const Wrapper = styled.div`
  margin-top: 4rem;
  .users {
    @media (min-width: 700px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
  }

  .card {
    background: var(--grey-100);
    color: var(--primary-500);
    border-radius: var(--borderRadius);
    text-align: center;
    line-height: 1;
    padding: 1rem;
    max-width: 80%;
    margin: 1rem auto;
    font-size: 1rem;
  }
  .info {
    text-align: left;
    p {
      color: var(--primary-500);
      font-weight: 600;
      font-size: 0.7rem;
      text-transform: capitalize;
      line-height: 0.1;
    }
  }
`;

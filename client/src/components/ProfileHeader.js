import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaAlignLeft, FaHome } from "react-icons/fa";
import { useGlobalContext } from "../context/UserContext";

function ProfileHeader() {
  const { toggleSideBar, isAdmin, logoutUser } = useGlobalContext();
  const navigate = useNavigate();

  const logout = () => {
    logoutUser();
    navigate("/");
  };
  const navigateHome = () => navigate("/profile");
  return (
    <Container>
      <Hamburger onClick={toggleSideBar}>
        <FaAlignLeft />
      </Hamburger>
      {isAdmin ? (
        <button onClick={navigateHome} className="logout__btn btn">
          ADMIN
        </button>
      ) : (
        <button onClick={navigateHome} className="btn">
          <FaHome />
        </button>
      )}

      <button className="logout__btn btn" onClick={logout}>
        logout
      </button>
    </Container>
  );
}

export default ProfileHeader;
const Container = styled.div`
  background-color: var(--primary-500);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  padding-left: 1rem;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;

  h2 {
    color: white;
  }
  .greet {
    display: none;
    @media (min-width: 600px) {
      display: flex;
    }
  }
`;

const Hamburger = styled.div`
  display: flex;
  color: white;
  svg {
    font-size: x-large;
    margin: auto;
  }
  @media (min-width: 678px) {
    svg {
      display: none;
    }
  }
`;

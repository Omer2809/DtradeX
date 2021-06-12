import React, { useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
// import { MdClose } from "react-icons/md";
import BiddingForm from "../forms/biddingForm";
import ContactSellerForm from "../forms/contactSellerForm";
import Icon from "../icon";

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalWrapper = styled.div`
  width: 450px;
  height: 300px;
  padding-right: 20px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;

  display: flex;
  justify-content: center;
  align-items: center;

  /* display: grid; */
  /* grid-template-columns: 1fr 1fr; */
  /* position: relative; */
  z-index: 30;
  border-radius: 10px;
  margin-bottom: 80px; //to move modal on top
`;

const ModalImg = styled.img`
  width: 210px;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  p {
    margin-bottom: 1rem;
  }
  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`;

const CloseModalButton = styled(Icon)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 30;
`;

export const Modal = ({
  showModal,
  setShowModal,
  update,
  user,
  listing,
  msg,
}) => {
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
  });

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        console.log("I pressed");
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
              <ModalImg src={listing?.images[0].url} alt="camera" />
              <ModalContent>
                {msg ? (
                  <ContactSellerForm
                    listing={listing}
                    user={user}
                    btnName={"Send Message"}
                    setShowModal={setShowModal}
                  />
                ) : (
                  <BiddingForm update={update} listing={listing} user={user} />
                )}
              </ModalContent>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => setShowModal((prev) => !prev)}

                name="#close"
                className="icon__medium"
              />
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};

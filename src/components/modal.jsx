import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import "./styles/modal.css";
import { AddNewButton } from "./styles/styledButtons";

function calculate_age(dob) {
  var diff_ms = Date.now() - dob.getTime();
  var age_dt = new Date(diff_ms);

  return Math.abs(age_dt.getUTCFullYear() - 1970);
}

const ulStyling = {
  color: "#333",
  fontWeight: 200,
  padding: 15,
  marginBottom: 10,
  borderBottom: 2,
  borderBottomColor: "#888",
  borderBottomStyle: "solid",
};
const modalPosition = {
  top: "50%",
};

const bottomStyling = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  textAlign: "center",
};

const imageStyling = {
  width: 100,
  margin: 10,
  borderRadius: "50%",
  border: 3,
  borderColor: "#060b26",
  borderStyle: "solid",
};

const bottomRightStyling = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: 10,
  margin: 10,
  height: 80,
};

export const Modal = ({ show, close, member }) => {
  const topDistance = 38+(window.scrollY / 10);
  return (
    <div
      className="modal-wrapper "
      style={{
        transform: show ? " translate(-50%,-50%)" : "translateY(-50vh)",
        opacity: show ? "1" : "0",
        zIndex: 100,
        top: `${topDistance}%`,
      }}
    >
      {console.log(window.scrollY)}
      <div className="left"></div>
      <div className="modal-content">
        <div className="modal-body">
          <div className="modal-headerr">
            <h2 style={{ marginBottom: 5, fontWeight: "600" }}>
              <FaIcons.FaUserAlt style={{ marginBottom: 12 }} /> Member Detail
            </h2>
            <AiIcons.AiOutlineClose
              onClick={close}
              style={{
                cursor: "pointer",
                fontSize: 25,
              }}
            />
          </div>
          <ul style={ulStyling}>
            <li>
              <span className="title">FPID &nbsp;&nbsp;&nbsp;{"   "} :</span>{" "}
              {member.fpId}
            </li>
            <li>
              <span className="title">Name &nbsp;&nbsp;{"     "} :</span>{" "}
              {member.name}
            </li>
            <li>
              <span className="title">Phone &nbsp;&nbsp;{"     "} :</span>{" "}
              {member.phone}
            </li>
            <li>
              <span className="title">Email &nbsp; &nbsp; :</span>{" "}
              {member.email}
            </li>
            <li>
              <span className="title">Weight &nbsp;:</span> {member.weight}
            </li>
            <li>
              <span className="title">Height &nbsp; :</span> {member.height}
            </li>
            <li>
              <span className="title">Age &nbsp; &nbsp; &nbsp; :</span>{" "}
              {calculate_age(new Date(member.date_of_birth))}
            </li>
            <li>
              <span className="title">Plan &nbsp; &nbsp; &nbsp; :</span>{" "}
              {member.plan.name}
            </li>
            <li>
              <span className="title">Plan started on &nbsp;:</span>{" "}
              {new Date(member.plan_start_date).toLocaleDateString()}
            </li>
            <li>
              <span className="title">Plan expires on &nbsp;:</span>
              {new Date(member.plan_end_date).toLocaleDateString()}
            </li>
          </ul>
          <div style={bottomStyling}>
            {member.image && (
              <img
                className="imaage"
                src={member.image}
                alt={member.name}
                style={imageStyling}
              />
            )}
            <div style={bottomRightStyling}>
              <AddNewButton to="#" style={{ margin: 10 }}>
                Print <AiIcons.AiFillPrinter />
              </AddNewButton>
              <AddNewButton to="#" onClick={close}>
                Close <AiIcons.AiOutlineClose />
              </AddNewButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

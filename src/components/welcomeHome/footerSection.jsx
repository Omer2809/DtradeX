import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../icon";

const sections = [
  {
    id: 1,
    name: "Company",
    links: [
      { name: "Privacy Policy", to: "#" },
      { name: "About Us", to: "#" },
      { name: "Affiliates", to: "#" },
      { name: "Blog", to: "#" },
    ],
  },
  {
    id: 2,
    name: "support",
    links: [
      { name: "Contact", to: "#" },
      { name: "Knowledge Base", to: "#" },
      { name: "FAQ", to: "#" },
    ],
  },
  {
    id: 3,
    name: "Follow us",
    links: [
      { name: "Facebook", to: "#" },
      { name: "Instagram", to: "#" },
      { name: "Youtube", to: "#" },
      { name: "Twitter", to: "#" },
    ],
  },
];

const FooterSection = () => {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  const handleClick = (id) => {
    if (id === 1) return setShow1(!show1);

    if (id === 2) return setShow2(!show2);

    return setShow3(!show3);
  };

  const getClasses = (id) => {
    let classes = "collapsible footer__section";

    if ((id === 1 && show1) || (id === 2 && show2) || (id === 3 && show3))
      classes += " collapsible--expanded";

    return classes;
  };

  return (
    <>
      {sections.map((section, index) => (
        <section key={index} className={getClasses(section.id)}>
          <div className="collapsible__header">
            <h2 className="collapsible__heading footer__heading">
              {section.name}
            </h2>
            <Icon
              onClick={() => handleClick(section.id)}
              style={{ cursor: "pointer" }}
              name="#chevron"
              className="icon icon--white collapsible__chevron"
            />
          </div>
          <div className="collapsible__content">
            <ul className="list">
              {section.links.map((link, index) => (
                <li key={index}>
                  <Link to="#">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </>
  );
};

export default FooterSection;

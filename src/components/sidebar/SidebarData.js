import sprite from "../../images/sprite-menu.svg";

const Icon = ({ name, ...rest }) => (
  <svg {...rest}>
    <use href={sprite + name}></use>
  </svg>
);


export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <Icon name="#home" className="icon--small" />,
    cName: "nav-text",
  },
  {
    title: "Listings",
    path: "/my-listings",
    icon: <Icon name="#listing" className="icon--small"/>,
    cName: "nav-text",
  },
  {
    title: "Messages",
    path: "/messages",
    icon: <Icon name="#bell" className="icon--small"/>,
    cName: "nav-text",
  },
  {
    title: "Saved",
    path: "/favorites",
    icon: <Icon name="#bookmark" className="icon--small"/>,
    cName: "nav-text",
  },
  {
    title: "Logout",
    path: "/logout",
    icon:<Icon name="#logout" className="icon--small"/>,
    cName: "nav-text",
  },
];

import React, { Component } from "react";
import { toast } from "react-toastify";

import messagesApi from "../../services/messageService";
import Spinner from "../common/spinner";
import FA from "react-fontawesome";
import "./style.css";

import noimage from "./noimage.png";
import ContactSellerForm from "../forms/contactSellerForm";
import { Link } from "react-router-dom";
import { getUser } from "../../services/userService";

function getChats(messages) {
  return messages.reduce((acc, curr) => {
    if (checkIfAlreadyExist(curr)) return acc;
    return [...acc, curr];

    function checkIfAlreadyExist(currentVal) {
      return acc.some((message) => {
        return (
          message.listing._id === currentVal.listing._id &&
          message.fromUser._id === currentVal.fromUser._id
        );
      });
    }
  }, []);
}

function getClasses(msg) {
  let classes = " p-2 mt-2 mr-5 shadow-sm text-white rounded  float";
  if (!msg) classes += "-left bg-primary";
  else classes += "-right bg-success";

  return classes;
}
function getImageUrl(entity) {
  return entity?.images && entity.images.length !== 0 && entity.images[0].url;
}

class Messages extends Component {
  state = {
    chats: [],
    messages: [],
    loading: false,
    fromUser: {},
    listing: {},
    bool: false,
    url: "",
    // showModal: false,
    // member: {},
    user: {},
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const { data: messages } = await messagesApi.getMyMessages();
    let url = "";

    const { user } = this.props;

    const { data: profile } = await getUser(user.userId);

    if (profile.images?.length !== 0) url = profile.images[0].url;

    const chats = getChats(
      messages.filter(
        (c) => c.participants.filter((u) => u.name === user.name).length !== 0
      )
    );

    this.setState({
      chats,
      user,
      url,
      loading: false,
    });

    if (chats.length !== 0) this.setChat(chats[0]);

    console.log(this.state);
  }

  handleChatDelete = async (chat) => {
    const originalChats = this.state.chats;
    const chats = originalChats.filter((c) => c._id !== chat._id);

    this.setState({ chats });

    try {
      await messagesApi.deleteChat(chat._id);
    } catch (ex) {
      console.log(ex);
      if (ex.response?.status === 404)
        toast.error("This chat has already been deleted.");

      this.setState({ chats: originalChats });
    }
  };

  handleMessageDelete = async (message, yours) => {
    const originalMessages = this.state.messages;
    const messages = originalMessages.filter((m) => m._id !== message._id);

    this.setState({ messages });

    try {
      if (yours) await messagesApi.deleteForAll(message._id);
      else await messagesApi.deleteForMe(message._id);
    } catch (ex) {
      if (ex.response?.status === 404)
        toast.error("This message has already been deleted.");

      this.setState({ messages: originalMessages });
    }
  };

  handleUpdateMessages = (msg) => {
    const originalMessages = this.state.messages;
    const messages = [...originalMessages, msg];

    console.log("in update mee:", originalMessages, messages);
    this.setState({ messages });
  };

  setChat = async (message) => {
    console.log("mesg clicked:", message);
    this.setState({
      loading: true,
    });

    const { data } = await messagesApi.getChat(
      message.toUser._id,
      message.fromUser._id,
      message.listing._id
    );

    const messages = data.filter(
      (c) =>
        c.participants.filter((u) => u.name === this.props.user.name).length !==
        0
    );
    console.log("mesg clicked:", messages);

    this.setState({
      fromUser: message.fromUser,
      listing: message.listing,
      messages,
      loading: false,
    });
  };

  render() {
    let { loading, user, fromUser, messages, chats, listing, url } = this.state;

    return (
      <div className="pt-5 pb-5">
        <div className="container front-container1  mb-3 mt-4">
          <div className="row chat-top">
            <div className="d-flex col-sm-4 border-right border-secondary pt-3">
              <img
                src={url || noimage}
                alt=""
                className="profile-image rounded-circle mb-3 mr-3"
              />
              <h3>{user?.name}</h3>
              {console.log(user)}
            </div>

            <div className="col-sm-8 d-flex pt-3 sender-web">
              <img
                src={getImageUrl(fromUser) || noimage}
                alt=""
                className="profile-image rounded-circle mr-2"
              />
              <div>
                {fromUser?.name || "Contact Details"}
                {"  "} ({fromUser?.email})
              </div>
            </div>
          </div>
          {/* {loading && <Spinner />} */}

          <div className="row">
            <div className="col-sm-4 contacts">
              <div className="contact-table-scroll">
                <table className="table table-hover ">
                  <tbody>
                    {chats?.map((message, index) => (
                      <tr key={index}>
                        <td>
                          <img
                            // src={noimage}
                            src={getImageUrl(message.fromUser) || noimage}
                            alt=""
                            className="profile-image rounded-circle"
                          />
                        </td>
                        <td
                          colSpan="2"
                          style={{
                            padding: 0,
                            paddingTop: 15,
                            cursor: "pointer",
                          }}
                          onClick={() => this.setChat(message)}
                        >
                          {message.fromUser.name}
                        </td>
                        <td>
                          <small>
                            {new Date(message.createdAt).toDateString()}
                          </small>
                        </td>
                        <td>
                          <button
                            type="button"
                            title="delete msg"
                            style={{
                              cursor: "pointer",
                              color: "red",
                              border: "none",
                              backgroundColor: "transparent",
                            }}
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure to delete this chat?"
                                )
                              ) {
                                this.handleChatDelete(
                                  message
                                  // message.fromUser._id === user?.userId
                                );
                              }
                            }}
                          >
                            <FA className="trash" name="trash" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-sm-8 message-area">
              <div className="message-table-scroll">
                <table className="table">
                  {loading ? (
                    <Spinner />
                  ) : (
                    <tbody className="sender-mobile-t">
                      <tr className="sender-mobile col-sm-8 d-flex pt-3 ">
                        <img
                          src={getImageUrl(fromUser) || noimage}
                          alt=""
                          className="profile-image rounded-circle mr-2"
                        />
                        <tr> {fromUser?.name || "Contact Details"}</tr>
                      </tr>
                      {chats.length !== 0 && (
                        <tr>
                          <td
                            className="d-flex product-top border-bottom-2 border-dashed border-dark m-2 mr-5"
                            style={{ borderBotttom: "2", border: "dashed" }}
                          >
                            <Link to={`/listing/details/${listing._id}`}>
                              <img
                                src={getImageUrl(listing)}
                                style={{ height: 135, width: 100 }}
                                alt="product"
                              />
                            </Link>
                            <div className="p-3">
                              <h5>Title: {listing?.title}</h5>
                              <h5>Price: Rs.{listing?.price}</h5>
                              <h5>Description: {listing?.description}</h5>
                            </div>
                          </td>
                        </tr>
                      )}
                      <tr className="text-center font-italic">
                        <td>Messages</td>{" "}
                      </tr>
                      {messages?.map((message, index) => (
                        <tr key={index}>
                          <td>
                            <p
                              style={{
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                if (window.confirm("Delete Message?")) {
                                  this.handleMessageDelete(
                                    message,
                                    message.fromUser._id === user.userId
                                  );
                                }
                              }}
                              className={getClasses(
                                message.fromUser._id === user.userId
                              )}
                            >
                              {message.content}
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
              <div className="row text-center pl-5 message-box mb-2">
                {/* <div className="col-sm-2 mt-2"> */}
                <ContactSellerForm
                  listing={listing}
                  user={user}
                  toId={fromUser._id}
                  btnName={"Send"}
                  setUpdateMessages={this.handleUpdateMessages}
                />
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Messages;

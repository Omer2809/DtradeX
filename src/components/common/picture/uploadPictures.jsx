import React, { Component } from "react";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

class UploadPictures extends Component {
  state = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
  };

  handleCancel = () => {
    // console.log("cancel");
    return this.setState({ previewVisible: false });
  };
  //Image Preview
  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  handleChange = ({ fileList }) => {
    this.props.uploadImages(fileList);

    // console.log(fileList);
    // this.props.setProfileImage(fileList);

    this.setState({ fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          // action="https://dwt-backend.herokuapp.com/api/users/dummy"
          customRequest={dummyRequest}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 - this.props.count ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img
            alt="example"
            style={{ width: "100%", height: "80%" }}
            src={previewImage}
          />
        </Modal>
      </>
    );
  }
}

export default UploadPictures;

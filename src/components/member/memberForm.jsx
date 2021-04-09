import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import axios from "axios";

import Form from "../common/form/form";

import { getMember, saveMember } from "../../services/memberService";
import { saveMemberHistory } from "../../services/historyService";
import { getPlans } from "../../services/planService";
import auth from "../../services/authService";

import "../styles/styledForm.css";
import Spinner from "../common/Spinner";
import FormContainer from "../common/form/formContainer";
import Progress from "../common/Progress";
import MemberImage from "../common/memberImage";

class MemberForm extends Form {
  state = {
    data: {
      name: "",
      phone: "",
      email: "",
      fpId: "",
      date_of_birth: "",
      height: "",
      weight: "",
      planId: "",
      plan_start_date: "",
      plan_end_date: "",
    },
    plans: [],
    errors: {},
    loading: false,
    imageloading: false,
    saving: false,
    filename: "",
    uploadPercentage: 0,
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().min(4).required().label("Name"),
    phone: Joi.string().min(5).required().label("Contact No"),
    email: Joi.string().min(5).label("Email").email(),
    fpId: Joi.string().label("FPID"),
    image: Joi.string(),
    date_of_birth: Joi.date().label("DOB"),
    height: Joi.string().min(0).label("Height"),
    weight: Joi.string().min(0).label("Weight"),
    planId: Joi.string().required().label("Plan"),
    userId: Joi.string().label("User"),
    plan_start_date: Joi.date().required().label("Start date"),
    plan_end_date: Joi.date().required().label("End date"),
  };

  async populatePlans() {
    try {
      const { data: plans } = await getPlans();
      this.setState({ plans });
    } catch {
      this.setState({ loading: false });
    }
  }

  async populateMember() {
    try {
      const memberId = this.props.match.params.id;
      if (memberId === "new") return;

      this.setState({ loading: true });
      const { data: member } = await getMember(memberId);
      this.setState({ data: this.mapToViewModel(member), loading: false });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
      this.setState({ loading: false });
    }
  }

  async componentDidMount() {
    const memberId = this.props.match.params.id;
    if (memberId !== "new") this.setState({ loading: true });

    await this.populatePlans();
    await this.populateMember();

    
  }

  mapToViewModel(member) {
    let data={
      _id: member._id,
      name: member.name,
      fpId: member.fpId,
      planId: member.plan._id,
      userId: member.updated_by._id,
      phone: member.phone,
      email: member.email,
      // image: member.image,
      date_of_birth: member.date_of_birth && new Date(member.date_of_birth),
      height: member.height,
      weight: member.weight,
      plan_start_date:
        member.plan_start_date && new Date(member.plan_start_date),
      plan_end_date: member.plan_end_date && new Date(member.plan_end_date),
    };
   
    if (member.image) data.image = member.image;  
    
    // console.log(data);
    return data;

    //     return {
    //   _id: member._id,
    //   name: member.name,
    //   fpId: member.fpId,
    //   planId: member.plan._id,
    //   userId: member.updated_by._id,
    //   phone: member.phone,
    //   email: member.email,
    //   image: member.image,
    //   date_of_birth: member.date_of_birth && new Date(member.date_of_birth),
    //   height: member.height,
    //   weight: member.weight,
    //   plan_start_date:
    //     member.plan_start_date && new Date(member.plan_start_date),
    //   plan_end_date: member.plan_end_date && new Date(member.plan_end_date),
    // };
  }

  doSubmit = async () => {
    try {
      const data = { ...this.state.data, userId: auth.getCurrentUser()._id };
      this.setState({ data, loading: true, saving: true });

    // console.log(data);

      const { data: response } = await saveMember(
        JSON.parse(JSON.stringify(data))
      );

      await saveMemberHistory(response._id);
      this.setState({ loading: false, saving: false });

      this.props.history.push("/members");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.warn(ex.response.data);
      }
      this.setState({ loading: false, saving: false });
    }
  };

  uploadFileHandler = async (e) => {
    const allowedExtensions = /(\.jpg|\.png|\.jpeg)$/i;
    if (!allowedExtensions.exec(e.target.files[0].name)) {
      console.log(e.target.files[0].name);
      toast.warn("Invalid file type");
      return;
    }

    if (e.target.files[0])
      this.setState({ filename: e.target.files[0].name, uploadPercentage: 0 });

    this.setState({ imageloading: true });

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          this.setState({
            uploadPercentage: parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            ),
          });
          setTimeout(() => this.setState({ uploadPercentage: 0 }), 30000);
        },
      };

      const { data: image } = await axios.post("/upload", formData, config);

      const copydata = { ...this.state.data, image };
      this.setState({ data: copydata, imageloading: false });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.warn(ex.response.data);
      }
      this.setState({ loading: false, imageloading: true });
    }
  };

  getActivePlans = (plans) => {
    return plans.filter((p) => p.isActive !== false);
  };

  render() {
    return (
      <FormContainer name={"Member"} url={"/members"} member>
        {this.state.loading ? (
          <Spinner form saving={this.state.saving} />
        ) : (
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("fpId", "FPID")}
            {this.renderInput("name", "Name")}
            {this.renderInput("phone", "Contact No.", "number")}
            {this.renderInput("email", "Email", "email")}
            {this.renderInput("height", "Height")}
            {this.renderInput("weight", "Weight")}
            {this.renderDOB("date_of_birth", "DOB")}
            {this.renderSelect(
              "planId",
              "Plan",
              this.getActivePlans(this.state.plans)
            )}
            <div className="dateContainer">
              {this.renderDatePicker("plan_start_date", "Start date")}
              {this.renderDatePicker("plan_end_date", "End date")}
            </div>
            {this.renderFileInput("choosefile", "Choose File", "file")}
            {this.state.uploadPercentage !== 0 ? (
              <Progress percentage={this.state.uploadPercentage} />
            ) : (
              ""
            )}
            {this.state.imageloading && <Spinner />}
            {!this.state.imageloading && this.state.data.image && (
              <MemberImage
                url={this.state.data.image}
                alt={this.state.filename}
                bgColor={"#060b26"}
              />
            )}
            {this.renderButton("Save")}
          </form>
        )}
      </FormContainer>
    );
  }
}

export default MemberForm;
